import { UserRole } from "../Typings/enums/UserRole";
import UserStore from "../stores/UserStore";

export function isThatUserRole(store: UserStore, role: UserRole): boolean {
    if(store.currentUser.role === role) {
        return true;
    }
    else return false;
}