import React, { Component } from 'react';
import { Alert, Button, CardImg, CardText } from "reactstrap";
import { ISubtaskProps } from "./ISubtaskProps";
import { SubtaskViewModel } from "../../../Typings/viewModels/SubtaskViewModel";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { UserRole } from "../../../Typings/enums/UserRole";
import { UserSubtaskReadModel } from "../../../Typings/readModels/UserSubtaskReadModel";

@observer
export class DetailedAnswerSubtask extends Component<ISubtaskProps> {
    notSaved: boolean;
    userAnswer: UserSubtaskReadModel = new UserSubtaskReadModel();
    saved: boolean;
    notDeleted: boolean;

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
        this.props.store.taskStore.getUserSubtask(this.props.subtask.id)
            .then((userAnswer) => {
                this.userAnswer.answer = userAnswer.answer;
                this.userAnswer.status = userAnswer.status;
                this.userAnswer.subtaskId = this.props.subtask.id;
                this.userAnswer.userId = this.props.store.userStore.currentUser.id;
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

    renderInputAnswerArea() {
        return(
            <div className="col-12">
                <textarea
                    value={this.userAnswer.answer}
                    className="answerInput"
                    onChange={(e) => this.inputAnswer(e)}/>
            </div>
        )
    }

    renderSaveButton() {
        return(
            <div className="col-lg-offset-10 col-lg-2">
                <Button outline color="success" onClick={() => this.save()}>СОХРАНИТЬ</Button>
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

    renderSubtask(subtask: SubtaskViewModel) {
        return(
            <>
                {this.renderSubtaskText(subtask)}
                {this.renderImage(subtask)}
                <CardText>
                    <div className="row justify-content-center">
                        {this.renderControlButton()}
                        {this.renderInputAnswerArea()}
                    </div>
                    <div className="row justify-content-center">
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

    inputAnswer(event: React.FormEvent<HTMLTextAreaElement>) {
        this.userAnswer.answer = event.currentTarget.value;
    }

    save() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            this.props.store.taskStore.addOrUpdateUserSubtask(this.userAnswer)
                .then((status) => {
                    this.notSaved = status !== 200;
                    this.saved = status === 200;
            });
        }
    }

    deleteSubtask() {
        this.props.store.taskStore
            .deleteSubtask(this.props.subtask.id, this.props.store.lessonStore.choosenLesson.id)
            .then((status) => {
                this.notDeleted = status !== 200;
        });
    }
}