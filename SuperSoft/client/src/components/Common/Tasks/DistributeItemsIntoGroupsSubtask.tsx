import React, {Component} from 'react';
import {ISubtaskProps} from "./ISubtaskProps";
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";
import {Button, Label} from "reactstrap";
import {playAudio} from "../../../functions/playAudio";
import {ActionType} from "../../../consts/ActionType";
import {mapToUserSubtaskReadModel} from "../../../functions/mapper";
import {CompletingStatus} from "../../../Typings/enums/CompletingStatus";
import {UserSubtaskViewModel} from "../../../Typings/viewModels/UserSubtaskViewModel";
import {UserRole} from "../../../Typings/enums/UserRole";

class Group {
    id: number;
    name: string;
    choosenItems: Item[] = new Array<Item>();
    action: ActionType = ActionType.None;
}

class Item {
    id: number;
    name: string;
    groupId: number;
}

@observer
export class DistributeItemsIntoGroupsSubtask extends Component<ISubtaskProps> {
    items: Item[] = new Array<Item>();
    choosenItem: Item = new Item();
    groups: Group[] = new Array<Group>();
    update: boolean;
    notDeleted: boolean;
    loaded: boolean;
    userSubtask: UserSubtaskViewModel = new UserSubtaskViewModel();
    
    constructor(props: ISubtaskProps) {
        super(props);
        makeObservable(this, {
           items: observable,
            choosenItem: observable,
            groups: observable,
            update: observable,
            notDeleted: observable,
            loaded: observable,
            userSubtask: observable,
        });
        this.setInitialState();
    }

    componentDidUpdate(prevProps: Readonly<ISubtaskProps>, prevState: Readonly<{}>, snapshot?: any) {
        if(prevProps.userSubtask.status !== this.props.userSubtask.status) {
            this.setInitialState();
        }
    }

    setInitialState() {
        this.userSubtask = this.props.userSubtask;
        this.items = new Array<Item>();
        this.groups = new Array<Group>();
        this.parseSubtask(this.props.userSubtask.status === CompletingStatus.Completed);
    }
    
    parseSubtask(userCompleted: boolean = false) {
        let groupsNotParsed = this.props.subtask.text.split(";");
        let groups = new Array<Group>();
        groupsNotParsed.forEach((groupNotParsed, index) => {
           let groupNameExp = /\(\w*?\D*?\)/;
           let itemsExp = /\[(\w*?\D*?)\]/;
           let groupName = groupNotParsed.match(groupNameExp);
           let itemsGroupParsed = groupNotParsed.match(itemsExp);
            let group = new Group();
            group.id = index;
            group.name = groupName !== null ? groupName[0].replace("(", "").replace(")", "") : "";
            if (itemsGroupParsed) {
                let itemsParsed = itemsGroupParsed[0].split(",");
                itemsParsed.map((itemNotParsed, i) => {
                    let item = new Item();
                    item.id = i;
                    item.groupId = index;
                    item.name = itemNotParsed.replace("[", "").replace("]", "");
                    if(userCompleted) {
                        group.choosenItems.push(item);
                    } else {
                        this.items.push(item);
                    }
                });
            }
            groups.push(group);
        });
        this.groups = groups;
        this.loaded = true;
    }
    
    renderItems(items: Item[]) {
        return (
            <div className="row justify-content-center">
                {items.map((item, index) => {
                    return (
                        <Button
                            key={index}
                            className="shuffledPart"
                            disabled={this.props.userSubtask.status === CompletingStatus.Completed}
                            onClick={() => this.chooseItem(item)}>
                            {item.name}
                        </Button>
                    );
                })}
            </div>
        );
    }

    getGroupClassName(type: ActionType) {
        let groupClassName = "";
        if(type === ActionType.isChoosenWrong) {
            groupClassName = "wrongAnswer";
        } else if(type === ActionType.isChoosenRight) {
            groupClassName = "rightAnswer";
        } else if(this.props.userSubtask.status === CompletingStatus.Completed) {
            groupClassName = "rightAnswer";
        }
        
        return groupClassName;
    }
    
    renderGroups(groups: Group[]) {
        return (
            <>
                {groups.map((group, index) => {
                    let groupClassName = this.getGroupClassName(group.action);
                    setTimeout(() => {
                        this.turnOffSettings(group.id);
                    }, 5000)
                    return(
                        <div key={index} className={`row justify-content-center ${groupClassName}`} style={{minHeight: "150px"}} onClick={() => this.checkTarget(group.id)}>
                            <Label style={{fontSize: "1.3em", width: "100%"}}>
                                {group.name}
                            </Label>
                            {this.renderItems(group.choosenItems)}
                        </div>
                    )
                })}
            </>
        );
    }

    renderSubtask(update: boolean) {
        return (
            <>
                {this.renderItems(this.items)}
                {this.renderGroups(this.groups)}
            </>
        );
    }
    
    render() {
        return(
            <div className="container-fluid">
                {this.loaded && this.renderSubtask(this.update)}                
            </div>
        );
    }

    chooseItem(item: Item) {
        this.choosenItem = item;
    }
    
    checkTarget(groupId: number) {
        if(this.props.userSubtask.status !== CompletingStatus.Completed) {
            let groups = this.groups;
            let choosenGroup = groups.find(g => g.id === groupId);
            // @ts-ignore
            let choosenGroupIndex = groups.indexOf(choosenGroup);
            if(this.choosenItem.groupId === groupId) {
                playAudio(ActionType.isChoosenRight);
                if(choosenGroup !== undefined) {
                    choosenGroup.action = ActionType.isChoosenRight;
                    choosenGroup.choosenItems.push(this.choosenItem);
                }
                this.items = this.items.filter(item => item !== this.choosenItem);
                this.toggler(ToggleType.ChoosenItem);
            } else {
                playAudio(ActionType.isChoosenWrong);
                if(choosenGroup !== undefined) {
                    choosenGroup.action = ActionType.isChoosenWrong;
                }
                this.toggler(ToggleType.ChoosenItem);
            }
            // @ts-ignore
            groups[choosenGroupIndex] = choosenGroup;
            this.toggler(ToggleType.Update);
            this.checkCompletion();   
        }
    }

    toggler(type: ToggleType) {
        if(type === ToggleType.Update) {
            this.update = !this.update;
        } else if(type === ToggleType.NotDeleted) {
            this.notDeleted = !this.notDeleted;
        } else if(type === ToggleType.ChoosenItem) {
            this.choosenItem = new Item();
        }
    }
    
    turnOffSettings(groupId: number) {
        let groups = this.groups;
        let choosenGroup = groups.find(group => group.id === groupId);
        if(choosenGroup !== undefined) {
            choosenGroup.action = ActionType.isNotChoosen;
        }
        this.toggler(ToggleType.Update);
    }

    checkCompletion() {
        if(this.items.length === 0) {
            this.userSubtask.status = CompletingStatus.Completed;
            this.saveResult();
        }
    }
    
    saveResult() {
        if(this.props.store.userStore.currentUser.role !== UserRole.Admin) {
            // @ts-ignore
            let userSubtask = mapToUserSubtaskReadModel(this.userSubtask, this.props.taskId, this.props.userId, null);
            this.props.store.taskStore
                .addOrUpdateUserSubtask(userSubtask);
        }
    }
}

enum ToggleType {
    Update,
    NotDeleted,
    ChoosenItem
}