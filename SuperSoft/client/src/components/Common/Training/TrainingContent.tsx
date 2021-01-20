import React, { Component } from "react";
import { Button } from "reactstrap";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { Task } from "../Tasks/Task";
import RootStore from "../../../stores/RootStore";

class ITrainingContentProps {
    store: RootStore;
    mainTag: TagViewModel;
}

@observer
class TrainingContent extends Component<ITrainingContentProps> {
    choosenTags: TagViewModel[];
    relatedTasks: TaskViewModel[];

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            choosenTags: observable,
            relatedTasks: observable
        });
    }

    renderApplyButton() {
        return (
            <Button
                color="primary"
                style={{width: '100%'}}
                onClick={() => this.applyTags()}>
                ПРИМЕНИТЬ
            </Button>
        );
    }

    renderFilters(tags: TagViewModel[]) {
        return(
            <div className="row">
                {tags.map((tag) => {
                    return(
                        <Button
                            outline color="primary"
                            style={{width: '15%'}}
                            onClick={() => this.toggleTag(tag)}>
                            {tag.name}
                        </Button>
                    );
                })}
            </div>
        );
    }

    renderTasks(tasks: TaskViewModel[]) {
        return(
            <div className="row">
                {tasks.map((task) => {
                    return(
                        <Task task={task} store={this.props.store} userId={this.props.store.userStore.currentUser.id}/>
                    );
                })}
            </div>
        );
    }

    render() {
        let tags = this.props.store.taskStore.tags;
        return(
            <>
                {this.renderFilters(tags)}
                {this.renderApplyButton()}
                {this.renderTasks(this.relatedTasks)}
            </>
        )
    }

    toggleTag(tag: TagViewModel) {
        if(this.choosenTags.filter(t => t.id === tag.id).length > 0) {
            let index = this.choosenTags.indexOf(tag);
            this.choosenTags = this.choosenTags.splice(index, 1);
        } else {
            this.choosenTags.push(tag);
        }
    }

    applyTags() {
        this.props.store.taskStore
            .getTasks(this.choosenTags)
            .then((tasks) => {
                this.relatedTasks = tasks;
            });
    }
}

export default TrainingContent;