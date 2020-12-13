import { makeObservable, observable } from "mobx";
import { UserTaskViewModel } from "../Typings/viewModels/UserTaskViewModel";

class TaskStore {
    currentUserTasks: UserTaskViewModel[];

    constructor() {
        makeObservable(this, {
                currentUserTasks: observable
        });
        this.setInitialData();
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