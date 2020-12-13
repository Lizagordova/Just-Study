import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Button, Modal, ModalHeader, ModalBody, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";

@observer
export class AddProject extends React.Component<IProjectsProps> {
    addProjectWindowOpen: boolean;
    projectName: string | undefined;
    description: string | undefined;
    responsibleDropdownOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addProjectWindowOpen: observable
        });
    }

    toggleAddProjectWindow() {
        this.addProjectWindowOpen = !this.addProjectWindowOpen;
    }

    toggleResponsibleDropdownOpen() {
        this.responsibleDropdownOpen = !this.responsibleDropdownOpen;
    }

    renderAddProjectWindow() {
        let users = this.props.store.userStore.users;
        return(
            <Modal isOpen={this.addProjectWindowOpen} toggle={this.toggleAddProjectWindow}>
                <ModalHeader>
                    СОЗДАНИЕ ПРОЕКТА
                </ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <label>Название проекта</label>
                        <Input onChange={(e) => this.inputProjectName(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <label>Описание проекта</label>
                        <Input onChange={(e) => this.inputDescription(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-12">
                            <label>Дата начала</label>
                            <Input onChange={(e) => this.inputProjectName(e)}/>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <label>Дедлайн</label>
                            <Input onChange={(e) => this.inputProjectName(e)}/>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <label>Ответственный</label>
                        <Dropdown isOpen={this.responsibleDropdownOpen} toggle={this.toggleResponsibleDropdownOpen}>
                            <DropdownToggle/>
                            <DropdownMenu>
                                {users.map((user, index) => {
                                    return(
                                        <>
                                            {index === 0 && <DropdownItem key={index} header>{user.firstName + " " + user.lastName}</DropdownItem>}
                                            {index !== 0 && <DropdownItem key={index}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                        </>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ModalBody>
            </Modal>
        )
    }

    renderButton() {
        return(
            <div className="row justify-content-center">
                <div className="col-lg-2 col-lg-offset-10 col-md-4 col-md-offset-8 col-sm-6 col-sm-offet-3 col-xs-12">
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={this.toggleAddProjectWindow}>Создать проект</Button>
                </div>
            </div>
        )
    }

    render() {
        return(
            <>
                {this.addProjectWindowOpen && this.renderAddProjectWindow()}
                {!this.addProjectWindowOpen && this.renderButton()}
            </>
        )
    }

    inputProjectName(event: React.FormEvent<HTMLInputElement>) {
        this.projectName = event.currentTarget.value;
        console.log("this", this);
    }

    inputDescription(event: React.FormEvent<HTMLInputElement>) {
        this.description = event.currentTarget.value;
    }
}