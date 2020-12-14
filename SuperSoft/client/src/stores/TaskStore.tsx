import { makeObservable, observable } from "mobx";
import { UserTaskViewModel } from "../Typings/viewModels/UserTaskViewModel";
import {TaskViewModel} from "../Typings/viewModels/TaskViewModel";

class TaskStore {
    currentUserTasks: UserTaskViewModel[];
    currentProjectTasks: TaskViewModel[];
    userTasks: UserTaskViewModel[];

    constructor() {
        makeObservable(this, {
            currentUserTasks: observable,
            currentProjectTasks: observable
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
        const response = await fetch("/getusertasks");
        return await response.json();
    }

    async getTasks(projectId: number) {
        const response = await fetch("/gettasks", {
            method: "POST",
            body: JSON.stringify({id: projectId})
        });
        if(response.status === 200) {
            this.currentProjectTasks = await response.json();
        }
    }
}

export default TaskStore;