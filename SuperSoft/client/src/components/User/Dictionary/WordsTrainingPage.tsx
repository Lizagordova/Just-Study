import React, {Component} from 'react';
import { observer } from "mobx-react";
import WordStore from "../../../stores/WordStore";
import {makeObservable, observable, toJS} from "mobx";
import { Button, Card, CardBody, CardFooter, Modal, ModalBody } from "reactstrap";
import { UserWordViewModel } from "../../../Typings/viewModels/UserWordViewModel";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { WordTrainingType } from "../../../Typings/enums/WordTrainingType";
import { Settings } from "./Settings";
import { CompletingStatus } from "../../../Typings/enums/CompletingStatus";
import EnglishWordRussianMeaningTraining from "./TrainingTypes/EnglishWordRussianMeaningTraining";
import RussianWordEnglishWordTraining from "./TrainingTypes/RussianWordEnglishWordTraining";
import ShowWordTraining from "./TrainingTypes/ShowWordTraining";
import { UserWordReadModel } from "../../../Typings/readModels/UserWordReadModel";
import {shuffleWords} from "../../../functions/shuffleWords";
import {mapToUserAnswerReadModel, mapToUserReadModel} from "../../../functions/mapper";

class IWordsTrainingPageProps {
    onToggle: any;
    wordStore: WordStore;
    userId: number;
}

@observer
class WordsTrainingPage extends Component<IWordsTrainingPageProps> {
    wordsCount: number;
    settingsOpen: boolean;
    userWords: UserWordViewModel[] = new Array<UserWordViewModel>();
    words: WordViewModel[] = new Array<WordViewModel>();
    wordsCountWarning: boolean;
    trainingType: WordTrainingType;
    settings : boolean = true;
    showWords: boolean;
    showOrder: number = 0;
    countLearntWords: number = 0;
    rightAnswersShouldBe: number = 2;
    toggleTrain: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            wordsCount: observable,
            settingsOpen: observable,
            userWords: observable,
            words: observable,
            wordsCountWarning: observable,
            trainingType: observable,
            settings: observable,
            showWords: observable,
            showOrder: observable,
            countLearntWords: observable,
            toggleTrain: observable
        });
    }

    startTraining = (userWords: UserWordViewModel[]) => {
         this.userWords = userWords;
        this.settings = false;
        this.showWords = true;
    };

    getWord(wordId: number): WordViewModel {
        return this.props.wordStore.dictionary.filter(w => w.id === wordId)[0];
    }
 
    showWordsTraining(showOrder: number) {
        let word = this.getWord(this.userWords[showOrder].wordId);
        return (
            <ShowWordTraining word={word} continue={this.continueShow} words={new Array<WordViewModel>()}/>
        );
    }

    continueShow = () => {
        let showOrder = this.showOrder;
        showOrder = ++showOrder;
        if(showOrder <= this.userWords.length - 1) {
            this.showOrder = showOrder;
        } else {
            this.showWords = false;
        }
    };

    renderSettings() {
        return(
            <>
                {this.settings && <Settings wordStore={this.props.wordStore} continue={this.startTraining} />}
            </>
        );
    }

    renderShowWordTraining() {
        return (
            <>
                {this.showWords && this.showWordsTraining(this.showOrder)}
            </>
        );
    }

    renderTraining(toggleTrain: boolean) {
        if(!this.showWords && this.countLearntWords !== this.userWords.length && !this.settings)
        return (
            <>
                {this.train(toggleTrain)}
            </>
        );
    }

    renderFinish() {
        if(!this.showWords && this.countLearntWords == this.userWords.length && this.countLearntWords > 0) {
            return(
                <Card>
                    <div className="row justify-content-center">
                        Поздравляем! Ты всё выучил!
                    </div>
                    <div className="row justify-content-center">
                        <Button
                            outline
                            color="primary"
                            onClick={() => this.handleToggle()}>
                            Закрыть
                        </Button>
                    </div>
                </Card>
            );
        }
    }

    render() {
        return(
            <Modal toggle={() => this.props.onToggle()} isOpen={true} size="lg">
                <ModalBody>
                    {this.renderSettings()}
                    {this.renderShowWordTraining()}
                    {this.renderTraining(this.toggleTrain)}
                    {this.renderFinish()}
                </ModalBody>
            </Modal>
        );
    }

    train(toggleTrain: boolean) {
        let wordId = this.chooseWord();
        let words = shuffleWords(this.chooseWords(wordId));
        let word = this.props.wordStore.dictionary.filter(w => w.id === wordId)[0];
        let trainingType = this.getRandomIntInclusive(1, 2);
        if(trainingType === 1) {
            return(
                <EnglishWordRussianMeaningTraining continue={this.handleAnswer} word={word} words={words}/>
            );
        } else if(trainingType === 2) {
            return(
                <RussianWordEnglishWordTraining continue={this.handleAnswer} word={word} words={words}/>
            );
        }
    }

    chooseWord(): number {
        let randomWordIndex = this.getRandomIntInclusive(0, this.userWords.length - 1);
        return this.userWords[randomWordIndex].wordId;
    }

    getRandomIntInclusive(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    chooseWords(wordId: number): WordViewModel[] {
        let wordsIds = new Array<number>();
        wordsIds.push(wordId);
        while(wordsIds.length !== 4) {
            let choosenWord = this.chooseWord();
            if(wordId !== choosenWord && wordsIds.find(word => word === choosenWord) === undefined) {
                wordsIds.push(choosenWord);
            }
        }
        let words = new Array<WordViewModel>();
        for(let i = 0; i < wordsIds.length; i++) {
            let word = this.props.wordStore.dictionary.filter(w => w.id === wordsIds[i])[0];
            words.push(word);
        }

        return words;
    }

    handleAnswer = (wordId: number, right: boolean) => {
         let userWords = this.userWords;
        let userWord = userWords.find(userWord => userWord.wordId == wordId);
         let userWordIndex = userWords
            .map((w) => { return w.wordId ;})
            .indexOf(wordId);
        if(right && userWord !== undefined) {
            userWord.rightAnswers = ++userWord.rightAnswers;
            if(userWord.rightAnswers == this.rightAnswersShouldBe) {
                userWord.status = CompletingStatus.Completed;
                this.countLearntWords =  this.countLearntWords + 1;
            }
            userWords[userWordIndex] = userWord;
        }
        this.toggleTrain = !this.toggleTrain;
    };

    handleToggle() {
        let userWordsReadModels = new Array<UserWordReadModel>();
        let userWords = this.userWords;
        for(let i = 0; i < userWords.length; i++ ) {
            
            let userWordReadModel = mapToUserAnswerReadModel(userWords[i]);
            userWordsReadModels.push(userWordReadModel)
        }
        this.props.wordStore.addOrUpdateUserWordsProgress(userWordsReadModels);
        this.props.onToggle();
    }
}

export default WordsTrainingPage;