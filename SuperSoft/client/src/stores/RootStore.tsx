import { observable, makeObservable } from "mobx";
import UserStore from "./UserStore";
import CourseStore from "./CourseStore";
import LessonStore from "./LessonStore";
import TaskStore from "./TaskStore";
import CommentStore from "./CommentStore";
import WordStore from "./WordStore";
import TrainingStore from "./TrainingStore";
import TrackerStore from "./TrackerStore";

export class RootStore {
    userStore: UserStore;
    courseStore: CourseStore;
    lessonStore: LessonStore;
    taskStore: TaskStore;
    commentStore: CommentStore;
    wordStore: WordStore;
    trainingStore: TrainingStore;
    trackerStore: TrackerStore;

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
        });
        this.userStore = new UserStore();
        this.courseStore = new CourseStore();
        this.lessonStore = new LessonStore();
        this.taskStore = new TaskStore();
        this.commentStore = new CommentStore();
        this.wordStore = new WordStore();
        this.trainingStore = new TrainingStore();
        this.trackerStore = new TrackerStore();
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
            });
    }

    async exit() {
        const response = await fetch("/exit");

        return response.status;
    }
}

export default RootStore;