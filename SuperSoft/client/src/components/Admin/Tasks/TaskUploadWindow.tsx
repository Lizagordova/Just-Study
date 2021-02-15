import React, { Component } from "react";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";
import { Alert, Button, ModalBody, ModalFooter, Input, Label } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { IUploadTaskProps } from "./IUploadTaskProps";
import SubtaskUploadWindow from "./SubtaskUploadWindow";
import { getTaskTitle } from "../../../functions/getTaskTitle";
import {subtaskTranspiler} from "../../../functions/subtaskTranspiler";

@observer
class TaskUploadWindow extends Component<IUploadTaskProps> {
    task: TaskReadModel = new TaskReadModel();
    subtasks: SubtaskReadModel[] = new Array<SubtaskReadModel>();
    notSaved: boolean;
    loaded: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            task: observable,
            notSaved: observable,
            loaded: observable,
            subtasks: observable
        });
    }

    componentDidMount(): void {
        let task = this.props.task;
        if(task.subtasks !== undefined) {
            this.subtasks = task.subtasks;
        }
        this.task = task;
        this.loaded = true;
    }

    updateSubtask(subtask: SubtaskReadModel, i: number) {
        this.subtasks[i] = subtask;
    }

    deleteSubtask(i: number) {
        this.subtasks = this.subtasks.filter((s,ind) => ind !== i);
    }

    renderInputForSubtasks() {
        return(
            <>
                {this.subtasks.map((s, i) => {
                    let order = i;
                    if(s.order > 0) {
                        order = s.order;
                    }
                    return (
                        <SubtaskUploadWindow key={i} updateSubtask={this.updateSubtask} subtask={s} deleteSubtask={this.deleteSubtask} order={order}/>
                    );
                })}
            </>
        );
    }

    addTag(tag: TagViewModel) {
        this.task.tags.push(tag);
    }

    renderTags() {
        let tags = this.props.store.tags;
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
        )
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
            <> {this.notSaved && <Alert color="danger">Что-то пошло не так и задание не сохранилось</Alert>}</>
        );
    }

    renderSaveButton() {
        return(
            <Button
                outline color="success"
                style={{width: "70%"}}
                onClick={() => this.saveTask()}>
                Сохранить упражнение
            </Button>
        );
    }

    renderTaskUpdloadWindow() {
        return (
            <>
                <ModalBody>
                    {getTaskTitle(this.task.taskType)}
                    <div className="container-fluid">
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

    inputInstruction(event: React.FormEvent<HTMLInputElement>) {
        this.task.instruction = event.currentTarget.value;
    }

    saveTask() {
        this.task.subtasks = this.subtasks;
        this.props.store.addOrUpdateTask(this.task, this.props.lessonId)
            .then((status) => {
                if(status === 200) {
                    this.props.toggle();
                    this.notSaved = false;
                } else {
                    this.notSaved = true;
                }
        });
    }
}

export default TaskUploadWindow;