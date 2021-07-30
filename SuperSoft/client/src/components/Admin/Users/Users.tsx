import React, { Component } from 'react';
import UserStore from "../../../stores/UserStore";
import { observer } from "mobx-react";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import User from "./User";
import { Table } from "reactstrap";
import {toJS} from "mobx";

class IUsersProps {
    userStore: UserStore;
}

@observer
class Users extends Component<IUsersProps> {
    renderUsers(users: UserViewModel[]) {
        return(
            <Table>
                <thead>
                    <tr>
                        <td>Id</td>
                        <td>ФИО</td>
                        <td>Email</td>
                        <td>Логин</td>
                        <td>Роль</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return(
                        <User user={user} userStore={this.props.userStore} key={user.id}/>
                    );
                })}
                </tbody>
            </Table>
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