import React from "react";
import { ITasksProps } from "./ITasksProps";
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";
import { Table, Modal, Alert } from "reactstrap";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { makeObservable, observable, toJS } from "mobx";
import { Task } from "./Task";
import { observer } from "mobx-react";

@observer
export class Tasks extends React.Component<ITasksProps> {
    taskOpen: boolean;
    taskToRender: TaskViewModel;

    getResponsible(responsible: number): UserViewModel {
        return this.props.store.userStore.users
            .filter(u => u.id === responsible)[0];
    }

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            taskOpen: observable
        });
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

    renderAlert() {
        return(
            <Alert color="primary">Задач пока нет!!!</Alert>
        );
    }

    renderTasks(tasks: TaskViewModel[]) {
        return(
            <Table bordered style={{backgroundColor: "#fff", color:"#003B46", marginTop: "2%", fontSize: "1.2em"}}>
                <thead>
                    <tr>
                        <th>Номер</th>
                        <th>Задача</th>
                        <th>Дедлайн</th>
                        <th>Тип задачи</th>
                        <th>Ответственный</th>
                    </tr>
                </thead>
                <tbody>
                {tasks.map((task) => {
                    let responsible = this.getResponsible(task.responsible);//вообще здесь лучше дропдаун сделать
                    return(
                        <tr key={task.id} onClick={() => this.taskOpenToggle(task)}>
                            <th>{task.id}</th>
                            <th>{task.header}</th>
                            <th>{task.deadlineDate}</th>
                            <th>{task.taskType}</th>
                            <th>{responsible.firstName + " " + responsible.lastName}</th>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        );
    }

    render() {
        let currentProjectTasks = this.props.store.taskStore.currentProjectTasks;
        let tasks = currentProjectTasks.filter(t => t.status === this.props.status);
        return(
            <>
                {tasks !== undefined && this.renderTasks(tasks)}
                {tasks === undefined && this.renderAlert()}
                {this.taskOpen && this.renderTask()}
            </>
        )
    }

    taskOpenToggle(task: TaskViewModel = new TaskViewModel()) {
        this.taskOpen = !this.taskOpen;
        this.taskToRender = task;
    }
}