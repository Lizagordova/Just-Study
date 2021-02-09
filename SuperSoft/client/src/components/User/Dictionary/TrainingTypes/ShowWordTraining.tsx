import React, { Component } from 'react';
import { Button, Card, CardText, CardFooter, CardTitle } from "reactstrap";
import { ITrainingTypeProps } from "./ITrainingTypeProps";

class ShowWordTraining extends Component<ITrainingTypeProps> {
    continue() {
        this.props.continue();
    }

    renderWord() {
        let word = this.props.word;
        return (
            <>
                <CardTitle className="text-center">{word.word}</CardTitle>
                <CardText className="text-center">{word.partOfSpeech}</CardText>
                <CardText className="text-center">{word.englishMeaning}</CardText>
                <CardText className="text-center">{word.russianMeaning}</CardText>
            </>
        );
    }

    renderContinueButton() {
        return (
            <Button color="success" onClick={() => this.continue()} style={{width: '100%'}}>ПРОДОЛЖИТЬ</Button>
        );
    }

    render() {
        return(
            <Card style={{width: '100%'}}>
                     {this.renderWord()}
                <CardFooter className="text-center">
                    {this.renderContinueButton()}
                </CardFooter>
            </Card>
        )
    }
}

export default ShowWordTraining;