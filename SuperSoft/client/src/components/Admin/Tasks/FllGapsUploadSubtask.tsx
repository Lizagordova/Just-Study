import React, { Component } from "react";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import { Input, Label, Tooltip } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { IUploadSubtaskProps } from "./IUploadSubtaskProps";

class FillGapsUploadSubtask extends Component<IUploadSubtaskProps> {
    subtask: SubtaskReadModel;
    tooltipOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            subtask: observable,
            tooltipOpen: observable,
        });
    }

    componentDidMount(): void {
        this.subtask = this.props.subtask;
        this.subtask.order = this.props.order;
    }

    renderInput() {
        return(
            <div className="row justify-content-center">
                <div className="col-2">
                    <Label>Номер</Label>
                    <Input
                        value={this.subtask.order}
                        onChange={(e) => this.inputOrder(e)}/>
                </div>
                <div className="col-10">
                    <span id="DisabledAutoHideExample">Введите предложение</span>
                    <Tooltip placement="top" isOpen={this.tooltipOpen} autohide={true} target="DisabledAutoHideExample" toggle={this.tooltipToggle}>
                        Подсказка
                        "Поставить слово в нужную форму": запишите в квадратных скобках начальную форму слова, слэш, затем правильную форму слова. "Заполнить пропуски": запишите в квадратных скобках только правильное слово (выражение). "Заполнить пропуски любым текстом без проверки": просто запишите пустые квадратные скобки на месте пропуска (без пробела).
                        Пример:
                        1. I [to play/am playing] tennis.
                        2. This flower is [better] than that.
                    </Tooltip>
                    <Label className="instruction">
                        Введите текст задания
                    </Label>
                    <textarea
                        className="taskInput"
                        defaultValue={this.subtask.text}
                        onChange={(e) => this.inputText(e)}/>
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
        this.props.updateSubtask(this.subtask, this.props.order);
    }

    inputFile(event: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        let file = event.target.files[0];
        this.updateParentSubtask();
    }

    inputText(event: React.FormEvent<HTMLTextAreaElement>) {
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

export default FillGapsUploadSubtask;