import React, { Component } from 'react';
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import Users from "./Users";
import { Button } from "reactstrap";

class IUsersPageProps {
    store: RootStore;
}

@observer
class UsersPage extends Component<IUsersPageProps> {
    renderUsers() {
        return(
            <Users />
        );
    }

    renderAddUserButton() {
        return(
            <Button>Добавить пользователя</Button>
        );
    }

    render() {
        return(
            <>
                {this.renderAddUserButton()}
                {this.renderUsers()}
            </>
        )
    }
}

export default UsersPage;