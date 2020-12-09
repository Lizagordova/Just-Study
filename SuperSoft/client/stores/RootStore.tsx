import { UserStore } from "./UserStore";
import { UserViewModel } from "../Typings/viewModels/UserViewModel";

export class RootStore {
    constructor() {
        console.log('я здесь блядь');
        this.setInitialStores();
    }

    setInitialStores() {
        let userData = this.getInitialData()
            .then((data) => {
                console.log('data', data);
                this.userStore = new UserStore(data);
            })
        
    }
    public userStore: UserStore | undefined;

    async getInitialData(): Promise<UserViewModel> {
        console.log('i am ready to get data');
        const response =await fetch('bundled');
        return await response.json();
    }
}