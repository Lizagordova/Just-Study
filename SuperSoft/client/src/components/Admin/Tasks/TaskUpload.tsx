﻿import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Button, Modal, ModalBody } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { TaskTypeTranslater } from "../../../consts/TaskTypeTranslater";
import { TaskType } from "../../../Typings/enums/TaskType";
import { observer } from "mobx-react";
import TaskUploadWindow from "./TaskUploadWindow";
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";

class ITaskUploadProps {
    store: RootStore;
    isTrainingOrPool: boolean;
}

@observer
class TaskUpload extends Component<ITaskUploadProps> {
    taskUploadWindowOpen: boolean = false;
    taskType: TaskType;
    showMenu: boolean = false;

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
                        {TaskTypeTranslater.map((type, i) => {
                            return (
                                <div className="col-6 align-items-center" style={{marginTop: "5px"}} key={i}>
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
        let task = new TaskViewModel();
        task.taskType = this.taskType;
        if(this.props.isTrainingOrPool) {
            return(
                <TaskUploadWindow taskStore={this.props.store.taskStore} lessonId={null} task={task}  tagStore={this.props.store.tagStore}/>
            );
        } else {
            return(
                <TaskUploadWindow taskStore={this.props.store.taskStore} lessonId={this.props.store.lessonStore.choosenLesson.id} task={task} tagStore={this.props.store.tagStore}/>
            ); 
        }
    }

    renderButton() {
        return(
            <div className="row justify-content-center" style={{marginTop: "10px", marginBottom: "10px"}}>
                <Button className="commonButton"
                        onClick={() => this.toggleTaskUploadWindow()}
                        outline color="secondary">
                    <span className="addTaskText">Добавить упражение</span>
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
                <i style={{marginLeft: '94%', width: '3%'}}
                   onClick={() => this.toggleTaskUploadWindow()}
                   className="fa fa-window-close fa-2x" aria-hidden="true" />
                <div className="row justify-content-center">
                    Создать новое упражнение
                </div>
                {this.renderBody()}
                <Button
                    color="primary"
                    onClick={() => this.toggleTaskUploadWindow()}>
                    Скрыть упражнения
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

    toggleTaskUploadWindow = () => {
        if(this.taskUploadWindowOpen) {
            let result = window.confirm('Вы уверены, что хотите закрыть это окно?');
            if(result) {
                this.taskUploadWindowOpen = !this.taskUploadWindowOpen;
                this.showMenu = true;
            }
        } else {
            this.taskUploadWindowOpen = !this.taskUploadWindowOpen;
            this.showMenu = true;
        }
    }
}

export default TaskUpload;