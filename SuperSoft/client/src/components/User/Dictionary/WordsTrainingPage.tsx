import React, { Component } from 'react';
import { observer } from "mobx-react";
import WordStore from "../../../stores/WordStore";
import { makeObservable, observable } from "mobx";
import { Modal, ModalBody, Input, Button, Card, CardBody, CardFooter, Alert, CardTitle } from "reactstrap";
import { UserWordViewModel } from "../../../Typings/viewModels/UserWordViewModel";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";

class IWordsTrainingPageProps {
    onToggle: any;
    wordStore: WordStore;
}

@observer
class WordsTrainingPage extends Component<IWordsTrainingPageProps> {
    wordsCount: number;
    continue: boolean;
    settingsOpen: boolean;
    userWords: UserWordViewModel[] = new Array<UserWordViewModel>();
    words: WordViewModel[] = new Array<WordViewModel>();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            wordsCount: observable,
            continue: observable,
            settingsOpen: observable,
            userWords: observable,
            words: observable
        });
    }

    renderCautions() {
        return(
            <></>
        );
    }

    handleToggle() {
        this.props.wordStore.addOrUpdateUserWordProgress();
        this.props.onToggle();
    }

    renderSettings() {
        return (
            <Card style={{width: '100%'}}>
                <CardBody className="text-center">
                    <Alert outline color={this.state.wordsCountWarning ? "danger" : "primary"}>Количество слов не может быть меньше 5</Alert>
                    <Input style={{marginTop: '0px'}} type="text" onChange={(e) => this.changeWordsCount(e)} defaultValue={this.state.wordsCount}>{this.state.wordsCount}</Input>
                </CardBody>
                <CardBody  className="text-center">
                    <Input type="select" name="select" id="exampleSelect">
                        <option id="repeat" onClick={(e) => this.selectTrainingType(e)}>ПОВТОРИТЬ</option>
                        <option id="learnNew" onClick={(e) => this.selectTrainingType(e)}>УЧИТЬ НОВЫЕ</option>
                    </Input>
                </CardBody>
                <CardFooter>
                    <Button disabled={this.state.wordsCountWarning} outline color="primary" onClick={() => this.continue()}>
                        ПРОДОЛЖИТЬ
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    render() {
        return(
            <Modal toggle={() => this.props.onToggle()} isOpen={true} size="lg">
                <ModalBody>
                    {!this.state.continue && this.renderSettings()}
                    {this.state.littleCountWords && <Alert color="danger">У вас в словарике меньше 5 слов. Добавьте ещё несколько слов, чтобы тренировка стала доступной:)</Alert>}
                    {this.state.showWords && this.showWords(this.state.update)}
                    {!this.state.showWords && this.state.countLearntWords !== this.state.userWords.length && this.state.continue && this.train(this.state.update)}
                    {!this.state.showWords && this.state.countLearntWords == this.state.userWords.length && this.renderFinish()}
                </ModalBody>
            </Modal>
        );
    }

    chooseWordsForTraining() {
        
    }
}

export default WordsTrainingPage;