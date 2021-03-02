import React, { Component } from 'react';
import UserStore from "../../../stores/UserStore";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Label } from "reactstrap";
import { translateRole } from "../../../functions/translater";
import AddOrUpdateUserWindow from "./AddOrUpdateUserWindow";
import { Alert } from "reactstrap";

class IUserProps {
    userStore: UserStore;
    user: UserViewModel;
}

@observer
class User extends Component<IUserProps> {
    editUser: boolean;
    notDeleted: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            editUser: observable,
            notDeleted: observable
        });
    }

    renderUser(user: UserViewModel) {
        return(
            <tr>
                <td onClick={() => this.toggleEditUser()}>
                    {this.renderId(user)}
                </td>
                <td onClick={() => this.toggleEditUser()}>
                    {this.renderNames(user)}
                </td>
                <td onClick={() => this.toggleEditUser()}>
                    {this.renderEmail(user)}
                </td>
                <td onClick={() => this.toggleEditUser()}>
                    {this.renderLogin(user)}
                </td>
                <td onClick={() => this.toggleEditUser()}>
                    {this.renderRole(user)}
                </td>
                <td>
                    <i
                       onClick={() => this.deleteUser()}
                       className="fa fa-window-close" aria-hidden="true"/>
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
            <AddOrUpdateUserWindow userStore={this.props.userStore} edit={true} userToEdit={this.props.user} cancelEdit={this.toggleEditUser}/>
        );
    }

    renderCautions() {
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return (
            <>
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и не удалось удалить пользователя :(</Alert>}
            </>
        );
    }

    render() {
        return(
            <>
                {this.editUser && this.renderEditUserWindow()}
                {this.renderUser(this.props.user)}
            </>
        );
    }

    toggleEditUser = () => {
        this.editUser = !this.editUser;
    };

    deleteUser() {
        let user = this.props.user;
        let result = window.confirm(`Вы уверены, что хотите удалить ${user.firstName} ${user.lastName}?`);
        if(result) {
            this.props.userStore
                .deleteUser(user.id)
                .then((status) => {
                    this.notDeleted = status !== 200;
                });
        }
    }
}

export default User;