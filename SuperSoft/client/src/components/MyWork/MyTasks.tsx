import React from "react";
import { IMyTasksProps } from "./IMyTasksProps";

export class MyTasks extends React.Component<IMyTasksProps> {
    render() {
        return(
            <div>
                <span>статус задач: {this.props.tasksStatus}</span>
            </div>
        );
    }
}