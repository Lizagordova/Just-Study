import React, {Component} from "react";
import {Button} from "reactstrap";
import SubtaskUploadWindow from "./SubtaskUploadWindow";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import TaskStore from "../../../stores/TaskStore";
import {makeObservable, observable, toJS} from "mobx";
import { observer } from "mobx-react";
import { SubtaskType } from "../../../Typings/enums/SubtaskType";
import { translateSubtaskType} from "../../../functions/translater";
import { Input } from "reactstrap";
import { transformValueToSubtaskType } from "../../../functions/transformer";
import { Alert } from "reactstrap";

class IAddSubtaskProps {
    order: number;
    taskStore: TaskStore;
    taskId: number;
    toggle: any;
}

@observer
class AddSubtask extends Component<IAddSubtaskProps> {
    subtask: SubtaskReadModel = new SubtaskReadModel();
    notSaved: boolean;
    update: boolean;

    constructor(props: IAddSubtaskProps) {
        super(props);
        makeObservable(this, {
            subtask: observable,
            notSaved: observable,
            update: observable
        });
        this.subtask.taskId = this.props.taskId;
        this.subtask.subtaskType = SubtaskType.InsertWordsIntoGaps;
    }

    updateSubtask = (subtask: SubtaskReadModel) => {
        this.subtask = subtask;
    };

    renderSubtaskForm(update: boolean) {
        return(
            <SubtaskUploadWindow subtask={this.subtask} updateSubtask={this.updateSubtask} deleteSubtask={this.props.toggle} index={0} />
        );
    }

    renderWarnings() {
        setTimeout(() => {
            this.notSaved = false;
        }, 6000);
        return(
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и подзадание не сохранилось</Alert>}
            </>
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

    renderSelectSubtaskTypeButton() {
        return (
            <>
                <Input type="select" id="exampleSelect" onClick={(e) => this.handleSubtaskType(e)}>
                    <option disabled value="InsertWordsIntoGaps">{translateSubtaskType(SubtaskType.InsertWordsIntoGaps)}</option>
                    <option value="RightVerbForm">{translateSubtaskType(SubtaskType.RightVerbForm)}</option>
                    <option value="LoadAudio">{translateSubtaskType(SubtaskType.LoadAudio)}</option>
                    <option value="FillGaps">{translateSubtaskType(SubtaskType.FillGaps)}</option>
                    <option value="LoadFile">{translateSubtaskType(SubtaskType.LoadFile)}</option>
                    <option value="DetailedAnswer">{translateSubtaskType(SubtaskType.DetailedAnswer)}</option>
                </Input>
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderWarnings()}
                {this.renderSelectSubtaskTypeButton()}
                {this.renderSubtaskForm(this.update)}
                {this.renderSaveButton()}
            </>
        );
    }

    handleSubtaskType(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        this.subtask.subtaskType = transformValueToSubtaskType(event.currentTarget.value);
        this.update = !this.update;
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