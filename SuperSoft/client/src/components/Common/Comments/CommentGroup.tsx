import React, { Component } from 'react';
import { Button, Input, Modal, ModalFooter, ModalHeader, ModalBody, Alert } from "reactstrap";
import { CommentGroupViewModel } from "../../../Typings/viewModels/CommentGroupViewModel";
import { CommentedEntityType } from "../../../Typings/enums/CommentedEntityType";
import { makeObservable, observable } from "mobx";
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
    commentGroup: CommentGroupViewModel;
    notReceived: boolean;
    windowOpen: boolean;
    notSaved: boolean;
    newComment: CommentViewModel = new CommentViewModel();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            commentGroup: observable,
            notReceived: observable,
            windowOpen: observable,
            notSaved: observable,
            newComment: observable,
        });
    }
    
    componentDidMount(): void {
        this.getCommentGroup()
            .then((status) => {
                if(status !== 200) {
                    this.commentGroup.commentedEntityId = this.props.commentedEntityId;
                    this.commentGroup.commentedEntityType = this.props.commentedEntityType;
                    this.commentGroup.userId = this.props.userId;
                }
            });
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
            <Input placeholder="Введите комментарий" onChange={(e) => this.handleChange(e)}/>
        );
    }

    renderSaveButton() {
        return(
            <Button outline color="primary" onClick={() => this.handleSave()}>Сохранить</Button>
        );
    }

    renderComments() {
        let comments = this.commentGroup.comments;
        let myId = this.props.store.userStore.currentUser.id;
        return(
            <>
                <ul className="message-list">
                    {comments.map((comment) => {//todo: добавить еще редактирование тех комментов, которые являются комментами текущего юзера
                        return(
                            // @ts-ignore
                            <li key={comment.id} className="message" align={`${comment.userId === myId ? "right": "left"}`}>
                                <Comment comment={comment} userStore={this.props.store.userStore} />
                            </li>
                        );
                    })}
                </ul>
            </>
        );
    }

    render() {
        return(
            <Modal toggle={() => this.handleToggle()} isOpen={this.windowOpen} size="lg">
                {this.renderCaution()}
                <ModalHeader toggle={() => this.handleToggle()} cssModule={{'modal-title': 'w-100 text-center'}}>Комментарии</ModalHeader>
                <ModalBody>
                    {this.renderComments()}
                </ModalBody>
                <ModalFooter>
                    {this.renderCommentInput()}
                    {this.renderSaveButton()}
                </ModalFooter>
            </Modal>
        );
    }

    handleToggle() {
        this.windowOpen = !this.windowOpen;
        this.props.onToggle();
    }
    
    handleSave() {
        this.saveComment()
            .then((status) => {
                if(status === 200) {
                    this.getCommentGroup();
                }
                this.notSaved = status !== 200;
        });
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.newComment.text = event.currentTarget.value;
    }

    async getCommentGroup(): Promise<number> {
        const response = await fetch(`/getcommentgroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({commentedEntityType: this.props.commentedEntityType, commentedEntityId: this.props.commentedEntityId, userId: this.props.userId})
        });
        if(response.status === 200) {
            this.commentGroup = await response.json();
        }
        this.notReceived = response.status !== 200;

        return response.status;
    }

    async saveComment(): Promise<number> {
        let comment = this.getCommentReadModel();
        const response = await fetch(`/addorupdatecomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                comment: comment,
                groupId: this.commentGroup.id,
                commentedEntityType: this.commentGroup.commentedEntityType,
                commentedEntityId: this.commentGroup.commentedEntityId,
                userId: this.commentGroup.userId
            })
        });

        return response.status;
    }

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