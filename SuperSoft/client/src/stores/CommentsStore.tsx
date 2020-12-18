import { makeObservable, observable } from "mobx";
import { CommentGroupViewModel } from "../Typings/viewModels/CommentGroupViewModel";
import {UserReadModel} from "../Typings/viewModels/UserReadModel";

class CommentsStore {
    currentTaskCommentGroup: CommentGroupViewModel;

    constructor() {
        makeObservable(this, {
            currentTaskCommentGroup: observable
        });
    }

    async getCurrentTaskComments(taskId: number): Promise<CommentGroupViewModel> {
        const response = await fetch("/getcurrenttaskcommentgroup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({taskId: taskId})
        });
        if(response.status === 200) {
            return await response.json();
        } else {
            return new CommentGroupViewModel();
        }
    }

    async addComment(text: string, userId: number): Promise<number> {
        const user = new UserReadModel();
        user.id = userId;
        const response = await fetch("/addorupdatecomment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({text: text, groupId: this.currentTaskCommentGroup.id, user: user})
        });
        if(response.status === 200) {
            return await response.json();
        } else {
            return 0;
        }
    }
}

export default CommentsStore;