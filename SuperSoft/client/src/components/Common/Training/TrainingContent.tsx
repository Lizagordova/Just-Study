import React, {Component} from "react";
import {Alert, Button} from "reactstrap";
import {TagViewModel} from "../../../Typings/viewModels/TagViewModel";
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";
import {Task} from "../Tasks/Task";
import RootStore from "../../../stores/RootStore";
import {TagReadModel} from "../../../Typings/readModels/TagReadModel";
import TaskUpload from "../../Admin/Tasks/TaskUpload";
import {UserRole} from "../../../Typings/enums/UserRole";

class ITrainingContentProps {
    store: RootStore;
    mainTag: number;
}

@observer
class TrainingContent extends Component<ITrainingContentProps> {
    choosenTags: TagViewModel[] = new Array<TagViewModel>();
    relatedTasks: TaskViewModel[] = new Array<TaskViewModel>();
    taskUploadWindowOpen: boolean = false;
    update: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            choosenTags: observable,
            relatedTasks: observable,
            taskUploadWindowOpen: observable,
            update: observable
        });
    }

    updateToggle() {
        this.update = !this.update;
    }

    renderApplyButton() {
        return (
            <div className="row justify-content-center" style={{marginTop: "10px", marginBottom: "10px"}}>
                <Button
                    color="primary"
                    style={{width: '50%'}}
                    onClick={() => this.applyTags()}>
                    ПРИМЕНИТЬ
                </Button>
            </div>
        );
    }

    renderTags(tags: TagViewModel[], update: boolean) {
        return (
            <div className="row" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                {tags.map((tag, i) => {
                    let outline = !this.choosenTags.includes(tag);
                    if(tag.id !== 1 && tag.id !== 2 && tag.id !== 3) {//todo: неприятный хардкод 
                        return (
                            <Button
                                outline={outline} color="primary"
                                style={{
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                    height: "auto",
                                    width: "auto",
                                    fontSize: "0.8em"
                                }}
                                active={false}
                                key={i}
                                onClick={() => this.toggleTag(tag)}>
                                {tag.name}
                            </Button>
                        );
                    }
                })}
            </div>
        );
    }

    renderFilters(tags: TagViewModel[]) {
        if(tags.length > 0) {
            return(
                <>
                    {this.renderTags(tags, this.update)}
                    {this.renderApplyButton()}
                </>
            );
        }
    }

    renderTasks(tasks: TaskViewModel[]) {
        if(tasks.length >  0) {
            return(
                <div className="row">
                    {tasks.map((task, i) => {
                        return(
                            <Task task={task} store={this.props.store} userId={this.props.store.userStore.currentUser.id} key={i}  isTraining={true} tags={this.choosenTags}/>
                        );
                    })}
                </div>
            );
        } else {
            return (
                <div className="row justify-content-center">
                    <Alert color="primary" style={{width: "80%"}}>К сожалению, пока нет заданий в этом разделе</Alert>
                </div>
            );
        }
    }

    renderTaskUpload() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return (
                <TaskUpload store={this.props.store} isTraining={true}/>
            );
        }
    }

    render() {
        let tags = this.props.store.taskStore.tags;
        return(
            <>
                {this.renderFilters(tags)}
                {this.renderTasks(this.relatedTasks)}
                {this.renderTaskUpload()}
            </>
        )
    }

    toggleTag(tag: TagViewModel) {
        if(this.choosenTags.filter(t => t.id === tag.id).length > 0) {
            let choosenTags = this.choosenTags
                .filter(t => t !== tag);
            this.choosenTags = choosenTags;
        } else {
            this.choosenTags.push(tag);
        }
        this.updateToggle();
    }

    applyTags() {
        let mainTag = new TagReadModel();
        mainTag.id = this.props.mainTag;
        let choosenTags = this.choosenTags;
        choosenTags.push(mainTag);
        console.log("this.props", this.props);
        this.props.store.taskStore
            .getTasks(choosenTags)
            .then((tasks) => {
                this.relatedTasks = tasks;
            });
    }

    toggleTaskUploadWindow() {
        this.taskUploadWindowOpen = !this.taskUploadWindowOpen;
    }
}

export default TrainingContent;