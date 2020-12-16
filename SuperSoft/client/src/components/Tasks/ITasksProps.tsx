import { RootStore } from "../../stores/RootStore";
import {TaskStatus} from "../../Typings/enums/TaskStatus";

export interface ITasksProps {
    store: RootStore;
    status: TaskStatus;
}