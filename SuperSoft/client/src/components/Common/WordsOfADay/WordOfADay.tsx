﻿import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row} from "reactstrap";
import {WordViewModel} from "../../../Typings/viewModels/WordViewModel";
import RootStore from "../../../stores/RootStore";
import {makeObservable, observable} from "mobx";
import {UserRole} from "../../../Typings/enums/UserRole";
import CommentGroup from "../Comments/CommentGroup";
import {CommentedEntityType} from "../../../Typings/enums/CommentedEntityType";
import AddOrUpdateWordOfADay from "./AddOrUpdateWordOfADay";
import {WordReadModel} from "../../../Typings/readModels/WordReadModel";
import AnswerToWordOfADay from "./AnswerToWordOfADay";
import UserAnswers from "../../Admin/WordsOfADay/UserAnswers";

class IWordOfADayProps {
    date: Date | Date[];
    store: RootStore;
}

@observer
class WordOfADay extends Component<IWordOfADayProps> {
    word: WordViewModel;
    addOrUpdate: boolean;
    role: UserRole;
    showComments: boolean;
    showCautions: boolean = true;
    itIsNotAllowedToWatchNextWords: boolean;
    showUserAnswers: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable,
            addOrUpdate: observable,
            showComments: observable,
            itIsNotAllowedToWatchNextWords: observable,
            showUserAnswers: observable
        });
        this.role = this.props.store.userStore.currentUser.role;
    }

    componentDidMount(): void {
       this.props.store.wordStore
            .getWordOfADay(this.props.date, this.props.store.courseStore.choosenCourse.id)
            .then((word) => {
                this.word = word;
                this.showCautions = word.word === "";
                this.addOrUpdate = word.word === "";
            });
    }

    componentDidUpdate(prevProps: Readonly<IWordOfADayProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.date !== this.props.date) {
            this.setWordOfADay();
        }
    }

    renderCautions() {
        return(
            <div className="row justify-content-center">
                <span>
                На эту дату слово дня отсутствует
                </span>
            </div>
        );
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

    renderEditButton() {
        if(this.role === UserRole.Admin) {
            return(
                <button
                    onClick={() => this.toggleAddOrUpdateWord()}>
                    Отредактировать
                </button>
            );
        }
    }

    renderAnswerToWordOfADay() {
        if(this.role === UserRole.User) {
            let userId = this.props.store.userStore.currentUser.id;
            return(
                <AnswerToWordOfADay wordId={this.word.id} userId={userId} wordStore={this.props.store.wordStore}/>
            );
        }
    }

    renderComments() {
        if (this.role === UserRole.User) {
            return(
                <Button
                    outline color="primary"
                    onClick={() => this.toggleComments()}>
                    Комментарии
                    {this.showComments &&
                    <CommentGroup commentedEntityType={CommentedEntityType.WordOfADay} commentedEntityId={this.word.id} onToggle={this.toggleComments} store={this.props.store} userId={this.props.store.userStore.currentUser.id}/>}
                </Button>
            );
        }
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
                            <CardFooter className="text-center">
                                {this.renderEditButton()}
                            </CardFooter>
                            {this.renderAnswerToWordOfADay()}
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {this.renderComments()}
                </Row>
                <Row className="row justify-content-center">
                    {this.renderUserAnswersControl()}
                </Row>
            </>
        );
    }

    renderAddOrUpdateWordOfADay() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        let currentUser = this.props.store.userStore.currentUser;
        return (
            <AddOrUpdateWordOfADay word={this.word} courseId={courseId} currentUser={currentUser} wordStore={this.props.store.wordStore} date={this.props.date} addOrUpdateWordOfADayToggle={this.toggleAddOrUpdateWord} />
        );
    }

    renderGetUserAnswersButton() {
        return(
            <>
                {<Button outline color="secondary" onClick={() => this.toggleUserAnswers()}>
                    ПОЛУЧИТЬ ОТВЕТЫ ПОЛЬЗОВАТЕЛЕЙ
                </Button>}</>
        );
    }

    renderUserAnswers() {
        return (
            <UserAnswers store={this.props.store}  wordId={this.word.id}/>
        );
    }

    renderUserAnswersControl() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
                <>
                    {!this.showUserAnswers && this.renderGetUserAnswersButton()}
                    {this.showUserAnswers && this.renderUserAnswers()}
                </>
            );
        }
    }

    render() {
        return(
            <>
                {this.showCautions && this.renderCautions()}
                {!this.showCautions && !this.addOrUpdate && this.renderWordOfADay(this.word)}
                {this.addOrUpdate && this.renderAddOrUpdateWordOfADay()}
            </>
        );
    }

    handleDelete() {
        let result = window.confirm('Вы уверены, что хотите удалить слово дня?');
        if(result) {
            let wordStore = this.props.store.wordStore;
                wordStore.deleteWordOfADay(this.word.id)
                    .then((status) => {
                        if(status === 200) {
                            this.word = new WordReadModel();
                            this.addOrUpdate = true;
                    }
            })
        }
    }

    toggleAddOrUpdateWord() {
        this.addOrUpdate = !this.addOrUpdate;
        this.setWordOfADay();
    }

    toggleComments() {
        this.showComments = !this.showComments;
    }

    setWordOfADay() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        this.props.store.wordStore.getWordOfADay(this.props.date, courseId)
            .then((word) => {
                this.word = word;
            });
    }

    toggleUserAnswers() {
        this.showUserAnswers = !this.showUserAnswers;
    }
}

export default WordOfADay;