import React, { Component } from 'react';
import { Button } from "reactstrap";
import { Task } from "../../Common/Tasks/Task";
import { observer } from "mobx-react";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import RootStore from "../../../stores/RootStore";
import { makeObservable, observable } from "mobx";

class ICompletedTaskProps {
    task: TaskViewModel;
    store: RootStore;
    userId: number;
}

@observer
class CompletedTask extends Component<ICompletedTaskProps> {
    commentsWindowOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            commentsWindowOpen: observable
        })
    }

    commentsToggle() {
        this.commentsWindowOpen = !this.commentsWindowOpen;
    }

    renderTask() {
        return (
            <Task task={this.props.task} store={this.props.store} userId={this.props.userId}/>
        );
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
                        onClick={() => this.commentsToggle()}>Комментарии</Button>
                    {this.commentsWindowOpen && <CommentGroup commentedEntityType="lessonTask" commentedEntityId={this.state.task.id} userId={store.getState().choosenUser.id} onToggle={this.onToggle}/>}
                </div>
            </>
        );
    }
}

export default CompletedTask;