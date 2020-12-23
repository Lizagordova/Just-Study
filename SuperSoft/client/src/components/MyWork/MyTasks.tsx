import React from "react";
import { IMyTasksProps } from "./IMyTasksProps";
import { Alert, Modal, Table } from 'reactstrap';
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { Task } from "../Tasks/Task";
import { UserTaskViewModel } from "../../Typings/viewModels/UserTaskViewModel";
import { translatePriority, translateTaskRole, translateTaskType } from "../../functions/translater";
import { formatDate } from "../../functions/formatDate";

@observer
export class MyTasks extends React.Component<IMyTasksProps> {
    taskOpen: boolean;
    taskToRender: TaskViewModel;
    sortDescendent: boolean = false;

    componentDidMount(): void {
        this.props.store.taskStore.getCurrentUserTasks();
    }

    sort() {
        this.props.store.taskStore.currentUserTasks.sort();
        this.sortDescendent = !this.sortDescendent;
    }
    renderSortIcon() {
        return (
            <>
                {this.sortDescendent
                    ? <i className="fa fa-chevron-circle-down" aria-hidden="true" onClick={() => this.sort()}/>
                    : <i className="fa fa-chevron-circle-up" aria-hidden="true" onClick={() => this.sort()}/>
                }
                </>
        );
    }

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            taskOpen: observable
        });
    }

    filterTasks(taskStatus: TaskStatus, currentUserTasks: UserTaskViewModel[]): UserTaskViewModel[] {
        return currentUserTasks?.
            filter(ut => ut.task.status === taskStatus);
    }

    renderAlert() {
        return(
            <Alert color="primary">Задач пока нет!!!</Alert>
        );
    }

    renderMyTasks(userTasks: UserTaskViewModel[]) {
        return(
            <Table bordered style={{backgroundColor: "#fff", color:"#003B46", marginTop: "2%", fontSize: "1.2em"}}>
                {userTasks.length === 0 && this.renderAlert()}
                {userTasks.length !== 0 && <thead style={{color:"fff"}}>
                    <tr>
                        <th>Номер</th>
                        <th>Задача</th>
                        <th>Дедлайн</th>
                        <th>Приоритет{this.renderSortIcon()}</th>
                        <th>Роль</th>
                        <th>Тип</th>
                    </tr>
                </thead>}
                {userTasks.length !== 0 && <tbody>
                    {userTasks.map((ut) => {
                        return(
                            <tr key={ut.task.id} onClick={() => this.taskOpenToggle(ut.task)}>
                                <th>{ut.task.id}</th>
                                <th>{ut.task.header}</th>
                                <th>{formatDate(ut.task.deadlineDate)}</th>
                                <th>{translatePriority(ut.task.priority)}</th>
                                <th>{translateTaskRole(ut.role)}</th>
                                <th>{translateTaskType(ut.task.taskType)}</th>
                            </tr>
                        );
                    })}
                </tbody>}
            </Table>
        );
    }

    renderTask() {
        return(
            <Modal
                isOpen={this.taskOpen}
                toggle={() => this.taskOpenToggle()}>
                <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                   onClick={() => this.taskOpenToggle()}/>
                <Task store={this.props.store} task={this.taskToRender}/>
            </Modal>
        );
    }

    render() {
        let currentTasks = this.props.store.taskStore.currentUserTasks;
        let tasks = this.filterTasks(this.props.tasksStatus, currentTasks);
        return(
            <>
                {tasks !== undefined && this.renderMyTasks(tasks)}
                {tasks === undefined && this.renderAlert()}
                {this.taskOpen && this.renderTask()}
            </>
        );
    }

    taskOpenToggle(task: TaskViewModel = new TaskViewModel()) {
        this.taskOpen = !this.taskOpen;
        this.taskToRender = task;
    }
}