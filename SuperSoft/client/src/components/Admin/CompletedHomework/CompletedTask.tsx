import React, {Component} from 'react';
import {Button} from "reactstrap";
import {Task} from "../../Common/Tasks/Task";
import {observer} from "mobx-react";
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";
import RootStore from "../../../stores/RootStore";
import {makeObservable, observable} from "mobx";
import CommentGroup from "../../Common/Comments/CommentGroup";
import {CommentedEntityType} from "../../../Typings/enums/CommentedEntityType";

class ICompletedTaskProps {
    task: TaskViewModel;
    store: RootStore;
    userId: number;
}

@observer
class CompletedTask extends Component<ICompletedTaskProps> {
    commentsWindowOpen: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            commentsWindowOpen: observable
        });
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
                    {this.commentsWindowOpen && <CommentGroup commentedEntityId={this.props.task.id} commentedEntityType={CommentedEntityType.LessonTask} onToggle={this.commentsToggle} store={this.props.store} userId={this.props.userId}/>}
                </div>
            </>
        );
    }
}

export default CompletedTask;