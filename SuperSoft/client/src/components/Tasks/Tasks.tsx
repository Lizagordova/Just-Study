import React from "react";
import { ITasksProps } from "./ITasksProps";
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";
import { Table } from "reactstrap";
import { TaskRole } from "../../Typings/enums/TaskRole";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";

export class Tasks extends React.Component<ITasksProps> {
    getResponsible(responsible: number): UserViewModel {
        console.log("responsible", responsible)
        return this.props.store.userStore.users
            .filter(u => u.id === responsible)[0];
    }

    renderTasks(tasks: TaskViewModel[]) {
        return(
            <Table>
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
                        <tr key={task.id}>
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
        let tasks = this.props.store.taskStore.currentProjectTasks.filter(t => t.status === this.props.status);
        return(
            <>
                {this.renderTasks(tasks)}
            </>
        )
    }
}