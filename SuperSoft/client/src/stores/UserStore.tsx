import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import { action, makeObservable, observable } from "mobx";

class UserStore {
    currentUser: UserViewModel;
    authorizationRequired: boolean = true;
    registrationRequired: boolean = false;
    wrongCredetianals: boolean = false;

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