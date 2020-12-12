import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { observable } from "mobx";

class UserStore {
    @observable
    currentUser: UserViewModel | undefined;

    constructor() {
        this.setInitialData();
    }

    setInitialData() {
        this.getCurrentUser()
            .then((user) => {
                this.currentUser = user
            });
    }

    async getCurrentUser(): Promise<UserViewModel> {
        const response = await fetch("bundled");
        return await response.json();
    }
}

export default UserStore;