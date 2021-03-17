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
import TagsControlWindow from "../../Admin/Tags/TagsControlWindow";
import {SubtagViewModel} from "../../../Typings/viewModels/SubtagViewModel";

class ITrainingContentProps {
    store: RootStore;
    mainTag: number;
}

@observer
class TrainingContent extends Component<ITrainingContentProps> {
    choosenSubtags: SubtagViewModel[] = new Array<SubtagViewModel>();
    taskUploadWindowOpen: boolean = false;
    update: boolean = false;
    notReceived: boolean;
    tagsControlWindowOpen: boolean;

    constructor(props: ITrainingContentProps) {
        super(props);
        makeObservable(this, {
            choosenSubtags: observable,
            taskUploadWindowOpen: observable,
            update: observable,
            notReceived: observable,
            tagsControlWindowOpen: observable
        });
        this.getTasks(this.choosenSubtags);
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
                    {this.renderTagsControl()}
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
                            <Task task={task} store={this.props.store} userId={this.props.store.userStore.currentUser.id} key={i}  isTrainingOrPool={true} tags={this.choosenTags} reviewMode={false}/>
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

    renderCautions() {
        setTimeout(() => { this.notReceived = false }, 3000);
        return(
            <>
                {this.notReceived && <Alert color="danger">Что-то пошло не так и не удалось получить задания по выбранным тегам. Попробуйте ещё раз.</Alert>}
            </>
        );
    }
    
    renderTaskUpload() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return (
                <TaskUpload store={this.props.store} isTrainingOrPool={true} />
            );
        }
    }

    renderTagsControl() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return (
                <>
                    {<Button 
                        style={{marginBottom: "10px"}}
                        outline color="secondary" onClick={() => this.toggleTagsControlWindowOpen()}>
                        Редактировать теги
                    </Button>}
                    {this.tagsControlWindowOpen && <TagsControlWindow tagStore={this.props.store.tagStore} toggle={this.toggleTagsControlWindowOpen} tagId={this.props.mainTag} />}
                </>
            );
        }
    }

    render() {
        let tags = this.props.store.tagStore.tags;
        return(
            <>
                {this.renderCautions()}
                {this.renderFilters(tags)}
                {this.renderTasks(this.props.store.taskStore.tasksByQuery)}
                {this.renderTaskUpload()}
            </>
        )
    }

    toggleTag(tag: TagViewModel) {
        if(this.choosenTags.filter(t => t.id === tag.id).length > 0) {
            this.choosenTags = this.choosenTags
                .filter(t => t !== tag);
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
        this.getTasks(choosenTags);
    }

    getTasks(subtags: SubtagViewModel[]) {
        this.props.store.taskStore
            .getTasks(subtags)
            .then((status) => {
                this.notReceived = status !== 200;
            });
    }

    toggleTaskUploadWindow() {
        this.taskUploadWindowOpen = !this.taskUploadWindowOpen;
    }

    toggleTagsControlWindowOpen = () => {
        this.tagsControlWindowOpen = !this.tagsControlWindowOpen;
    }
}

export default TrainingContent;