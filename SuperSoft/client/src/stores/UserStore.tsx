import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import {makeObservable, observable} from "mobx";

class UserStore {
    currentUser: UserViewModel;
    users: UserViewModel[];

    constructor() {
        makeObservable(this, {
            users: observable,
            currentUser: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getCurrentUser()
            .then((user) => {
                this.currentUser = user
            });
        this.getUsers()
            .then((users) => {
                this.users = users;
            });
    }

    async getCurrentUser(): Promise<UserViewModel> {
        const response = await fetch("bundled");
        return await response.json();
    }

    async getUsers(): Promise<UserViewModel[]> {
        const response = await fetch("/getusers");
        return await response.json();
    }
}

export default UserStore;