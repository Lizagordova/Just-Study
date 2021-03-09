import {TaskType} from "../Typings/enums/TaskType";

export function getTaskTitle(taskType: TaskType): string {
    if(taskType === TaskType.DetailedAnswer) {
        return "Задание на загрузку развёрнутого ответа";
    } else if(taskType === TaskType.RightVerbForm) {
        return "Выбрать правильную форму глагола";
    } else if(taskType === TaskType.LoadAudio) {
        return "Задание на загрузку аудио";
    } else if(taskType === TaskType.FillGaps) {
        return "Задание на заполнение пропусков";
    } else if(taskType === TaskType.LoadFile) {
        return "Задание на загрузку файла";
    } else if(taskType === TaskType.InsertWordsIntoGaps) {
        return "Задание расставить слова в нужном порядке";
    }
    return "";
}