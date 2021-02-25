import React, { Component } from "react";
import { CardFooter, Button, Input, Alert } from "reactstrap";
import WordStore from "../../../stores/WordStore";
import {makeObservable, observable, toJS} from "mobx";
import { observer } from "mobx-react";
import { UserWordReadModel } from "../../../Typings/readModels/UserWordReadModel";
import { mapToUserAnswerReadModel } from "../../../functions/mapper";

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

    constructor(props: IAnswerToWordOfADayProps) {
        super(props);
        makeObservable(this, {
            userAnswer: observable,
            addOrUpdateAnswer: observable,
            notSaved: observable
        });
        this.setUserAnswerProgress();
    }

    setUserAnswerProgress() {
        this.props.wordStore.getUserWordsProgress(this.props.wordId, this.props.userId)
            .then((userAnswer) => {
                this.userAnswer = mapToUserAnswerReadModel(userAnswer);
                this.userAnswer.userId = this.props.userId;
                this.userAnswer.word.id = this.props.wordId;
                this.addOrUpdateAnswer = userAnswer.answer === "" || userAnswer.answer === null;
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
                    <div className="row justify-content-center">
                        <Input type="text"
                            style={{width: "85%"}}
                            value={this.userAnswer.answer} onChange={(e) => this.handleChange(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <Button
                            outline color="success"
                            style={{width: "80%", marginTop: "10px", marginBottom: "10px"}}
                            onClick={() => this.handleSave()}>
                            Сохранить
                        </Button>
                    </div>
                </>
            );
        }
    }

    renderAnswer() {
        if(!this.addOrUpdateAnswer) {
            return (
                <div className="row justify-content-center"
                    onClick={() => this.addOrUpdateAnswerToggle()}>
                    {this.userAnswer.answer}
                </div>
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
        console.log("userANswer", toJS(this.userAnswer));
        this.props.wordStore.addOrUpdateUserWordProgress(this.userAnswer)
            .then((status) => {
                this.notSaved = status !== 200;
                if(status === 200) {
                    this.setUserAnswerProgress();
                }
            });
    }
}

export default AnswerToWordOfADay;