import React, { Component } from 'react';
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { Accordion } from "react-bootstrap";
import UserAnswer from "./UserAnswer";
import { UserWordViewModel } from "../../../Typings/viewModels/UserWordViewModel";
import {makeObservable, observable, toJS} from "mobx";
import {renderSpinner} from "../../../functions/renderSpinner";

class IUserAnswersProps {
    store: RootStore;
    wordId: number;
}

@observer
class UserAnswers extends Component<IUserAnswersProps> {
    userWords: UserWordViewModel[] = new Array<UserWordViewModel>();
    loaded: boolean = false;

    constructor() {
        //@ts-ignore
        super();
        makeObservable(this, {
            userWords: observable,
            loaded: observable
        });
    }

    componentDidMount(): void {
        this.getUserWords();
    }

    renderUsers(users: UserViewModel[]) {
        return(
            <Accordion defaultActiveKey="0">
                {users.map((user) => {
                    let userWord = this.getUserWord(user.id);
                    if(userWord.userId !== this.props.store.userStore.currentUser.id) {
                        return <UserAnswer user={user} store={this.props.store} userWord={userWord}/>
                    }
                })}
            </Accordion>
        );
    }

    render() {
        let users = this.getUsers();
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {this.loaded && this.renderUsers(users)}
                {!this.loaded && renderSpinner()}
            </div>
        );
    }

    getUsers(): UserViewModel[] {
        let usersByCourse = this.props.store.courseStore.usersByCourse;
        return this.props.store.userStore.users
            .filter(u => usersByCourse
                .map(uc => uc.userId)
                .includes(u.id));
    }

    getUserWords() {
        this.props.store.wordStore.getAnswersToWordOfADayByWord(this.props.wordId, this.props.store.courseStore.choosenCourse.id)
            .then((userWords) => {
                this.userWords = userWords;
                this.loaded = true;
            });
    }

    getUserWord(userId: number): UserWordViewModel {
        let userWord = this.userWords.filter(uw => uw.userId === userId)[0];
        if(userWord === undefined) {
            userWord = new UserWordViewModel();
            userWord.userId = userId;
        }
        
        return userWord;
    }
}

export default UserAnswers;