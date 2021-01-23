﻿import React, {Component} from 'react';
import {Accordion, Button, Card} from "react-bootstrap";
import {observer} from "mobx-react";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import {makeObservable, observable} from "mobx";
import CommentGroup from "../../Common/Comments/CommentGroup";
import { CommentedEntityType } from "../../../Typings/enums/CommentedEntityType";
import RootStore from "../../../stores/RootStore";

class IUserAnswerProps {
    userWord: UserWordViewModel;
    user: UserViewModel;
    store: RootStore;
}

@observer
class UserAnswer extends Component<IUserAnswerProps> {
    showComments: boolean;
    answersLoaded: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            showComments: observable,
            answersLoaded: observable
        });
    }

    renderUserName(user: UserViewModel) {
        return (
            <Accordion.Toggle as={Button} variant="link" eventKey={user.id.toString()} onClick={() => this.setState({userAnswersLoad: true})}>
                <span>{user.firstName + ' ' + user.lastName}</span>
            </Accordion.Toggle>
        );
    }
    renderComments() {
        return(
            <>
                <Button
                    outline color="primary"
                    onClick={() => this.toggleComments()}>
                    Комментарии
                </Button>
                {this.showComments && 
                <CommentGroup commentedEntityType={CommentedEntityType.WordOfADay} commentedEntityId={this.props.userWord.wordId} userId={this.props.user.id} onToggle={this.toggleComments} store={this.props.store}/>}
            </>
        );
    }

    renderAnswer(answer: UserWordViewModel) {
        return(
            <div className="row justify-content-center">
                <div className="col-8">
                    <span>{answer.answer}</span>
                </div>
                <div className="col-4">
                    {this.renderComments()}
                </div>
            </div>
        );
    }

    render() {
        return (
            <Card>
                <Card.Header style={{backgroundColor: 'white'}}>
                    {this.renderUserName(this.props.user)}
                </Card.Header>
                <Accordion.Collapse eventKey={this.props.user.id.toString()}>
                    <Card.Body>
                        {this.renderAnswer(this.props.userWord)}
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        );
    }

    toggleComments() {
        this.showComments = !this.showComments;
    }
}

export default UserAnswer;