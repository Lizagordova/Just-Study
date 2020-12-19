import { Role } from "../Typings/enums/Role";

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