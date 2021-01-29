import React, { Component } from "react";
import { NotificationViewModel } from "../../../Typings/viewModels/NotificationViewModel";
import { Modal, ModalBody, Alert } from "reactstrap";
import NotificationStore from "../../../stores/NotificationStore";
import UserStore from "../../../stores/UserStore";
import { observer } from "mobx-react";
import Notification from "./Notification"

class INotificationsProps {
    toggle: any;
    notificationStore: NotificationStore;
    userStore: UserStore;
}

@observer
class Notifications extends Component<INotificationsProps> {
    renderNotifications(notifications: NotificationViewModel[]) {
        return(
            <Modal toggle={this.props.toggle} isOpen={true}>
                <ModalBody>
                    {notifications.map((notification) => {
                        return (
                            <div className="container-fluid">
                                <Notification notification={notification} notificationStore={this.props.notificationStore} userStore={this.props.userStore} />
                            </div>
                        );
                    })}
                </ModalBody>
            </Modal>
        );
    }

    renderCaution() {
        return(
            <Alert color="primary">Уведомлений пока нет.</Alert>
        );
    }

    render() {
        let notifications = this.props.notificationStore.currentNotifications;
        return(
            <>
                {notifications.length === 0 && this.renderCaution()}
                {this.renderNotifications(notifications)}
            </>
        );
    }
}

export default Notifications;