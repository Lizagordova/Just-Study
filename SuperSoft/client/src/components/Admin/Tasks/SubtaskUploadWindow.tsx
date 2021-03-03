import React, {Component} from "react";
import {SubtaskReadModel} from "../../../Typings/readModels/SubtaskReadModel";
import { Input, Label, Tooltip, Fade } from "reactstrap";
import {makeObservable, observable} from "mobx";
import {IUploadSubtaskProps} from "./IUploadSubtaskProps";
import {SubtaskType} from "../../../Typings/enums/SubtaskType";
import {getTooltipText} from "../../../functions/getTooltipText";
import {observer} from "mobx-react";

@observer
class SubtaskUploadWindow extends Component<IUploadSubtaskProps> {
    subtask: SubtaskReadModel = new SubtaskReadModel();
    tooltipOpen: boolean = false;
    renderWarning: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            subtask: observable,
            tooltipOpen: observable,
            renderWarning: observable
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
                    defaultValue={this.subtask.order}
                    onChange={(e) => this.inputOrder(e)}/>
            </>
        );
    }

    renderTooltip() {
        let subtaskType = this.subtask.subtaskType;
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
                <Fade in={this.renderWarning}
                      style={{fontSize: "0.7em", color: "red", marginTop: "0px"}}>
                    Введённый текст пока не соответствует нужному формату(см. подсказку выше)
                </Fade>
            </>
        );
    }

    renderInputFile() {
        let subtaskType = this.subtask.subtaskType;
        if(subtaskType === SubtaskType.LoadAudio || subtaskType === SubtaskType.DetailedAnswer || subtaskType === SubtaskType.LoadFile) {
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
                <i style={{marginLeft: '95%', width: '3%'}}
                   onClick={() => this.handleDelete()}
                   className="fa fa-window-close fa-2x" aria-hidden="true" />
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
        this.validateInput();
        this.updateParentSubtask();
    }

    validateInput() {
        let text = this.props.subtask.text;
        let regExp = /\[(\w+?\D*?)\]/g;
        let groups = text.match(regExp);
        if(this.props.subtask.subtaskType === SubtaskType.RightVerbForm) {
            this.renderWarning = groups === null || groups.length === 0;
        } else if(this.props.subtask.subtaskType === SubtaskType.FillGaps) {
            this.renderWarning = groups === null || groups.length === 0;
        }
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

    handleDelete() {
        this.props.deleteSubtask(this.props.index);
    }
}

export default SubtaskUploadWindow;