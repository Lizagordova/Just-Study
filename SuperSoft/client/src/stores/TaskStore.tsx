import { makeObservable, observable } from "mobx";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";
import {TaskReadModel} from "../Typings/readModels/TaskReadModel";

class TaskStore {
    tasksByChoosenLesson: TaskViewModel[] = new Array<TaskViewModel>();

    constructor() {
        makeObservable(this, {
            tasksByChoosenLesson: observable
        });
    }

    async getTasksByLesson(lessonId: number) {
        
    }

    async addOrUpdateTask(taskReadModel: TaskReadModel): Promise<number> {
        return 200;
    }
}

export default TaskStore;