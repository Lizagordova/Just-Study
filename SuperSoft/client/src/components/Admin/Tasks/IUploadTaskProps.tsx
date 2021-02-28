import TaskStore from "../../../stores/TaskStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";

export class IUploadTaskProps {
    store: TaskStore;
    lessonId: number | null;
    task: TaskViewModel;
}