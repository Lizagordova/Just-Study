import {Role} from "../Typings/enums/Role";
import {TaskType} from "../Typings/enums/TaskType";
import {TaskPriority} from "../Typings/enums/TaskPriority";

export function translateRole(role: Role): string {
    if(role === Role.Developer) {
        return "Разработчик";
    } else if(role === Role.Marketolog) {
        return "Маркетолог";
    } else if(role === Role.Accounter) {
        return "Бухгалтер";
    } else if(role === Role.Administrator) {
        return "Администратор";
    } else if(role === Role.Tester) {
        return "Тестировщик";
    } 
    return "";
}

export function translateTaskType(taskType: TaskType): string {
    if(taskType === TaskType.Bug) {
        return "Баг"
    } else if(taskType === TaskType.Feature) {
        return "Фича";
    }
    return "";
}

export function translatePriority(priority: TaskPriority): string {
    if(priority === TaskPriority.High) {
        return "Высокая";
    } else if(priority === TaskPriority.Average) {
        return "Средняя";
    } else if(priority === TaskPriority.Low) {
        return "Низкая";
    }
    return "";
}