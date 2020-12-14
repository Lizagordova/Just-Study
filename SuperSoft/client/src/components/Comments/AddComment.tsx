import React from "react";
import { ICommentsProps } from "./ICommentsProps";
import { Input, Button } from "reactstrap";

export class AddComment extends React.Component<ICommentsProps>{
    commentText: string;

    render() {
        return(
            <>
                <div className="row justify-content-center">
                    <Input placeholder="Добавить комментарий" onChange={(e) => { this.inputComment(e) }}/>
                </div>
                <div className="row justify-content-center">
                    <Button style={{width: "100%", backgroundColor: "#07575b"}}
                    onClick={() => this.addComment()}>Добавить</Button>
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
        commentStore.addComment(this.commentText, userStore.currentUser.id)
            .then(() => commentStore.getCurrentTaskComments(this.props.taskId)
                .then(() => this.commentText = ""));
    }
}