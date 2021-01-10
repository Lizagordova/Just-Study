import { SubtaskType } from "../Typings/enums/SubtaskType";

export function getTooltipText(subtaskType: SubtaskType): string {
    if(subtaskType === SubtaskType.FillGaps) {
        return "Подсказка\n \"Поставить слово в нужную форму\": запишите в квадратных скобках начальную форму слова, слэш, затем правильную форму слова. \"Заполнить пропуски\": запишите в квадратных скобках только правильное слово (выражение). \"Заполнить пропуски любым текстом без проверки\": просто запишите пустые квадратные скобки на месте пропуска (без пробела).\n Пример:\n 1. I [to play/am playing] tennis.\n 2. This flower is [better] than that.";
    } else if(subtaskType === SubtaskType.RightVerbForm) {
        return "Подсказка\n Запишите варианты ответа в квадратных скобках и отметьте правильный вариант звездочкой *.\n Если вы хотите добавить объяснение, то напишите его в скобочках сразу после ответа\n Пример:\n They [is(because bla-bla-bla)/are/was/were*(it is right!because...)] on holiday yesterday";
    } else if(subtaskType === SubtaskType.InsertWordsIntoGaps) {
        return "Подсказка\n Напишите текст. Слова и фразы, которые нужно вставить из рамочки, заключите в квадратные скобки.\n Пример:\n I like [walking] in the park in the morning.";
    }
    return "";
}