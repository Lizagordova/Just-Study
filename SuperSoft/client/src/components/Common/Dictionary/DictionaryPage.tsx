import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Button } from 'reactstrap';
import { makeObservable, observable } from "mobx";
import { UserRole } from "../../../Typings/enums/UserRole";
import Words from "./Words";
import WordsTrainingPage from "../../User/Dictionary/WordsTrainingPage";
import Search from "./Search";
import "../../../styles/dictionary.css";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import AddOrUpdateWord from "./AddOrUpdateWord";

class IDictionaryPageProps {
    store: RootStore;
}

@observer
class DictionaryPage extends Component<IDictionaryPageProps> {
    addNewWord: boolean;
    training: boolean;
    searchAllowed: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addNewWord: observable,
            training: observable,
            searchAllowed: observable
        });
    }

    componentWillMount(): void {
        let role = this.props.store.userStore.currentUser.role;
        this.props.store.wordStore.getDictionary()
            .then(() => {
                this.searchAllowed = true;
                if(role === UserRole.User) {
                    let userId = this.props.store.userStore.currentUser.id;
                    this.props.store.wordStore.getUserDictionary(userId);
                }
            });
    }

    addNewWordToggle = () => {
        this.addNewWord = !this.addNewWord;
    };

    trainingToggle = () => {
        this.training = !this.training;
    };

    renderSearch() {
        return(
            <div className="col-lg-6 col-md-6 col-sm-12" style={{marginTop: "10px"}}>
                <Search wordStore={this.props.store.wordStore} user={this.props.store.userStore.currentUser} />
            </div>
        );
    }

    renderAddNewWordButton() {
        return(
            <div className="col-lg-6 col-md-6 col-sm-12" style={{marginTop: "10px", marginBottom: "10px"}}>
                <Button
                    outline
                    className="addNewWordButton"
                    onClick={() => this.addNewWordToggle()}>
                    Добавить новое слово
                </Button>
            </div>
        );
    }

    renderAddNewWordWindow() {
        return(
            <>
                {this.addNewWord && <div className="row justify-content-center">
                    <AddOrUpdateWord word={new WordViewModel()} wordStore={this.props.store.wordStore} cancelEdit={this.addNewWordToggle} courseId={undefined} currentUser={this.props.store.userStore.currentUser} date={undefined} isWordOfADay={false}/>
                </div>}
            </>
        );
    }

    renderTrainingButton() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.User) {
            return(
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginTop: 10, marginBottom: 10}}>
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
                    {this.searchAllowed && this.renderSearch()}
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