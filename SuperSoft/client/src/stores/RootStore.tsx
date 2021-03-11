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
import TagStore from "./TagStore";
import CommentStore from "./CommentStore";
import ProgressStore from "./ProgressStore";

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
    tagStore: TagStore;
    commentStore: CommentStore;
    progressStore: ProgressStore;

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
            feedbackStore: observable,
            tagStore: observable,
            commentStore: observable,
            progressStore: observable
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
        this.tagStore = new TagStore();
        this.commentStore = new CommentStore();
        this.progressStore = new ProgressStore();
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
                this.tagStore = new TagStore();
                this.commentStore = new CommentStore();
                this.progressStore = new ProgressStore();
            });
    }

    async exit() {
        const response = await fetch("/exit");

        return response.status;
    }
}

export default RootStore;