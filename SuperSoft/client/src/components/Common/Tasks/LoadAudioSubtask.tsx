import React, { Component } from 'react';
import { Alert, Button, CardImg, CardText, Input } from "reactstrap";
import { ISubtaskProps } from "./ISubtaskProps";
import { SubtaskViewModel } from "../../../Typings/viewModels/SubtaskViewModel";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { UserRole } from "../../../Typings/enums/UserRole";
import { UserSubtaskReadModel } from "../../../Typings/readModels/UserSubtaskReadModel";
import { UserSubtaskViewModel } from "../../../Typings/viewModels/UserSubtaskViewModel";

@observer
export class LoadAudioSubtask extends Component<ISubtaskProps> {
    notSaved: boolean;
    userAnswer: UserSubtaskViewModel = new UserSubtaskViewModel();
    saved: boolean;
    notDeleted: boolean;
    userAnswerReadModel: UserSubtaskReadModel = new UserSubtaskReadModel();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notSaved: observable,
            userAnswer: observable,
            saved: observable,
            notDeleted: observable,
        });
    }

    componentDidMount(): void {
        this.userAnswerReadModel.userId = this.props.userId;
        this.userAnswerReadModel.subtaskId = this.props.subtask.id;
        this.props.store.taskStore.getUserSubtask(this.props.subtask.id, this.props.userId)
            .then((userSubtask) => {
                this.userAnswer = userSubtask;
                this.userAnswerReadModel.status = userSubtask.status;
                this.userAnswerReadModel.answer = userSubtask.answer;
        });
    }

    renderControlButton() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return(
                <i style={{marginLeft: '98%', width: '2%'}}
                   onClick={() => this.deleteSubtask()}
                   className="fa fa-window-close" aria-hidden="true"/>
            );
        }
    }

    renderSubtaskText(subtask: SubtaskViewModel) {
        return(
            <>
                {subtask.text !== null && <CardText>
                    {subtask.text}
                </CardText>}
            </>
        );
    }

    renderImage(subtask: SubtaskViewModel) {
        return (
            <>
                {subtask.path !== null &&
                <CardImg src={subtask.path.replace('ClientApp/build', './')} alt="Loading..."/>}
            </>
        );
    }

    renderSaveButton() {
        return(
            <div className="col-3">
                <Button outline color="primary" onClick={() => this.save()}>СОХРАНИТЬ</Button>
            </div>
        );
    }

    renderCautions() {
        return(
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и задание не сохранилось</Alert>}
                {this.saved && <Alert color="success">Задание успешно сохранилось</Alert>}
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и задание не удалилось</Alert>}
            </>
        );
    }

    renderUserAnswers() {
        return(
            <CardText>
                {this.userAnswer.answerPaths.map(ans => {
                    let answerPath = ans.replace('ClientApp/build', '.');
                    return(
                        <div className="row justify-content-center">
                            <audio className="audio" controls>
                                <source src={answerPath} type="audio/mpeg"/>
                            </audio>
                        </div>
                    );
                })}
            </CardText>
        );
    }

    renderInputFile() {
        return(
            <div className="col-9">
                <Input className="fileInput"
                    type="file"
                    id="loadAudioFile"
                    onChange={(e) => this.inputAnswer(e)}/>
            </div>
        );
    }

    renderSubtask(subtask: SubtaskViewModel) {
        return(
            <>
                {this.renderControlButton()}
                {this.renderSubtaskText(subtask)}
                {this.renderImage(subtask)}
                {this.renderUserAnswers()}
                <CardText>
                    <div className="row justify-content-center">
                        {this.renderInputFile()}
                        {this.renderSaveButton()}
                        {this.renderCautions()}
                    </div>
                </CardText>
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderSubtask(this.props.subtask)}
            </>
        );
    }

    inputAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        let file = event.target.files[0];
        this.userAnswerReadModel.files.push(file);
    }

    save() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            this.props.store.taskStore.addOrUpdateUserSubtask(this.userAnswerReadModel)
                .then((status) => {
                    this.notSaved = status !== 200;
                    this.saved = status === 200;
                });
        }
    }

    deleteAnswer() {//todo: РЕАЛИЗОВАТЬ
        
    }

    deleteSubtask() {
        this.props.store.taskStore
            .deleteSubtask(this.props.subtask.id, this.props.store.lessonStore.choosenLesson.id)
            .then((status) => {
                this.notDeleted = status !== 200;
            });
    }
}