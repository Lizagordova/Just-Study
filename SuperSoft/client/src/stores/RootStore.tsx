import { observable, makeObservable } from "mobx";
import UserStore from "./UserStore";
import CourseStore from "./CourseStore";
import LessonStore from "./LessonStore";
import TaskStore from "./TaskStore";
import WordStore from "./WordStore";
import TrainingStore from "./TrainingStore";
import TrackerStore from "./TrackerStore";
import NotificationStore from "./NotificationStore";
import FeedbackStore from "./FeedbackStore";

export class RootStore {
    userStore: UserStore;
    courseStore: CourseStore;
    lessonStore: LessonStore;
    taskStore: TaskStore;
    wordStore: WordStore;
    trainingStore: TrainingStore;
    trackerStore: TrackerStore;
    notificationStore: NotificationStore;
    feedbackStore: FeedbackStore;

    constructor() {
        makeObservable(this, {
            userStore: observable,
            courseStore: observable,
            lessonStore: observable,
            taskStore: observable,
            wordStore: observable,
            trainingStore: observable,
            trackerStore: observable,
            notificationStore: observable,
            feedbackStore: observable
        });
        this.userStore = new UserStore();
        this.courseStore = new CourseStore();
        this.lessonStore = new LessonStore();
        this.taskStore = new TaskStore();
        this.wordStore = new WordStore();
        this.trainingStore = new TrainingStore();
        this.trackerStore = new TrackerStore();
        this.notificationStore = new NotificationStore();
        this.feedbackStore = new FeedbackStore();
    }

    reset() {
        this.exit()
            .then(() => {
                this.userStore = new UserStore();
                this.courseStore = new CourseStore();
                this.lessonStore = new LessonStore();
                this.taskStore = new TaskStore();
                this.wordStore = new WordStore();
                this.trainingStore = new TrainingStore();
                this.trackerStore = new TrackerStore();
                this.notificationStore = new NotificationStore();
                this.feedbackStore = new FeedbackStore();
            });
    }

    async exit() {
        const response = await fetch("/exit");

        return response.status;
    }
}

export default RootStore;