import { ActionType } from "../consts/ActionType";

export function playAudio(type: ActionType) {
    if(type === ActionType.isChoosenRight) {
        let audioObj = new Audio("right.mp3");
        audioObj.play();
    } else if(type === ActionType.isChoosenWrong) {
        let audioObj = new Audio("wrong.mp3");
        audioObj.play();
    }
};