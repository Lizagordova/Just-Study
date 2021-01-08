import React, { Component } from "react";
import { SubtaskReadModel } from "../../../Typings/readModels/SubtaskReadModel";
import { Input, Label } from "reactstrap";
import {makeObservable, observable} from "mobx";

class IUploadTaskProps {
    subtask: SubtaskReadModel;
    updateSubtask: any;
    deleteSubtask: any;
    order: number;
}

class DetailedAnswerUploadSubtask extends Component<IUploadTaskProps> {
    subtask: SubtaskReadModel;
    
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            subtask: observable
        });
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
                    <Label className="instruction">
                        Введите текст задания
                    </Label>
                    <textarea
                        className="taskInput"
                        defaultValue={this.subtask.text}
                        onChange={(e) => this.inputText(e)}/>
                    <Input className="fileInput"
                         type="file"
                         onChange={(e) => this.inputFile(e)}/>
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
}

export default DetailedAnswerUploadSubtask;