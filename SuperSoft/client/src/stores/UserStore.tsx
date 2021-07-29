import { UserViewModel } from "../Typings/viewModels/UserViewModel";
import { action, makeObservable, observable } from "mobx";
import { UserReadModel } from "../Typings/readModels/UserReadModel";
import {getToken} from "../functions/getToken";

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
            registrationRequired: observable,
            users: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getCurrentUser();
        this.getUsers();
    }

    async getCurrentUser(token: string = "") {
        console.log("token", token);
        const response = await fetch("/checktoken", {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(response.status === 200) {
            this.currentUser = await response.json();
            this.authorizationRequired = false;
        } else {
            this.authorizationRequired = true;
            this.registrationRequired = false;
        }
    }

    async getUsers() {
        const response = await fetch("/getusers");
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
    registrationToggle(type: string) {
        if(type === "authorization") {
            this.authorizationRequired = true;
            this.registrationRequired = false;
        } else if(type === "registration") {
            this.authorizationRequired = false;
            this.registrationRequired = true;
        }
    }

    @action
    wrongCredetianalsToggle(turn: boolean) {
        this.wrongCredetianals = turn;
    }

    async addOrUpdateUser(user: UserReadModel): Promise<number> {
        const response = await fetch("/addorupdateuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                id: user.id, firstName: user.firstName,
                lastName: user.lastName, email: user.email,
                login: user.login, role: user.role,
                // todo: подумать как и когда их передавать::: passwordHash: user.passwordHash, token: user.token
            })
        });
        if(response.status === 200) {
            this.getUsers();
        }

        return response.status;
    }
    
    async deleteUser(userId: number): Promise<number> {
        const response = await fetch("/deleteuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({id: userId})
        });
        if(response.status === 200) {
            this.getUsers();
        }

        return response.status;
    }
}

export default UserStore;