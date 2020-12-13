import { observable } from "mobx";
import { UserTaskViewModel } from "../Typings/viewModels/UserTaskViewModel";

class TaskStore {
    @observable
    currentUserTasks: UserTaskViewModel[];

    constructor() {
        this.setInitialData();
        this.currentUserTasks = new Array<UserTaskViewModel>(0);
    }

    setInitialData() {
        this.getCurrentUserTasks()
            .then((userTasks) => {
                this.currentUserTasks = userTasks;
            });
    }

    async getCurrentUserTasks() {
        const response = await fetch("getusertasks");
        return await response.json();
    }
}

export default TaskStore;