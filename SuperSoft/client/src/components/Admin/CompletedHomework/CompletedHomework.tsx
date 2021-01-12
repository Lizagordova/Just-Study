import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import CompletedTask from "./CompletedTask";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";

class ICompletedHomeworkProps {
    store: RootStore;
    userId: number;
}

@observer
class CompletedHomework  extends Component<ICompletedHomeworkProps> {
    renderTasks(tasks: TaskViewModel[]) {
        return(
            <div className="container-fluid">
                {tasks.map((task) => {
                    return (
                        <>
                            <div className="row">
                                <CompletedTask task={task} userId={this.props.userId} store={this.props.store}/>
                            </div>
                            <hr />
                        </>
                    );
                })}
            </div>
        );
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