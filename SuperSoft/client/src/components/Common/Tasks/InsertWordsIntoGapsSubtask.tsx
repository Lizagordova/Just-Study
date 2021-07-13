import React, { Component } from 'react';
import { ISubtaskProps } from "./ISubtaskProps";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { shuffleArray } from "../../../functions/shuffleWords";
import { Button, Input } from "reactstrap";
import { UserRole } from "../../../Typings/enums/UserRole";
import {UserSubtaskReadModel} from "../../../Typings/readModels/UserSubtaskReadModel";
import {mapToUserSubtaskAnswerGroupReadModel} from "../../../functions/mapper";

class TextPart {
    id: number;
    name: string;
    isGap: boolean;
    action: ActionType;
    textToRender: string;
}

@observer
export class InsertWordsIntoGapsSubtask extends Component<ISubtaskProps> {
    textParts: TextPart[] = new Array<TextPart>();
    shuffledParts: TextPart[] = new Array<TextPart>();
    loaded: boolean;
    update: boolean;
    sourcePartId: number = -1;
    notDeleted: boolean;//todo: доделать
    
    constructor(props: ISubtaskProps) {
        super(props);
        makeObservable(this, {
            textParts: observable,
            loaded: observable,
            update: observable,
            sourcePartId: observable,
            notDeleted: observable
        });
        this.parseSubtask();
    }
    
    parseSubtask() {
        let textParts = this.props.subtask.text.split(" ");
        let textPartsArray = new Array<TextPart>();
        textParts.forEach((textPart, i) => {
           let part = new TextPart();
           part.id = textParts.indexOf(textPart);
           part.name = textPart.replace("*", "");
           part.isGap = textPart.includes("*");
           part.action = textPart.includes("*") ? ActionType.isNotChoosen : ActionType.None;
            part.textToRender = "";
           textPartsArray.push(part);
        });
        this.textParts = textPartsArray;
        this.shuffledParts = shuffleArray(textPartsArray);
        this.loaded = true;
    }
    
    renderWords(shuffledParts: TextPart[]) {
        return (
            <>
                {shuffledParts.map(shuffledPart => {
                    if(shuffledPart.isGap) {
                        return (
                            <Button
                                className="shuffledPart"
                                onClick={() => this.chooseSourceId(shuffledPart.id)}>
                                {shuffledPart.name}
                            </Button>
                        );
                    }
                })}
            </>
        );
    }

    renderControlButton() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return(
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.deleteSubtask()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
            );
        }
    }

    renderSentenceWithGaps(textParts: TextPart[]) {
        return (
            <>
                {textParts.map((textPart) => {
                    if(textPart.isGap) {
                        if(textPart.action === ActionType.isChoosenRight) {
                            return (
                                <Input
                                    className="gapToInsert rightAnswer"
                                    value={textPart.textToRender !== undefined ? textPart.textToRender : ""}
                                    disabled={true}
                                    style={{width: "auto"}}
                                />
                            );
                        } else if(textPart.action === ActionType.isChoosenWrong) {
                            setTimeout(() => {
                                this.turnOffTargetIdIfWrong(textPart.id);
                            }, 1000);
                            return (
                                <Input
                                    className="gapToInsert wrongAnswer"
                                    style={{width: "auto"}}
                                    value={textPart.textToRender !== undefined ? textPart.textToRender : ""}
                                    onClick={() => this.checkParts(textPart.id)}
                                />
                            );
                        } else if(textPart.action === ActionType.isNotChoosen) {
                            return (
                                <Input
                                    value=""
                                    className="gapToInsert"
                                    onClick={() => this.checkParts(textPart.id)}
                                    style={{width: "70px"}}
                                />
                            );
                        }
                } else {
                        return (
                            <span style={{marginLeft: "3px", marginRight: "3px"}}>
                                {textPart.name}
                            </span>
                        );
                    }
                })}
            </>
        );
    }
    
    renderSubtask(update: boolean) {
        return (
            <div className="container-fluid taskBlock">
                <div className="row justify-content-start">
                    {this.renderControlButton()}
                </div>
                <div className="row justify-content-start">
                    {this.renderWords(this.shuffledParts)}
                </div>
                <div className="row justify-content-start">
                    {this.renderSentenceWithGaps(this.textParts)}
                </div>
            </div>
        );
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

    chooseSourceId(sourceId: number) {
        this.sourcePartId = sourceId;
    }
    
    checkParts(targetId: number) {
        let textParts = this.textParts;
        let targetTextPart = textParts.find(part => part.id === targetId);
        if(targetTextPart !== undefined) {
            if (this.sourcePartId === targetId) {
                this.playAudio(ActionType.isChoosenRight);
                targetTextPart.action = ActionType.isChoosenRight;
                targetTextPart.textToRender = targetTextPart.name;
                let shuffledParts = this.shuffledParts;
                let shuffledPart = shuffledParts.find(shuffledPart => shuffledPart.id === targetId);
                // @ts-ignore
                this.shuffledParts = shuffledParts.filter(part => part.id !== shuffledPart.id);
                
            } else {
                this.playAudio(ActionType.isChoosenWrong);
                targetTextPart.action = ActionType.isChoosenWrong;
                let sourceTextPart = textParts.find(part => part.id === this.sourcePartId);
                if(sourceTextPart !== undefined) {
                    targetTextPart.textToRender = sourceTextPart.name;
                }
                this.toggler(ToggleType.SourceId);
            }
            let index = textParts.indexOf(targetTextPart);
            textParts[index] = targetTextPart;
        }
        this.toggler(ToggleType.Update);
        this.textParts = textParts;
    }
    
    playAudio(type: ActionType) {
        if(type === ActionType.isChoosenRight) {
            let audioObj = new Audio("right.mp3");
            audioObj.play();
        } else if(type === ActionType.isChoosenWrong) {
            let audioObj = new Audio("wrong.mp3");
            audioObj.play();
        }
    }
    
    toggler(type: ToggleType) {
        if(type === ToggleType.Update) {
            this.update = !this.update;
        } else if(type === ToggleType.NotDeleted) {
            this.notDeleted = !this.notDeleted;
        } else if(type === ToggleType.SourceId) {
            this.sourcePartId = -1;
        }
    }
    
    turnOffTargetIdIfWrong(id: number) {
        let textParts = this.textParts;
        let textPart = textParts.find(textPart => textPart.id === id);
        if(textPart !== undefined) {
            textPart.action = ActionType.isNotChoosen;
            textPart.textToRender = "";
            let index = textParts.indexOf(textPart);
            textParts[index] = textPart;
        }
        this.textParts = textParts;
        this.toggler(ToggleType.Update);
    }
    
    saveResult() {
        // let userSubtask = mapToUserSubtaskReadModel(this.props.userSubtask);
        // this.props.store.taskStore
        //     .addOrUpdateUserSubtask();
    }
}

enum ActionType {
    None,
    isChoosenRight,
    isChoosenWrong,
    isNotChoosen
}

enum ToggleType {
    Update,
    NotDeleted,
    SourceId
}