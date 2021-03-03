import { WordReadModel } from "../Typings/readModels/WordReadModel";
import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import { UserWordViewModel } from "../Typings/viewModels/UserWordViewModel";
import { UserWordReadModel } from "../Typings/readModels/UserWordReadModel";
import { TrackerViewModel } from "../Typings/viewModels/TrackerViewModel";
import { TrackerReadModel } from "../Typings/readModels/TrackerReadModel";
import { TrackerByDayReadModel } from "../Typings/readModels/TrackerByDayReadModel";
import { TrackerByDayViewModel } from "../Typings/viewModels/TrackerByDayViewModel";
import { SubtaskViewModel } from "../Typings/viewModels/SubtaskViewModel";
import { SubtaskReadModel } from "../Typings/readModels/SubtaskReadModel";
import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import { UserReadModel } from "../Typings/readModels/UserReadModel";
import { TagViewModel } from "../Typings/viewModels/TagViewModel";
import { TagReadModel } from "../Typings/readModels/TagReadModel";
import { toJS } from "mobx";
import {TaskViewModel} from "../Typings/viewModels/TaskViewModel";
import {TaskReadModel} from "../Typings/readModels/TaskReadModel";
import {UserSubtaskAnswerGroupReadModel} from "../Typings/readModels/UserSubtaskAnswerGroupReadModel";
import {UserSubtaskAnswerGroupViewModel} from "../Typings/viewModels/UserSubtaskAnswerGroupViewModel";
import {FeedbackViewModel} from "../Typings/viewModels/FeedbackViewModel";
import {FeedbackReadModel} from "../Typings/readModels/FeedbackReadModel";

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
    userAnswer.word = new WordReadModel();
    userAnswer.word.id = userWord.wordId;
    userAnswer.userId = userWord.userId;

    return userAnswer;
}

export function mapToTrackerReadModel(tracker: TrackerViewModel, userId: number, courseId: number, daysCount: number): TrackerReadModel {
    let trackerReadModel = new TrackerReadModel();
    trackerReadModel.id = tracker.id;
    trackerReadModel.userId = userId;
    trackerReadModel.courseId = courseId;
    if(tracker.trackersByDay.length === 0) {
        let trackersByDay = new Array<TrackerByDayViewModel>();
        for(let i = 0; i < daysCount; i++) {
            let trackerByDay = new TrackerByDayViewModel();
            trackerByDay.day = i + 1;
            trackersByDay.push(trackerByDay);
        }
        tracker.trackersByDay = trackersByDay;
    }
    trackerReadModel.trackersByDay = tracker.trackersByDay.map(t => {
        return mapToTrackerByDayReadModel(t)
    });

    return trackerReadModel;
}

export function mapToTrackerByDayReadModel(trackerByDay: TrackerByDayViewModel): TrackerByDayReadModel {
    let trackerByDayReadModel = new TrackerByDayReadModel();
    trackerByDayReadModel.id = trackerByDay.id;
    trackerByDayReadModel.chatParticipation = trackerByDay.chatParticipation !== undefined ? trackerByDay.chatParticipation : false;
    trackerByDayReadModel.completedHomework = trackerByDay.completedHomework !== undefined ? trackerByDay.completedHomework : false;
    trackerByDayReadModel.dictionaryOfLesson = trackerByDay.dictionaryOfLesson !== undefined ? trackerByDay.dictionaryOfLesson : false;
    trackerByDayReadModel.webinarWatch = trackerByDay.webinarWatch !== undefined ? trackerByDay.webinarWatch : false;
    trackerByDayReadModel.wordOfADay = trackerByDay.wordOfADay !== undefined ? trackerByDay.wordOfADay : false;
    trackerByDayReadModel.day = trackerByDay.day;

    return trackerByDayReadModel;
}

export function mapToSubtaskReadModel(subtask: SubtaskViewModel): SubtaskReadModel {
    let subtaskReadModel = new SubtaskReadModel();
    subtaskReadModel.id = subtask.id;
    subtaskReadModel.path = subtask.path;
    subtaskReadModel.text = subtask.text;
    subtaskReadModel.order = subtask.order;
    subtaskReadModel.subtaskType = subtask.subtaskType;

    return subtaskReadModel;
}

export function mapToWordReadModel(word: WordViewModel): WordReadModel {
    let wordReadModel = new WordReadModel();
    wordReadModel.id = word.id;
    wordReadModel.word = word.word;
    wordReadModel.russianMeaning = word.russianMeaning;
    wordReadModel.englishMeaning = word.englishMeaning;
    wordReadModel.partOfSpeech = word.partOfSpeech;
    wordReadModel.examples = word.examples;

    return wordReadModel;
}

export function mapToUserReadModel(user: UserViewModel): UserReadModel {
    let userReadModel = new UserReadModel();
    userReadModel.id = user.id;
    userReadModel.firstName = user.firstName;
    userReadModel.lastName = user.lastName;
    userReadModel.login = user.login;
    userReadModel.email = user.email;
    userReadModel.password = user.passwordHash;
    userReadModel.token = user.token;
    userReadModel.role = user.role;

    return userReadModel;
}

export function mapToTagReadModel(tag: TagViewModel): TagReadModel {
    let tagReadModel = new TagReadModel();
    tagReadModel.id = tag.id;
    tagReadModel.name = tag.name;
    
    return tagReadModel;
}

export function mapToTaskReadModel(task: TaskViewModel): TaskReadModel {
    let taskReadModel = new TaskReadModel();
    taskReadModel.id = task.id;
    taskReadModel.instruction = task.instruction;
    taskReadModel.text = task.text;
    taskReadModel.taskType = task.taskType;
    taskReadModel.subtasks = task.subtasks.map(s => mapToSubtaskReadModel(s));
    taskReadModel.tagIds = task.tags.map(t => t.id);

    return taskReadModel;
}

export function mapToUserSubtaskAnswerGroupReadModel(userAnswerGroup: UserSubtaskAnswerGroupViewModel): UserSubtaskAnswerGroupReadModel {
    let answerGroupReadModel = new UserSubtaskAnswerGroupReadModel();
    answerGroupReadModel.lastAnswer = userAnswerGroup.lastAnswer;
    answerGroupReadModel.status = userAnswerGroup.status;
    answerGroupReadModel.answerGroupId = userAnswerGroup.answerGroupId;

    return answerGroupReadModel;
}

export function mapToFeedbackReadModel(feedback: FeedbackViewModel, old: boolean) {
    let feedbackReadModel = new FeedbackReadModel();
    feedbackReadModel.id = feedback.id;
    feedbackReadModel.name = feedback.name;
    feedbackReadModel.email = feedback.email;
    feedbackReadModel.message = feedback.message;
    feedbackReadModel.old = old;

    return feedbackReadModel;
}