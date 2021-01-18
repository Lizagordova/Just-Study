import { makeObservable, observable } from "mobx";
import { TaskViewModel } from "../Typings/viewModels/TaskViewModel";

class TrainingStore {
    tasks: TaskViewModel[] = new Array<TaskViewModel>();
    constructor() {
        makeObservable(this, {
            tasks: observable
        });
    }
    
    getTasksByTags(tagIds: number[]) {
        
    }
}

export default TrainingStore;