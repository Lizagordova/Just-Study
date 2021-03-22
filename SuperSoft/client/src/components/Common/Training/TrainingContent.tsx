import React, {Component} from "react";
import {Alert, Button} from "reactstrap";
import {TagViewModel} from "../../../Typings/viewModels/TagViewModel";
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";
import {Task} from "../Tasks/Task";
import RootStore from "../../../stores/RootStore";
import TaskUpload from "../../Admin/Tasks/TaskUpload";
import {UserRole} from "../../../Typings/enums/UserRole";
import {SubtagViewModel} from "../../../Typings/viewModels/SubtagViewModel";
import {mapToSubtagReadModel, mapToTagReadModel} from "../../../functions/mapper";
import SubtagsControlWindow from "../../Admin/Tags/SubtagsControlWindow";

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
    subtagsControlWindowOpen: boolean;
    mainTag: TagViewModel = new TagViewModel();

    constructor(props: ITrainingContentProps) {
        super(props);
        makeObservable(this, {
            choosenSubtags: observable,
            taskUploadWindowOpen: observable,
            update: observable,
            notReceived: observable,
            subtagsControlWindowOpen: observable,
        });
        this.getTasks(this.choosenSubtags);
        this.setMainTag();
    }

    componentDidUpdate(prevProps: Readonly<ITrainingContentProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.mainTag !== prevProps.mainTag) {
            this.setMainTag();
        }
    }

    setMainTag() {
        let foundTag = this.props.store.tagStore.tags.filter(t => t.id === this.props.mainTag)[0];
        this.mainTag = foundTag !== undefined ? foundTag : new TagViewModel();
        this.updateToggle();
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

    renderSubtags(subtags: SubtagViewModel[], update: boolean) {
        return (
            <div className="row" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                {subtags.map((subtag, i) => {
                    let outline = !this.choosenSubtags.includes(subtag);
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
                            onClick={() => this.toggleTag(subtag)}>
                            {subtag.name}
                        </Button>
                    );
                })}
            </div>
        );
    }

    renderFilters(subtags: SubtagViewModel[], update: boolean) {
        if(subtags.length > 0) {
            return(
                <>
                    {this.renderSubtags(subtags, this.update)}
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
                            <Task task={task} store={this.props.store} userId={this.props.store.userStore.currentUser.id} key={i}  isTrainingOrPool={true} subtags={this.choosenSubtags.map(mapToSubtagReadModel)} reviewMode={false}/>
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

    renderSubtagsControl() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return (
                <>
                    {<Button 
                        style={{marginBottom: "10px", marginTop: "10px"}}
                        outline color="secondary" onClick={() => this.toggleSubtagsControlWindowOpen()}>
                        Редактировать подтеги
                    </Button>}
                    {this.subtagsControlWindowOpen && <SubtagsControlWindow tagStore={this.props.store.tagStore} toggle={this.toggleSubtagsControlWindowOpen} tagId={this.props.mainTag} />}
                </>
            );
        }
    }

    render() {
        return(
            <>
                {this.renderCautions()}
                {this.renderFilters(this.mainTag.subtags, this.update)}
                {this.renderSubtagsControl()}
                {this.renderTasks(this.props.store.taskStore.tasksByQuery)}
                {this.renderTaskUpload()}
            </>
        )
    }

    toggleTag(tag: SubtagViewModel) {
        if(this.choosenSubtags.filter(t => t.id === tag.id).length > 0) {
            this.choosenSubtags = this.choosenSubtags
                .filter(t => t !== tag);
        } else {
            this.choosenSubtags.push(tag);
        }
        this.updateToggle();
    }

    applyTags() {
        let mainTag = mapToTagReadModel(this.mainTag);
        let chooseenSubtags = this.choosenSubtags;
        chooseenSubtags.push(mainTag);
        this.getTasks(chooseenSubtags);
    }

    getTasks(subtags: SubtagViewModel[]) {
        this.props.store.taskStore
            .getTasks(subtags.map(mapToSubtagReadModel))
            .then((status) => {
                this.notReceived = status !== 200;
            });
    }

    toggleTaskUploadWindow() {
        this.taskUploadWindowOpen = !this.taskUploadWindowOpen;
    }

    toggleSubtagsControlWindowOpen = () => {
        this.subtagsControlWindowOpen = !this.subtagsControlWindowOpen;
    }
}

export default TrainingContent;