import React, { Component } from 'react';
import {Badge, CardText, DropdownItem, DropdownMenu, ButtonDropdown, DropdownToggle} from "reactstrap";
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
export class RightVerbFormSubtask extends Component<ISubtaskProps> {
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
        this.props.store.taskStore.getUserSubtask(this.subtask.id, this.props.store.userStore.currentUser.id)
            .then((userAnswer) => {
                this.userAnswerGroups = userAnswer.userSubtaskAnswerGroups;
            });
    }

    parseSubtask(subtask: SubtaskViewModel) {
        let regExp = /\d+/g;
        let text = subtask.text;
        let groupIds = text.match(regExp);
        let partsOfSentence = new Array<string>();
        if (groupIds !== null) {
            for(let i = 0; i < groupIds.length; i++) {
                text = text.replace(groupIds[i], "-").replace("[", "").replace("]", "");
            }
            partsOfSentence = text.split("-");
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
                            {groupIds !== null && i < groupIds.length && <Dropdown answerGroup={this.getAnswerGroup(groupIds[0])} store={this.props.store} userAnswerGroup={this.getUserAnswerGroup(groupIds[0])}/>}
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

class IDropdownProps {
    answerGroup: SubtaskAnswerGroupViewModel;
    userAnswerGroup: UserSubtaskAnswerGroupViewModel;
    store: RootStore;
}

@observer
class Dropdown extends Component<IDropdownProps> {
    userAnswerGroup: UserSubtaskAnswerGroupViewModel;
    answerGroup : SubtaskAnswerGroupViewModel;
    isOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            userAnswerGroup: observable,
            answerGroup: observable,
            isOpen: observable
        });
        this.userAnswerGroup = this.props.userAnswerGroup;
        this.answerGroup = this.props.answerGroup;
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }

    click(event: React.MouseEvent<HTMLElement, MouseEvent>) {
        let id = event.currentTarget.id;
        let answer = this.answerGroup.answers.find(a => a.id === Number(id));
        if(answer !== undefined && answer.isRight) {
            this.userAnswerGroup.status = 4;
        } else {
            this.userAnswerGroup.status = this.userAnswerGroup.status === 0 ? 1 : 2;
        }
        this.userAnswerGroup.lastAnswer = id;
        this.addOrUpdateUserAnswerGroup();
    }

    renderDropdownToggle() {
        let lastAnswerId = this.userAnswerGroup.lastAnswer === undefined ? 0 : this.userAnswerGroup.lastAnswer;
        let status = this.userAnswerGroup.status;
        let answers = this.answerGroup.answers;
        if(lastAnswerId !== 0 && answers.findIndex(a => a.id == lastAnswerId) !== -1) {
            let index =  answers.findIndex(a => a.id == lastAnswerId);
            return (
                <DropdownToggle caret outline color={status === 4 || status === 3 ? "success" : status === 2 || status === 1 ? "danger" : "primary"} disabled={status === 4 || status === 2}>
                    {answers[index].answer}
                </DropdownToggle>
            );
        } else {
            return (
                <DropdownToggle caret outline color="primary">
                    {answers[0] !== undefined && answers[0].answer}
                </DropdownToggle>
            );
        }
    }

    renderMenu() {
        let answers = this.answerGroup.answers;
        return(
            <>
                <ButtonDropdown isOpen={this.isOpen} toggle={() => this.toggle()}>
                    {this.renderDropdownToggle()}
                    <DropdownMenu>
                        {answers.map((answer) => {
                            return(
                                <DropdownItem
                                    onClick={(e) => this.click(e)}
                                    id={answer.id.toString()}
                                >{answer.answer}</DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </ButtonDropdown>
            </>
        )
    }

    render() {
        return(
            <>
                {this.renderMenu()}
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