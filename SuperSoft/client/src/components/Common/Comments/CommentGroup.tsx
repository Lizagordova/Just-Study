import React, { Component } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, Alert } from "reactstrap";
import { CommentedEntityType } from "../../../Typings/enums/CommentedEntityType";
import {makeObservable, observable, toJS} from "mobx";
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import Comment from "./Comment";
import { CommentViewModel } from "../../../Typings/viewModels/CommentViewModel";
import { CommentReadModel } from "../../../Typings/readModels/CommentReadModel";

class ICommentGroupProps {
    commentedEntityType: CommentedEntityType;
    commentedEntityId: number;
    userId: number;
    store: RootStore;
    onToggle: any;
}

@observer
class CommentGroup extends Component<ICommentGroupProps> {
    notReceived: boolean;
    windowOpen: boolean = true;
    notSaved: boolean;
    newComment: CommentViewModel = new CommentViewModel();

    constructor(props: ICommentGroupProps) {
        super(props);
        makeObservable(this, {
            notReceived: observable,
            windowOpen: observable,
            notSaved: observable,
            newComment: observable,
        });
        this.setCommentGroup();
    }
    
    setCommentGroup() {
        this.props.store.commentStore.getCommentGroup(this.props.commentedEntityType, this.props.commentedEntityId, this.props.userId);
    }

    renderCaution() {
        return(
            <>
                {this.notReceived && <Alert color="danger">Что-то пошло не так и не удалось получить комментарии</Alert>}
                {this.notSaved && <Alert color="danger">Что-то пошло не так и не получилось добавить комментарий</Alert>}
            </>
        );
    }

    renderCommentInput() {
        return(
            <Input 
                style={{width: "90%"}}
                placeholder="Введите комментарий"
                onChange={(e) => this.handleChange(e)}/>
        );
    }

    renderSaveButton() {
        return(
            <Button
                outline color="primary"
                style={{width: "70%", marginTop: "5px", marginBottom: "5px"}}
                onClick={() => this.handleSave()}>
                Сохранить
            </Button>
        );
    }

    renderComments(comments: CommentViewModel[]) {
        let myId = this.props.store.userStore.currentUser.id;
        return(
            <>
                <ul className="message-list">
                    {comments.map((comment) => {//todo: добавить еще редактирование тех комментов, которые являются комментами текущего юзера
                        return(
                            // @ts-ignore
                            <li key={comment.id} className="message" align={`${comment.userId === myId ? "right": "left"}`}>
                                <Comment comment={comment} userStore={this.props.store.userStore} saveComment={this.handleSave} updateCommentGroup={this.updateCommentGroup}/>
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }

    renderBody() {
        let comments = this.props.store.commentStore.commentGroup.comments;
        return (
            <Modal toggle={() => this.handleToggle()} isOpen={this.windowOpen} size="lg">
                {this.renderCaution()}
                <ModalHeader 
                    toggle={() => this.handleToggle()}
                    cssModule={{'modal-title': 'w-100 text-center'}}>
                    Комментарии
                </ModalHeader>
                <ModalBody>
                    {this.renderComments(comments)}
                </ModalBody>
                <div className="row justify-content-center">
                    {this.renderCommentInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderSaveButton()}
                </div>
            </Modal>
        );
    }

    render() {
        return(
            <>
                {this.renderBody()}
            </>
        );
    }

    handleToggle() {
        this.windowOpen = !this.windowOpen;
        this.props.onToggle();
    }

    handleSave = (comment: CommentReadModel = this.getCommentReadModel()) => {
        this.props.store.commentStore.saveComment(comment)
            .then((status) => {
                if(status === 200) {
                    this.props.store.commentStore.getCommentGroup(this.props.commentedEntityType, this.props.commentedEntityId, this.props.userId);
                }
                this.notSaved = status !== 200;
        });
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.newComment.text = event.currentTarget.value;
    }

    updateCommentGroup = () => {
        this.props.store.commentStore.getCommentGroup(this.props.commentedEntityType, this.props.commentedEntityId, this.props.userId)
            .then((status) => {
                this.notReceived = status !== 200;
         });
    };

    getCommentReadModel(): CommentReadModel {
        let myId = this.props.store.userStore.currentUser.id;
        let comment = new CommentReadModel();
        comment.userId = myId;
        comment.publishDate = new Date();
        comment.text = this.newComment.text;
        comment.id = this.newComment.id;

        return comment;
    }
}

export default CommentGroup;