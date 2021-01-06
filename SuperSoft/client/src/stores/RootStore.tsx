import { observable, makeObservable } from "mobx";
import UserStore from "./UserStore";
import CourseStore from "./CourseStore";

export class RootStore {
    userStore: UserStore;
    courseStore: CourseStore;

    constructor() {
        makeObservable(this, {
            userStore: observable,
            courseStore: observable,
        });
        this.userStore = new UserStore();
        this.courseStore = new CourseStore();
    }

    reset() {
        this.exit().then(() => {
            this.userStore = new UserStore();
            this.courseStore = new CourseStore();
        });
    }

    async exit() {
        const response = await fetch("/exit");
        return response.status;
    }
}

export default RootStore;