import { observable, makeObservable } from "mobx";
import UserStore from "./UserStore";
import ProjectStore from "./ProjectStore";
import TaskStore from "./TaskStore";
import CommentsStore from "./CommentsStore";

export class RootStore {
    userStore: UserStore;
    taskStore: TaskStore;
    projectStore: ProjectStore;
    commentStore: CommentsStore;

    constructor() {
        makeObservable(this, {
            userStore: observable,
            taskStore: observable,
            projectStore: observable,
            commentStore: observable
        });
        this.userStore = new UserStore();
        this.taskStore = new TaskStore();
        this.projectStore = new ProjectStore();
        this.commentStore = new CommentsStore();
    }
}

export default RootStore;