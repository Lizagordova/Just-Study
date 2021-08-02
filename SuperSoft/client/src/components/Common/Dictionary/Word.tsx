import React, {Component} from 'react';
import {WordViewModel} from "../../../Typings/viewModels/WordViewModel";
import {Progress} from "reactstrap";
import {makeObservable, observable} from "mobx";
import WordStore from "../../../stores/WordStore";
import UserStore from "../../../stores/UserStore";
import {UserRole} from "../../../Typings/enums/UserRole";
import {observer} from "mobx-react";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import {translatePartOfSpeech} from "../../../functions/translater";
import AddOrUpdateWord from "./AddOrUpdateWord";
import {isThatUserRole} from "../../../functions/isThatUserRole";
import WordDetailsWindow from "./WordDetailsWindow";


class IWordProps {
    userWord: UserWordViewModel;
    wordStore: WordStore;
    userStore: UserStore;
}

@observer
class Word extends Component<IWordProps> {
    word: WordViewModel = new WordViewModel();
    notDeleted: boolean;
    edit: boolean;
    wordDetailsOpen: boolean;

    constructor(props: IWordProps) {
        super(props);
        makeObservable(this, {
            word: observable,
            notDeleted: observable,
            edit: observable,
            wordDetailsOpen: observable
        });
        this.setWord();
    }

    setWord() {
        this.word = this.props.wordStore.dictionary.filter(w => w.id === this.props.userWord.wordId)[0];
    }

    renderWord() {
        return(
            <span className="wordDetails">{this.word.word.toUpperCase()}</span>
           
        );
    }

    renderPartOfSpeech() {
        return(
            <span className="wordDetails">{translatePartOfSpeech(this.word.partOfSpeech)}</span>
        );
    }

    renderEnglishMeaning() {
        return(
            <span className="wordDetails">{this.word.englishMeaning}</span>
        );
    }
   

    renderControlButtons() {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center" onClick={() => this.handleDelete()}>
                     <i className="fa fa-trash-o fa-2x" aria-hidden="true"/>
                </div>
                <div className="row justify-content-center" onClick={() => this.editToggle()}>
                     <i className="fa fa-edit fa-2x" aria-hidden="true"/>
                </div>
            </div>
        );
    }

    renderProgress() {
        if(!isThatUserRole(this.props.userStore, UserRole.Admin)) {
            return(
                <Progress
                    className="userProgress"
                    color="success" value={this.props.userWord.rightAnswers / 0.05}>
                    выучено на {this.computeProgress()} %
                </Progress>
            );
        }
    }

    renderWordCard(userStore: UserStore) {
        return(
            <>
                <tr onDoubleClick={() => this.wordDetailsToggle()} className="wordRow">
                    <td className={isThatUserRole(userStore, UserRole.User) ? "wordCell": ""}>{this.renderWord()}</td>
                    <td className={isThatUserRole(userStore, UserRole.User) ? "wordCell": ""}>{this.renderPartOfSpeech()}</td>
                    <td className={isThatUserRole(userStore, UserRole.User) ? "wordCell": ""}>{this.renderEnglishMeaning()}</td>
                    {isThatUserRole(this.props.userStore, UserRole.Admin) && <td>{this.renderControlButtons()}</td>}
                </tr>
                <tr className="userProgressRow">
                    <td className="userProgressCell" colSpan={3}>{this.renderProgress()}</td>
                </tr>
            </>
        );
    }
    
    renderWordDetailsWindow() {
        return (
            <WordDetailsWindow word={this.word} toggle={this.wordDetailsToggle}/>
        );
    }
    
    render() {
        return(
            <>
                {this.renderWordCard(this.props.userStore)}
                {this.wordDetailsOpen && this.renderWordDetailsWindow()}
                {this.edit && <AddOrUpdateWord word={this.word} cancelEdit={this.editToggle} courseId={undefined} currentUser={this.props.userStore.currentUser} date={undefined} isWordOfADay={false} wordStore={this.props.wordStore} />}
            </>
        );
    }

    handleDelete() {
        let result = window.confirm('Вы уверены, что хотите удалить слово?');
        if(result) {
            this.deleteWord()
                .then((status) => {
                    this.notDeleted = status !== 200;
            });
        }
    }

    async deleteWord(): Promise<number> {
        let role = this.props.userStore.currentUser.role;
        if(role === UserRole.User) {
            let userId = this.props.userStore.currentUser.id;
           return this.props.wordStore.deleteWordFromUserDictionary(this.word.id, userId);
        } else if(role === UserRole.Admin) {
           return this.props.wordStore.deleteWordFromDictionary(this.word.id);
        }

        return 401;
    }

    editToggle = () => {
        this.edit = !this.edit;
    };

    computeProgress() {
        let progress = this.props.userWord.rightAnswers / 5 * 100;
        if(progress > 100) {
            progress = 100;
        }
        
        return progress;
    }

    wordDetailsToggle = () => {
        this.wordDetailsOpen = !this.wordDetailsOpen;
    }
}

export default Word;