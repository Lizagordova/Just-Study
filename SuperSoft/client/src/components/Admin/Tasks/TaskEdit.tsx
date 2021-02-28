import React, {Component} from 'react';
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
        return(
            <TaskUploadWindow store={this.props.taskStore} lessonId={this.props.lessonId} task={this.props.task} />
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
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.props.toggle()}
                   className="fa fa-window-close" aria-hidden="true"/>
                <div className="row justify-content-center">
                    РЕДАКТИРОВАНИЕ УПРАЖНЕНИЯ
                </div>
                {this.renderBody()}
                <Button color="primary"
                        onClick={() => this.props.toggle()}>
                    ОТМЕНИТЬ РЕДАКТИРОВАНИЕ
                </Button>
            </Modal>
        );
    }
}