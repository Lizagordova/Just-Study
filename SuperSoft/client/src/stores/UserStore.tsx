import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import { action, makeObservable, observable } from "mobx";

class UserStore {
    currentUser: UserViewModel;
    authorizationRequired: boolean = true;
    registrationRequired: boolean = false;
    wrongCredetianals: boolean = false;
    users: UserViewModel[] = new Array<UserViewModel>();

    constructor() {
        makeObservable(this, {
            currentUser: observable,
            authorizationRequired: observable,
            wrongCredetianals: observable,
            registrationRequired: observable
        });
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
        const response = await fetch("/getusers");//todo: реализовть
        if(response.status === 200) {
            this.users = await response.json();
        }
    }

    @action
    authorizationRequire(required: boolean) {
        this.authorizationRequired = required;
    }

    @action
    registrationRequire(required: boolean) {
        this.registrationRequired = required;
    }

    @action
    registrationToggle() {
        this.registrationRequired = !this.registrationRequired;
        this.authorizationRequired = !this.authorizationRequired;
    }

    @action
    wrongCredetianalsToggle(turn: boolean) {
        this.wrongCredetianals = turn;
    }
}

export default UserStore;