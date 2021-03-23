import React, {Component} from "react";
import {TaskReadModel} from "../../../Typings/readModels/TaskReadModel";
import {Alert, Button, Fade, Input, Label, ModalBody} from "reactstrap";
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {SubtaskReadModel} from "../../../Typings/readModels/SubtaskReadModel";
import {TagViewModel} from "../../../Typings/viewModels/TagViewModel";
import {IUploadTaskProps} from "./IUploadTaskProps";
import SubtaskUploadWindow from "./SubtaskUploadWindow";
import {getTaskTitle} from "../../../functions/getTaskTitle";
import {subtaskTranspiler} from "../../../functions/subtaskTranspiler";
import {
    mapToSubtaskReadModel,
    mapToTagReadModel,
    mapToTaskReadModel
} from "../../../functions/mapper";
import {SubtagReadModel} from "../../../Typings/readModels/SubtagReadModel";
import {SubtagViewModel} from "../../../Typings/viewModels/SubtagViewModel";

@observer
class TaskUploadWindow extends Component<IUploadTaskProps> {
    task: TaskReadModel = new TaskReadModel();
    subtasks: SubtaskReadModel[] = new Array<SubtaskReadModel>();
    tags: TagViewModel[] = new Array<TagViewModel>();
    subtags: SubtagViewModel[] = new Array<SubtagViewModel>();
    notSaved: boolean;
    saved: boolean;
    loaded: boolean;
    renderEmptyWarning: boolean = true;
    update: boolean = true;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            task: observable,
            notSaved: observable,
            loaded: observable,
            subtasks: observable,
            subtags: observable,
            tags: observable,
            saved: observable,
            update: observable,
            renderEmptyWarning: observable
        });
    }

    componentDidMount(): void {
        let task = this.props.task;
        if(task.subtasks !== undefined) {
            this.subtasks = task.subtasks.map(s => mapToSubtaskReadModel(s));
        }
        if(task.tags !== undefined) {
            this.tags = task.tags.map(t =>  mapToTagReadModel(t));
        }
        this.task = mapToTaskReadModel(task);
        this.loaded = true;
    }

    updateSubtask = (subtask: SubtaskReadModel, i: number) => {
        this.subtasks[i] = subtask;
    };

    deleteSubtask = (i: number) => {
        this.subtasks = this.subtasks.filter((s,ind) => ind !== i);
    };
    
    renderInputForSubtasks() {
        return(
            <>
                {this.subtasks.map((s, i) => {
                    if(s.order > 0) {
                        
                    } else {
                        s.order = i;
                    }
                    return (
                        <SubtaskUploadWindow key={i} updateSubtask={this.updateSubtask} subtask={s} deleteSubtask={this.deleteSubtask} index={i} />
                    );
                })}
            </>
        );
    }

    renderTags(tags: TagViewModel[], update: boolean) {
        return (
            <div className="row" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                {tags.map((tag, i) => {
                    let outline = !this.tags.includes(tag);
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
                })}
            </div>
        );
    }

    renderSubtags(subtags: SubtagViewModel[], update: boolean) {
        return (
            <div className="row" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                {subtags.map((subtag, i) => {
                    let outline = !this.subtags.includes(subtag);
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
                            onClick={() => this.toggleSubtag(subtag)}>
                            {subtag.name}
                        </Button>
                    );
                })}
            </div>
        );
    }
    
    renderInstructionField() {
        return(
            <div className="row justify-content-center">
                <Label className="inputLabel" align="center">
                    Введите инструкцию к заданию
                </Label>
                <Input
                    style={{width: "70%"}}
                    defaultValue={this.task.instruction}
                    onChange={(e) => this.inputInstruction(e)}/>
                <Fade in={this.renderEmptyWarning}
                      style={{fontSize: "0.7em", color: "red", marginTop: "0px", width: "70%"}}>
                    это поле не может быть пустое
                </Fade>
            </div>
        );
    }

    renderTextField() {
       /* if(this.task.taskType)
        return(
            <></>
        );*/
    }

    renderAddSubtaskButton() {
        return(
            <div className="row justify-content-center">
                <Button 
                    style={{width: "70%", marginTop: "15px"}}
                    onClick={() => this.addSubtask()}
                    outline color="secondary">
                    <span className="addTaskText">ДОБАВИТЬ ПОДЗАДАНИЕ</span>
                </Button>
            </div>
        );
    }
 
    renderCaution() {
        setTimeout(() => {
            this.notSaved = false;
            this.saved = false;
        }, 6000);
        return(
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и задание не сохранилось</Alert>}
                {this.saved && <Alert color="success">Задание успешно сохранилось</Alert>}
            </>
        );
    }

    renderSaveButton() {
        return(
            <Button
                outline color="success"
                style={{width: "70%", marginBottom: "5px"}}
                onClick={() => this.saveTask()}>
                Сохранить упражнение
            </Button>
        );
    }

    renderTaskUpdloadWindow() {
        return (
            <>
                <ModalBody>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            {getTaskTitle(this.task.taskType)}
                        </div>
                        {this.renderCaution()}
                        {this.renderInstructionField()}
                        {this.renderTextField()}
                        {this.renderInputForSubtasks()}
                        {this.renderAddSubtaskButton()}
                        {this.renderTags(this.tags, this.update)}
                        {this.renderSubtags(this.subtags, this.update)}
                    </div>
                </ModalBody>
                <div className="row justify-content-center" style={{marginTop: "15px"}}>
                    {this.renderSaveButton()}
                </div>
            </>
        );
    }

    render() {
        return(
            <>
                {this.loaded && this.renderTaskUpdloadWindow()}
            </>
        );
    }

    addSubtask() {
        let subtask = new SubtaskReadModel();
        subtask.subtaskType = subtaskTranspiler(this.task.taskType);
        let subtasks = this.subtasks;
        subtasks.push(subtask);
        this.subtasks = subtasks;
    }

    addTag(tag: TagViewModel) {
        let tagReadModel = mapToTagReadModel(tag);
        this.tags.push(tagReadModel);
    }

    inputInstruction(event: React.FormEvent<HTMLInputElement>) {
        let value = event.currentTarget.value;
        this.renderEmptyWarning = value === "" || value === null || value === undefined;
        this.task.instruction = value;
    }

    saveTask() {
        let task = this.task;
        task.subtasks = this.subtasks;
        task.tagIds = this.tags.map(t => t.id);
        this.props.taskStore.addOrUpdateTask(this.task, this.props.lessonId)
            .then((status) => {
                if(this.props.lessonId !== null) {
                    if(status === 200) {
                        this.props.taskStore.getTasksByLesson(this.props.lessonId);
                    }
                } else {
                    this.props.taskStore.getTasks(new Array<SubtagReadModel>(0));
                }
                this.notSaved = status !== 200;
                this.saved = status === 200;
        });
    }

    toggleTag(tag: TagViewModel) {
        if(this.tags.filter(t => t.id === tag.id).length > 0) {
            this.tags = this.tags
                .filter(t => t !== tag);
        } else {
            this.tags.push(tag);
        }
        this.updateToggle();
    }

    toggleSubtag(subtag: SubtagViewModel) {
        if(this.subtags.filter(t => t.id === subtag.id).length > 0) {
            this.subtags = this.subtags
                .filter(t => t !== subtag);
        } else {
            this.subtags.push(subtag);
        }
        this.updateToggle();
    }

    updateToggle() {
        this.update = !this.update;
    }
}

export default TaskUploadWindow;