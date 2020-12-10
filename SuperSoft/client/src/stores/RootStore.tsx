import { observable } from "mobx";
import UserStore from "./UserStore";

class RootStore {
    @observable userStore: UserStore;

    constructor() {
        this.userStore = new UserStore();
    }
}

export default RootStore;