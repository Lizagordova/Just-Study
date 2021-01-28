import { NotificationViewModel } from "../Typings/viewModels/NotificationViewModel";
import { makeObservable, observable } from "mobx";
import { UserNotificationReadModel } from "../Typings/readModels/UserNotificationReadModel";

class NotificationStore {
    currentNotifications: NotificationViewModel[] = new Array<NotificationViewModel>();
    
    constructor() {
        makeObservable(this, {
            currentNotifications: observable
        });
    }

    async getNotifications(userId: number): Promise<number> {
        return 200;
    }

    async addOrUpdateUserNotification(userNotification: UserNotificationReadModel): Promise<number> {
        return 200;
    }
}

export default NotificationStore;