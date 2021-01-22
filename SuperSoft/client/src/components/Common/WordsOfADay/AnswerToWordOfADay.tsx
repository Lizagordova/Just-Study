import React, { Component } from "react";
import { CardFooter, Button, Input, Alert } from "reactstrap";
import WordStore from "../../../stores/WordStore";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { UserWordReadModel } from "../../../Typings/readModels/UserWordReadModel";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";

class IAnswerToWordOfADayProps {
    wordId: number;
    wordStore: WordStore;
    userId: number;
}

@observer
class AnswerToWordOfADay extends Component <IAnswerToWordOfADayProps> {
    userAnswer: UserWordReadModel = new UserWordReadModel();
    addOrUpdateAnswer: boolean;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            userAnswer: observable,
            addOrUpdateAnswer: observable,
            notSaved: observable
        });
    }
    
    componentDidMount(): void {
        this.props.wordStore.getUserWordsProgress(this.props.wordId, this.props.userId)
            .then((userAnswer) => {
                this.userAnswer = this.mapToUserAnswerReadModel(userAnswer);
                this.addOrUpdateAnswer = userAnswer.answer === "";
            });
    }

    renderCautions() {
        return(
            <>
                {this.notSaved && <Alert color="danger">Не удалось сохранить ответ:(</Alert>}
            </>
        );
    }

    renderAddOrUpdateAnswerInput() {
        if(this.addOrUpdateAnswer) {
            return (
                <>
                    <Input type="text" value={this.userAnswer.answer} onChange={(e) => this.handleChange(e)}/>
                    <Button onClick={() => this.handleSave()}>Сохранить</Button>
                </>
            );
        }
    }

    renderAnswer() {
        if(!this.addOrUpdateAnswer) {
            return (
                <CardFooter
                    className="text-center"
                    onClick={() => this.addOrUpdateAnswerToggle()}>
                    {this.userAnswer.answer}
                </CardFooter>
            );
        }
    }

    render() {
        return(
            <>
                {this.renderCautions()}
                {this.renderAnswer()}
                {this.renderAddOrUpdateAnswerInput()}
            </>
        );
    }

    addOrUpdateAnswerToggle() {
        this.addOrUpdateAnswer = !this.addOrUpdateAnswer;
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.userAnswer.answer = event.currentTarget.value;
    }

    handleSave() {
        this.props.wordStore.addOrUpdateUserAnswerToWordOfADay(this.userAnswer)
            .then((status) => {
                this.notSaved = status !== 200;
            });
    }

    mapToUserAnswerReadModel(userWord: UserWordViewModel): UserWordReadModel {
        let userAnswer = new UserWordReadModel();
        userAnswer.answer = userWord.answer;
        userAnswer.rightAnswers = userWord.rightAnswers;
        userAnswer.status = userWord.status;
        userAnswer.countOfAttempts = userWord.countOfAttempts;
        // userAnswer.word = new WordReadModel(); todo: если это и так работает, то забей
        userAnswer.word.id = userWord.wordId;
        userAnswer.userId = userWord.userId;
        return userAnswer;
    }
}

export default AnswerToWordOfADay;