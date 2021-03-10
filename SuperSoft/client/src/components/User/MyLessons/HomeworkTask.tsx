import React, {Component} from "react";
import RootStore from "../../../stores/RootStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import CommentGroup from "../../Common/Comments/CommentGroup";
import { Button } from "reactstrap";
import { CommentedEntityType } from "../../../Typings/enums/CommentedEntityType";
import { makeObservable, observable } from "mobx";
import { Task } from "../../Common/Tasks/Task";
import { NavigationType } from "../../../NavigationType";
import { observer } from "mobx-react";

class IHomeworkTaskProps {
    store: RootStore;
    task: TaskViewModel;
    userId: number;
    taskToggler: any;
}

@observer
class HomeworkTask extends Component<IHomeworkTaskProps> {
    showComments: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            showComments: observable
        });
    }

    renderTaskCard(task: TaskViewModel) {
        return(
            <>
                <div className="row justify-content-center">
                    {this.renderTask()}
                </div>
                <div className="row justify-content-center">
                    <div className="col-4 text-center">
                        {this.renderBackButton()}
                    </div>
                    <div className="col-4 text-center">
                        {this.renderComments()}
                    </div>
                    <div className="col-4 text-center">
                        {this.renderForwardButton()}
                    </div>
                    {this.showComments && <CommentGroup commentedEntityType={CommentedEntityType.LessonTask} commentedEntityId={task.id} userId={this.props.userId} onToggle={this.toggleComments} store={this.props.store}/>}
                </div>
            </>
        );
    }

    renderComments() {
        return (
            <Button
                outline color="primary"
                onClick={() => this.toggleComments()}>Комментарии</Button>
        );
    }

    renderForwardButton() {
        return (
            <Button
                onClick={() => {this.props.taskToggler(NavigationType.Forward)}}>
                <i className="fa fa-long-arrow-right" aria-hidden="true"/>
            </Button>
        );
    }

    renderBackButton() {
        return (
            <Button
                onClick={() => {this.props.taskToggler(NavigationType.Back)}}>
                <i className="fa fa-long-arrow-left" aria-hidden="true"/>
            </Button>
        );
    }

    renderTask() {
        return(
            <Task store={this.props.store} task={this.props.task} userId={this.props.userId} isTrainingOrPool={false} tags={null} reviewMode={false}/>
        );
    }

    render() {
        return(
            <>
                {this.renderTaskCard(this.props.task)}
            </>
        );
    }

    toggleComments = () => {
        this.showComments = !this.showComments;
    }
}

export default HomeworkTask;