import React, {Component} from 'react';
import UserStore from "../../../stores/UserStore";
import WordStore from "../../../stores/WordStore";
import {UserRole} from "../../../Typings/enums/UserRole";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import Word from "./Word";
import {observer} from "mobx-react";
import {Alert, Table} from "reactstrap";
import {isThatUserRole} from "../../../functions/isThatUserRole";

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

    renderCautions() {
        let role = this.props.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
                <Alert color="primary" style={{marginTop: "0px"}}> В словарике пока нет слов</Alert>
            );
        } else {
            return(
                <Alert color="primary" style={{marginTop: "10px"}}> В вашем словарике пока нет слов. Вы можете добавить слова из общего словарика.</Alert>
            );
        }
    }

    renderWords() {
        let userWords = this.getUserWords();
        if(userWords.length === 0) {
            return (
                <>
                    {this.renderCautions()}
                </>
            );
        } else {
            return(
                <Table cellpadding="0" cellspacing="0">
                    <thead>
                        <tr>
                            <td>Слово</td>
                            <td>Часть речи</td>
                            <td>Значение</td>
                            {isThatUserRole(this.props.userStore, UserRole.Admin) && <th>Контролы</th>}
                        </tr>
                    </thead>
                    <tbody>
                    {userWords.map((userWord, i) => {
                        return (
                            <Word userWord={userWord} wordStore={this.props.wordStore} userStore={this.props.userStore} key={i}/>
                        );
                    })}
                    </tbody>
                </Table>
            );
        }
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