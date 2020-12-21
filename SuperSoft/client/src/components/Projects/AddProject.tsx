import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu, Label } from "reactstrap";
import Calendar from "react-calendar";

@observer
export class AddProject extends React.Component<IProjectsProps> {
    addProjectWindowOpen: boolean;
    projectName: string = "";
    description: string = "";
    responsibleDropdownOpen: boolean;
    startDate: Date = new Date();
    deadline: Date = new Date();
    responsiblePerson: number = 0;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addProjectWindowOpen: observable,
            projectName: observable,
            description: observable,
            responsibleDropdownOpen: observable,
            startDate: observable,
            deadline: observable,
            responsiblePerson: observable
        });
    }

    toggleAddProjectWindow() {
        this.addProjectWindowOpen = !this.addProjectWindowOpen;
    }

    toggleResponsibleDropdown() {
        this.responsibleDropdownOpen = !this.responsibleDropdownOpen;
    }

    renderAddProjectWindow() {
        let users = this.props.store.userStore.users;
        let user = users[0];
        return(
            <Modal isOpen={this.addProjectWindowOpen} toggle={() => this.toggleAddProjectWindow()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                   onClick={() => this.toggleAddProjectWindow()}/>
                <ModalHeader>
                    СОЗДАНИЕ ПРОЕКТА
                </ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <Label style={{width: "100%"}} align="center">Название проекта</Label>
                        <Input style={{width: "90%"}} onChange={(e) => this.inputProjectName(e)}/>
                    </div>
                    <div className="row justify-content-center" style={{marginTop: "10px"}}>
                        <Label style={{width: "100%"}} align="center">Описание проекта</Label>
                        <textarea style={{width: "90%"}} onChange={(e) => this.inputDescription(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-12">
                            <Label style={{width: "100%"}} align="center">Дата начала</Label>
                            <div style={{width: "100%", paddingLeft: "15%"}}>
                                <Calendar
                                    value={this.startDate}
                                    onChange={(date) => this.inputDate(date, "startDate")}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label style={{width: "100%"}} align="center">Дедлайн</Label>
                            <div style={{width: "100%", paddingLeft: "15%"}}>
                                <Calendar
                                    value={this.deadline}
                                    onChange={(date) => this.inputDate(date, "deadline")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <Label style={{width: "100%"}} align="center">Ответственный</Label>
                        <Dropdown isOpen={this.responsibleDropdownOpen} toggle={() => this.toggleResponsibleDropdown()}>
                            <DropdownToggle tag="a" className="nav-link" caret>{user !== undefined ? `${user.firstName} ${user.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                            <DropdownMenu>
                                {users.map((user, index) => {
                                    return(
                                        <>
                                            {index === 0 && <DropdownItem key={index} header onClick={() => this.chooseResponsiblePerson(user.id)}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                            {index !== 0 && <DropdownItem key={index} onClick={() => this.chooseResponsiblePerson(user.id)}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                        </>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.saveProject()}>
                        СОХРАНИТЬ
                    </Button>
                </ModalFooter>
            </Modal>
        )
    }

    renderButton() {
        return(
            <>
                <div className="col-6"/>
                <div className="col-6">
                    <Button
                        style={{width: "100%", borderColor: "#66A5AD", color: "#66A5AD", backgroundColor: "#fff"}}
                        onClick={() => this.toggleAddProjectWindow()}>Создать проект</Button>
                </div>
            </>
        );
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
    }

    inputDescription(event: React.FormEvent<HTMLTextAreaElement>) {
        this.description = event.currentTarget.value;
    }

    inputDate(date: Date, dateType: string) {
        if(dateType === "startDate") {
            this.startDate = date;
        } else if(dateType === "deadline") {
            this.deadline = date;
        }
    }

    chooseResponsiblePerson(userId: number) {
        this.responsiblePerson = userId;
    }

    saveProject() {
        this.props.store.projectStore
            .addNewProject(this.projectName, this.description, this.startDate, this.deadline, this.responsiblePerson);
}
}