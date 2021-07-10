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
    isChoosenRight: boolean;
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
           textPartsArray.push(part);
        });
        this.textParts = textPartsArray;
        this.shuffledParts = shuffleArray(textPartsArray);
        this.loaded = true;
    }
    
    renderWords(shuffledParts: TextPart[]) {
        console.log("shuffledParts", shuffledParts);
        return (
            <>
                {shuffledParts.map(shuffledPart => {
                    if(shuffledPart.isGap && !shuffledPart.isChoosenRight) {
                        return (
                            <Button
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
        return (
            <>
                {textParts.map((textPart) => {
                    if(textPart.isGap) {
                        if(textPart.isChoosenRight) {
                            return (
                                <Input
                                    value={textPart.name} 
                                    style={{backgroundColor: "green", margin: "5 2 5 2"}}
                                />
                            );
                        } else {
                            return (
                                <Input 
                                    onClick={() => this.checkParts(textPart.id)}
                                    style={{margin: "5 2 5 2"}}/>
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
        console.log("this.subtask", toJS(this.props.subtask))
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
        if(this.sourcePartId === sourceId) {
            this.sourcePartId = -1;
        } else {
            this.sourcePartId = sourceId;
        }
    }
    
    checkParts(targetId: number) {
        console.log("targetId", targetId, "sourcePartId", this.sourcePartId);
        if(this.sourcePartId === targetId) {
            let parts = this.textParts;
            let part = parts.find(part => part.id === targetId);
            if(part !== undefined) {
                part.isChoosenRight = true;
                this.update = !this.update;
                this.playAudio();
            }
        } else {
            
        }
    }
    
    playAudio() {
        let audioObj = new Audio("/public/right.mp3");
       let audioObj1 = new Audio("/build/right.mp3");
        audioObj.play();
        audioObj1.play();
    }
}