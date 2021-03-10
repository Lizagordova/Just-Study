import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import CompletedTask from "./CompletedTask";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { Alert } from "reactstrap";

class ICompletedHomeworkProps {
    store: RootStore;
    userId: number;
}

@observer
class CompletedHomework  extends Component<ICompletedHomeworkProps> {
    renderTasks(tasks: TaskViewModel[]) {
        if(tasks.length === 0) {
            return (
                <Alert color="secondary">Пока нет заданий в этом разделе</Alert>
            );
        } else {
            return(
                <div className="container-fluid">
                    {tasks.map((task) => {
                        return (
                            <>
                                <div className="row">
                                    <CompletedTask task={task} userId={this.props.userId} store={this.props.store} key={task.id}/>
                                </div>
                                <hr />
                            </>
                        );
                    })}
                </div>
            );
        }
    }

    render() {
        let tasks = this.props.store.taskStore.tasksByChoosenLesson;
        return(
            <>
                {this.renderTasks(tasks)}
            </>
        );
    }
}

export default CompletedHomework;