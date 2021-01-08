import { makeObservable, observable } from "mobx";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";
import {TaskReadModel} from "../Typings/readModels/TaskReadModel";
import {SubtaskReadModel} from "../Typings/readModels/SubtaskReadModel";
import {TagViewModel} from "../Typings/viewModels/TagViewModel";
import {UserSubtaskReadModel} from "../Typings/readModels/UserSubtaskReadModel";
import {UserSubtaskAnswerGroupReadModel} from "../Typings/readModels/UserSubtaskAnswerGroupReadModel";
import {UserSubtaskViewModel} from "../Typings/viewModels/UserSubtaskViewModel";

class TaskStore {
    tasksByChoosenLesson: TaskViewModel[] = new Array<TaskViewModel>();
    tags: TagViewModel[];

    constructor() {
        makeObservable(this, {
            tasksByChoosenLesson: observable
        });
    }

    async getTags() {
        
    }

    async getTasksByLesson(lessonId: number) {
        
    }

    async addOrUpdateTask(taskReadModel: TaskReadModel, lessonId: number): Promise<number> {
        return 200;
    }

    async addOrUpdateSubtask(subtaskReadModel: SubtaskReadModel): Promise<number> {
        return 200;
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
    
    async getUserSubtask(subtaskId: number): Promise<UserSubtaskViewModel> {
        return new UserSubtaskViewModel();
    }
}

export default TaskStore;