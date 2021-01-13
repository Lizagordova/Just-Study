import React, { Component } from 'react';
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { Card, CardText } from "reactstrap";
import { makeObservable, observable } from "mobx";
import WordStore from "../../../stores/WordStore";
import UserStore from "../../../stores/UserStore";
import { UserRole } from "../../../Typings/enums/UserRole";
import { observer } from "mobx-react";


class IWordProps {
    word: WordViewModel;
    wordStore: WordStore;
    userStore: UserStore;
}

@observer
class Word extends Component<IWordProps> {
    word: WordViewModel;
    notDeleted: boolean;
    edit: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable,
            notDeleted: observable,
            edit: observable
        });
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
            </Card>
        );
    }

    render() {
        return(
            <>
                {this.renderWordCard()}
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
}

export default Word;