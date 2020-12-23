import React from "react";
import { IAddTasksProps } from "./IAddTasksProps";
import { action, makeObservable, observable } from "mobx";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Alert
} from "reactstrap";
import Calendar from "react-calendar";
import { TaskType } from "../../Typings/enums/TaskType";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { observer } from "mobx-react";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { TaskPriority } from "../../Typings/enums/TaskPriority";
import { translatePriority, translateTaskType } from "../../functions/translater";

@observer
export class AddTask extends React.Component<IAddTasksProps> {
    addTaskWindowOpen: boolean;
    responsibleDropdownOpen: boolean;
    testerDropdownOpen: boolean;
    taskTypeDropdownOpen: boolean;
    priorityDropdownOpen: boolean;
    taskName: string;
    description: string;
    startDate: Date | Date[] = new Date();
    deadline: Date | Date[] = new Date();
    priority: TaskPriority = TaskPriority.Average;
    responsiblePerson: UserViewModel;
    tester: UserViewModel;
    taskType: TaskType = TaskType.Feature;
    taskStatus: TaskStatus;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addTaskWindowOpen: observable,
            responsibleDropdownOpen: observable,
            testerDropdownOpen: observable,
            taskTypeDropdownOpen: observable,
            priorityDropdownOpen: observable
        });
    }

    componentDidMount(): void {
        this.responsiblePerson = this.props.store.projectStore.choosenProjectUsers[0];
        this.tester = this.props.store.projectStore.choosenProjectUsers[0];
    }

    @action
    toggleAddTaskWindow() {
        this.addTaskWindowOpen = !this.addTaskWindowOpen;
    }

    @action
    toggleResponsibleDropdown() {
        this.responsibleDropdownOpen = !this.responsibleDropdownOpen;
    }

    toggleTesterDropdown() {
        this.testerDropdownOpen = !this.testerDropdownOpen;
    }

    toggleTaskTypeDropdown() {
        this.taskTypeDropdownOpen = !this.taskTypeDropdownOpen;
    }

    togglePriorityDropdown() {
        this.priorityDropdownOpen = !this.priorityDropdownOpen;
    }

    renderTaskType() {
        return(
            <Dropdown 
                isOpen={this.taskTypeDropdownOpen}
                toggle={() => this.toggleTaskTypeDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{translateTaskType(this.taskType)}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.taskType = TaskType.Feature}>Фича</DropdownItem>
                    <DropdownItem onClick={() => this.taskType = TaskType.Bug}>Баг</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderPriority() {
        return(
            <Dropdown
                isOpen={this.priorityDropdownOpen}
                toggle={() => this.togglePriorityDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{translatePriority(this.priority)}</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem onClick={() => this.priority = TaskPriority.Average}>Средняя</DropdownItem>
                    <DropdownItem onClick={() => this.priority = TaskPriority.High}>Высокая</DropdownItem>
                    <DropdownItem onClick={() => this.priority = TaskPriority.Low}>Низкая</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }

    renderResponsibleDropdown() {
        let users = this.props.store.projectStore.choosenProjectUsers;
        let responsible = this.responsiblePerson;
        return(
            <Dropdown isOpen={this.responsibleDropdownOpen} toggle={() => this.toggleResponsibleDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{responsible !== undefined ? `${responsible.firstName} ${responsible.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                <DropdownMenu>
                    {users.map((user, index) => {
                        return(
                            <>
                              {<DropdownItem key={index}  onClick={() => this.choosePerson(user, "responsible")}>{user.firstName + " " + user.lastName}</DropdownItem>}
                            </>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderTesterDropdown() {
        let users = this.props.store.projectStore.choosenProjectUsers;
        let tester = this.tester;
        return(
            <Dropdown isOpen={this.testerDropdownOpen} toggle={() => this.toggleTesterDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{tester !== undefined ? `${tester.firstName} ${tester.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                <DropdownMenu>
                    {users.map((user, index) => {
                        return(
                            <>
                                {<DropdownItem key={index}  onClick={() => this.choosePerson(user, "tester")}>{user.firstName + " " + user.lastName}</DropdownItem>}
                            </>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderAddTaskWindow() {
        let currentUser = this.props.store.userStore.currentUser;
        return(
            <Modal 
                style={{backgroundColor: "#003b46", color: "#003b46", fontSize: "1.4em"}}
                isOpen={this.addTaskWindowOpen}
                size="lg"
                centered
                aria-labelledby="contained-modal-title-vcenter"
                toggle={() => this.toggleAddTaskWindow()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                   onClick={() => this.toggleAddTaskWindow()}/>
                <ModalHeader closeButton>СОЗДАНИЕ ЗАДАЧИ</ModalHeader>
                {this.notSaved && <Alert color="primary">Что-то пошло не так и задача не сохранилась!!!</Alert>}
                <ModalBody>
                    <div className="row justify-content-center">
                        <Label style={{width: "100%"}} align="center">НАЗВАНИЕ</Label>
                        <Input style={{width: "90%"}} onChange={(e) => this.inputTaskName(e)}/>
                    </div>
                    <div className="row justify-content-center" style={{marginTop: "10px"}}>
                        <Label style={{width: "100%"}} align="center">ОПИСАНИЕ</Label>
                        <textarea style={{width: "90%"}} onChange={(e) => this.inputDescription(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-12">
                            <Label style={{width: "100%"}} align="center">ДАТА НАЧАЛА</Label>
                            <div style={{width: "100%", paddingLeft: "15%"}}>
                                <Calendar
                                    value={this.startDate}
                                    onChange={(date) => this.inputDate(date, "startDate")}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 col-sm-12">
                            <Label style={{width: "100%"}} align="center">ДЕДЛАЙН</Label>
                            <div style={{width: "100%", paddingLeft: "15%"}}>
                                <Calendar
                                    value={this.deadline}
                                    onChange={(date) => this.inputDate(date, "deadline")}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Label style={{width: "100%"}} align="center">ТЕСТИРОВЩИК</Label>
                            <div className="row justify-content-center">
                                {this.renderTesterDropdown()}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Label style={{width: "100%"}} align="center">ОТВЕТСТВЕННЫЙ</Label>
                            <div className="row justify-content-center">
                                {this.renderResponsibleDropdown()}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Label style={{width: "100%"}} align="center">ТИП</Label>
                            <div className="row justify-content-center">
                                {this.renderTaskType()}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Label style={{width: "100%"}} align="center">ПРИОРИТЕТ</Label>
                            <div className="row justify-content-center">
                                {this.renderPriority()}
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <Label style={{width: "100%"}} align="center">Автор:
                            <span>{currentUser.firstName} {currentUser.lastName}</span>
                        </Label>
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
            <div className="row justify-content-center" style={{marginTop: "5%"}}>
                <Button
                    style={{width: "80%", borderColor: "#66A5AD", color: "#66A5AD", backgroundColor: "#fff"}}
                    onClick={() => this.toggleAddTaskWindow()}>Создать задачу</Button>
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

    choosePerson(user: UserViewModel, type: string): void {
        if(type === "responsible") {
            this.responsiblePerson = user;
        } else if(type === "tester") {
            this.tester = user;
        }
    }

    saveTask() {
        this.props.store.taskStore.addOrUpdateTask(this.taskName, this.description, this.startDate, this.deadline, this.taskType, this.taskStatus, this.priority, this.tester.id, this.responsiblePerson.id, this.props.store.userStore.currentUser.id, 0, this.props.store.projectStore.choosenProject.id)
            .then((status) => {
                if(status === 200) {
                    this.props.store.taskStore.getTasks(this.props.store.projectStore.choosenProject.id);
                    this.addTaskWindowOpen = false;
                    this.notSaved = false;
                } else {
                    this.notSaved = true;
                    this.addTaskWindowOpen = false;
                }
            });
    }
}