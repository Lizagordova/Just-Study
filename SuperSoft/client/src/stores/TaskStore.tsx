import { makeObservable, observable } from "mobx";
import { UserTaskViewModel } from "../Typings/viewModels/UserTaskViewModel";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";
import { TaskStatus } from "../Typings/enums/TaskStatus";
import { TaskType } from "../Typings/enums/TaskType";
import {TaskPriority} from "../Typings/enums/TaskPriority";

class TaskStore {
    currentUserTasks: UserTaskViewModel[];
    currentProjectTasks: TaskViewModel[] = new Array<TaskViewModel>();
    public completedPercentage: number = 0;

    constructor() {
        makeObservable(this, {
            currentUserTasks: observable,
            currentProjectTasks: observable,
            completedPercentage: observable
        });
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
            this.computeCompletedPercentage();
        }
    }

    computeCompletedPercentage() {
        let completedTasks = this.currentProjectTasks.filter(t => t.status === TaskStatus.Completed);
        let percentage = completedTasks.length / this.currentProjectTasks.length * 100;
        this.completedPercentage = isNaN(percentage) ? 100 : percentage;
    }

    async addOrUpdateTask(header: string, description: string, startDate: Date | Date[], deadlineDate: Date | Date[], taskType: TaskType, status: TaskStatus, priority: TaskPriority, tester: number, responsible: number, author: number, id: number = 0, projectId: number = 0) {
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