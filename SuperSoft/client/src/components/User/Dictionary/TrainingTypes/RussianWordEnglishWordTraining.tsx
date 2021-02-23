import React, { Component } from "react";
import { ITrainingTypeProps } from "./ITrainingTypeProps";
import { observer } from "mobx-react";
import { Button, Card, CardBody, CardFooter, CardTitle } from "reactstrap";
import { WordViewModel } from "../../../../Typings/viewModels/WordViewModel";
import { makeObservable, observable } from "mobx";

@observer
class RussianWordEnglishWordTraining extends Component<ITrainingTypeProps> {
    answered: boolean;
    choosenAnswerId: number;
    rightAnswer: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            answered: observable,
            choosenAnswerId: observable,
            rightAnswer: observable,
        });
    }

    componentDidUpdate(prevProps: Readonly<ITrainingTypeProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.word !== this.props.word) {
            this.answered = false;
            this.rightAnswer = false;
        }
    }

    renderWords(words: WordViewModel[]) {
        return(
            <>
                {words.map((word) => {
                    return (
                        <div className="row justify-content-center">
                            <Button
                                disabled={this.answered}
                                style={{width: '100%', marginTop: '5px'}}
                                id={word.id.toString()}
                                onClick={(e) => this.chooseAnswer(e)}
                                outline={this.choosenAnswerId == word.id && this.answered ? this.rightAnswer ? false : false : true}
                                color={this.choosenAnswerId == word.id && this.answered ? this.rightAnswer ? "success" : "danger" : "primary"}>
                                {word.word}
                            </Button>
                        </div>
                    );
                })}
            </>
        )
    }

    renderButtons() {
        return (
            <>
                {!this.answered && <Button color="success" onClick={() => this.check()} style={{width: '100%'}}>ПРОВЕРИТЬ</Button>}
                {this.answered && <Button color="primary" onClick={() => this.continue()} style={{width: '100%'}}>ПРОДОЛЖИТЬ</Button>}
            </>
        );
    }

    render() {
        return(
            <Card style={{width: '100%'}}>
                <CardTitle className="text-center">{this.props.word.russianMeaning}</CardTitle>
                <CardBody>
                    {this.renderWords(this.props.words)}
                </CardBody>
                <CardFooter className="text-center">
                    {this.renderButtons()}
                </CardFooter>
            </Card>
        );
    }

    check() {
        this.rightAnswer = this.props.word.id == this.choosenAnswerId;
        this.answered = true;
    }

    continue() {
         this.props.continue(this.props.word.id, this.rightAnswer);
    }

    chooseAnswer(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        this.choosenAnswerId = Number(event.currentTarget.id);
    }
}

export default RussianWordEnglishWordTraining;