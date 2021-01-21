import React, { Component } from 'react';
import { observer } from "mobx-react";
import { Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Input, Row } from "reactstrap";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import RootStore from "../../../stores/RootStore";
import { makeObservable, observable } from "mobx";

class IWordOfADayProps {
    date: Date;
    store: RootStore;
}

@observer
class WordOfADay extends Component<IWordOfADayProps> {
    word: WordViewModel;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable
        });
    }

    componentDidUpdate(prevProps: Readonly<IWordOfADayProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.date !== this.props.date) {
            let courseId = this.props.store.courseStore.choosenCourse.id;
            this.props.store.wordStore.getWordOfADay(this.props.date, courseId)
                .then((word) => {
                    this.word = word;
            });
        }
    }

    renderDeleteButton() {
        return(
            <Button className="close"
                    type="submit"
                    onClick={(e) => this.handleDelete()}>
            </Button>
        );
    }

    renderWord(word: WordViewModel) {
        return(
            <CardHeader className="text-center">{word.word.toUpperCase()}</CardHeader>
        );
    }

    renderWordDetails(word: WordViewModel) {
        return(
            <>
                <CardTitle>{word.partOfSpeech}</CardTitle>
                <CardText>{word.russianMeaning}</CardText>
                <CardText>{word.englishMeaning}</CardText>
            </>
        );
    }
    
    renderWordOfADay(word: WordViewModel) {
        return(
            <>
                <Row className="justify-content-center">
                    <Col sm="9">
                        <Card>
                            {this.renderDeleteButton()}
                            {this.renderWord(word)}
                            <CardBody className="text-center">
                                {this.renderWordDetails(word)}
                            </CardBody>
                            {this.state.role == '2' && <CardFooter className="text-center">
                                <button
                                    onClick={() => this.setState({addOrUpdate: true, render: false})}>Отредактировать
                                </button>
                            </CardFooter>}
                            {this.state.role == '1' && <AnswerToWordOfADay wordId={this.state.id}/>}
                        </Card>
                    </Col>
                </Row>
                {this.state.role == '1' && <Row className="justify-content-center">
                    <Button
                        outline color="primary"
                        onClick={() => this.setState({comments: true})}>
                        Комментарии
                        {this.state.comments && <CommentGroup commentedEntityType="wordOfADay" commentedEntityId={this.state.id} userId={this.state.userId} onToggle={this.onCommentToggle}/>}
                    </Button>
                </Row>}
            </>
        )
    }

    render() {
        return(
            <>
                {this.renderWordOfADay(this.props.word)}
            </>
        );
    }

    handleDelete() {
        let result = window.confirm('Вы уверены, что хотите удалить слово дня?');
        if(result) {
            this.props.wordStore.deleteWordOfADay(this.props.word.id)
                .then((status) => {
                    if(status === 200) {
                        
                    }
            })
        }
    }
}

export default WordOfADay;