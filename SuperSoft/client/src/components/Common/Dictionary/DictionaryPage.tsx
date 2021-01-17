import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Button } from 'reactstrap';
import { makeObservable, observable } from "mobx";
import { UserRole } from "../../../Typings/enums/UserRole";
import Word from "./Word";
import Words from "./Words";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import WordsTrainingPage from "../../User/Dictionary/WordsTrainingPage";

class IDictionaryPageProps {
    store: RootStore;
}

@observer
class DictionaryPage extends Component<IDictionaryPageProps> {
    addNewWord: boolean;
    training: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addNewWord: observable,
            training: observable,
        });
    }

    componentDidMount(): void {
        let role = this.props.store.userStore.currentUser.role;
        this.props.store.wordStore.getDictionary();
        if(role === UserRole.User) {
            let userId = this.props.store.userStore.currentUser.id;
            this.props.store.wordStore.getUserDictionary(userId);
        }
    }

    addNewWordToggle() {
        this.addNewWord = !this.addNewWord;
    }

    trainingToggle() {
        this.training = !this.training;
    }

    renderSearch() {
        return(
            <div className="col-lg-6 col-md-6 col-sm-12">
                <Search />
            </div>
        );
    }

    renderAddNewWordButton() {
        return(
            <div className="col-lg-6 col-md-6 col-sm-12">
                {!this.addNewWord && <Button
                    outline
                    color="primary"
                    onClick={() => this.addNewWordToggle()}>
                    Добавить новое слово
                </Button>}
            </div>
        );
    }

    renderAddNewWordWindow() {
        return(
            <>
                {this.addNewWord && <div className="row justify-content-center">
                    <Word userStore={this.props.store.userStore} userWord={new UserWordViewModel()} wordStore={this.props.store.wordStore}/>
                </div>}
            </>
        );
    }

    renderTrainingButton() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.User) {
            return(
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginTop: 10}}>
                    <Button
                        disabled={false}
                        color="primary trainingButton"
                        onClick={() => this.trainingToggle()}>
                        Тренировка
                    </Button>
                </div>
            );
        }
    }

    renderWordTrainingPage() {
        return(
            <>
                {this.training && <WordsTrainingPage onToggle={this.trainingToggle} wordStore={this.props.store.wordStore} userId={this.props.store.userStore.currentUser.id}/>}
            </>
        );
    }

    renderWords() {
        return(
            <div className="row justify-content-center">
                <div className="col-12">
                    <Words userStore={this.props.store.userStore} wordStore={this.props.store.wordStore}/>
                </div>
            </div>
        )
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {this.renderSearch()}
                    {this.renderAddNewWordButton()}
                    {this.renderTrainingButton()}
                    {this.renderWordTrainingPage()}
                </div>
                {this.renderAddNewWordWindow()}
                {this.renderWords()}
            </div>
        );
    }
}

export default DictionaryPage;