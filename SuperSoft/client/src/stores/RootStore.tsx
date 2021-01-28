import { observable, makeObservable } from "mobx";
import UserStore from "./UserStore";
import CourseStore from "./CourseStore";
import LessonStore from "./LessonStore";
import TaskStore from "./TaskStore";
import CommentStore from "./CommentStore";
import WordStore from "./WordStore";
import TrainingStore from "./TrainingStore";
import TrackerStore from "./TrackerStore";
import NotificationStore from "./NotificationStore";

export class RootStore {
    userStore: UserStore;
    courseStore: CourseStore;
    lessonStore: LessonStore;
    taskStore: TaskStore;
    commentStore: CommentStore;
    wordStore: WordStore;
    trainingStore: TrainingStore;
    trackerStore: TrackerStore;
    notificationStore: NotificationStore;

    constructor() {
        makeObservable(this, {
            userStore: observable,
            courseStore: observable,
            lessonStore: observable,
            taskStore: observable,
            commentStore: observable,
            wordStore: observable,
            trainingStore: observable,
            trackerStore: observable,
            notificationStore: observable,
        });
        this.userStore = new UserStore();
        this.courseStore = new CourseStore();
        this.lessonStore = new LessonStore();
        this.taskStore = new TaskStore();
        this.commentStore = new CommentStore();
        this.wordStore = new WordStore();
        this.trainingStore = new TrainingStore();
        this.trackerStore = new TrackerStore();
        this.notificationStore = new NotificationStore();
    }

    reset() {
        this.exit()
            .then(() => {
                this.userStore = new UserStore();
                this.courseStore = new CourseStore();
                this.lessonStore = new LessonStore();
                this.taskStore = new TaskStore();
                this.commentStore = new CommentStore();
                this.wordStore = new WordStore();
                this.trainingStore = new TrainingStore();
                this.trackerStore = new TrackerStore();
                this.notificationStore = new NotificationStore();
            });
    }

    async exit() {
        const response = await fetch("/exit");

        return response.status;
    }
}

export default RootStore;