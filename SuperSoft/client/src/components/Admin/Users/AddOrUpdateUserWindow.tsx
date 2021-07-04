import React, {Component} from 'react';
import UserStore from "../../../stores/UserStore";
import { makeObservable, observable } from "mobx";
import {
    Alert,
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { UserRole } from "../../../Typings/enums/UserRole";
import { mapToUserReadModel } from "../../../functions/mapper";
import { observer } from "mobx-react";
import { translateRole } from "../../../functions/translater";

class IAddOrUpdateUserProps {
    userStore: UserStore;
    edit: boolean = false;
    userToEdit: UserViewModel;
    cancelEdit: any | undefined;
}

@observer
class AddOrUpdateUserWindow extends Component<IAddOrUpdateUserProps> {
    addOrUpdateUserOpen: boolean = false;
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
        this.user.role = this.user.role === undefined ? UserRole.User : this.user.role;
    }

    renderAddUserButton() {
        return (
            <Button
                outline
                className="addUserButton"
                style={{color: "black", borderColor: "black"}}
                onClick={() => this.toggleAddUser()}>
                Добавить пользователя
            </Button>
        );
    }

    renderFirstNameInput(user: UserViewModel) {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Имя
                </Label>
                <Input
                    style={{width: "70%"}}
                    placeholder="Имя"
                    value={user.firstName}
                    onChange={(e) => this.inputData(e, "firstName")}/>
           </>
        );
    }

    renderLastNameInput(user: UserViewModel) {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Фамилия
                </Label>
            <Input
                style={{width: "70%"}}
                placeholder="Фамилия"
                value={user.lastName}
                onChange={(e) => this.inputData(e, "lastName")}/>
            </>
        );
    }

    renderEmailInput(user: UserViewModel) {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Email
                </Label>
                <Input
                    style={{width: "70%"}}
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => this.inputData(e, "email")}/>
            </>
        );
    }

    renderLoginInput(user: UserViewModel) {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Логин
                </Label>
                <Input
                    style={{width: "70%"}}
                    placeholder="Логин"
                    value={user.login}
                    onChange={(e) => this.inputData(e, "login")}/>
            </>
        );
    }

    renderRole(user: UserViewModel) {
        return(
            <Dropdown style={{marginTop: "7px", opacity: ".7"}} isOpen={this.roleMenuOpen} toggle={() => this.toggleRoleMenu()}>
                <DropdownToggle caret>
                    {translateRole(user.role)}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="1" onClick={() => this.roleChange(UserRole.Admin)}>{translateRole(UserRole.Admin)}</DropdownItem>
                    <DropdownItem id="2" onClick={() => this.roleChange(UserRole.User)}>{translateRole(UserRole.User)}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderSaveUserButton() {
        return(
            <Button
                outline color="success"
                style={{width: "80%", marginBottom: "10px"}}
                onClick={() => this.save()}>
                Сохранить
            </Button>
        );
    }

    renderCautions() {
        setTimeout(() => {
            this.notSaved = false;
        }, 6000);
        return (
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и пользователь не сохранился :(</Alert>}
            </>
        );
    }

    renderBody(user: UserViewModel) {
        return(
            <>
                <ModalBody>
                    {this.renderCautions()}
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
                <div className="row justify-content-center">
                    {this.renderSaveUserButton()}
                </div>
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
                <div className="row justify-content-center">
                    Пользователь
                </div>
                {this.renderBody(this.user)}
                {this.renderCancelButton()}
            </Modal>
        );
    }

    render() {
        return(
            <>
                {!this.props.edit && this.renderAddUserButton()}
                {this.addOrUpdateUserOpen && this.renderAddOrUpdateUserWindow()}
            </>
        );
    }

    toggleAddUser() {
        if(this.props.cancelEdit !== undefined) {
            this.props.cancelEdit();
        }
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
        let userReadModel = mapToUserReadModel(this.user);
        this.props.userStore.addOrUpdateUser(userReadModel)
            .then((status) => {
                this.notSaved = status !== 200;
                if(status === 200) {
                    this.toggleAddUser();
                }
            });
    }
}

export default AddOrUpdateUserWindow;