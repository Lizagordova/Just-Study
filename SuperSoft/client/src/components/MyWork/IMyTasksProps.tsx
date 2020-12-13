import { RootStore } from "../../stores/RootStore";
import { TaskStatus } from "../../Typings/enums/TaskStatus";

export interface IMyTasksProps {
    store: RootStore;
    tasksStatus: TaskStatus;
}