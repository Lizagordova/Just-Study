import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import {makeObservable, observable} from "mobx";
import {UserReadModel} from "../Typings/viewModels/UserReadModel";

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
        this.getUsers();
    }

    async getCurrentUser(): Promise<UserViewModel> {
        const response = await fetch("bundled");
        return await response.json();
    }

    async getUsers() {
        const response = await fetch("/getusers");
        this.users = await response.json();
    }

    async deleteUser(userId: number) {
        const response = await fetch("/deleteuser", {
            method: "POST",
            body: JSON.stringify({userId: userId})
        });
        if(response.status === 200) {
            this.getUsers();
        }
    }

    async addOrUpdateUser(user: UserReadModel) {
        const response = await fetch("/addorupdateuser", {
            method: "POST",
            body: JSON.stringify({id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, password: user.password})
        });
        if(response.status === 200) {
            this.getUsers();
        }
    }
}

export default UserStore;