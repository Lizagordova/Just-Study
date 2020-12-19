import React from "react";
import { IUserProps } from "./IUserProps";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { Role } from "../../Typings/enums/Role";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { observer } from "mobx-react";
import {UserReadModel} from "../../Typings/viewModels/UserReadModel";
import {translateRole} from "../../functions/translater";

@observer
export class User extends React.Component<IUserProps> {
    roleDropdownOpen: boolean;
    role: Role;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            roleDropdownOpen: observable,
            role: observable
        });
    }

    componentDidMount(): void {
        this.role = this.props.currentUser.role;
    }

    toggleRoleDropdown() {
        this.roleDropdownOpen = !this.roleDropdownOpen;
    }

    chooseUserRole(role: Role) {
        this.role = role;
    }

    renderRoleDropdown(role: Role) {
        return(
            <Dropdown isOpen={this.roleDropdownOpen} toggle={() => this.toggleRoleDropdown()}>
                <DropdownToggle caret>{translateRole(role)}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Developer)}>{translateRole(Role.Developer)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Tester)}>{translateRole(Role.Tester)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Administrator)}>{translateRole(Role.Administrator)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Accounter)}>{translateRole(Role.Accounter)}</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Marketolog)}>{translateRole(Role.Marketolog)}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderUser(user: UserViewModel) {
        return(
            <tr>
                <th>{user.id}</th>
                <th>{user.firstName} {user.lastName}</th>
                <th>{user.email}</th>
                <th>{this.renderRoleDropdown(this.role)}</th>
                <th>
                    <div className="row justify-content-center">
                        <Button color="success" 
                            className="controlButton"
                            onClick={() => this.updateUser()}>СОХРАНИТЬ</Button>
                    </div>
                    <div className="row justify-content-center">
                        <Button color="danger"
                            className="controlButton"
                            onClick={() => this.deleteUser()}>УДАЛИТЬ</Button>
                    </div>
                </th>
            </tr>
        );
    }

    render() {
        let user = this.props.currentUser;
        return(
            <>{this.renderUser(user)}</>
        );
    }

    updateUser() {
        let currentUser = this.props.currentUser;
        let user = new UserReadModel();
        user.id = currentUser.id;
        user.role = this.role;
        user.firstName = currentUser.firstName;
        user.lastName = currentUser.lastName;
        user.email = currentUser.email;
        this.props.store.userStore.addOrUpdateUser(user);
    }

    deleteUser() {
        this.props.store.userStore.deleteUser(this.props.currentUser.id);
    }
}