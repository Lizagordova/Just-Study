import {makeObservable, observable, toJS} from "mobx";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";
import {TaskReadModel} from "../Typings/readModels/TaskReadModel";
import {SubtaskReadModel} from "../Typings/readModels/SubtaskReadModel";
import {TagViewModel} from "../Typings/viewModels/TagViewModel";
import {UserSubtaskReadModel} from "../Typings/readModels/UserSubtaskReadModel";
import {UserSubtaskAnswerGroupReadModel} from "../Typings/readModels/UserSubtaskAnswerGroupReadModel";
import {UserSubtaskViewModel} from "../Typings/viewModels/UserSubtaskViewModel";
import {UserSubtaskAnswerGroupViewModel} from "../Typings/viewModels/UserSubtaskAnswerGroupViewModel";
import {TagReadModel} from "../Typings/readModels/TagReadModel";
import {UserTaskViewModel} from "../Typings/viewModels/UserTaskViewModel";

class TaskStore {
    tasksByChoosenLesson: TaskViewModel[] = new Array<TaskViewModel>();
    tasksByQuery: TaskViewModel[] = new Array<TaskViewModel>();

    constructor() {
        makeObservable(this, {
            tasksByChoosenLesson: observable,
            tasksByQuery: observable
        });
    }

    async getTasksByLesson(lessonId: number): Promise<number> {
        const response = await fetch("/gettasksbychoosenlesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: lessonId})
        });
        if(response.status === 200) {
            this.tasksByChoosenLesson  = await response.json();
        }

        return response.status;
    }

    async addOrUpdateTask(task: TaskReadModel, lessonId: number | null): Promise<number> {
        const formData = this.getFormDataForTask(task, lessonId);
        const response = await fetch("/addorupdatetask", {
            method: "POST",
            body: formData
        });
        if(response.status === 200) {
            let taskId = await response.json();
            this.attachTagsToTask(taskId, task.tagIds);
            task.subtasks.forEach((sub, i) => {
                sub.taskId = taskId;
                this.addOrUpdateSubtask(sub);
            });
        }

        return response.status;
    }

    async attachTagsToTask(taskId: number, tagIds: number[])
    {
        const response = await fetch("/attachtagstotask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({taskId: taskId, tagIds: tagIds})
        });
    }

    getFormDataForTask(task: TaskReadModel, lessonId: number | null): FormData {
        let formData = new FormData();
        if(lessonId !== null) {
            formData.append("lessonId", lessonId.toString());
        }
        if(task.id !== undefined && task.id !== null) {
            formData.append("id", task.id.toString());
        }
        if(task.taskType !== undefined && task.taskType !== null) {
            formData.append("taskType", task.taskType.toString());
        }
        if(task.text !== undefined && task.text !== null) {
            formData.append("text", task.text.toString());
        }
        if(task.instruction !== undefined && task.instruction !== null) {
            formData.append("instruction", task.instruction.toString());
        }
        if(task.subtasks !== undefined && task.subtasks !== null) {
            // @ts-ignore
            formData.append("subtasks", task.subtasks);
        }
        if(task.tagIds !== undefined && task.tagIds !== null) {
            // @ts-ignore
            formData.append("tagIds", task.tagIds);
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
        if(subtask.order !== undefined && subtask.order !== null) {
            formData.append("order", subtask.order.toString());
        }
        if(subtask.text !== undefined && subtask.text !== null) {
            formData.append("text", subtask.text.toString());
        }
        if(subtask.path !== undefined  && subtask.path !== null) {
            formData.append("path", subtask.path.toString());
        }
        if(subtask.id !== undefined && subtask.id !== null) {
            formData.append("id", subtask.id.toString());
        }
        if(subtask.taskId !== undefined && subtask.taskId !== null) {
            formData.append("taskId", subtask.taskId.toString());
        }
        if(subtask.file !== undefined && subtask.file !== null) {
            formData.append("file", subtask.file);
        }
        
        return formData;
    }

    async deleteTask(taskId: number, deleteOnlyFromLesson: boolean, lessonId: number = 0) {
        const response = await fetch("/deletetask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: taskId,
                deleteOnlyFromLesson: deleteOnlyFromLesson,
                lessonId: lessonId
            })
        });
        return response.status;
    }

    async deleteSubtask(subtaskId: number, taskId: number) {
        const response = await fetch("/deletesubtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: subtaskId
            })
        });
        if(response.status === 200) {
            this.updateTaskByTaskId(taskId);
        }

        return response.status;
    }

   async deleteUserSubtask(userId: number, subtaskId: number, taskId: number) {
        const response = await fetch("/deleteusersubtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId, subtaskId: subtaskId
            })
        });

        return response.status;
    }

    async addOrUpdateUserSubtask(userSubtask: UserSubtaskReadModel): Promise<number> {
        let formData = this.getFormDataForUserSubtask(userSubtask);
        const response = await fetch("/addorupdateusersubtask", {
            method: "POST",
            body: formData
        });

        return response.status;
    }

    getFormDataForUserSubtask(userSubtask: UserSubtaskReadModel): FormData {
        let formData = new FormData();
        if(userSubtask.userId !== undefined && userSubtask.userId !== null) {
            formData.append("userId", userSubtask.userId.toString());
        }
        if(userSubtask.answer !== undefined && userSubtask.answer !== null) {
            formData.append("answer", userSubtask.answer.toString());
        }
        if(userSubtask.status !== undefined && userSubtask.status !== null) {
            formData.append("status", userSubtask.status.toString());
        }
        if(userSubtask.subtaskId !== undefined && userSubtask.subtaskId !== null) {
            formData.append("subtaskId", userSubtask.subtaskId.toString());
        }
        if(userSubtask.taskId !== undefined && userSubtask.taskId !== null) {
            formData.append("taskId", userSubtask.taskId.toString());
        }
        if(userSubtask.file !== undefined && userSubtask.file !== null) {
            formData.append("file", userSubtask.file);
        }

        return formData;
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

    async getUserTask(taskId: number, userId: number): Promise<UserTaskViewModel> {
        let userTask =  new UserTaskViewModel();
        const response = await fetch("/getusertask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userId: userId, taskId: taskId
            })
        });
        if(response.status === 200) {
            userTask = await response.json();
        }

        return userTask;
    }

    async getTasks(tags: TagReadModel[], ignoreIds: number[] = new Array<number>(0)): Promise<number> {
        let tagIds = tags.map(t => t.id);
        let tasks = new Array<TaskViewModel>();
        const response = await fetch("/gettasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                tagIds: tagIds,
                ignoreIds: ignoreIds
            })
        });
        if(response.status === 200) {
            this.tasksByQuery = await response.json();
        }

        return response.status;
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
            this.tasksByChoosenLesson[taskIndex] =  await response.json();
        }
    }

    async attachTaskToLesson(taskId: number, lessonId: number): Promise<number> {
        const response = await fetch("/attachtasktolesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: taskId, lessonId: lessonId
            })
        });

        return response.status;
    }
}

export default TaskStore;