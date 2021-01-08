import { SubtaskViewModel } from "../../../Typings/viewModels/SubtaskViewModel";
import RootStore from "../../../stores/RootStore";

export class ISubtaskProps {
    subtask: SubtaskViewModel;
    store: RootStore;
}