import React, { Component } from 'react';
import UserStore from "../../../stores/UserStore";
import { observer } from "mobx-react";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import User from "./User";

class IUsersProps {
    userStore: UserStore;
}

@observer
class Users extends Component<IUsersProps> {
    renderUsers(users: UserViewModel[]) {
        return(
            <>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>Фамилия имя</td>
                        <td>Email</td>
                        <td>Логин</td>
                        <td>Роль</td>
                    </tr>
                </thead>
                {users.map(user => {
                    return(
                        <User user={user} userStore={this.props.userStore} />
                    );
                })}
            </>
        );
    }

    render() {
        let users = this.props.userStore.users;
        return(
            <>
                {this.renderUsers(users)}
            </>
        );
    }
}

export default Users;