import TaskStore from "../../../stores/TaskStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import TagStore from "../../../stores/TagStore";

export class IUploadTaskProps {
    taskStore: TaskStore;
    tagStore: TagStore;
    lessonId: number | null;
    task: TaskViewModel;
}