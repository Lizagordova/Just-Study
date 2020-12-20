import React from "react";
import { IAddTasksProps } from "./IAddTasksProps";
import { action, makeObservable, observable} from "mobx";
import { Modal, ModalHeader, ModalBody, ModalFooter, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from "reactstrap";
import Calendar from "react-calendar";
import { TaskType } from "../../Typings/enums/TaskType";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { observer } from "mobx-react";

@observer
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

    @action
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
        let user = users[0];
        return(
            <Dropdown isOpen={this.responsibleDropdownOpen} toggle={() => this.toggleResponsibleDropdown()}>
                <DropdownToggle>{user !== undefined ? `${user.firstName} ${user.lastName}` : "Пока нет пользователей"}</DropdownToggle>
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
        let user = users[0];
        return(
            <Dropdown isOpen={this.testerDropdownOpen} toggle={() => this.toggleTesterDropdown()}>
                <DropdownToggle>{user !== undefined ? `${user.firstName} ${user.lastName}` : "Пока нет пользователей"}</DropdownToggle>
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
                toggle={() => this.toggleAddTaskWindow()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                   onClick={() => this.toggleAddTaskWindow()}/>
                <ModalHeader closeButton>СОЗДАНИЕ ЗАДАЧИ</ModalHeader>
                <ModalBody>
                    <div className="row justify-content-center">
                        <Label style={{width: "100%"}} align="center">Название</Label>
                        <Input style={{width: "90%"}} onChange={(e) => this.inputTaskName(e)}/>
                    </div>
                    <div className="row justify-content-center" style={{marginTop: "10px"}}>
                        <Label style={{width: "100%"}} align="center">Описание</Label>
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
                        <div className="col-lg-4 col-sm-12">
                            <Label style={{width: "100%"}} align="center">Ответственный</Label>
                            {this.renderResponsibleDropdown()}
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <Label style={{width: "100%"}} align="center">Тестировщик</Label>
                            {this.renderTesterDropdown()}
                        </div>
                        <div className="col-lg-4 col-sm-12">
                            <Label style={{width: "100%"}} align="center">Автор:
                                <span>{currentUser.firstName} {currentUser.lastName}</span>
                            </Label>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.saveTask()}>
                        СОХРАНИТЬ
                    </Button>
                </ModalFooter>
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
        this.props.store.taskStore.addOrUpdateTask(this.taskName, this.description, this.startDate, this.deadline, this.taskType, this.taskStatus, this.priority, this.tester, this.responsiblePerson, this.props.store.userStore.currentUser.id, 0, this.props.store.projectStore.choosenProject.id,)
    }
}