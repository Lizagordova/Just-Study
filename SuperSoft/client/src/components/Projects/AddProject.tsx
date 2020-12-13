import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import Calendar from "react-calendar";

@observer
export class AddProject extends React.Component<IProjectsProps> {
    addProjectWindowOpen: boolean;
    projectName: string = "";
    description: string = "";
    responsibleDropdownOpen: boolean;
    startDate: Date | Date[];
    deadline: Date | Date[];
    responsiblePerson: number;

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
                            <Calendar
                                value={this.startDate}
                                onChange={(date) => this.inputDate(date, "startDate")}
                            />
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <label>Дедлайн</label>
                            <Calendar
                                value={this.deadline}
                                onChange={(date) => this.inputDate(date, "deadline")}
                            />
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
                                            {index === 0 && <DropdownItem key={index} header onClick={() => this.chooseResponsiblePerson(user.id)}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                            {index !== 0 && <DropdownItem key={index}>{user.firstName + " " + user.lastName}</DropdownItem>}
                                        </>
                                    );
                                })}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                    onClick={this.saveProject}>СОХРАНИТЬ</Button>
                </ModalFooter>
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

    inputDate(date: Date | Date[], dateType: string) {
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
        this.props.store.projectStore.addNewProject(this.projectName, this.description, this.startDate, this.deadline, this.responsiblePerson);
    }
}