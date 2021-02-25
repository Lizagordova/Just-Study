import React, { Component } from "react";
import { NotificationViewModel } from "../../../Typings/viewModels/NotificationViewModel";
import NotificationStore from "../../../stores/NotificationStore";
import UserStore from "../../../stores/UserStore";
import { Input } from "reactstrap";
import { UserNotificationReadModel } from "../../../Typings/readModels/UserNotificationReadModel";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";

class INotificationProps {
    notification: NotificationViewModel;
    notificationStore: NotificationStore;
    userStore: UserStore;
}

@observer
class Notification extends Component<INotificationProps> {
    userNotification: UserNotificationReadModel = new UserNotificationReadModel();
    
    constructor(props: INotificationProps) {
        super(props);
        makeObservable(this, {
            userNotification: observable
        });
        this.userNotification.notificationId = this.props.notification.id;
        this.userNotification.userId = this.props.userStore.currentUser.id;
    }
    
    componentWillUnmount(): void {
        this.updateUserNotification();
    }

    renderNotification(notification: NotificationViewModel) {
        let message = this.generateMessage(notification.createdBy, notification.message);
        return(
            <div className="row justify-content-center" style={{marginTop:'2px'}}>
                <div className="col-11">
                    <span>{message}</span>
                </div>
                <div className="col-1">
                    <Input type="checkbox" onClick={(e) => this.changeSeen(e)}/>
                </div>
            </div>
        );
    }

    render() {
        return(
            <>
                {this.renderNotification(this.props.notification)}
            </>
        );
    }

    updateUserNotification() {
        this.props.notificationStore.addOrUpdateUserNotification(this.userNotification);
    }

    generateMessage(createdBy: number, message: string): string {
        let user = this.props.userStore.users.filter(u => u.id === createdBy)[0];

        return user.firstName + ' ' + user.lastName + ' ' + message;
    }

    changeSeen(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        this.userNotification.seen = event.currentTarget.checked;
    }
}

export default Notification;