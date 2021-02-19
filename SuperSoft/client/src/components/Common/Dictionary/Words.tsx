import React, { Component } from 'react';
import { makeObservable } from "mobx";
import UserStore from "../../../stores/UserStore";
import WordStore from "../../../stores/WordStore";
import { UserRole } from "../../../Typings/enums/UserRole";
import { UserWordViewModel } from "../../../Typings/viewModels/UserWordViewModel";
import Word from "./Word";
import { observer } from "mobx-react";

class IWordsProps {
    userStore: UserStore;
    wordStore: WordStore;
}

@observer
class Words extends Component<IWordsProps> {
    getUserWords(): UserWordViewModel[] {
        let role = this.props.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return this.props.wordStore.dictionary.map(word => {
                let userWord = new UserWordViewModel();
                userWord.wordId = word.id;
                return userWord;
            });
        } else {
            return this.props.wordStore.userDictionary;
        }
    }

    renderWords() {
        let userWords = this.getUserWords();
        return(
            <>
                {userWords.map((userWord, i) => {
                    return (
                        <Word userWord={userWord} wordStore={this.props.wordStore} userStore={this.props.userStore} key={i}/>
                    )
                })}
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderWords()}
            </>
        );
    }
}

export default Words;