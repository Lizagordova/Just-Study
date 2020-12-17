import { RootStore } from "../../stores/RootStore";
import {UserViewModel} from "../../Typings/viewModels/UserViewModel";

export interface IUserProps {
    store: RootStore;
    currentUser: UserViewModel;
}