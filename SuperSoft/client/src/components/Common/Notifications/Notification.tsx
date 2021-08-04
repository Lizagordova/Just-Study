import React, { Component } from "react";
import { NotificationViewModel } from "../../../Typings/viewModels/NotificationViewModel";
import NotificationStore from "../../../stores/NotificationStore";
import UserStore from "../../../stores/UserStore";
import { Input } from "reactstrap";
import { UserNotificationReadModel } from "../../../Typings/readModels/UserNotificationReadModel";
import {makeObservable, observable, toJS} from "mobx";
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
        return(
            <div className="row justify-content-center" style={{marginTop:'2px'}}>
                <div className="col-11">
                    <span>{notification.message}</span>
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

    changeSeen(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        this.userNotification.seen = event.currentTarget.checked;
    }
}

export default Notification;