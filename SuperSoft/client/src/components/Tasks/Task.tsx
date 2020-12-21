import React from "react";
import {ITaskProps} from "../MyWork/ITaskProps";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Label
} from "reactstrap";
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";
import { renderSpinner } from "../../functions/renderSpinner";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { TaskType } from "../../Typings/enums/TaskType";
import { TaskPriority } from "../../Typings/enums/TaskPriority";
import { translatePriority, translateStatus, translateTaskType } from "../../functions/translater";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import Calendar from "react-calendar";

@observer
export class Task extends React.Component<ITaskProps> {
    task: TaskViewModel;
    statusDropdownOpen: boolean;
    priorityDropdownOpen: boolean;
    typeDropdownOpen: boolean;
    testerDropdownOpen: boolean;
    responsibleDropdownOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            statusDropdownOpen: observable,
            priorityDropdownOpen: observable,
            typeDropdownOpen: observable,
            task: observable,
            testerDropdownOpen: observable,
            responsibleDropdownOpen: observable
        });
    }

    componentDidMount(): void {
        this.task = this.props.task;
    }

    renderStatusDropdown() {
        return(
            <>
                <Dropdown
                    isOpen={this.statusDropdownOpen}
                    toggle={() => this.toggleStatus()}>
                    <DropdownToggle tag="a" className="nav-link" caret>{translateStatus(this.task.status)}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.task.status = TaskStatus.InProgress}>{translateStatus(TaskStatus.InProgress)}</DropdownItem>
                        <DropdownItem onClick={() => this.task.status = TaskStatus.Completed}>{translateStatus(TaskStatus.Completed)}</DropdownItem>
                        <DropdownItem onClick={() => this.task.status = TaskStatus.Future}>{translateStatus(TaskStatus.Future)}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    }

    toggleStatus() {
        this.statusDropdownOpen = !this.statusDropdownOpen;
    }

    togglePriority() {
        this.priorityDropdownOpen = !this.priorityDropdownOpen;
    }

    toggleTypeDropdown() {
        this.typeDropdownOpen = !this.typeDropdownOpen;
    }

    toggleResponsibleDropdown() {
        this.responsibleDropdownOpen = !this.responsibleDropdownOpen;
    }

    toggleTesterDropdown() {
        this.testerDropdownOpen = !this.testerDropdownOpen;
    }

    renderResponsible() {
        let users = this.props.store.userStore.users;
        let responsible = this.props.store.userStore.users.filter(u => u.id === this.task.responsible)[0];
        return(
            <Dropdown isOpen={this.responsibleDropdownOpen} toggle={() => this.toggleResponsibleDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{responsible !== undefined ? `${responsible.firstName} ${responsible.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                <DropdownMenu>
                    {users.map((user, index) => {
                        return(
                            <>
                                {<DropdownItem key={index} onClick={() => this.task.responsible = user.id}>{user.firstName + " " + user.lastName}</DropdownItem>}
                            </>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }
    
    renderTester() {
        let users = this.props.store.userStore.users;
        let tester = this.props.store.userStore.users.filter(u => u.id === this.task.tester)[0];
        return(
            <Dropdown isOpen={this.testerDropdownOpen} toggle={() => this.toggleTesterDropdown()}>
                <DropdownToggle tag="a" className="nav-link" caret>{tester !== undefined ? `${tester.firstName} ${tester.lastName}` : "Пока нет пользователей"}</DropdownToggle>
                <DropdownMenu>
                    {users.map((user, index) => {
                        return(
                            <>
                                {<DropdownItem key={index}  onClick={() => this.task.tester = user.id}>{user.firstName + " " + user.lastName}</DropdownItem>}
                            </>
                        );
                    })}
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderTaskPriority() {
        return(
            <>
                <Dropdown
                    isOpen={this.priorityDropdownOpen}
                    toggle={() => this.togglePriority()}>
                    <DropdownToggle tag="a" className="nav-link" caret>{translatePriority(this.task.priority)}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.task.priority = TaskPriority.Average}>{translatePriority(TaskPriority.Average)}</DropdownItem>
                        <DropdownItem onClick={() => this.task.priority = TaskPriority.Low}>{translatePriority(TaskPriority.Low)}</DropdownItem>
                        <DropdownItem onClick={() => this.task.priority = TaskPriority.High}>{translatePriority(TaskPriority.High)}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    }

    renderTypeDropdown() {
        return(
            <>
                <Dropdown
                    isOpen={this.typeDropdownOpen}
                    toggle={() => this.toggleTypeDropdown()}>
                    <DropdownToggle tag="a" className="nav-link" caret>{translateTaskType(this.task.taskType)}</DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => this.task.taskType = TaskType.Feature}>{translateTaskType(TaskType.Feature)}</DropdownItem>
                        <DropdownItem onClick={() => this.task.taskType = TaskType.Bug}>{translateTaskType(TaskType.Bug)}</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </>
        );
    }

    renderTask(task: TaskViewModel) {
        let author = this.props.store.userStore.users.filter(u => u.id === task.author)[0];
        return(
            <>
                <ModalHeader style={{fontSize: "1.5em"}}>{task.header}</ModalHeader>
                <ModalBody>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="row justify-content-center">
                                        <p style={{fontSize: "1.2em"}}>{task.description}</p>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <div className="row justify-content-center">
                                        <Label style={{width: "100%"}} align="center">Приоритет: </Label>
                                        {this.renderTaskPriority()}
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <div className="row justify-content-center">
                                        <Label style={{width: "100%"}} align="center">Статус: </Label>
                                        {this.renderStatusDropdown()}
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                                    <div className="row justify-content-center">
                                        <Label style={{width: "100%"}} align="center">Тип: </Label>
                                        {this.renderTypeDropdown()}
                                    </div>
                                </div>
                                <div className="row justify-content-center">
                                    <Label style={{width: "100%"}} align="center">Ответственный: </Label>
                                    {this.renderResponsible()}
                                </div>
                                <div className="row justify-content-center">
                                    <Label style={{width: "100%"}} align="center">Тестировщик: </Label>
                                    {this.renderTester()}
                                </div>
                                <div className="row justify-content-center">
                                    <Label>Автор: </Label>
                                    {author.firstName} {author.lastName}
                                </div>
                                <div className="row justify-content-center">
                                    <Label style={{width: "100%"}} align="center">Дата начала: </Label>
                                    <Calendar
                                        value={new Date(this.task.startDate)}
                                        onChange={(date) => this.task.startDate = date}
                                    />
                                </div>
                                <div className="row justify-content-center">
                                    <Label style={{width: "100%"}} align="center">Дедлайн: </Label>
                                    <Calendar
                                        value={new Date(this.task.deadlineDate)}
                                        onChange={(date) => this.task.deadlineDate = date}
                                    />
                                </div>
                            </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.save()}>
                        СОХРАНИТЬ
                    </Button>
                </ModalFooter>
            </>
        );
    }

    render() {
        return(
            <>
                {this.task !== undefined && this.renderTask(this.task)}
                {this.task === undefined && renderSpinner()}
            </>
        );
    }

    save() {
        let task = this.task;
        this.props.store.taskStore.addOrUpdateTask(task.header, task.description, task.startDate, task.deadlineDate, task.taskType, task.status, task.priority, task.tester,task.responsible,task.author, task.id, 0)
    }
}