import React, {Component} from 'react';
import {Alert, Button, CardImg, CardText, Input} from "reactstrap";
import {ISubtaskProps} from "./ISubtaskProps";
import {SubtaskViewModel} from "../../../Typings/viewModels/SubtaskViewModel";
import {makeObservable, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {UserRole} from "../../../Typings/enums/UserRole";
import {UserSubtaskReadModel} from "../../../Typings/readModels/UserSubtaskReadModel";
import {UserSubtaskViewModel} from "../../../Typings/viewModels/UserSubtaskViewModel";
import {renderLoadingProgress} from "../../../functions/renderLoadingProgress";
import {renderSpinner} from "../../../functions/renderSpinner";

@observer
export class LoadAudioSubtask extends Component<ISubtaskProps> {
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
        this.setUserAnswer();
    }

    componentDidUpdate(prevProps: Readonly<ISubtaskProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.userSubtask !== this.props.userSubtask) {
            this.setUserAnswer();
        }
    }

    setInitialState() {
        this.notSaved = false;
        this.saved = false;
        this.loading = false;
        this.notDeleted = false;
    }

    setUserAnswer() {
        this.userAnswerReadModel.userId = this.props.userId;
        this.userAnswerReadModel.subtaskId = this.props.subtask.id;
        let userSubtask = this.props.userSubtask;
        this.userAnswer = userSubtask;
        this.userAnswerReadModel.status = userSubtask.status;
        this.userAnswerReadModel.answer = userSubtask.answer;
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
                <CardImg src={subtask.path.replace('client/build', './')} alt="Loading..."/>}
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
                {this.loading && renderSpinner()/*todo: сюда лучше потом progress*/}
            </>
        );
    }

    renderDeleteButton() {
        if(this.props.userId === this.props.store.userStore.currentUser.id) {
            return(
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.deleteAnswer()}
                   className="fa fa-window-close" aria-hidden="true"/>
            );
        }
    }

    renderUserAnswers() {
        return(
            <CardText>
                {this.userAnswer.answerFiles.map(ans => {
                    let answerPath = ans.replace('client/build', '.');
                    return(
                        <div className="row justify-content-center">
                            {this.renderDeleteButton()}
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

    renderAnswerInput() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            return (
                <CardText>
                    <div className="row justify-content-center">
                        {this.renderInputFile()}
                        {this.renderSaveButton()}
                        {this.renderCautions()}
                    </div>
                </CardText>
            );
        }
    }

    renderSubtask(subtask: SubtaskViewModel) {
        return(
            <>
                {this.renderControlButton()}
                {this.renderSubtaskText(subtask)}
                {this.renderImage(subtask)}
                {this.renderUserAnswers()}
                {this.renderAnswerInput()}
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
        this.setInitialState();
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
                });
        }
    }

       deleteAnswer() {//todo: РЕАЛИЗОВАТЬ
            /* let result = window.confirm('Вы уверены, что хотите удалить этот ответ?');
            if(result) {
                this.props.store
                    .taskStore
                    .deleteSubtask(materialId)
                    .then((status) => {
                        this.notDeleted = status !== 200;
                    });
            }*/
        }

        deleteSubtask() {
        this.props.store.taskStore
            .deleteSubtask(this.props.subtask.id, this.props.taskId)
            .then((status) => {
                this.notDeleted = status !== 200;
            });
        }
}