import { NotificationViewModel } from "../Typings/viewModels/NotificationViewModel";
import { makeObservable, observable } from "mobx";
import { UserNotificationReadModel } from "../Typings/readModels/UserNotificationReadModel";
import {getToken} from "../functions/getToken";

class NotificationStore {
    currentNotifications: NotificationViewModel[] = new Array<NotificationViewModel>();
    
    constructor() {
        makeObservable(this, {
            currentNotifications: observable
        });
    }

    async getNotifications(userId: number): Promise<number> {
        const response = await fetch("/getnotifications", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({id: userId})
        });
        if(response.status === 200) {
            this.currentNotifications = await response.json();
        }

        return response.status;
    }

    async addOrUpdateUserNotification(userNotification: UserNotificationReadModel): Promise<number> {
        const response = await fetch("/addorupdateusernotification", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({userId: userNotification.userId, notificationId: userNotification.notificationId, seen: userNotification.seen})
        });

        return response.status;
    }
}

export default NotificationStore;