import React, { Component } from "react";
import { Button } from "reactstrap";
import SubtaskUploadWindow from "./SubtaskUploadWindow";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import TaskStore from "../../../stores/TaskStore";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { TaskType } from "../../../Typings/enums/TaskType";
import { subtaskTranspiler } from "../../../functions/subtaskTranspiler";

class IAddSubtaskProps {
    order: number;
    taskStore: TaskStore;
    taskId: number;
    taskType: TaskType;
    toggle: any;
}

@observer
class AddSubtask extends Component<IAddSubtaskProps> {
    subtask: SubtaskReadModel;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            subtask: observable,
            notSaved: observable
        });
        this.subtask.taskId = this.props.taskId;
        this.subtask.subtaskType = subtaskTranspiler(this.props.taskType)
    }

    updateSubtask(subtask: SubtaskReadModel, order: number) {
        this.subtask = subtask;
    }

    renderSubtaskForm() {
        return(
            <SubtaskUploadWindow subtask={this.subtask} updateSubtask={this.updateSubtask} deleteSubtask={this.props.toggle} />
        );
    }

    renderSaveButton() {
        return (
            <Button onClick={() => this.saveSubtask()}>Сохранить</Button>
        );
    }

    render() {
        return(
            <>
                {this.renderSubtaskForm()}
                {this.renderSaveButton()}
            </>
        );
    }

    saveSubtask() {
        this.props.taskStore.addOrUpdateSubtask(this.subtask)
            .then((status) => {
                if(status === 200) {
                    this.props.toggle();
                } else {
                    this.notSaved = true;
                }
        });
    }
}

export default AddSubtask;