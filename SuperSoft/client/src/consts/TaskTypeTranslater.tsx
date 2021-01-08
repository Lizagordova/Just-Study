import { TaskType } from "../Typings/enums/TaskType";

export const TaskTypeTranslater = [
    { type: TaskType.InsertWordsIntoGaps, russian: 'Вставить слова в пропуски' },
    { type: TaskType.RightVerbForm, russian: 'Выбрать правильную форму глагола' },
    { type: TaskType.FillGaps, russian: 'Заполнить пропуски' },
    { type: TaskType.LoadAudio, russian: 'Загрузить аудио' },
    { type: TaskType.LoadFile, russian: 'Прикрепить файл' },
    { type: TaskType.DetailedAnswer, russian: 'Развернутый ответ' }
];