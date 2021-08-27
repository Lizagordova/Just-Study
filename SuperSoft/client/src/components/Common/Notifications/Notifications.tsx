import React, { Component } from "react";
import { NotificationViewModel } from "../../../Typings/viewModels/NotificationViewModel";
import { Modal, ModalBody, Alert } from "reactstrap";
import NotificationStore from "../../../stores/NotificationStore";
import UserStore from "../../../stores/UserStore";
import { observer } from "mobx-react";
import Notification from "./Notification"
import {toJS} from "mobx";

class INotificationsProps {
    toggle: any;
    notificationStore: NotificationStore;
    userStore: UserStore;
}

@observer
class Notifications extends Component<INotificationsProps> {
    renderBody(notifications: NotificationViewModel[]) {
        console.log("notifications", toJS(notifications));
        return (
            <ModalBody>
                {notifications.map((notification,i) => {
                    return (
                        <div className="container-fluid" key={i}>
                            <Notification notification={notification} notificationStore={this.props.notificationStore} userStore={this.props.userStore} />
                        </div>
                    );
                })}
            </ModalBody>
        );
    }

    renderCloseButton() {
        return (
            <i style={{marginLeft: '93%', width: '2%'}}
               onClick={() => this.props.toggle()}
               className="fa fa-window-close fa-2x" aria-hidden="true"/>
        );
    }

    renderNotifications(notifications: NotificationViewModel[]) {
        return(
            <Modal toggle={this.props.toggle} isOpen={true}>
                {this.renderCloseButton()}
                {notifications.length === 0 && this.renderCaution()}
                {notifications.length !== 0 && this.renderBody(notifications)}
            </Modal>
        );
    }

    renderCaution() {
        return(
            <Alert color="primary" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                Уведомлений пока нет.
            </Alert>
        );
    }

    render() {
        let notifications = this.props.notificationStore.currentNotifications;
        return(
            <>
                {this.renderNotifications(notifications)}
            </>
        );
    }
}

export default Notifications;