import React, {Component} from 'react';
import TaskStore from "../../../stores/TaskStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { Button, Modal, ModalHeader } from "reactstrap";
import { observer } from "mobx-react";
import TaskUploadWindow from "./TaskUploadWindow";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";
import { mapToSubtaskReadModel } from "../../../functions/mapper";

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
        let task = this.props.task;
        let taskReadModel = new TaskReadModel();
        taskReadModel.instruction = task.instruction;
        taskReadModel.text = task.text;
        taskReadModel.taskType = task.taskType;
        taskReadModel.subtasks = task.subtasks.map(s => mapToSubtaskReadModel(s));
        taskReadModel.tags = task.tags;
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