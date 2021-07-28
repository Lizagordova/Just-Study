import { SubtaskType } from "../Typings/enums/SubtaskType";

export function getTooltipText(subtaskType: SubtaskType): string {
    if(subtaskType === SubtaskType.FillGaps) {
        return "Подсказка\n \"Поставить слово в нужную форму\": запишите в квадратных скобках начальную форму слова, слэш, затем правильную форму слова и пометьте её знаком *. Если есть несколько правильных вариантов ответа. то их надо записать все через слэш со знаком *.\n Пример:\n 1. I [to play/am playing*] tennis.\n 2. This flower is [better] than that. \n 3. I [do not/did not*/didn't*]";
    } else if(subtaskType === SubtaskType.RightVerbForm) {
        return "Подсказка\n Запишите варианты ответа в квадратных скобках и отметьте правильный вариант звездочкой *.\n Если вы хотите добавить объяснение, то напишите его в скобочках сразу после ответа\n Пример:\n They [is(because bla-bla-bla)/are/was/were*(it is right!because...)] on holiday yesterday";
    } else if(subtaskType === SubtaskType.InsertWordsIntoGaps) {
        return "Подсказка\n Напишите текст. Слова и фразы, которые нужно вставить из рамочки, отметьте знаком *.\n Пример:\n I like walking* in the park* in the morning.";
    } else if(subtaskType === SubtaskType.DistributeItemsIntoGroups) {
        return "Подсказка\n Напишите текст. Название группы заключите в скобки (название), а слова, относящиеся к этой группе заключите в квадратные скобки, слова разделяйте запятой. \n Группы разделяется точкой с запятой. \n Пример: (people)[doctor,lawyer,twins, brother];(lifeless)[laptop,table,bag]";
    }
    
    return "";
}