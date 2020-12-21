import RootStore from "../../stores/RootStore";

export interface IAddCommentsProps {
    store: RootStore;
    taskId: number;
    groupId: number;
}