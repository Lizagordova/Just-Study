import { WordReadModel } from "../Typings/readModels/WordReadModel";
import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import { UserWordViewModel } from "../Typings/viewModels/UserWordViewModel";
import { UserWordReadModel } from "../Typings/readModels/UserWordReadModel";

export function mapWordReadModel(word: WordViewModel): WordReadModel {
    let wordReadModel = new WordReadModel();
    wordReadModel.id = word.id;
    wordReadModel.partOfSpeech = word.partOfSpeech;
    wordReadModel.englishMeaning = word.englishMeaning;
    wordReadModel.russianMeaning = word.russianMeaning;
    wordReadModel.word = word.word;
    wordReadModel.examples = word.examples;

    return wordReadModel;
}

export function mapToUserAnswerReadModel(userWord: UserWordViewModel): UserWordReadModel {
    let userAnswer = new UserWordReadModel();
    userAnswer.answer = userWord.answer;
    userAnswer.rightAnswers = userWord.rightAnswers;
    userAnswer.status = userWord.status;
    userAnswer.countOfAttempts = userWord.countOfAttempts;
    // userAnswer.word = new WordReadModel(); todo: если это и так работает, то забей
    userAnswer.word.id = userWord.wordId;
    userAnswer.userId = userWord.userId;

    return userAnswer;
}