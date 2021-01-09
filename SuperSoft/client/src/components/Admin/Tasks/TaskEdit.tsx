﻿import React, {Component} from 'react';
import TaskStore from "../../../stores/TaskStore";
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";
import {Button, Modal, ModalHeader} from "reactstrap";
import {observer} from "mobx-react";
import {TaskType} from "../../../Typings/enums/TaskType";
import DetailedAnswerUploadTask from "./DetailedAnswerUploadTask";

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
        let taskType = this.taskToEdit.taskType;
        if(taskType === TaskType.DetailedAnswer) {
            return (
                <DetailedAnswerUploadTask store={this.props.taskStore} lessonId={this.props.lessonId} toggle={this.props.toggle} task={this.props.task} />
            );
        }
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