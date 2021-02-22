﻿import React, {Component} from 'react';
import TaskStore from "../../../stores/TaskStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { Button, Modal, ModalHeader } from "reactstrap";
import { observer } from "mobx-react";
import TaskUploadWindow from "./TaskUploadWindow";
import { mapToTaskReadModel } from "../../../functions/mapper";
import {toJS} from "mobx";
import LessonStore from "../../../stores/LessonStore";

class ITaskEditProps {
    taskStore: TaskStore;
    task: TaskViewModel;
    toggle: any;
    lessonId: number;
}

@observer
export class TaskEdit extends Component<ITaskEditProps> {
    taskToEdit: TaskViewModel;

    componentDidMount(): void {
        this.taskToEdit = this.props.task;
    }

    renderBody() {
        console.log("task from props", toJS(this.props.task));
        let taskReadModel = mapToTaskReadModel(this.props.task);
        taskReadModel.lessonId = this.props.lessonId;
        console.log("taskReadModel", toJS(taskReadModel));
        return(
            <TaskUploadWindow store={this.props.taskStore} lessonId={this.props.lessonId} toggle={this.props.toggle} task={taskReadModel} />
        );
    }

    render() {
        return(
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.props.toggle()}
            >
                <ModalHeader>
                    РЕДАКТИРОВАНИЕ УПРАЖНЕНИЯ
                </ModalHeader>
                {this.renderBody()}
                <Button color="primary"
                        onClick={() => this.props.toggle()}>
                    ОТМЕНИТЬ РЕДАКТИРОВАНИЕ
                </Button>
            </Modal>
        );
    }
}