﻿import React, { Component } from 'react';
import {Badge, CardText} from "reactstrap";
import {ISubtaskProps} from "./ISubtaskProps";
import {makeObservable, observable} from "mobx";
import {observer} from "mobx-react";
import {UserRole} from "../../../Typings/enums/UserRole";
import {UserSubtaskReadModel} from "../../../Typings/readModels/UserSubtaskReadModel";
import {SubtaskViewModel} from "../../../Typings/viewModels/SubtaskViewModel";
import {SubtaskAnswerGroupViewModel} from "../../../Typings/viewModels/SubtaskAnswerGroupViewModel";
import {UserSubtaskAnswerGroupViewModel} from "../../../Typings/viewModels/UserSubtaskAnswerGroupViewModel";
import {UserSubtaskAnswerGroupReadModel} from "../../../Typings/readModels/UserSubtaskAnswerGroupReadModel";
import RootStore from "../../../stores/RootStore";

@observer
export class FillGapsSubtask extends Component<ISubtaskProps> {
    notSaved: boolean;
    userAnswer: UserSubtaskReadModel = new UserSubtaskReadModel();
    saved: boolean;
    notDeleted: boolean;
    partsOfSentence: string [] = new Array<string>();
    answerGroupIds: RegExpMatchArray | null;
    userAnswerGroups: UserSubtaskAnswerGroupViewModel[] = new Array<UserSubtaskAnswerGroupViewModel>();
    subtask: SubtaskViewModel = new SubtaskViewModel();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notSaved: observable,
            userAnswer: observable,
            saved: observable,
            notDeleted: observable,
            partsOfSentence: observable,
            answerGroupIds: observable,
        });
        this.subtask = this.props.subtask;
    }

    componentDidMount(): void {
        this.parseSubtask(this.subtask);
        this.userAnswerGroups = this.props.userSubtask.userSubtaskAnswerGroups;
    }

    parseSubtask(subtask: SubtaskViewModel) {
        let regExp = /\[\d+\]/g;
        let text = subtask.text;
        let groupIds = text.match(regExp);
        let partsOfSentence = new Array<string>();
        if (groupIds !== null) {
            for(let i = 0; i < groupIds.length; i++) {
                groupIds[i] = groupIds[i].replace("[", "").replace("]", "");
                text = text.replace(groupIds[i], "-").replace("[", "").replace("]", "");
            }
            partsOfSentence = text.split("-");
            this.setState({answerGroupIds: groupIds, partsOfSentence: partsOfSentence});
        }
        this.answerGroupIds = groupIds;
        this.partsOfSentence = partsOfSentence;
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

    renderBadge(subtask: SubtaskViewModel) {
        return(
            <Badge outline color="primary">{subtask.order + 1 }</Badge>
        );
    }

    getUserAnswerGroup(groupId: string): UserSubtaskAnswerGroupViewModel {
        return this.userAnswerGroups.filter(ug => ug.answerGroupId === Number(groupId))[0];
    }

    getAnswerGroup(groupId: string): SubtaskAnswerGroupViewModel {
        return this.subtask.answerGroups.filter(ag => ag.id === Number(groupId))[0];
    }

    renderSentence() {
        let partsOfSentence = this.partsOfSentence;
        let groupIds = this.answerGroupIds;
        return(
            <>
                {partsOfSentence.map((p, i ) => {
                    return (
                        <>
                            <span style={{clear: 'both'}}>{p}</span>
                            {groupIds !== null && i < groupIds.length && <Gap answerGroup={this.getAnswerGroup(groupIds[0])} store={this.props.store} userAnswerGroup={this.getUserAnswerGroup(groupIds[0])}/>}
                        </>
                    )
                })}
            </>
        );
    }

    renderSubtask(subtask: SubtaskViewModel) {
        return (
            <>
                <CardText>
                    {this.renderControlButton()}
                    {this.renderBadge(subtask)}
                    {this.renderSentence()}
                </CardText>
            </>
        )
    }

    render() {
        return(
            <>
                {this.renderSubtask(this.props.subtask)}
            </>
        );
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

class IGapProps {
    answerGroup: SubtaskAnswerGroupViewModel;
    userAnswerGroup: UserSubtaskAnswerGroupViewModel;
    store: RootStore;
}

@observer
class Gap extends Component<IGapProps> {
    userAnswerGroup: UserSubtaskAnswerGroupViewModel;
    answerGroup : SubtaskAnswerGroupViewModel;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            userAnswerGroup: observable,
            answerGroup: observable
        });
        this.userAnswerGroup = this.props.userAnswerGroup;
        this.answerGroup = this.props.answerGroup;
    }

    inputChange(event: React.FormEvent<HTMLInputElement>) {
        this.userAnswerGroup.lastAnswer = event.currentTarget.value;
    }

    handleKeyPress(target: React.KeyboardEvent<HTMLInputElement>) {
        if(target.charCode === 13) {//todo: возможно, устарело и надо поменять
            this.checkAnswer();
        }
    }

    checkAnswer() {
        let lastAnswer = this.userAnswerGroup.lastAnswer.toLowerCase().trim();
        let rightAnswers = this.answerGroup.answers.filter(ans => ans.isRight).filter(ans => ans.answer.toLowerCase());
        let userRightAnswer = rightAnswers.filter(ans => ans.answer === lastAnswer);
        if(userRightAnswer === null) {//todo: возможно здесь undefined или length = 0
            this.userAnswerGroup.status = this.userAnswerGroup.status === 0 ? 1 : 2;
        } else {
            this.userAnswerGroup.status = 4;
        }
        this.addOrUpdateUserAnswerGroup();
    }

    renderInput() {
        let answers = this.answerGroup.answers;
        let status = this.userAnswerGroup.status;
        return(
            <input placeholder={answers[0].answer}
                type="text"
                className={status === 4 || status === 3 ? "fillGapInputRight" : status === 2 || status === 1 ? "fillGapInputWrong" : "fillGapInputPrimary"}
                disabled={status === 4 || status === 2}
                onChange={(e) => this.inputChange(e)}
                /* onBlur={() => this.checkAnswer()}*/
                value={this.userAnswerGroup.lastAnswer}
                onKeyPress={(e) => this.handleKeyPress(e)}
            />
        );
    }

    render() {
        return(
            <>
                {this.renderInput()}
            </>
        );
    }

    addOrUpdateUserAnswerGroup() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            let answerGroupReadModel = new UserSubtaskAnswerGroupReadModel();
            answerGroupReadModel.lastAnswer = this.userAnswerGroup.lastAnswer;
            answerGroupReadModel.status = this.userAnswerGroup.status;
            answerGroupReadModel.answerGroupId = this.userAnswerGroup.answerGroupId;
            answerGroupReadModel.userId = this.props.store.userStore.currentUser.id;
            this.props.store.taskStore.addOrUpdateUserSubtaskAnswerGroup(answerGroupReadModel);
        }
    }
}