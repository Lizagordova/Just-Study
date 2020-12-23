import React from "react";
import RootStore from "../../stores/RootStore";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert
} from "reactstrap";
import { ProjectRole } from "../../Typings/enums/ProjectRole";
import { translateProjectRole } from "../../functions/translater";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";

export interface IAddUserToProjectProps {
    store: RootStore;
}

@observer
export class AddUserToProject extends React.Component<IAddUserToProjectProps> {
    addUserToProjectWindowOpen: boolean;
    roleDropdownOpen: boolean;
    usersDropdownOpen: boolean;
    choosenUser: UserViewModel;
    role: ProjectRole = ProjectRole.Head;
    notAttached: boolean;

    componentDidMount(): void {
        this.choosenUser = this.props.store.userStore.users[0];
    }

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addUserToProjectWindowOpen: observable,
            usersDropdownOpen: observable,
            roleDropdownOpen: observable
        })
    }

    toggleWindow() {
        this.addUserToProjectWindowOpen = !this.addUserToProjectWindowOpen;
    }

    toggleUserDropdown() {
        this.usersDropdownOpen = !this.usersDropdownOpen;
    }

    toggleRoleDropdown() {
        this.roleDropdownOpen = !this.roleDropdownOpen;
    }

    renderAddUserToProjectWindow() {
        let users = this.props.store.userStore.users;
        let choosenUser = this.choosenUser;
        return(
            <Modal
                style={{backgroundColor: "#003b46", color: "#003b46", fontSize: "1.4em"}}
                isOpen={this.addUserToProjectWindowOpen}
                toggle={() => this.toggleWindow()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                   onClick={() => this.toggleWindow()}/>
                {this.notAttached && <Alert color="primary">Что-то пошло не так и пользователь не прикрепился :(</Alert>}
                <ModalHeader>ПРИКРЕПЛЕНИЕ ПОЛЬЗОВАТЕЛЯ</ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-6">
                            <Dropdown isOpen={this.usersDropdownOpen} toggle={() => this.toggleUserDropdown()}>
                                <DropdownToggle tag="a" className="nav-link" caret>{choosenUser !== undefined ? `${choosenUser.firstName} ${choosenUser.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                                <DropdownMenu>
                                    {users.map((user, index) => {
                                        return(
                                            <>
                                                {<DropdownItem onClick={() => this.choosenUser = user}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                            </>
                                        );
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="col-lg-6 col-sm-6">
                            <Dropdown isOpen={this.roleDropdownOpen} toggle={() => this.toggleRoleDropdown()}>
                                <DropdownToggle tag="a" className="nav-link" caret>{translateProjectRole(this.role)}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => this.role = ProjectRole.Head}>{translateProjectRole(ProjectRole.Head)}</DropdownItem>
                                    <DropdownItem onClick={() => this.role = ProjectRole.Executor}>{translateProjectRole(ProjectRole.Executor)}</DropdownItem>
                                    <DropdownItem onClick={() => this.role = ProjectRole.Developer}>{translateProjectRole(ProjectRole.Developer)}</DropdownItem>
                                    <DropdownItem onClick={() => this.role = ProjectRole.Tester}>{translateProjectRole(ProjectRole.Tester)}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.attach()}
                    >
                        Прикрепить
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    renderButton() {
        return(
            <div className="row justify-content-center" style={{marginTop: "5%"}}>
                <Button
                    style={{width: "80%", borderColor: "#66A5AD", color: "#66A5AD", backgroundColor: "#fff"}}
                    onClick={() => this.toggleWindow()}>Прикрепить участников</Button>
            </div>
        );
    }

    render() {
        return(
            <>
                {!this.addUserToProjectWindowOpen && this.renderButton()}
                {this.addUserToProjectWindowOpen && this.renderAddUserToProjectWindow()}
            </>
        );
    }

    attach() {
        this.props.store.projectStore.attachUserToProject(this.props.store.projectStore.choosenProject.id, this.choosenUser.id, this.role)
            .then((status) => {
                if(status === 200) {
                    this.props.store.projectStore.getProjectUsers(this.props.store.projectStore.choosenProject.id);
                    this.addUserToProjectWindowOpen = false;
                    this.notAttached = false;
                } else {
                    this.notAttached = true;
                }
            });
    }
}