import { PartOfSpeech } from "../Typings/enums/PartOfSpeech";
import {SubtaskType} from "../Typings/enums/SubtaskType";

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

export function transformValueToSubtaskType(value: string): SubtaskType {
    if(value === "InsertWordsIntoGaps") {
        return SubtaskType.InsertWordsIntoGaps;
    } else if(value === "RightVerbForm") {
        return SubtaskType.RightVerbForm;
    } else if(value === "DetailedAnswer") {
        return SubtaskType.DetailedAnswer;
    } else if(value === "LoadAudio") {
        return SubtaskType.LoadAudio;
    } else if(value === "FillGaps") {
        return SubtaskType.FillGaps;
    } else if(value === "LoadFile") {
        return SubtaskType.LoadFile;
    }

    return SubtaskType.RightVerbForm;
}