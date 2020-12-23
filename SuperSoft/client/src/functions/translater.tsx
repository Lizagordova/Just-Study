import {Role} from "../Typings/enums/Role";
import {TaskType} from "../Typings/enums/TaskType";
import {TaskPriority} from "../Typings/enums/TaskPriority";
import {ProjectRole} from "../Typings/enums/ProjectRole";
import {TaskRole} from "../Typings/enums/TaskRole";
import {TaskStatus} from "../Typings/enums/TaskStatus";

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

export function translateProjectRole(role: ProjectRole): string {
    if(role === ProjectRole.Head) {
        return "Руководитель";
    } else if(role === ProjectRole.Executor) {
        return "Исполнитель";
    } else if(role === ProjectRole.Developer) {
        return "Разработчик";
    } else if(role === ProjectRole.Tester) {
        return "Тестировщик";
    }
    return "";
}

export function translateTaskRole(role: TaskRole) : string {
    if(role === TaskRole.Responsible) {
        return "Ответственный";
    } else if(role === TaskRole.Author) {
        return "Автор";
    } else if(role === TaskRole.Tester) {
        return "Тестировщик";
    }
    return "";
}

export function translateStatus(status: TaskStatus): string {
    if(status ===  TaskStatus.InProgress) {
        return "В прогрессе";
    } else if(status === TaskStatus.Completed) {
        return "Завершена";
    } else if(status === TaskStatus.Future) {
        return "Еще не начата";
    }
    return "";
} 