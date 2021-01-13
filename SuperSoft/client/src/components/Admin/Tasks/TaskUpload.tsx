﻿import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { TaskTypeTranslater } from "../../../consts/TaskTypeTranslater";
import { TaskType } from "../../../Typings/enums/TaskType";
import { observer } from "mobx-react";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";
import TaskUploadWindow from "./TaskUploadWindow";

class ITaskUploadProps {
    store: RootStore;
}

@observer
class TaskUpload extends Component<ITaskUploadProps> {
    taskUploadWindowOpen: boolean;
    taskType: TaskType;
    showMenu: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            taskUploadWindowOpen: observable,
            taskType: observable,
            showMenu: observable,
        });
    }

    modalToggle(taskType: TaskType) {
        this.taskType = taskType;
        this.showMenu = false;
    }

    renderMenu() {
        return(
            <ModalBody>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {TaskTypeTranslater.map(type => {
                            return (
                                <div className="col-6 align-items-center">
                                    <div className="row justify-content-center">
                                        <Button className="modalButton" outline color="secondary"
                                                onClick={() => this.modalToggle(type.type)}>
                                            {type.russian}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ModalBody>
        );
    }

    renderBody() {
        return(
            <>
                {this.showMenu && this.renderMenu()}
                {!this.showMenu && this.renderTaskUploadWindowByType()}
            </>
        );
    }

    renderTaskUploadWindowByType() {
        let task = new TaskReadModel();
        task.taskType = this.taskType;
       return(
           <TaskUploadWindow store={this.props.store.taskStore} lessonId={this.props.store.lessonStore.choosenLesson.id} toggle={this.toggleTaskUploadWindow} task={task} />
       );
    }

    renderButton() {
        return(
            <div className="row justify-content-center">
                <Button className="addTask"
                        onClick={() => this.toggleTaskUploadWindow()}
                        outline color="secondary">
                    <span className="addTaskText">ДОБАВИТЬ УПРАЖНЕНИЕ</span>
                </Button>
            </div>
        );
    }

    renderTaskUploadWindow() {
        return (
            <Modal
                centered={true}
                size="lg"
                isOpen={this.taskUploadWindowOpen}
                toggle={() => this.toggleTaskUploadWindow()}
            >
                <ModalHeader >
                    СОЗДАТЬ НОВОЕ УПРАЖНЕНИЕ
                </ModalHeader>
                {this.renderBody()}
                <Button
                    color="primary"
                    onClick={() => this.toggleTaskUploadWindow()}>
                    СКРЫТЬ УПРАЖНЕНИЯ
                </Button>
            </Modal>
        );
    }

    render() {
        return(
            <div className="container-fluid">
                {this.renderButton()}
                {this.renderTaskUploadWindow()}
            </div>
        );
    }

    toggleTaskUploadWindow() {
        this.taskUploadWindowOpen = !this.taskUploadWindowOpen;
    }
}

export default TaskUpload;