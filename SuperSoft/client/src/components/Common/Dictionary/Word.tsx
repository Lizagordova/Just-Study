import React, {Component} from 'react';
import {WordViewModel} from "../../../Typings/viewModels/WordViewModel";
import {Card, CardText, Progress} from "reactstrap";
import {makeObservable, observable, toJS} from "mobx";
import WordStore from "../../../stores/WordStore";
import UserStore from "../../../stores/UserStore";
import {UserRole} from "../../../Typings/enums/UserRole";
import {observer} from "mobx-react";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import {translatePartOfSpeech} from "../../../functions/translater";
import AddOrUpdateWord from "./AddOrUpdateWord";
import {WordReadModel} from "../../../Typings/readModels/WordReadModel";


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

    constructor(props: IWordProps) {
        super(props);
        makeObservable(this, {
            word: observable,
            notDeleted: observable,
            edit: observable
        });
        this.setWord();
    }

    setWord() {
        this.word = this.props.wordStore.dictionary.filter(w => w.id === this.props.userWord.wordId)[0];
    }

    renderWord() {
        return(
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2 wordColumn">
                <span>{this.word.word.toUpperCase()}</span>
            </div>
        );
    }

    renderPartOfSpeech() {
        return(
            <div className="col-lg-2 col-md-2 col-sm-2 col-xs-2">
                <span>{translatePartOfSpeech(this.word.partOfSpeech)}</span>
            </div>
        );
    }

    renderEnglishMeaning() {
        return(
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <span>{this.word.englishMeaning}</span>
            </div>
        );
    }

    renderRussianMeaning() {
        return(
            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3">
                <span>{this.word.russianMeaning}</span>
            </div>
        );
    }

    renderExamples() {
        let examples = this.word.examples;
        if(examples.length > 0) {
            return(
                <div className="row">
                    <div className="col-10">
                        <span style={{marginLeft: "0px", paddingLeft: "10px"}}>Пример: {examples[0].example}</span>
                    </div>
                </div>
            );
        }
    }

    renderControlButtons() {
        return(
            <>
                <div className="row justify-content-center" onClick={() => this.handleDelete()}>
                     <i className="fa fa-window-close fa-2x" aria-hidden="true"/>
                </div>
                <div className="row justify-content-center" onClick={() => this.editToggle()}>
                     <i className="fa fa-edit fa-2x" aria-hidden="true"/>
                </div>
            </>
        );
    }

    renderProgress() {
        if(this.props.userStore.currentUser.role != UserRole.Admin) {
            return(
                <Progress
                    style={{width: "100%"}}
                    color="success" value={this.props.userWord.rightAnswers / 0.05}>
                    выучено на {this.computeProgress()} %
                </Progress>
            );
        }
    }

    renderWordCard() {
        return(
            <Card className="cardWord">
                <div className="row">
                    <div className="col-10">
                        <div className="row justify-content-center">
                            {this.renderWord()}
                            {this.renderPartOfSpeech()}
                            {this.renderEnglishMeaning()}
                            {this.renderRussianMeaning()}
                        </div>
                        {this.renderExamples()}
                    </div>
                    <div className="col-2">
                        {this.renderControlButtons()}
                    </div>
                </div>
                <CardText style={{marginTop: '5px', width: "100%"}}>
                    {this.renderProgress()}
                </CardText>
            </Card>
        );
    }

    render() {
        return(
            <>
                {this.renderWordCard()}
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
}

export default Word;