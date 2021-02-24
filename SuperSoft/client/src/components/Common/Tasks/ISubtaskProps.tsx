import { SubtaskViewModel } from "../../../Typings/viewModels/SubtaskViewModel";
import RootStore from "../../../stores/RootStore";
import {UserSubtaskViewModel} from "../../../Typings/viewModels/UserSubtaskViewModel";

export class ISubtaskProps {
    subtask: SubtaskViewModel;
    store: RootStore;
    userId: number;
    userSubtask: UserSubtaskViewModel;
    taskId: number;
    order: number;
    updateUserTask: any;
}