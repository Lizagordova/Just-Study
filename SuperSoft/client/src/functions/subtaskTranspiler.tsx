import { TaskType } from "../Typings/enums/TaskType";
import { SubtaskType } from "../Typings/enums/SubtaskType";

export function subtaskTranspiler(taskType: TaskType): SubtaskType {
    if(taskType === TaskType.InsertWordsIntoGaps) {
        return SubtaskType.InsertWordsIntoGaps;
    } else if(taskType === TaskType.LoadFile) {
        return SubtaskType.LoadFile;
    } else if(taskType === TaskType.LoadAudio) {
        return SubtaskType.LoadAudio;
    } else if(taskType === TaskType.FillGaps) {
        return SubtaskType.FillGaps;
    } else if(taskType === TaskType.RightVerbForm) {
        return SubtaskType.RightVerbForm;
    } else if(taskType === TaskType.DetailedAnswer) {
        return SubtaskType.DetailedAnswer;
    } else if(taskType === TaskType.DistributeItemsIntoGroups) {
        return SubtaskType.DistributeItemsIntoGroups;
    }
    
    return SubtaskType.FillGaps;//todo: плохо, лучше сделать None
}