﻿import React, {Component} from 'react';
import RootStore from "../../../stores/RootStore";
import {observer} from "mobx-react";
import {Button} from 'reactstrap';
import {makeObservable, observable} from "mobx";
import {UserRole} from "../../../Typings/enums/UserRole";

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
                    <Word addOrUpdate={true} onAddOrUpdate={this.changingWord} onClose={this.addNewWordToggle}/>
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

    renderWords() {
        return(
            <div className="row justify-content-center">
                <div className="col-12">
                    <Words onDelete={this.changingWord} onAddOrUpdate={this.changingWord}/>
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
                </div>
                {this.renderAddNewWordWindow()}
                {this.renderWords()}
            </div>
        );
    }
}

export default DictionaryPage;