import React from "react";
import { Input, Button, Alert } from "reactstrap";
import { IAddCommentsProps } from "./IAddCommentsProps";

export class AddComment extends React.Component<IAddCommentsProps>{
    commentText: string;
    notSaved: boolean;

    render() {
        return(
            <>
                <div className="row justify-content-center">
                    <div className="col-9">
                        <Input placeholder="Добавить комментарий" onChange={(e) => { this.inputComment(e) }}/>
                    </div>
                    <div className="col-3">
                        <Button style={{width: "100%", backgroundColor: "#07575b"}} 
                             onClick={() => this.addComment()}>Добавить</Button>
                    </div>
                    {this.notSaved && <Alert color="danger">Что-то пошло не так и комментарий не сохранился</Alert>}
                </div>
            </>
        );
    }

    inputComment(event: React.FormEvent<HTMLInputElement>) {
        this.commentText = event.currentTarget.value;
    }

    addComment() {
        let commentStore = this.props.store.commentStore;
        let userStore = this.props.store.userStore;
        commentStore.addComment(this.commentText, userStore.currentUser.id, this.props.groupId)
            .then((status) => {
                if (status === 200) {
                    commentStore.getCurrentTaskComments(this.props.taskId);
                    this.notSaved = false;
                } else {
                    this.notSaved = true;
                }
            })
            .then(() => this.commentText = "");
    }
}