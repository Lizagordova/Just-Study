import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import { action, makeObservable, observable } from "mobx";
import { UserReadModel } from "../Typings/viewModels/UserReadModel";

class UserStore {
    currentUser: UserViewModel;
    users: UserViewModel[];
    authorizationRequired: boolean = true;
    wrongCredetianals: boolean = false;

    constructor() {
        makeObservable(this, {
            users: observable,
            currentUser: observable,
            authorizationRequired: observable,
            wrongCredetianals: observable,
        });
        this.users = new Array<UserViewModel>();
        this.setInitialData();
    }

    setInitialData() {
        this.getCurrentUser();
        this.getUsers();
    }

    async getCurrentUser() {
        const response = await fetch("/getcurrentuser");
        if(response.status === 200) {
            this.currentUser = await response.json();
            this.authorizationRequired = false;
        } else {
            this.authorizationRequired = true;
        }
    }

    async getUsers() {
        const response = await fetch("/getusers");
        this.users = await response.json();
    }

    async deleteUser(userId: number) {
        const response = await fetch("/deleteuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: userId})
        });
        if(response.status === 200) {
            this.getUsers();
        }
    }

    async addOrUpdateUser(user: UserReadModel) {
        const response = await fetch("/addorupdateuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: user.id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role, password: user.password})
        });
        if(response.status === 200) {
            this.getUsers();
        }
        return response.status;
    }

    @action
    authorizationRequire(required: boolean) {
        this.authorizationRequired = required;
    }

    @action
    wrongCredetianalsToggle(turn: boolean) {
        this.wrongCredetianals = turn;
    }
}

export default UserStore;