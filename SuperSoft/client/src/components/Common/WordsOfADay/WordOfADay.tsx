import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Alert, Button, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Col, Row} from "reactstrap";
import {WordViewModel} from "../../../Typings/viewModels/WordViewModel";
import RootStore from "../../../stores/RootStore";
import {makeObservable, observable, toJS} from "mobx";
import {UserRole} from "../../../Typings/enums/UserRole";
import CommentGroup from "../Comments/CommentGroup";
import {CommentedEntityType} from "../../../Typings/enums/CommentedEntityType";
import {WordReadModel} from "../../../Typings/readModels/WordReadModel";
import AnswerToWordOfADay from "./AnswerToWordOfADay";
import UserAnswers from "../../Admin/WordsOfADay/UserAnswers";
import {translatePartOfSpeech} from "../../../functions/translater";
import AddOrUpdateWord from "../Dictionary/AddOrUpdateWord";

class IWordOfADayProps {
    date: Date | Date[];
    store: RootStore;
}

@observer
class WordOfADay extends Component<IWordOfADayProps> {
    addOrUpdate: boolean = false;
    role: UserRole;
    showComments: boolean;
    showCautions: boolean = true;
    itIsNotAllowedToWatchNextWords: boolean;
    showUserAnswers: boolean;
    alreadyExists: boolean;
    currentCourseId: number;

    constructor(props: IWordOfADayProps) {
        super(props);
        makeObservable(this, {
            addOrUpdate: observable,
            role: observable,
            showCautions: observable,
            showComments: observable,
            itIsNotAllowedToWatchNextWords: observable,
            showUserAnswers: observable,
            alreadyExists: observable,
            currentCourseId: observable
        });
        this.setWordOfADay(this.props.date);
        this.currentCourseId = this.props.store.courseStore.choosenCourse.id;
        this.role = this.props.store.userStore.currentUser.role;
    }

    componentDidUpdate(prevProps: Readonly<IWordOfADayProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.date !== this.props.date) {
            this.setWordOfADay(this.props.date);
        }
    }

    setWordOfADay(date: Date | Date[]) {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        this.showCautions = true;
        this.props.store.wordStore.getWordOfADay(date, courseId)
            .then((word) => {
                this.showCautions = word.word === null;
                this.alreadyExists = word.word !== null;
            });
    }

    renderCautions() {
        return(
            <Alert style={{marginTop: "10px"}} color="danger">На эту дату слово дня отсутствует</Alert>
        );
    }

    renderDeleteButton() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return(
                <i style={{marginLeft: '95%', width: '3%'}}
                   onClick={() => this.handleDelete()}
                   className="fa fa-window-close fa-2x" aria-hidden="true" />
            );
        }
    }

    renderWord(word: WordViewModel) {
        return(
            <CardHeader className="text-center">{word.word.toUpperCase()}</CardHeader>
        );
    }

    renderWordDetails(word: WordViewModel) {
        return(
            <>
                <CardTitle>{translatePartOfSpeech(word.partOfSpeech)}</CardTitle>
                <CardText>{word.russianMeaning}</CardText>
                <CardText>{word.englishMeaning}</CardText>
            </>
        );
    }

    renderEditButton() {
        if(this.role === UserRole.Admin) {
            return(
                <CardFooter className="text-center">
                    <button
                        onClick={() => this.toggleAddOrUpdateWord()}>
                        Отредактировать
                    </button>
                </CardFooter>
            );
        }
    }

    renderAnswerToWordOfADay() {
        if(this.role === UserRole.User) {
            let userId = this.props.store.userStore.currentUser.id;
            return(
                <AnswerToWordOfADay wordId={this.props.store.wordStore.wordOfADay.id} userId={userId} wordStore={this.props.store.wordStore}/>
            );
        }
    }

    renderComments() {
        if (this.role === UserRole.User) {
            return(
                <Button
                    style={{marginTop: "10px"}}
                    outline color="primary"
                    onClick={() => this.toggleComments()}>
                    Комментарии
                    {this.showComments &&
                    <CommentGroup commentedEntityType={CommentedEntityType.WordOfADay} commentedEntityId={this.props.store.wordStore.wordOfADay.id} onToggle={this.toggleComments} store={this.props.store} userId={this.props.store.userStore.currentUser.id}/>}
                </Button>
            );
        }
    }

    renderWordOfADay(word: WordViewModel) {
        if(this.props.store.wordStore.wordOfADay.word === null) {
            this.showCautions = true;
        } else {
            this.showCautions = false;
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
                                {this.renderEditButton()}
                                {this.renderAnswerToWordOfADay()}
                            </Card>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        {this.renderComments()}
                    </Row>
                    <Row className="row justify-content-center" style={{marginTop: "10px"}}>
                        {this.renderUserAnswersControl()}
                    </Row>
                </>
            );
        }
    }

    renderAddOrUpdateWordOfADay() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        let currentUser = this.props.store.userStore.currentUser;
        return (
            <AddOrUpdateWord word={this.props.store.wordStore.wordOfADay} cancelEdit={this.toggleAddOrUpdateWord} courseId={courseId} currentUser={currentUser} date={this.props.date} isWordOfADay={true} wordStore={this.props.store.wordStore} />
        );
    }

    renderGetUserAnswersButton() {
        return(
            <>
                {<Button outline color="secondary" onClick={() => this.toggleUserAnswers()}>
                    ПОЛУЧИТЬ ОТВЕТЫ ПОЛЬЗОВАТЕЛЕЙ
                </Button>}
            </>
        );
    }

    renderUserAnswers() {
        return (
            <UserAnswers store={this.props.store}  wordId={this.props.store.wordStore.wordOfADay.id}/>
        );
    }

    renderUserAnswersControl() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
                <>
                    {this.renderGetUserAnswersButton()}
                    {this.showUserAnswers && this.renderUserAnswers()}
                </>
            );
        }
    }

    renderButton() {
        if(this.props.store.userStore.currentUser.role === UserRole.Admin) {
            return(
                <Button outline color="primary" onClick={() => this.toggleAddOrUpdateWord()}>
                    Добавить слово
                </Button>
            );
        }
    }

    render() {
        return(
            <div className="container">
                {this.showCautions && this.renderCautions()}
                {this.renderWordOfADay(this.props.store.wordStore.wordOfADay)}
                {this.addOrUpdate && this.renderAddOrUpdateWordOfADay()}
                {!this.alreadyExists && this.renderButton()}
            </div>
        );
    }

    handleDelete() {
        let result = window.confirm('Вы уверены, что хотите удалить слово дня?');
        if(result) {
            let wordStore = this.props.store.wordStore;
                wordStore.deleteWordOfADay(this.props.store.wordStore.wordOfADay.id)
                    .then((status) => {
                        if(status === 200) {
                            this.setWordOfADay(this.props.date);
                            this.addOrUpdate = true;
                    }
            })
        }
    }

    toggleAddOrUpdateWord = () => {
        this.addOrUpdate = !this.addOrUpdate;
        this.setWordOfADay(this.props.date);
    };

    toggleComments = () => {
        this.showComments = !this.showComments;
    };

    toggleUserAnswers() {
        this.showUserAnswers = !this.showUserAnswers;
    }
}

export default WordOfADay;