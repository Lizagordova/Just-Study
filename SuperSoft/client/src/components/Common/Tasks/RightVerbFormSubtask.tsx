import React, {Component} from 'react';
import {Badge, ButtonDropdown, CardText, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap";
import {ISubtaskProps} from "./ISubtaskProps";
import {makeObservable, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {UserRole} from "../../../Typings/enums/UserRole";
import {UserSubtaskReadModel} from "../../../Typings/readModels/UserSubtaskReadModel";
import {SubtaskViewModel} from "../../../Typings/viewModels/SubtaskViewModel";
import {SubtaskAnswerGroupViewModel} from "../../../Typings/viewModels/SubtaskAnswerGroupViewModel";
import {UserSubtaskAnswerGroupViewModel} from "../../../Typings/viewModels/UserSubtaskAnswerGroupViewModel";
import {UserSubtaskAnswerGroupReadModel} from "../../../Typings/readModels/UserSubtaskAnswerGroupReadModel";
import RootStore from "../../../stores/RootStore";
import {CompletingStatus} from "../../../Typings/enums/CompletingStatus";
import {mapToUserSubtaskAnswerGroupReadModel} from "../../../functions/mapper";

@observer
export class RightVerbFormSubtask extends Component<ISubtaskProps> {
    saved: boolean;
    notDeleted: boolean;
    partsOfSentence: string [] = new Array<string>();
    answerGroupIds: RegExpMatchArray | null;
    userAnswerGroups: UserSubtaskAnswerGroupViewModel[] = new Array<UserSubtaskAnswerGroupViewModel>();
    subtask: SubtaskViewModel = new SubtaskViewModel();
    loaded: boolean = false;
    update: boolean;

    constructor(props: ISubtaskProps) {
        super(props);
        makeObservable(this, {
            saved: observable,
            notDeleted: observable,
            partsOfSentence: observable,
            answerGroupIds: observable,
            subtask: observable,
            loaded: observable,
            update: observable
        });
        this.subtask = this.props.subtask;
    }

    updateToggle() {
        this.update = !this.update;
    }

    componentDidUpdate(prevProps: Readonly<ISubtaskProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.userSubtask !== this.props.userSubtask) {
            this.userAnswerGroups = this.props.userSubtask.userSubtaskAnswerGroups;
            this.updateToggle();
        }
    }

    componentDidMount(): void {
        this.parseSubtask(this.subtask);
        this.userAnswerGroups = this.props.userSubtask.userSubtaskAnswerGroups;
        this.loaded = true;
    }

    parseSubtask(subtask: SubtaskViewModel) {
        let regExp = /\[\d+/g;
        let text = subtask.text;
        let groupIds = text.match(regExp);
        let partsOfSentence = new Array<string>();
        if (groupIds !== null) {
            for(let i = 0; i < groupIds.length; i++) {
                groupIds[i] = groupIds[i].replace("[", "");
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
                <i onClick={() => this.deleteSubtask()}
                   className="fa fa-trash-o fa-2x deleteButton" aria-hidden="true"/>
            );
        }
    }

    renderBadge() {
        return(
            <Badge outline color="primary" className="subtaskBadge">
                {this.props.order + 1}
            </Badge>
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
                            {groupIds !== null && i < groupIds.length && <Dropdown answerGroup={this.getAnswerGroup(groupIds[i])} store={this.props.store} userAnswerGroup={this.getUserAnswerGroup(groupIds[i])} key={i}/>}
                        </>
                    )
                })}
            </>
        );
    }

    renderSubtask(update: boolean) {
        return (
            <div className="container-fluid taskBlock">
                <div className="row justify-content-center">
                    {this.renderControlButton()}
                </div>
                <div className="row justify-content-start">
                    {this.renderBadge()}
                    {this.renderSentence()}
                </div>
            </div>
        )
    }

    render() {
        return(
            <>
                {this.loaded && this.renderSubtask(this.update)}
            </>
        );
    }

    deleteSubtask() {
        this.props.store.taskStore
            .deleteSubtask(this.props.subtask.id, this.props.taskId)
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
    userAnswerGroup: UserSubtaskAnswerGroupViewModel = new UserSubtaskAnswerGroupViewModel();
    answerGroup : SubtaskAnswerGroupViewModel = new SubtaskAnswerGroupViewModel();
    isOpen: boolean;

    constructor(props: IDropdownProps) {
        super(props);
        makeObservable(this, {
            userAnswerGroup: observable,
            answerGroup: observable,
            isOpen: observable
        });
        this.setUserAnswerGroup();
        this.answerGroup = this.props.answerGroup;
    }

    componentDidUpdate(prevProps: Readonly<IDropdownProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.userAnswerGroup !== this.props.userAnswerGroup) {
            this.setUserAnswerGroup();
        }
    }

    setUserAnswerGroup() {
        if(this.props.userAnswerGroup !== undefined) {
            this.userAnswerGroup = this.props.userAnswerGroup;
        } else {
            let userAnswerGroup = new UserSubtaskAnswerGroupViewModel();
            userAnswerGroup.status = CompletingStatus.NotCompleted;
            this.userAnswerGroup = userAnswerGroup;
        }
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
                <ButtonDropdown isOpen={this.isOpen} toggle={() => this.toggle()} style={{marginLeft: "4px", marginRight: "4px"}}>
                    {this.renderDropdownToggle()}
                    <DropdownMenu>
                        {answers.map((answer) => {
                            return(
                                <DropdownItem
                                    key={answer.id.toString()}
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
            let answerGroupReadModel = mapToUserSubtaskAnswerGroupReadModel(this.userAnswerGroup);
            answerGroupReadModel.answerGroupId = this.answerGroup.id;
            answerGroupReadModel.userId = this.props.store.userStore.currentUser.id;
            this.props.store.taskStore.addOrUpdateUserSubtaskAnswerGroup(answerGroupReadModel);
        }
    }
}