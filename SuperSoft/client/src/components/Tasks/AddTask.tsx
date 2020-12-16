import React from "react";
import { IAddTasksProps } from "./IAddTasksProps";
import { makeObservable, observable } from "mobx";
import { Modal } from "react-bootstrap";
import { Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import Calendar from "react-calendar";
import { TaskType } from "../../Typings/enums/TaskType";
import { TaskStatus } from "../../Typings/enums/TaskStatus";

export class AddTask extends React.Component<IAddTasksProps> {
    addTaskWindowOpen: boolean;
    responsibleDropdownOpen: boolean;
    testerDropdownOpen: boolean;
    taskName: string;
    description: string;
    startDate: Date | Date[];
    deadline: Date | Date[];
    priority: number;
    responsiblePerson: number;
    tester: number;
    taskType: TaskType;
    taskStatus: TaskStatus;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addTaskWindowOpen: observable
        });
    }

    toggleAddTaskWindow() {
        this.addTaskWindowOpen = !this.addTaskWindowOpen;
    }

    toggleResponsibleDropdown() {
        this.responsibleDropdownOpen = !this.responsibleDropdownOpen;
    }

    toggleTesterDropdown() {
        this.testerDropdownOpen = !this.testerDropdownOpen;
    }
    
    renderResponsibleDropdown() {
        let users = this.props.store.userStore.users;
        return(
            <Dropdown isOpen={this.responsibleDropdownOpen} toggle={this.toggleResponsibleDropdown}>
                <DropdownToggle />
                <DropdownMenu>
                    {users.map((user, index) => {
                        return(
                            <>
                                {index === 0 && <DropdownItem key={index} header onClick={() => this.choosePerson(user.id, "responsible")}>
                                    {user.firstName + " " + user.lastName}
                                </DropdownItem>}
                                {index !== 0 && <DropdownItem key={index}  onClick={() => this.choosePerson(user.id, "responsible")}>{user.firstName + " " + user.lastName}</DropdownItem>}
                            </>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderTesterDropdown() {
        let users = this.props.store.userStore.users;
        return(
            <Dropdown isOpen={this.testerDropdownOpen} toggle={this.toggleTesterDropdown}>
                <DropdownToggle />
                <DropdownMenu>
                    {users.map((user, index) => {
                        return(
                            <>
                                {index === 0 && <DropdownItem key={index} header onClick={() => this.choosePerson(user.id, "tester")}>
                                    {user.firstName + " " + user.lastName}
                                </DropdownItem>}
                                {index !== 0 && <DropdownItem key={index}  onClick={() => this.choosePerson(user.id, "tester")}>{user.firstName + " " + user.lastName}</DropdownItem>}
                            </>
                        )
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderAddTaskWindow() {
        let currentUser = this.props.store.userStore.currentUser;
        return(
            <Modal 
                isOpen={this.addTaskWindowOpen}
                size="lg"
                centered
                aria-labelledby="contained-modal-title-vcenter"
                toggle={this.toggleAddTaskWindow}>
                <Modal.Header closeButton>СОЗДАНИЕ ЗАДАЧИ</Modal.Header>
                <Modal.Body>
                    <div className="row justify-content-center">
                        <Label>Название</Label>
                        <Input onChange={(e) => this.inputTaskName(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <Label>Описание</Label>
                        <textarea onChange={(e) => this.inputDescription(e)}/>
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
                        <div className="col-lg-4 col-sm-12">
                            <Label>Ответственный</Label>
                            {this.renderResponsibleDropdown()}
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <Label>Тестировщик</Label>
                            {this.renderTesterDropdown()}
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <Label>Автор:</Label>
                            <span>{currentUser.firstName} {currentUser.lastName}</span>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.saveTask()}>
                        СОХРАНИТЬ
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    renderButton() {
        return(
            <div className="row justify-content-center">
                <div className="col-lg-2 col-lg-offset-10 col-md-4 col-md-offset-8 col-sm-6 col-sm-offet-3 col-xs-12">
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.toggleAddTaskWindow()}>Создать задачу</Button>
                </div>
            </div>
        );
    }

    render() {
        return(
            <>
                {this.addTaskWindowOpen && this.renderAddTaskWindow()}
                {!this.addTaskWindowOpen && this.renderButton()}
            </>
        );
    }

    inputTaskName(event: React.FormEvent<HTMLInputElement>): void {
        this.taskName = event.currentTarget.value;
    }

    inputDescription(event: React.FormEvent<HTMLTextAreaElement>): void {
        this.description = event.currentTarget.value;
    }

    inputDate(date: Date | Date[], dateType: string): void {
        if(dateType === "startDate") {
            this.startDate = date;
        } else if(dateType === "deadline") {
            this.deadline = date;
        }
    }

    choosePerson(userId: number, type: string): void {
        if(type === "responsible") {
            this.responsiblePerson = userId;
        } else if(type === "tester") {
            this.tester = userId;
        }
    }

    saveTask() {
        this.props.store.taskStore.addNewTask(this.props.store.projectStore.choosenProject.id, this.taskName, this.description, this.startDate, this.deadline, this.taskType, this.taskStatus, this.priority, this.tester, this.responsiblePerson, this.props.store.userStore.currentUser.id)
    }
}