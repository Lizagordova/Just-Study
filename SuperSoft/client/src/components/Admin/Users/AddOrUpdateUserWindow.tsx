import React, { Component } from 'react';
import UserStore from "../../../stores/UserStore";
import { makeObservable, observable } from "mobx";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input } from "reactstrap";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { UserRole } from "../../../Typings/enums/UserRole";

class IAddOrUpdateUserProps {
    userStore: UserStore;
    edit: boolean = false;
    userToEdit: UserViewModel;
}

class AddOrUpdateUserWindow extends Component<IAddOrUpdateUserProps> {
    addOrUpdateUserOpen: boolean;
    user: UserViewModel = new UserViewModel();
    notSaved: boolean;
    roleMenuOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addOrUpdateUserOpen: observable,
            user: observable,
            notSaved: observable,
            roleMenuOpen: observable,
        });
    }

    componentDidMount(): void {
        if(this.props.edit) {
            this.user = this.props.userToEdit;
            this.addOrUpdateUserOpen = true;
        }
    }

    renderAddUserButton() {
        return (
            <Button onClick={() => this.toggleAddUser()}>
                Добавить пользователя
            </Button>
        );
    }

    renderFirstNameInput(user: UserViewModel) {
        return(
            <Input
                placeholder="Имя"
                value={user.firstName}
                onChange={(e) => this.inputData(e, "firstName")}/>
        );
    }

    renderLastNameInput(user: UserViewModel) {
        return(
            <Input
                placeholder="Фамилия"
                value={user.lastName}
                onChange={(e) => this.inputData(e, "lastName")}/>
        );
    }

    renderEmailInput(user: UserViewModel) {
        return(
            <Input
                placeholder="E-mail"
                value={user.email}
                onChange={(e) => this.inputData(e, "email")}/>
        );
    }

    renderLoginInput(user: UserViewModel) {
        return(
            <Input
                placeholder="E-mail"
                value={user.login}
                onChange={(e) => this.inputData(e, "login")}/>
        );
    }

    renderRole(user: UserViewModel) {
        return(
            <Dropdown isOpen={this.roleMenuOpen} toggle={() => this.toggleRoleMenu()}>
                <DropdownToggle caret>
                    {user.role}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="1" onClick={() => this.roleChange(UserRole.Admin)}>Учитель</DropdownItem>
                    <DropdownItem id="2" onClick={() => this.roleChange(UserRole.User)}>Ученик</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderSaveUserButton() {
        return(
            <Button>
                Сохранить
            </Button>
        );
    }

    renderBody(user: UserViewModel) {
        return(
            <>
                <ModalBody>
                    {this.notSaved && <Alert color="danger">Что-то пошло не так и урок не сохранилось</Alert>}
                    <div className="row justify-content-center">
                        {this.renderFirstNameInput(user)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderLastNameInput(user)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderEmailInput(user)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderLoginInput(user)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderRole(user)}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {this.renderSaveUserButton()}
                </ModalFooter>
            </>
        );
    }

    renderCancelButton() {
        return(
            <Button
                color="primary"
                onClick={() => this.toggleAddUser()}>
                ОТМЕНИТЬ
            </Button>
        );
    }

    renderAddOrUpdateUserWindow() {
        return(
            <Modal
                centered={true}
                size="lg"
                isOpen={this.addOrUpdateUserOpen}
                toggle={() => this.toggleAddUser()}
            >
                <ModalHeader>
                    ПОЛЬЗОВАТЕЛЬ
                </ModalHeader>
                {this.renderBody(this.user)}
                {this.renderCancelButton()}
            </Modal>
        );
    }

    render() {
        return(
            <>
                {!this.addOrUpdateUserOpen && this.renderAddUserButton()}
                {this.addOrUpdateUserOpen && this.renderAddOrUpdateUserWindow()}
            </>
        );
    }

    toggleAddUser() {
        this.addOrUpdateUserOpen = !this.addOrUpdateUserOpen;
    }

    toggleRoleMenu() {
        this.roleMenuOpen = !this.roleMenuOpen;
    }

    inputData(event: React.FormEvent<HTMLInputElement>, type: string) {
        if(type === "firstName") {
            this.user.firstName = event.currentTarget.value;
        } else if(type === "lastName") {
            this.user.lastName = event.currentTarget.value;
        } else if(type === "email") {
            this.user.email = event.currentTarget.value;
        } else if(type === "login") {
            this.user.login = event.currentTarget.value;
        }
    }

    roleChange(role: UserRole) {
        this.user.role = role;
    }

    save() {
        this.props.userStore.addOrUpdateUser(this.user)
            .then((status) => {
                this.notSaved = status !== 200;
                this.addOrUpdateUserOpen = status !== 200;
            })
    }
}

export default AddOrUpdateUserWindow;