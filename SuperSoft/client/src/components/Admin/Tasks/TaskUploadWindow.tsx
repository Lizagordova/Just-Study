﻿import React, { Component } from "react";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";
import { Alert, Button, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { IUploadTaskProps } from "./IUploadTaskProps";
import SubtaskUploadWindow from "./SubtaskUploadWindow";
import { getTaskTitle } from "../../../functions/getTaskTitle";
import {subtaskTranspiler} from "../../../functions/subtaskTranspiler";
import {TagReadModel} from "../../../Typings/readModels/TagReadModel";
import {mapToTagReadModel} from "../../../functions/mapper";

@observer
class TaskUploadWindow extends Component<IUploadTaskProps> {
    task: TaskReadModel = new TaskReadModel();
    subtasks: SubtaskReadModel[] = new Array<SubtaskReadModel>();
    tags: TagReadModel[] = new Array<TagReadModel>();
    notSaved: boolean;
    saved: boolean;
    loaded: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            task: observable,
            notSaved: observable,
            loaded: observable,
            subtasks: observable,
            tags: observable,
            saved: observable
        });
    }

    componentDidMount(): void {
        let task = this.props.task;
        if(task.subtasks !== undefined) {
            this.subtasks = task.subtasks;
        }
        if(task.tags !== undefined) {
            this.tags = task.tags;
        }
        this.task = task;
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
                        <SubtaskUploadWindow key={i} updateSubtask={this.updateSubtask} subtask={s} deleteSubtask={this.deleteSubtask} index={i}/>
                    );
                })}
            </>
        );
    }

    renderTags() {
        let tags = this.props.store.tags;
        if(tags !== undefined && tags.length !== 0) {
            return(
                <div className="row justify-content-center">
                    <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                        {tags.map((tag) => {
                            return(
                                <option key={tag.id} onClick={() => this.addTag(tag)}>
                                    {tag.name}
                                </option>
                            );
                        })}
                    </Input>
                </div>
            );
        }
    }

    renderInstructionField() {
        return(
            <div className="row justify-content-center">
                <Label className="inputLabel" align="center">
                    Введите инструкцию к заданию
                </Label>
                <Input
                    style={{width: "70%"}}
                    value={this.task.instruction}
                    onChange={(e) => this.inputInstruction(e)}/>
            </div>
        );
    }

    renderTextField() {
        return(
            <></>
        );
    }

    renderAddSubtaskButton() {
        return(
            <div className="row justify-content-center">
                <Button 
                    style={{width: "70%", marginTop: "10px"}}
                    onClick={() => this.addSubtask()}
                    outline color="secondary">
                    <span className="addTaskText">ДОБАВИТЬ ПОДЗАДАНИЕ</span>
                </Button>
            </div>
        );
    }
 
    renderCaution() {
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
                        {this.renderTags()}
                    </div>
                </ModalBody>
                <div className="row justify-content-center" style={{marginTop: "10px"}}>
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
        this.task.instruction = event.currentTarget.value;
    }

    saveTask() {
        let task = this.task;
        task.subtasks = this.subtasks;
        task.tags = this.tags;
        this.props.store.addOrUpdateTask(this.task, this.props.lessonId)
            .then((status) => {
                if(status === 200) {
                    this.props.store.getTasksByLesson(this.props.lessonId);
                }
                this.notSaved = status !== 200;
                this.saved = status === 200;
        });
    }
}

export default TaskUploadWindow;