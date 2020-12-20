import React from "react";
import RootStore from "../../stores/RootStore";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { Button, Navbar, Nav, NavItem, NavLink, Modal, ModalBody, ModalHeader, ModalFooter, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { ProjectRole } from "../../Typings/enums/ProjectRole";

export interface IAddUserToProjectProps {
    store: RootStore;
}

@observer
export class AddUserToProject extends React.Component<IAddUserToProjectProps> {
    addUserToProjectWindowOpen: boolean;
    roleDropdownOpen: boolean;
    usersDropdownOpen: boolean;
    choosenUser: number;
    role: ProjectRole;

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
        let user = users[0];
        return(
            <Modal
                style={{backgroundColor: "#003b46", color: "#003b46", fontSize: "1.4em"}}
                isOpen={this.addUserToProjectWindowOpen}
                toggle={() => this.toggleWindow()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                   onClick={() => this.toggleWindow()}/>
                <ModalHeader>ПРИКРЕПЛЕНИЕ ПОЛЬЗОВАТЕЛЯ</ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-12">
                            <Dropdown isOpen={this.usersDropdownOpen} toggle={() => this.toggleUserDropdown()}>
                                <DropdownToggle tag="a" className="nav-link" caret>{user !== undefined ? `${user.firstName} ${user.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                                <DropdownMenu>
                                    {users.map((user, index) => {
                                        return(
                                            <>
                                                {<DropdownItem key={index} onClick={() => this.choosenUser = user.id}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                            </>
                                        );
                                    })}
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Dropdown isOpen={this.roleDropdownOpen} toggle={() => this.toggleRoleDropdown()}>
                                <DropdownToggle>{user !== undefined ? `${user.firstName} ${user.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => console.log("")}>{user.firstName + " " + user.lastName}</DropdownItem>
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
                    style={{backgroundColor: "#66A5AD", width: "100%"}}
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
        this.props.store.projectStore.attachUserToProject(this.props.store.projectStore.choosenProject.id, this.choosenUser, this.role);
    }
}