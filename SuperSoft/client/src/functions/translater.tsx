import { PartOfSpeech } from "../Typings/enums/PartOfSpeech";

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