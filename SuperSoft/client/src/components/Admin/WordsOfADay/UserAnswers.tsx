import React, { Component } from 'react';
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { Accordion } from "react-bootstrap";
import UserAnswer from "./UserAnswer";

class IUserAnswersProps {
    store: RootStore;
    wordId: number;
}

@observer
class UserAnswers extends Component<IUserAnswersProps> {
    renderUsers(users: UserViewModel[]) {
        return(
            <Accordion defaultActiveKey="0">
                {users.map((user) => {
                    return <UserAnswer user={user} store={this.props.store} wordId={this.props.wordId}/>
                })}
            </Accordion>
        );
    }

    render() {
        let users = this.getUsers();
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {this.renderUsers(users)}
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
}

export default UserAnswers;