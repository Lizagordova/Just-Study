import { makeObservable, observable } from "mobx";
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
            tasksByChoosenLesson: observable
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
        const response = await fetch("/addorupdatetask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({lessonId: lessonId,
                id: task.id, taskType: task.taskType, 
                instruction: task.instruction, text: task.text,
                subtasks: task.subtasks, tags: task.tags
            })
        });
        if(response.status === 200) {
            this.getTasksByLesson(lessonId);
        }

        return response.status;
    }

    async addOrUpdateSubtask(subtask: SubtaskReadModel): Promise<number> {
        const response = await fetch("/addorupdatesubtask", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: subtask.id, taskId: subtask.taskId,
                subtaskType: subtask.subtaskType, order: subtask.order,
                text: subtask.text, path: subtask.path /*todo: зачем path нужен???*/
            })
        });
        if(response.status === 200) {
            this.updateTaskByTaskId(subtask.taskId);
        }

        return response.status;
    }

    async deleteTask(taskId: number, lessonId: number) {
        this.getTasksByLesson(lessonId);
        return 200;
    }

    async deleteSubtask(subtaskId: number, lessonId: number) {
        this.getTasksByLesson(lessonId);//todo: здесь, возможно, лучше сделать чтобы подгружалось только задание
        return 200;
    }

    async addOrUpdateUserSubtask(userSubtask: UserSubtaskReadModel): Promise<number> {
        return 200;
    }

    async addOrUpdateUserSubtaskAnswerGroup(userSubtaskAnswerGroup: UserSubtaskAnswerGroupReadModel): Promise<number> {
        return 200;
    }

    async getUserSubtask(subtaskId: number, userId: number): Promise<UserSubtaskViewModel> {
        return new UserSubtaskViewModel();
    }

    async getTasks(tags: TagReadModel[]): Promise<TaskViewModel[]> {
        return new Array<TaskViewModel>();
    }

    updateTaskByTaskId(taskId: number) {
        
    }
}

export default TaskStore;