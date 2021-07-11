import React, { Component } from 'react';
import { ISubtaskProps } from "./ISubtaskProps";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { shuffleArray } from "../../../functions/shuffleWords";
import { Button, Input } from "reactstrap";
import { UserRole } from "../../../Typings/enums/UserRole";

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
                <i style={{marginLeft: '98%', width: '2%'}}
                   onClick={() => this.deleteSubtask()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
            );
        }
    }

    renderSentenceWithGaps(textParts: TextPart[]) {
        console.log("i want to rerender", toJS(textParts));
        return (
            <>
                {textParts.map((textPart) => {
                    if(textPart.isGap) {
                        console.log("textPART", toJS(textPart));
                        if(textPart.action === ActionType.isChoosenRight) {
                            return (
                                <Input
                                    className="gapToInsert"
                                    value={textPart.textToRender !== undefined ? textPart.textToRender : ""}
                                    disabled={true}
                                    style={{backgroundColor: "rgb(75,181, 67)"}}
                                />
                            );
                        } else if(textPart.action === ActionType.isChoosenWrong) {
                            setTimeout(() => {
                                this.turnOffTargetIdIfWrong(textPart.id);
                            }, 1000);
                            console.log(" i am here textPart", toJS(textPart));
                            console.log(" i am here textToRender", toJS(textPart.textToRender));
                            return (
                                <Input
                                    className="gapToInsert"
                                    value={textPart.textToRender !== undefined ? textPart.textToRender : ""}
                                    onClick={() => this.checkParts(textPart.id)}
                                    style={{backgroundColor: "#FFD2D2"}}
                                />
                            );
                        } else if(textPart.action === ActionType.isNotChoosen) {
                            return (
                                <Input
                                    value=""
                                    className="gapToInsert"
                                    onClick={() => this.checkParts(textPart.id)}
                                />
                            );
                        }
                } else {
                        return (
                            <span>{textPart.name}</span>
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
                targetTextPart.action = ActionType.isChoosenRight;
                targetTextPart.textToRender = targetTextPart.name;
                let shuffledParts = this.shuffledParts;
                let shuffledPart = shuffledParts.find(shuffledPart => shuffledPart.id === targetId);
                // @ts-ignore
                this.shuffledParts = shuffledParts.filter(part => part.id !== shuffledPart.id);
                
            } else {
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
        this.playAudio();
        this.textParts = textParts;
    }
    
    playAudio() {
        let audioObj = new Audio("/public/right.mp3");
       let audioObj1 = new Audio("/build/right.mp3");
        audioObj.play();
        audioObj1.play();
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
        console.log("textParts.......1", textPart);
        if(textPart !== undefined) {
            textPart.action = ActionType.isNotChoosen;
            textPart.textToRender = "";
            let index = textParts.indexOf(textPart);
            textParts[index] = textPart;
        }
        console.log("textParts.......2",textPart);
        this.textParts = textParts;
        this.toggler(ToggleType.Update);
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