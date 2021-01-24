import React, { Component } from 'react';
import UserStore from "../../../stores/UserStore";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { observer } from "mobx-react";
import { makeObservable } from "mobx";
import { Label } from "reactstrap";
import { translateRole } from "../../../functions/translater";
import AddOrUpdateUserWindow from "./AddOrUpdateUserWindow";

class IUserProps {
    userStore: UserStore;
    user: UserViewModel;
}

@observer
class User extends Component<IUserProps> {
    editUser: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            
        })
    }

    renderUser(user: UserViewModel) {
        return(
            <tr onClick={() => this.toggleEditUser()}>
                <td>
                    {this.renderId(user)}
                </td>
                <td>
                    {this.renderNames(user)}
                </td>
                <td>
                    {this.renderEmail(user)}
                </td>
                <td>
                    {this.renderLogin(user)}
                </td>
                <td>
                    {this.renderRole(user)}
                </td>
            </tr>
        );
    }

    renderId(user: UserViewModel) {
        return(
            <Label>
                {user.id}
            </Label>
        );
    }

    renderNames(user: UserViewModel) {
        return(
            <Label>
                {user.firstName} {user.lastName}
            </Label>
        );
    }

    renderEmail(user: UserViewModel) {
        return(
            <Label>
                {user.email}
            </Label>
        );
    }

    renderLogin(user: UserViewModel) {
        return(
            <Label>
                {user.login}
            </Label>
        );
    }

    renderRole(user: UserViewModel) {
        return(
            <Label>
                {translateRole(user.role)}
            </Label>
        );
    }

    renderEditUserWindow() {
        return(
            <AddOrUpdateUserWindow userStore={this.props.userStore} edit={true} userToEdit={this.props.user} />
        );
    }

    render() {
        return(
            <>
                {this.editUser && this.renderEditUserWindow()}
                {!this.editUser && this.renderUser(this.props.user)}
            </>
        );
    }

    toggleEditUser() {
        this.editUser = !this.editUser;
    }
}

export default User;