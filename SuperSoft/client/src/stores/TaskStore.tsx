﻿import {makeObservable, observable, toJS} from "mobx";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";
import {TaskReadModel} from "../Typings/readModels/TaskReadModel";
import {SubtaskReadModel} from "../Typings/readModels/SubtaskReadModel";
import {TagViewModel} from "../Typings/viewModels/TagViewModel";
import {UserSubtaskReadModel} from "../Typings/readModels/UserSubtaskReadModel";
import {UserSubtaskAnswerGroupReadModel} from "../Typings/readModels/UserSubtaskAnswerGroupReadModel";
import {UserSubtaskViewModel} from "../Typings/viewModels/UserSubtaskViewModel";
import {UserSubtaskAnswerGroupViewModel} from "../Typings/viewModels/UserSubtaskAnswerGroupViewModel";
import {TagReadModel} from "../Typings/readModels/TagReadModel";

class TaskStore {
    tasksByChoosenLesson: TaskViewModel[] = new Array<TaskViewModel>();
    tags: TagViewModel[];

    constructor() {
        makeObservable(this, {
            tasksByChoosenLesson: observable,
            tags: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getTags();
    }

    async getTags() {
        const response = await fetch("/gettags");
        if(response.status === 200) {
            this.tags = await response.json();
        }
    }

    async getTasksByLesson(lessonId: number) {
        const response = await fetch("/gettasksbychoosenlesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({lessonId: lessonId})
        });
        if(response.status === 200) {
            this.tasksByChoosenLesson = await response.json();
        }
    }

    async addOrUpdateTask(task: TaskReadModel, lessonId: number): Promise<number> {
        const formData = this.getFormDataForTask(task, lessonId);
        const response = await fetch("/addorupdatetask", {
            method: "POST",
            body: formData
        });
        if(response.status === 200) {
            let taskId = await response.json();
            task.subtasks.forEach((sub) => {
                sub.taskId = taskId;
                this.addOrUpdateSubtask(sub);
            });
            this.getTasksByLesson(lessonId);
        }

        return response.status;
    }

    getFormDataForTask(task: TaskReadModel, lessonId: number): FormData {
        let formData = new FormData();
        formData.append("lessonId", lessonId.toString());
        if(task.id !== undefined) {
            formData.append("id", task.id.toString());
        }
        if(task.taskType !== undefined) {
            formData.append("taskType", task.taskType.toString());
        }
        if(task.text !== undefined) {
            formData.append("text", task.text.toString());
        }
        if(task.instruction !== undefined) {
            formData.append("instruction", task.instruction.toString());
        }
        
        return formData;
    }

    async addOrUpdateSubtask(subtask: SubtaskReadModel): Promise<number> {
        const formData = this.getFormDataForSubtask(subtask);
        const response = await fetch("/addorupdatesubtask", {
            method: "POST",
            body: formData
        });
        if(response.status === 200) {
            this.updateTaskByTaskId(subtask.taskId);
        }

        return response.status;
    }

    getFormDataForSubtask(subtask: SubtaskReadModel): FormData {
        const formData = new FormData();
        formData.append("subtaskType", subtask.subtaskType.toString());
        if(subtask.order !== undefined) {
            formData.append("order", subtask.order.toString());
        }
        if(subtask.text !== undefined) {
            formData.append("text", subtask.text.toString());
        }
        if(subtask.path !== undefined) {
            formData.append("path", subtask.path.toString());
        }
        if(subtask.id !== undefined) {
            formData.append("path", subtask.id.toString());
        }
        if(subtask.id !== undefined) {
            formData.append("id", subtask.id.toString());
        }
        if(subtask.taskId !== undefined) {
            formData.append("taskId", subtask.taskId.toString());
        }
        if(subtask.taskId !== undefined) {
            formData.append("file", subtask.file);
        }
        
        return formData;
    }

    async deleteTask(taskId: number, lessonId: number) {
        const response = await fetch("/deletetask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: taskId
            })
        });
        if(response.status === 200) {
            this.getTasksByLesson(lessonId);
        }

        return response.status;
    }

    async deleteSubtask(subtaskId: number, taskId: number) {
        const response = await fetch("/deletesubtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: taskId
            })
        });
        if(response.status === 200) {
            this.updateTaskByTaskId(taskId);
        }

        return response.status;
    }

    async addOrUpdateUserSubtask(userSubtask: UserSubtaskReadModel): Promise<number> {
        const response = await fetch("/addorupdateusersubtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userSubtask.userId, answer: userSubtask.answer,
                status: userSubtask.status, subtaskId: userSubtask.subtaskId,
                taskId: userSubtask.taskId, files: userSubtask.files
            })
        });

        return response.status;
    }

    async addOrUpdateUserSubtaskAnswerGroup(userSubtaskAnswerGroup: UserSubtaskAnswerGroupReadModel): Promise<number> {
        const response = await fetch("/addorupdateusersubtaskanswergroup", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userSubtaskAnswerGroup.userId, answerGroupId: userSubtaskAnswerGroup.answerGroupId,
                subtaskId: userSubtaskAnswerGroup.subtaskId, status: userSubtaskAnswerGroup.status,
                lastAnswer: userSubtaskAnswerGroup.lastAnswer
            })
        });
        return response.status;
    }

    async getUserSubtask(subtaskId: number, userId: number): Promise<UserSubtaskViewModel> {
        let userSubtask =  new UserSubtaskViewModel();
        const response = await fetch("/getusersubtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId, subtaskId: subtaskId
            })
        });
        if(response.status === 200) {
            userSubtask = await response.json();
        }

        return userSubtask;
    }

    async getTasks(tags: TagReadModel[]): Promise<TaskViewModel[]> {
        let tagIds = tags.map(t => t.id);
        let tasks = new Array<TaskViewModel>();
        const response = await fetch("/gettasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                tagIds: tagIds
            })
        });
        if(response.status === 200) {
            tasks = await response.json();
        }

        return tasks;
    }

    async updateTaskByTaskId(taskId: number) {
        const response = await fetch("/gettaskbyid", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: taskId
            })
        });
        if(response.status === 200) {
            let taskIndex = this.tasksByChoosenLesson.findIndex(t => t.id === taskId);
            this.tasksByChoosenLesson[taskIndex] = await response.json();
        }
    }
}

export default TaskStore;