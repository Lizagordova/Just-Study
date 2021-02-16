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
    subtask: SubtaskReadModel = new SubtaskReadModel();
    notSaved: boolean;

    constructor(props: IAddSubtaskProps) {
        super(props);
        makeObservable(this, {
            subtask: observable,
            notSaved: observable
        });
        console.log("props in constructor", this.props);
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
            <div className="row justify-content-center">
                <Button
                    outline color="success"
                    style={{width: "70%", marginTop: "5px", marginBottom: "5px"}}
                    onClick={() => this.saveSubtask()}>Сохранить</Button>
            </div>
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