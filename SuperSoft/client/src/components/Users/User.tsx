import React from "react";
import { IUserProps } from "./IUserProps";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { Role } from "../../Typings/enums/Role";
import {UserViewModel} from "../../Typings/viewModels/UserViewModel";

export class User extends React.Component<IUserProps> {
    roleDropdownOpen: boolean;
    role: Role;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            roleDropdownOpen: observable
        });
        this.role = Role.Developer;
    }

    toggleRoleDropdown() {
        this.roleDropdownOpen = !this.roleDropdownOpen;
    }

    chooseUserRole(role: Role) {
        this.role = role;
    }

    renderRoleDropdown() {
        let rolesEnum = Role;
        return(
            <Dropdown isOpen={this.roleDropdownOpen} toggle={() => this.toggleRoleDropdown()}>
                <DropdownToggle caret>Разработчик</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Developer)}>Разработчик</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Tester)}>Тестировщик</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Accounter)}>Бухгалтер</DropdownItem>
                    <DropdownItem onClick={() => this.chooseUserRole(Role.Marketolog)}>Маркетолог</DropdownItem>
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
                <th>{this.renderRoleDropdown()}</th>
            </tr>
        );
    }

    render() {
        let user = this.props.currentUser;
        return(
            <>{this.renderUser(user)}</>
        );
    }
}