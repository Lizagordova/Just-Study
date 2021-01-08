import React, { Component } from 'react';
import TaskStore from "../../../stores/TaskStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";

class ITaskEditProps {
    taskStore: TaskStore;
    task: TaskViewModel;
}

export class TaskEdit extends Component<ITaskEditProps> {
    render() {
        return(
            <></>
        );
    }
}