import React, { Component } from "react";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";
import { Alert, Button, ModalBody, ModalFooter, Input } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { IUploadTaskProps } from "./IUploadTaskProps";
import FillGapsUploadSubtask from "./FllGapsUploadSubtask";

@observer
class FillGapsUploadTask extends Component<IUploadTaskProps> {
    task: TaskReadModel = new TaskReadModel();
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            task: observable,
            notSaved: observable,
        });
    }

    componentDidMount(): void {
        this.task = this.props.task;
    }

    updateSubtask(subtask: SubtaskReadModel, i: number) {
        this.task.subtasks[i] = subtask;
    }

    deleteSubtask(i: number) {
        this.task.subtasks = this.task.subtasks.filter((s,ind) => ind !== i);
    }

    renderInputForSubtasks() {
        return(
            <>
                {this.task.subtasks.map((s, i) => {
                    return (
                        <FillGapsUploadSubtask key={i} updateSubtask={this.updateSubtask} subtask={s} deleteSubtask={this.deleteSubtask} order={i}/>
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
            <Input type="select" name="selectMulti" id="exampleSelectMulti" multiple>
                {tags.map((tag) => {
                    return(
                        <option key={tag.id} onClick={() => this.addTag(tag)}>
                            {tag.name}
                        </option>
                    );
                })}
            </Input>
        )
    }

    render() {
        return(
            <>
                <ModalBody>
                    ВВЕСТИ СЛОВА В ПРОПУСКИ
                    <div className="container-fluid">
                        {this.notSaved && <Alert color="danger">Что-то пошло не так и задание не сохранилось</Alert>}
                        <div className="row justify-content-center">
                            <label className="instruction">
                                Введите инструкцию к заданию
                            </label>
                            <textarea
                                className="taskInput"
                                value={this.task.instruction}
                                onChange={(e) => this.inputInstruction(e)}/>
                        </div>
                        {this.renderInputForSubtasks()}
                        <div className="row justify-content-center">
                            <Button className="addTask"
                                    onClick={this.addSubtask}
                                    outline color="secondary">
                                <span className="addTaskText">ДОБАВИТЬ ПОДЗАДАНИЕ</span>
                            </Button>
                        </div>
                        <div className="row justify-content-center">
                            {this.renderTags()}
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="saveTaskButton"
                        onClick={() => this.saveTask()}>
                        Сохранить упражнение
                    </Button>
                </ModalFooter>
            </>
        );
    }

    addSubtask() {
        this.task.subtasks.push(new SubtaskReadModel());
    }

    inputInstruction(event: React.FormEvent<HTMLTextAreaElement>) {
        this.task.instruction = event.currentTarget.value;
    }

    saveTask() {
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

export default FillGapsUploadTask;