import React, { Component } from 'react';
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import Users from "./Users";
import AddOrUpdateUserWindow from "./AddOrUpdateUserWindow";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";

class IUsersPageProps {
    store: RootStore;
}

@observer
class UsersPage extends Component<IUsersPageProps> {
    renderUsers() {
        return (
            <Users userStore={this.props.store.userStore} />
        );
    }

    renderAddUserWindow() {
        return (
            <>
                {<AddOrUpdateUserWindow userStore={this.props.store.userStore} edit={false} userToEdit={new UserViewModel()}/>}
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderAddUserWindow()}
                {this.renderUsers()}
            </>
        );
    }
}

export default UsersPage;