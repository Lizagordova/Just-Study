import { CommentGroupViewModel } from "../Typings/viewModels/CommentGroupViewModel";
import { UserReadModel } from "../Typings/viewModels/UserReadModel";
import { makeObservable, observable } from "mobx";

class CommentsStore {
    currentCommentGroup: CommentGroupViewModel = new CommentGroupViewModel();

    constructor() {
        makeObservable(this, {
            currentCommentGroup: observable
        });
    }

    async getCurrentTaskComments(taskId: number) {
        const response = await fetch("/getcurrenttaskcommentgroup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({taskId: taskId})
        });
        if(response.status === 200) {
            console.log("i am here")
            this.currentCommentGroup = await response.json();
        } else {
            this.currentCommentGroup = new CommentGroupViewModel();
        }
    }

    async addComment(text: string, userId: number, groupId: number): Promise<number> {
        console.log("userId", userId);
        const user = new UserReadModel();
        user.id = userId;
        const response = await fetch("/addorupdatecomment", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({text: text, groupId: groupId, user: user})
        });
        if(response.status === 200) {
            return await response.json();
        } else {
            return 0;
        }
    }
}

export default CommentsStore;