import { UserRole } from "../Typings/enums/UserRole";
import UserStore from "../stores/UserStore";

export function isThatUserRole(store: UserStore, role: UserRole): boolean {
    return store.currentUser.role === role;
}