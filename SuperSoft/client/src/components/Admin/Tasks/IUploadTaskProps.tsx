import TaskStore from "../../../stores/TaskStore";
import { TaskReadModel } from "../../../Typings/readModels/TaskReadModel";

export class IUploadTaskProps {
    store: TaskStore;
    lessonId: number;
    toggle: any;
    task: TaskReadModel;
}