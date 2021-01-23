import React, {Component} from 'react';
import {Accordion, Button, Card} from "react-bootstrap";
import {observer} from "mobx-react";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import {UserWordViewModel} from "../../../Typings/viewModels/UserWordViewModel";
import {makeObservable, observable} from "mobx";
import CommentGroup from "../../Common/Comments/CommentGroup";
import {renderSpinner} from "../../../functions/renderSpinner";
import {CommentedEntityType} from "../../../Typings/enums/CommentedEntityType";
import RootStore from "../../../stores/RootStore";

class IUserAnswerProps {
    user: UserViewModel;
    store: RootStore;
    wordId: number;
}

@observer
class UserAnswer extends Component<IUserAnswerProps> {
    answer: UserWordViewModel;
    showComments: boolean;
    answersLoaded: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            answer: observable,
            showComments: observable,
            answersLoaded: observable
        });
    }

    componentDidMount(): void {
        this.props.store.wordStore
            .getUserWordsProgress(this.props.wordId, this.props.user.id)
            .then((userWord) => {
                this.answer = userWord;
                this.answersLoaded = true;
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
                <CommentGroup commentedEntityType={CommentedEntityType.WordOfADay} commentedEntityId={this.props.wordId} userId={this.props.user.id} onToggle={this.toggleComments} store={this.props.store}/>}
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
                        {this.answersLoaded && this.renderAnswer(this.answer)}
                        {!this.answersLoaded && renderSpinner()}
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