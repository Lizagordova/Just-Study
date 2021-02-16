﻿import React, { Component } from "react";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import { Input, Label, Tooltip } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { IUploadSubtaskProps } from "./IUploadSubtaskProps";
import { SubtaskType } from "../../../Typings/enums/SubtaskType";
import { getTooltipText } from "../../../functions/getTooltipText";
import { observer } from "mobx-react";

@observer
class SubtaskUploadWindow extends Component<IUploadSubtaskProps> {
    subtask: SubtaskReadModel = new SubtaskReadModel();
    tooltipOpen: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            subtask: observable,
            tooltipOpen: observable
        });
    }

    componentDidMount(): void {
        this.subtask = this.props.subtask;
    }
    
    renderOrderInput() {
        return(
            <>
                <Label>Номер</Label>
                <Input
                    value={this.subtask.order}
                    onChange={(e) => this.inputOrder(e)}/>
            </>
        );
    }

    renderTooltip() {
        
        let subtaskType = this.subtask.subtaskType;
        console.log("subtaskType", subtaskType);
        if(subtaskType === SubtaskType.FillGaps || subtaskType === SubtaskType.RightVerbForm) {
            return(
                <>
                    <span id="DisabledAutoHideExample">Введите текст задания</span>
                    <Tooltip placement="top" isOpen={this.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={() => this.tooltipToggle()}>
                        {getTooltipText(subtaskType)}
                    </Tooltip>
                </>
            );
        }
    }

    renderInputText() {
        return(
            <>
                <Input
                    className="taskInput"
                    defaultValue={this.subtask.text}
                    onChange={(e) => this.inputText(e)}/>
            </>
        );
    }

    renderInputFile() {
        let subtaskType = this.subtask.subtaskType;
        if(subtaskType === SubtaskType.LoadAudio || subtaskType || SubtaskType.DetailedAnswer) {
            return(
                <Input
                    style={{marginTop: "5px"}}
                    className="fileInput"
                    type="file"
                    onChange={(e) => this.inputFile(e)}/>
            );
        }
    }

    renderInput() {
        return(
            <div className="row justify-content-center">
                <div className="col-2">
                    {this.renderOrderInput()}
                </div>
                <div className="col-10">
                    {this.renderTooltip()}
                    {this.renderInputText()}
                    {this.renderInputFile()}
                </div>
            </div>
        );
    }

    render() {
        return(
            <>
                {this.renderInput()}
            </>
        );
    }

    updateParentSubtask() {
        this.props.updateSubtask(this.subtask, this.subtask.order);
    }

    inputFile(event: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        this.subtask.file = event.target.files[0];
        this.updateParentSubtask();
    }

    inputText(event: React.FormEvent<HTMLInputElement>) {
        this.subtask.text = event.currentTarget.value;
        this.updateParentSubtask();
    }

    inputOrder(event: React.FormEvent<HTMLInputElement>) {
        let value = event.currentTarget.value;
        if(parseInt(value)) {
            this.subtask.order = Number(value);
        } else {
            this.subtask.order = 0;
        }
        this.updateParentSubtask();
    }

    tooltipToggle() {
        this.tooltipOpen = !this.tooltipOpen;
    }
}

export default SubtaskUploadWindow;