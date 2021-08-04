import React, { Component } from 'react';
import { Alert, Button, CardImg, CardText, Input } from "reactstrap";
import { ISubtaskProps } from "./ISubtaskProps";
import { SubtaskViewModel } from "../../../Typings/viewModels/SubtaskViewModel";
import {makeObservable, observable, toJS} from "mobx";
import { observer } from "mobx-react";
import { UserRole } from "../../../Typings/enums/UserRole";
import { UserSubtaskReadModel } from "../../../Typings/readModels/UserSubtaskReadModel";
import { UserSubtaskViewModel } from "../../../Typings/viewModels/UserSubtaskViewModel";
import {renderSpinner} from "../../../functions/renderSpinner";
import {renderLoadingProgress} from "../../../functions/renderLoadingProgress";
import {getFileName} from "../../../functions/getFileName";
import {renderContent} from "../../../functions/renderContent";

@observer
export class LoadFileSubtask extends Component<ISubtaskProps> {
    notSaved: boolean;
    userAnswer: UserSubtaskViewModel = new UserSubtaskViewModel();
    saved: boolean;
    notDeleted: boolean;
    userAnswerReadModel: UserSubtaskReadModel = new UserSubtaskReadModel();
    loading: boolean;

    constructor(props: ISubtaskProps) {
        super(props);
        makeObservable(this, {
            notSaved: observable,
            userAnswer: observable,
            saved: observable,
            notDeleted: observable,
            loading: observable,
            userAnswerReadModel: observable
        });
        this.setUserAnswer(this.props.userId, this.props.subtask.id, this.props.userSubtask);
    }

    componentDidUpdate(prevProps: Readonly<ISubtaskProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.userSubtask !== this.props.userSubtask) {
            this.setUserAnswer(this.props.userId, this.props.subtask.id, this.props.userSubtask);
        }
    }

    setUserAnswer(userId: number, subtaskId: number, userSubtask: UserSubtaskViewModel) {
        this.userAnswerReadModel.userId = userId;
        this.userAnswerReadModel.subtaskId = subtaskId;
        this.userAnswer = userSubtask;
        this.userAnswerReadModel.status = userSubtask.status;
        this.userAnswerReadModel.answer = userSubtask.answer;
    }

    renderControlButton() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return(
                <i
                   onClick={() => this.deleteSubtask()}
                   className="fa fa-window-close fa-2x deleteButton" aria-hidden="true"/>
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

    renderSaveButton() {
        return(
            <div className="row justify-content-center">
                <Button outline color="success" onClick={() => this.save()}>
                    Сохранить
                </Button>
            </div>
        );
    }

    renderCautions() {
        setTimeout(() => {
            this.notSaved = false;
            this.saved = false;
            this.notDeleted = false;
        }, 6000);
        return(
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и задание не сохранилось</Alert>}
                {this.saved && <Alert color="success">Задание успешно сохранилось</Alert>}
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и задание не удалилось</Alert>}
                {this.loading && renderLoadingProgress()}
                </>
        );
    }

    renderDeleteButton() {
        if(this.props.userId === this.props.store.userStore.currentUser.id) {
            return(
                <i style={{marginLeft: '94%', width: '2%'}}
                   onClick={() => this.deleteAnswer()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
            );
        }
    }

    renderUserAnswers() {
        return(
            <div className="row justify-content-start">
                <div className="container-fluid">
                    {this.userAnswer.answerFiles.map(ans => {
                        if(ans !== null) {
                            return(
                                <div className= "row justify-content-start">
                                    {this.renderDeleteButton()}
                                    {renderContent(ans)}
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }

    renderInputFile() {
        return(
            <div className="row justify-content-start">
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
                    <div className="row justify-content-center">
                        {this.renderControlButton()}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderSubtaskText(subtask)}
                    </div>
                    {subtask.path !== null && <div className="row justify-content-center">
                        {renderContent(subtask.path)}
                    </div>}
                        {this.renderUserAnswers()}
                        {this.renderInputFile()}
                        {this.renderSaveButton()}
                        {this.renderCautions()}
            </>
        );
    }

    render() {
        return(
            <div className="container-fluid taskBlock">
                {this.renderSubtask(this.props.subtask)}
            </div>
        );
    }

    inputAnswer(event: React.ChangeEvent<HTMLInputElement>) {
        // @ts-ignore
        this.userAnswerReadModel.file = event.target.files[0];
    }

    save() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            this.loading = true;
            this.props.store.taskStore.addOrUpdateUserSubtask(this.userAnswerReadModel)
                .then((status) => {
                    this.notSaved = status !== 200;
                    this.saved = status === 200;
                    this.loading = false;
                    this.props.updateUserTask();
                });
        }
    }

    deleteAnswer() {
        let result = window.confirm('Вы уверены, что хотите удалить этот ответ?');
        if(result) {
            this.props.store
                .taskStore
                .deleteUserSubtask(this.props.userId, this.props.subtask.id, this.props.taskId)
                .then((status) => {
                    this.notDeleted = status !== 200;
                    this.props.updateUserTask();
                });
        }
    }

    deleteSubtask() {
        this.props.store.taskStore
            .deleteSubtask(this.props.subtask.id, this.props.taskId)
            .then((status) => {
                this.notDeleted = status !== 200;
        });
    }
}