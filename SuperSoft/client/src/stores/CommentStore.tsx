import {CommentGroupViewModel} from "../Typings/viewModels/CommentGroupViewModel";
import {CommentedEntityType} from "../Typings/enums/CommentedEntityType";
import {CommentReadModel} from "../Typings/readModels/CommentReadModel";
import {makeObservable, observable} from "mobx";

class CommentStore {
    commentGroup: CommentGroupViewModel = new CommentGroupViewModel();

    constructor() {
        makeObservable(this, {
            commentGroup: observable
        })
    }
    async getCommentGroup(commentedEntityType: CommentedEntityType, commentedEntityId: number, userId: number): Promise<number> {
        const response = await fetch("/getcommentgroup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({commentedEntityType: commentedEntityType, commentedEntityId: commentedEntityId, userId: userId})
        });
        if(response.status === 200) {
            this.commentGroup = await response.json();
        } else {
            this.commentGroup.commentedEntityId = commentedEntityId;
            this.commentGroup.commentedEntityType = commentedEntityType;
            this.commentGroup.userId = userId;
        }

        return response.status;
    }

    async saveComment (comment: CommentReadModel): Promise<number> {
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
                userId: this.commentGroup.userId,
                id: this.commentGroup.id
            })
        });

        return response.status;
    }
}

export default CommentStore;