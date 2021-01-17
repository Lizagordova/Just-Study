import React, { Component } from 'react';
import { WordTrainingType } from "../../../Typings/enums/WordTrainingType";
import { Alert, Button, Card, CardBody, CardFooter, Input } from "reactstrap";
import { UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import { WordViewModel} from "../../../Typings/viewModels/WordViewModel";
import { makeObservable, observable } from "mobx";
import WordStore from "../../../stores/WordStore";
import { CompletingStatus } from "../../../Typings/enums/CompletingStatus";

class ISettingsProps {
    wordStore: WordStore;
    continue: any;
}

export class Settings extends Component<ISettingsProps> {
    wordsCount: number;
    settingsOpen: boolean;
    userWords: UserWordViewModel[] = new Array<UserWordViewModel>();
    words: WordViewModel[] = new Array<WordViewModel>();
    wordsCountWarning: boolean;
    littleCountWords: boolean;
    trainingType: WordTrainingType;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            wordsCount: observable,
            settingsOpen: observable,
            userWords: observable,
            words: observable,
            wordsCountWarning: observable,
            trainingType: observable
        });
    }

    renderSettings() {
        return (
            <Card style={{width: '100%'}}>
                <CardBody className="text-center">
                    {this.renderCautions()}
                    {this.renderWordsCountInput()}
                </CardBody>
                <CardBody  className="text-center">
                    {this.renderTrainingTypeInput()}
                </CardBody>
                <CardFooter>
                    {this.renderContinueButton()}
                </CardFooter>
            </Card>
        )
    }

    renderCautions() {
        return(
            <>
                {this.littleCountWords && <Alert color="danger">У вас в словарике меньше 5 слов. Добавьте ещё несколько слов, чтобы тренировка стала доступной:)</Alert>}
            </>
        );
    }

    renderWordsCountInput() {
        return (
            <>
                <Alert outline color={this.wordsCountWarning ? "danger" : "primary"}>Количество слов не может быть меньше 5</Alert>
                <Input style={{marginTop: '0px'}} type="text" onChange={(e) => this.changeWordsCount(e)} defaultValue={this.wordsCount}>{this.wordsCount}</Input>
            </>
        );
    }

    renderTrainingTypeInput() {
        return (
            <Input type="select" name="select" id="exampleSelect">
                <option key="repeat" onClick={() => this.selectTrainingType(WordTrainingType.Repeat)}>ПОВТОРИТЬ</option>
                <option key="learnnew" onClick={() => this.selectTrainingType(WordTrainingType.LearnNew)}>УЧИТЬ НОВЫЕ</option>
            </Input>
        );
    }

    renderContinueButton() {
        return(
            <Button disabled={this.wordsCountWarning} outline color="primary" onClick={() => this.continue()}>
                ПРОДОЛЖИТЬ
            </Button>
        );
    }

    render() {
        return (
            <>
                {this.renderSettings()}
            </>
        );
    }

    selectTrainingType(trainingType: WordTrainingType) {
        this.trainingType = trainingType;
    }

    changeWordsCount(event: React.FormEvent<HTMLInputElement>) {
        let wordsCount = Number(event.currentTarget.value);
        this.wordsCountWarning = wordsCount < 5;
        this.wordsCount = wordsCount;
    }

    continue() {
        let userWords = this.chooseWordsForTraining();
        if(userWords.length < 5) {
            this.littleCountWords = true;
        } else {
            this.props.continue(userWords);
        }
    }

   chooseWordsForTraining(): UserWordViewModel[] {
        let userWords = new Array<UserWordViewModel>();
        if(this.trainingType === WordTrainingType.LearnNew) {
            userWords = this.props.wordStore.userDictionary
                .filter(uw => uw.status === CompletingStatus.NotCompleted)
                .slice(0, 5);
        } else {
            userWords = this.props.wordStore.userDictionary
                .filter(uw => uw.status === CompletingStatus.Completed)
                .slice(0, 5);
        }

        return userWords;
    }
}