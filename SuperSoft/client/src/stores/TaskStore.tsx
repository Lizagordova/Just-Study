import { makeObservable, observable } from "mobx";
import { UserTaskViewModel } from "../Typings/viewModels/UserTaskViewModel";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";
import { TaskStatus } from "../Typings/enums/TaskStatus";
import { TaskType } from "../Typings/enums/TaskType";

class TaskStore {
    currentUserTasks: UserTaskViewModel[];
    currentProjectTasks: TaskViewModel[];
    userTasks: UserTaskViewModel[];

    constructor() {
        makeObservable(this, {
            currentUserTasks: observable,
            currentProjectTasks: observable
        });
        this.currentProjectTasks = new Array<TaskViewModel>();
        this.setInitialData();
    }

    setInitialData() {
        this.getCurrentUserTasks();
    }

    async getCurrentUserTasks() {
        const response = await fetch("/getusertasks");
        if(response.status === 200) {
            this.currentUserTasks = await response.json();
        } else {
            this.currentUserTasks = new Array<UserTaskViewModel>(0);
        }
    }

    async getTasks(projectId: number) {
        const response = await fetch("/gettasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: projectId})
        });
        if(response.status === 200) {
            this.currentProjectTasks = await response.json();
        }
    }

    async addOrUpdateTask(header: string, description: string, startDate: Date | Date[], deadlineDate: Date | Date[], taskType: TaskType, status: TaskStatus, priority: number, tester: number, responsible: number, author: number, id: number = 0, projectId: number = 0) {
        const response = await fetch("/addorupdatetask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id, projectId: projectId, header: header, description: description, startDate: startDate, deadlineDate: deadlineDate, taskType: taskType, status: status, priority: priority, tester: tester, responsible: responsible, author: author})
        });
        if(response.status === 200) {
            const task = await response.json();
            this.currentProjectTasks.push(task);
        }

        return response.status;
    }
}

export default TaskStore;