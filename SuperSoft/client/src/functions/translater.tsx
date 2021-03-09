import {PartOfSpeech} from "../Typings/enums/PartOfSpeech";
import {Tarif} from "../Typings/enums/Tarif";
import {UserRole} from "../Typings/enums/UserRole";
import {CourseRole} from "../Typings/enums/CourseRole";
import {SubtaskType} from "../Typings/enums/SubtaskType";

export function translatePartOfSpeech(partOfSpeech: PartOfSpeech): string {
    if(partOfSpeech === PartOfSpeech.Adjective) {
        return "Прилагательное";
    } else if(partOfSpeech === PartOfSpeech.Adverb) {
        return "Наречие";
    } else if(partOfSpeech === PartOfSpeech.Noun) {
        return "Существительное";
    } else if(partOfSpeech === PartOfSpeech.Verb) {
        return "Глагол";
    }

    return "";
}

export function translateTarif(tarif: Tarif): string {
    if(tarif === Tarif.Usual) {
        return "Обычный";
    } else if(tarif === Tarif.Premium) {
        return "Премиум";
    }

    return "";
}

export function translateRole(role: UserRole): string {
    if(role === UserRole.User) {
        return "Пользователь";
    } else if(role === UserRole.Admin) {
        return "Администратор"
    }

    return "";
}

export function translateCourseRole(role: CourseRole): string {
    if(role === CourseRole.Pupil) {
        return "Ученик";
    } else if(role === CourseRole.Teacher) {
        return "Учитель"
    }

    return "";
}

export function translateSubtaskType(subtaskType: SubtaskType): string {
    if(subtaskType === SubtaskType.DetailedAnswer) {
        return "Задание на загрузку развёрнутого ответа";
    } else if(subtaskType === SubtaskType.RightVerbForm) {
        return "Выбрать правильную форму глагола"
    } else if(subtaskType === SubtaskType.LoadAudio) {
        return "Задание на загрузку аудио"
    } else if(subtaskType === SubtaskType.FillGaps) {
        return "Задание на заполнение пропусков"
    } else if(subtaskType === SubtaskType.LoadFile) {
        return "Задание на загрузку файла"
    } else if(subtaskType === SubtaskType.InsertWordsIntoGaps) {
        return "Задание расставить слова в нужном порядке"
    }

    return "";
}