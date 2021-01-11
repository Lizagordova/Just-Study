import React, { Component } from 'react';
import { Button } from "reactstrap";
import { Task } from "../../Common/Tasks/Task";
import { observer } from "mobx-react";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import RootStore from "../../../stores/RootStore";

class ICompletedTaskProps {
    task: TaskViewModel;
    store: RootStore;
    userId: number;
}

@observer
class CompletedTask extends Component<ICompletedTaskProps> {
    constructor() {
        // @ts-ignore
        super();
        this.state = {
            task: this.props.task,
            comments: false
        };
        this.onToggle = this.onToggle.bind(this);
    }

    onToggle() {
        this.setState({comments: false})
    }

    renderTask() {
        let task = this.state.task;
        return (
            <Task task={task}/>
        )
    }

    render() {
        return(
            <>
                <div className="col-10">
                    {this.renderTask()}
                </div>
                <div className="col-2">
                    <Button
                        outline color="primary"
                        onClick={() => this.setState({comments: true})}>Комментарии</Button>
                    {this.state.comments && <CommentGroup commentedEntityType="lessonTask" commentedEntityId={this.state.task.id} userId={store.getState().choosenUser.id} onToggle={this.onToggle}/>}
                </div>
            </>
        )
    }
}

export default CompletedTask;