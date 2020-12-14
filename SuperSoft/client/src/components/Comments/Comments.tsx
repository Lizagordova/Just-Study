import React from "react";
import { ICommentsProps } from "./ICommentsProps";
import { CommentViewModel } from "../../Typings/viewModels/CommentViewModel";
import { observer } from "mobx-react";
import { AddComment } from "./AddComment";
import { Card, CardText, CardTitle } from "reactstrap";

@observer
export class Comments extends React.Component<ICommentsProps> {
    renderComments(comments: CommentViewModel[]) {
        return (
            <>
                {comments.map(comment => {
                    return(
                        <Card sm="12">
                            <CardTitle>{comment.user.firstName} {comment.user.lastName}</CardTitle>
                            <CardText>{comment.text}</CardText>
                        </Card>
                    );
                })}
            </>
        );
    }

    render() {
        let comments = this.props.store.commentStore.currentTaskComments;
        return(
            <>
                <AddComment store={this.props.store} taskId={this.props.taskId} />
                {this.renderComments(comments)}
            </>
        )
    }
}