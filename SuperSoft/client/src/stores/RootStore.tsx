import { observable, makeObservable } from "mobx";
import UserStore from "./UserStore";

export class RootStore {
    userStore: UserStore;

    constructor() {
        makeObservable(this, {
            userStore: observable
        });
        this.userStore = new UserStore();
    }

    reset() {
        this.exit().then(() => {
            this.userStore = new UserStore();
        });
    }

    async exit() {
        const response = await fetch("/exit");
        return response.status;
    }
}

export default RootStore;