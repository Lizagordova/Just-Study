import { WordReadModel } from "../Typings/readModels/WordReadModel";
import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import { UserWordViewModel } from "../Typings/viewModels/UserWordViewModel";
import { UserWordReadModel } from "../Typings/readModels/UserWordReadModel";
import { TrackerViewModel } from "../Typings/viewModels/TrackerViewModel";
import { TrackerReadModel } from "../Typings/readModels/TrackerReadModel";
import {TrackerByDayReadModel} from "../Typings/readModels/TrackerByDayReadModel";
import {TrackerByDayViewModel} from "../Typings/viewModels/TrackerByDayViewModel";

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

export function mapToTrackerReadModel(tracker: TrackerViewModel, userId: number, courseId: number): TrackerReadModel {
    let trackerReadModel = new TrackerReadModel();
    trackerReadModel.id = tracker.id;
    trackerReadModel.userId = userId;
    trackerReadModel.courseId = courseId;
    trackerReadModel.trackersByDay = tracker.trackersByDay.map(t => mapToTrackerByDayReadModel(t));

    return trackerReadModel;
}

export function mapToTrackerByDayReadModel(trackerByDay: TrackerByDayViewModel): TrackerByDayReadModel{
    let trackerByDayReadModel = new TrackerByDayReadModel();
    trackerByDayReadModel.id = trackerByDay.id;
    trackerByDayReadModel.chatParticipation = trackerByDay.chatParticipation;
    trackerByDayReadModel.completedHomework = trackerByDay.completedHomework;
    trackerByDayReadModel.dictionaryOfLesson = trackerByDay.dictionaryOfLesson;
    trackerByDayReadModel.vebinarWatch = trackerByDay.vebinarWatch;
    trackerByDayReadModel.wordOfADay = trackerByDay.wordOfADay;
    trackerByDayReadModel.day = trackerByDay.day;

    return trackerByDayReadModel;
}