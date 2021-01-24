import {PartOfSpeech} from "../Typings/enums/PartOfSpeech";
import {Tarif} from "../Typings/enums/Tarif";

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

export function translateTarif(tarif: Tarif) {
    if(tarif === Tarif.Usual) {
        return "Обычный";
    } else if(tarif === Tarif.Premium) {
        return "Премиум";
    }

    return "";
}