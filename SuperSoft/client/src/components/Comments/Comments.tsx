import React from "react";
import { ICommentsProps } from "./ICommentsProps";
import { CommentViewModel } from "../../Typings/viewModels/CommentViewModel";
import { observer } from "mobx-react";
import { AddComment } from "./AddComment";
import { Card, CardText, CardTitle, Label } from "reactstrap";
import { CommentGroupViewModel } from "../../Typings/viewModels/CommentGroupViewModel";
import {makeObservable, observable, toJS} from "mobx";

@observer
export class Comments extends React.Component<ICommentsProps> {
    componentDidMount(): void {
        this.props.store.commentStore.getCurrentTaskComments(this.props.taskId);
    }

    renderComments(comments: CommentViewModel[]) {
        console.log("comments", toJS(comments));
        return (
            <>
                {comments.map(comment => {
                    return(
                        <Card sm="12">
                            <div className="row justify-content-center">
                                <CardTitle>{comment.user.firstName} {comment.user.lastName}</CardTitle>
                            </div>
                            <div className="row justify-content-center">
                                <CardText>{comment.text}</CardText>
                            </div>
                        </Card>
                    );
                })}
            </>
        );
    }

    render() {
        let commentGroup = this.props.store.commentStore.currentCommentGroup;
        let comments = commentGroup.comments;
        return(
            <>
                <Label style={{width: "100%"}} align="center">КОММЕНТАРИИ</Label>
                <AddComment store={this.props.store} taskId={this.props.taskId} groupId={commentGroup.id}/>
                {comments.length > 0 && this.renderComments(comments)}
            </>
        )
    }
}