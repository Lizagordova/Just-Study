import React, { Component } from 'react';
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { Card, CardText, Progress } from "reactstrap";
import { makeObservable, observable } from "mobx";
import WordStore from "../../../stores/WordStore";
import UserStore from "../../../stores/UserStore";
import { UserRole } from "../../../Typings/enums/UserRole";
import { observer } from "mobx-react";
import { UserWordViewModel } from "../../../Typings/viewModels/UserWordViewModel";
import AddOrUpdateWord from "./AddOrUpdateWord";


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
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.word.toUpperCase()}
            </div>
        );
    }

    renderPartOfSpeech() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.partOfSpeech}
            </div>
        );
    }

    renderEnglishMeaning() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.englishMeaning}
            </div>
        );
    }

    renderRussianMeaning() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.russianMeaning}
            </div>
        );
    }

    renderControlButtons() {
        return(
            <>
                <div className="row justify-content-center">
                    <p onClick={() => this.handleDelete()}>
                        <i className="fa fa-window-close" aria-hidden="true"/>
                    </p>
                </div>
                <div className="row justify-content-center">
                    <p onClick={() => this.editToggle()}>
                        <i className="fa fa-edit" aria-hidden="true"/>
                    </p>
                </div>
            </>
        );
    }

    renderProgress() {
        return(
            <Progress color="success" value={this.props.userWord.rightAnswers / 0.05}>выучено на {this.computeProgress()} %</Progress>
        )
    }

    renderWordCard() {
        return(
            <Card className="cardWord" body>
                <CardText>
                    <div className="row justify-content-center rowWord">
                        <div className="col-10">
                            <div className="row justify-content-center">
                                {this.renderWord()}
                                {this.renderPartOfSpeech()}
                                {this.renderEnglishMeaning()}
                                {this.renderRussianMeaning()}
                            </div>
                        </div>
                        <div className="col-2">
                            {this.renderControlButtons()}
                        </div>
                    </div>
                </CardText>
                <CardText style={{marginTop: '25px'}}>
                    {this.renderProgress()}
                </CardText>
            </Card>
        );
    }

    render() {
        return(
            <>
                {!this.edit && this.renderWordCard()}
                {this.edit && <AddOrUpdateWord word={this.word} userStore={this.props.userStore} wordStore={this.props.wordStore} addOrUpdateWordToggle={this.editToggle}/>}
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

    editToggle() {
        this.edit = !this.edit;
    }

    computeProgress() {
        let progress = this.props.userWord.rightAnswers / 5 * 100;
        if(progress > 100) {
            progress = 100;
        }
        return progress;
    }
}

export default Word;