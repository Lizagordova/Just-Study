import React,{ Component } from 'react';
import { CommentViewModel } from "../../../Typings/viewModels/CommentViewModel";
import { makeObservable, observable } from "mobx";
import UserStore from "../../../stores/UserStore";

class ICommentProps {
    comment: CommentViewModel;
    userStore: UserStore;
}

class Comment extends Component<ICommentProps> {
    comment: CommentViewModel;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            comment: observable
        });
        this.comment = this.props.comment;
    }

    renderComment() {
        let comment = this.comment;
        let user = this.props.userStore.users.filter(u => u.id === this.comment.userId)[0];
        return(
            <>
                <div>{user.firstName + ' ' + user.lastName}</div>
                <div>{comment.text} </div>
            </>
        )
    }

    render() {
        return(
            <>
                {this.renderComment()}
            </>
        );
    }
}

export default Comment;