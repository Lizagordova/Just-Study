import React,{ Component } from 'react';
import { CommentViewModel } from "../../../Typings/viewModels/CommentViewModel";
import {makeObservable, observable, toJS} from "mobx";
import UserStore from "../../../stores/UserStore";
import { Alert, Input, Button } from "reactstrap";
import { observer } from "mobx-react";
import {CommentReadModel} from "../../../Typings/readModels/CommentReadModel";

class ICommentProps {
    comment: CommentViewModel;
    userStore: UserStore;
    saveComment: any;
    updateCommentGroup: any;
}

@observer
class Comment extends Component<ICommentProps> {
    comment: CommentViewModel;
    notDeleted: boolean;
    editWindowOpen: boolean;

    constructor(props: ICommentProps) {
        super(props);
        makeObservable(this, {
            comment: observable,
            notDeleted: observable,
            editWindowOpen: observable
        });
        this.comment = this.props.comment;
    }

    remove() {
        let result = window.confirm('Вы уверены, что хотите удалить комментарий?');
        if(result) {
            this.removeComment()
                .then((status) => {
                    if(status === 200) {
                        this.props.updateCommentGroup();
                    }
                });
        }
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.comment.text = event.currentTarget.value;
    }
    
    editCommentToggle() {
        this.editWindowOpen = !this.editWindowOpen;
    }

    handleSave() {
        let comment = this.getCommentReadModel();
        this.props.saveComment(comment);
    }
    
    renderEditInput() {
        return(
            <>
                <Input value={this.comment.text} onChange={(e) => this.handleChange(e)}/>
                <Button 
                    outline color="primary"
                    onClick={() => this.handleSave()}>
                    Сохранить
                </Button>
            </>
        );
    }

    renderControlButtons() {
        if(this.props.userStore.currentUser.id === this.comment.userId) {
            return(
                <>
                    <i
                        style={{marginLeft: "5px", height: "10px"}}
                        onClick={() => this.editCommentToggle()}
                        className="fa fa-edit" aria-hidden="true"/>
                    <i
                        style={{marginLeft: "5px", height: "10px"}}
                       onClick={() => this.remove()}
                       className="fa fa-window-close" aria-hidden="true"/>
                </>
            );
        }
    }

    renderComment() {
        let comment = this.comment;
        let user = this.props.userStore.users.filter(u => u.id === this.comment.userId)[0];
        return(
            <>
                <div>
                    {user.firstName + ' ' + user.lastName}
                </div>
                <div>
                    {comment.text}
                    {this.renderControlButtons()}
                </div>
                {this.renderCautions()}
            </>
        )
    }

    renderCautions() {
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return(
            <>
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и комментарий не удалился. Попробуйте ещё раз.</Alert>}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderComment()}
                {this.editWindowOpen && this.renderEditInput()}
            </>
        );
    }

    getCommentReadModel(): CommentReadModel {
        let myId = this.props.userStore.currentUser.id;
        let comment = new CommentReadModel();
        comment.userId = myId;
        comment.publishDate = new Date();
        comment.text = this.comment.text;
        comment.id = this.comment.id;

        return comment;
    }

    async removeComment(): Promise<number> {
        const response = await fetch(`/removecomment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: this.comment.id})
        });
        this.notDeleted = response.status !== 200;

        return response.status;
    }
}

export default Comment;