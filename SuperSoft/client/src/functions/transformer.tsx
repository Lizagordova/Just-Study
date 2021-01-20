import { PartOfSpeech } from "../Typings/enums/PartOfSpeech";

export function transformValueToPartOfSpeech(value: string): PartOfSpeech {
    if(value === "Noun") {
        return PartOfSpeech.Noun;
    } else if(value === "Adverb") {
        return PartOfSpeech.Adverb;
    } else if(value === "Adjective") {
        return PartOfSpeech.Adjective;
    } else if(value === "Verb") {
        return PartOfSpeech.Verb;
    }
    return PartOfSpeech.Noun;
}