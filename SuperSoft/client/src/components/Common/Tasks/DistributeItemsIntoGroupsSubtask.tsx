import React, {Component} from 'react';
import {ISubtaskProps} from "./ISubtaskProps";
import {observer} from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import {Button, Label} from "reactstrap";
import {playAudio} from "../../../functions/playAudio";
import {ActionType} from "../../../consts/ActionType";

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
    
    constructor(props: ISubtaskProps) {
        super(props);
        makeObservable(this, {
           items: observable,
            choosenItem: observable,
            groups: observable,
            update: observable,
            notDeleted: observable,
            loaded: observable,
        });
        this.parseSubtask();
    }

    parseSubtask() {
        let groupsNotParsed = this.props.subtask.text.split(";");
        let groups = new Array<Group>();
        groupsNotParsed.forEach((groupNotParsed, index) => {
           let groupNameExp = /\(\w*?\D*?\)/;
           let itemsExp = /\[(\w*?\D*?)\]/;
           let groupName = groupNotParsed.match(groupNameExp);
           let itemsGroupParsed = groupNotParsed.match(itemsExp);
            if (itemsGroupParsed) {
                let itemsParsed = itemsGroupParsed[0].split(",");
                itemsParsed.map((itemNotParsed, i) => {
                    let item = new Item();
                    item.id = i;
                    item.groupId = index;
                    item.name = itemNotParsed.replace("[", "").replace("]", "");
                    this.items.push(item);
                });
            }
           let group = new Group();
           group.id = index;
           group.name = groupName !== null ? groupName[0].replace("(", "").replace(")", "") : "";
           
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
            groupClassName = "rightAnswer"
        }
        
        return groupClassName;
    }
    
    renderGroups(groups: Group[]) {
        console.log("i want to rerender");
        return (
            <>
                {groups.map((group, index) => {
                    let groupClassName = this.getGroupClassName(group.action);
                    setTimeout(() => {
                        this.turnOffSettings(group.id);
                    }, 5000)
                    return(
                        <div key={index} className={`row justify-content-center ${groupClassName}`} style={{height: "150px"}} onClick={() => this.checkTarget(group.id)}>
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
}

enum ToggleType {
    Update,
    NotDeleted,
    ChoosenItem
}