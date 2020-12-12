import { observable } from "mobx";
import UserStore from "./UserStore";
import ProjectStore from "./ProjectStore";
import TaskStore from "./TaskStore";
import CommentsStore from "./CommentsStore";

class RootStore {
    @observable userStore: UserStore;
    @observable taskStore: TaskStore;
    @observable projectStore: ProjectStore;
    @observable commentStore: CommentsStore;

    constructor() {
        this.userStore = new UserStore();
        this.taskStore = new TaskStore();
        this.projectStore = new ProjectStore();
        this.commentStore = new CommentsStore();
    }
}

export default RootStore;