import React from "react";
import { IMyTasksProps } from "./IMyTasksProps";
import { Table, Modal, ModalBody } from 'reactstrap';
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { TaskPriority } from "../../Typings/enums/TaskPriority";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { Task } from "../Tasks/Task";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";

@observer
export class MyTasks extends React.Component<IMyTasksProps> {
    taskOpen: boolean;
    taskToRender: TaskViewModel;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            taskOpen: observable
        });
    }

    getTaskStatusTranslit(taskStatus: TaskStatus): string {
        if(taskStatus === TaskStatus.Current) {
            return "Текущие";
        } else if(taskStatus === TaskStatus.Completed) {
            return "Законченные";
        } else if(taskStatus === TaskStatus.Future) {
            return "Будущие";
        } else {
            return "Текущие";
        }
    }

    renderStatusDropdown(status: TaskStatus) {
        return (
            <></>
        );
    }

    renderPriorityDropdown(priority: TaskPriority) {
        return (
            <></>
        );
    }

    filterTasks(taskStatus: TaskStatus): TaskViewModel[] {
        return this.props.store.taskStore.currentUserTasks?.
            filter(ut => ut.task.status === taskStatus)
            .map(ut => {
                return ut.task
            });
    }

    renderMyTasks(tasks: TaskViewModel[]) {
        return(
            <Table bordered style={{backgroundColor: "#C4DFE6", color:"003b46"}}>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Задача</th>
                        <th>Дедлайн</th>
                        <th>Статус</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task) => {
                        return(
                            <tr key={task.id} onClick={() => this.taskOpenToggle(task)}>
                                <th>{task.id}</th>
                                <th>{task.header}</th>
                                <th>{task.deadlineDate}</th>
                                <th>{this.renderStatusDropdown(task.status)}</th>
                                <th>{this.renderPriorityDropdown(task.priority)}</th>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        )
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
        )
    }

    render() {
        let tasks = this.filterTasks(this.props.tasksStatus);
        return(
            <>
                <label>{this.getTaskStatusTranslit(this.props.tasksStatus)}</label>
                {tasks !== undefined && this.renderMyTasks(tasks)}
                {tasks === undefined && <div><span>Задач пока нет:)</span></div>}
                {this.taskOpen && this.renderTask()}
            </>
        );
    }

    taskOpenToggle(task: TaskViewModel = new TaskViewModel()) {
        this.taskOpen = !this.taskOpen;
        this.taskToRender = task;
    }
}