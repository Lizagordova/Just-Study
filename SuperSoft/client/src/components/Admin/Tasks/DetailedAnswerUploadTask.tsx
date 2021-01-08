import React, { Component } from "react";
import TaskStore from "../../../stores/TaskStore";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";
import { Alert, Button, ModalBody, ModalFooter } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import {SubtaskReadModel} from "../../../Typings/readModels/SubtaskReadModel";
import DetailedAnswerUploadSubtask from "./DetailedAnswerUploadSubtask";

class IUploadTaskProps {
    store: TaskStore;
    lessonId: number;
    toggle: any;
    task: TaskReadModel;
}

@observer
class DetailedAnswerUploadTask extends Component<IUploadTaskProps> {
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
                        <DetailedAnswerUploadSubtask key={i} updateSubtask={this.updateSubtask} subtask={s} deleteSubtask={this.deleteSubtask} order={i}/>
                    );
                })}
            </>
        );
    }

    render() {
        return(
            <>
                <ModalBody>
                    ЗАДАНИЕ НА ЗАГРУЗКУ ПОЛНОГО ОТВЕТА
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
        this.props.store.addOrUpdateTask(this.task)
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

export default DetailedAnswerUploadTask;