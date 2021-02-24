import React, {Component} from 'react';
import {Alert, Button, CardImg, CardText} from "reactstrap";
import {ISubtaskProps} from "./ISubtaskProps";
import {SubtaskViewModel} from "../../../Typings/viewModels/SubtaskViewModel";
import {makeObservable, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {UserRole} from "../../../Typings/enums/UserRole";
import {UserSubtaskReadModel} from "../../../Typings/readModels/UserSubtaskReadModel";
import {UserSubtaskViewModel} from "../../../Typings/viewModels/UserSubtaskViewModel";

@observer
export class DetailedAnswerSubtask extends Component<ISubtaskProps> {
    notSaved: boolean;
    userAnswer: UserSubtaskReadModel = new UserSubtaskReadModel();
    saved: boolean;
    notDeleted: boolean;
    update: boolean;

    constructor(props: ISubtaskProps) {
        super(props);
        makeObservable(this, {
            notSaved: observable,
            userAnswer: observable,
            saved: observable,
            notDeleted: observable,
            update: observable
        });
        this.setUserAnswer(this.props.userId, this.props.subtask.id, this.props.userSubtask);
    }

    componentDidUpdate(prevProps: Readonly<ISubtaskProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.userSubtask !== this.props.userSubtask) {
            this.setUserAnswer(this.props.userId, this.props.subtask.id, this.props.userSubtask);
            this.updateToggle();
        }
    }

    updateToggle() {
        this.update = !this.update;
    }

    setInitialState() {
        this.notDeleted = false;
        this.saved = false;
        this.notSaved = false;
    }

    setUserAnswer(userId: number, subtaskId: number, userSubtask: UserSubtaskViewModel) {
        this.userAnswer.userId = userId;
        this.userAnswer.subtaskId = subtaskId;
        this.userAnswer.status = userSubtask.status;
        this.userAnswer.answer = userSubtask.answer;
    }
    
    renderControlButton() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return(
                <i style={{marginLeft: '98%', width: '2%'}}
                   onClick={() => this.deleteSubtask()}
                   className="fa fa-window-close" aria-hidden="true" />
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

    renderInputAnswerArea() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            return(
                <div className="col-12">
                    <textarea
                        style={{width: "90%"}}
                        value={this.userAnswer.answer}
                        className="answerInput"
                        onChange={(e) => this.inputAnswer(e)}/>
                </div>
            );
        }
    }

    renderSaveButton() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            return(
                <div className="col-lg-offset-10 col-lg-2">
                    <Button outline color="success" onClick={() => this.save()}>СОХРАНИТЬ</Button>
                </div>
            );
        }
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

    renderSubtask(subtask: SubtaskViewModel, update: boolean) {
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
                {this.renderSubtask(this.props.subtask, this.update)}
            </>
        );
    }

    inputAnswer(event: React.FormEvent<HTMLTextAreaElement>) {
        this.setInitialState();
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
            .deleteSubtask(this.props.subtask.id, this.props.taskId)
            .then((status) => {
                this.notDeleted = status !== 200;
        });
    }
}