import React from "react";
import {IMyTasksProps} from "./IMyTasksProps";
import {Table} from 'reactstrap';
import {TaskViewModel} from "../../Typings/viewModels/TaskViewModel";
import { TaskStatus } from "../../Typings/enums/TaskStatus";

export class MyTasks extends React.Component<IMyTasksProps> {
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

    filterTasks(taskStatus: TaskStatus): TaskViewModel[] {
        return this.props.store.taskStore.currentUserTasks?.
            filter(ut => ut.task.status === taskStatus)
            .map(ut => {
                return ut.task
            });
    }

    renderMyTasks(tasks: TaskViewModel[]) {
        return(
            <Table>
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
                            <tr key={task.id}>
                                <th>{task.id}</th>
                                <th>{task.header}</th>
                                <th>{task.deadlineDate}</th>
                                <th>{task.status}</th>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        )
    }

    render() {
        let tasks = this.filterTasks(this.props.tasksStatus);
        return(
            <>
                <label>{this.getTaskStatusTranslit(this.props.tasksStatus)}</label>
                {this.renderMyTasks(tasks)}
            </>
        );
    }
}