import RootStore from "../../stores/RootStore";
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";

export interface ITaskProps {
    store: RootStore;
    task: TaskViewModel;
}