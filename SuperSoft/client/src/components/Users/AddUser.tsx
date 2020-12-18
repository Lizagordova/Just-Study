import React from "react";
import { IUsersProps } from "./IUsersProps";
import {makeObservable, observable} from "mobx";
import { Button, Dropdown, DropdownMenu, DropdownToggle, DropdownItem, Input, Label } from "reactstrap";
import {Alert, Modal} from "react-bootstrap";
import { Role } from "../../Typings/enums/Role";
import { observer } from "mobx-react";
import {UserReadModel} from "../../Typings/viewModels/UserReadModel";

@observer
export class AddUser extends React.Component<IUsersProps>{
    addUserWindowOpen: boolean;
    firstName: string;
    lastName: string;
    email: string;
    roleDropdownOpen: boolean;
    role: Role;
    notSaved: boolean;
    saved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addUserWindowOpen: observable
        });
        this.role = Role.Developer;
    }

    toggleAddUserWindow() {
        this.addUserWindowOpen = !this.addUserWindowOpen;
    }

    toggleRoleDropdown() {
        this.roleDropdownOpen = !this.roleDropdownOpen;
    }

    renderButton() {
        return(
            <div className="row justify-content-center">
                <div className="col-lg-2 col-lg-offset-10 col-md-4 col-md-offset-8 col-sm-6 col-sm-offet-3 col-xs-12">
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.toggleAddUserWindow()}>Добавить пользователя</Button>
                </div>
            </div>
        );
    }

    renderRoleDropdown() {
        return(
            <Dropdown isOpen={this.roleDropdownOpen} toggle={() => this.toggleRoleDropdown()}>
                <DropdownToggle caret>Разработчик</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.chooseRole(Role.Developer)}>Разработчик</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Tester)}>Тестировщик</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Accounter)}>Бухгалтер</DropdownItem>
                    <DropdownItem onClick={() => this.chooseRole(Role.Marketolog)}>Маркетолог</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderAddUserWindow() {
        return(
            <Modal
                isOpen={this.addUserWindowOpen}>
                <Modal.Header closeButton>ДОБАВЛЕНИЕ НОВОГО ПОЛЬЗОВАТЕЛЯ</Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Имя</Label>
                            <Input onChange={(e) => this.inputFirstName(e)}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                            <Label>Фамилия</Label>
                            <Input onChange={(e) => this.inputLastName(e)}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            <Label>Email</Label>
                            <Input onChange={(e) => this.inputEmail(e)}/>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                            {this.renderRoleDropdown()}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.saveUser()}>
                        СОХРАНИТЬ
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    render() {
        return(
            <>
                {this.addUserWindowOpen && this.renderAddUserWindow()}
                {!this.addUserWindowOpen && this.renderButton()}
                {this.saved && <Alert>Всё успешно сохранилось!</Alert>}
                {this.notSaved && <Alert>Что-то пошло не так и пользователь не сохранился!</Alert>}
            </>
        );
    }

    inputFirstName(event: React.FormEvent<HTMLInputElement>): void {
        this.firstName = event.currentTarget.value;
    }

    inputLastName(event: React.FormEvent<HTMLInputElement>): void {
        this.lastName = event.currentTarget.value;
    }

    inputEmail(event: React.FormEvent<HTMLInputElement>): void {
        this.email = event.currentTarget.value;
    }

    chooseRole(role: Role) {
        this.role = role;
    }

    saveUser() {
        let user = new UserReadModel();
        user.firstName = this.firstName;
        user.lastName = this.lastName;
        user.email = this.email;
        user.role = this.role;
        this.props.store.userStore.addOrUpdateUser(user)
            .then(status => {
                if(status !== 200) {
                    this.notSaved = true;
                } else {
                    this.notSaved = false;
                    this.saved = true;
                }
            });
    }
}