import React from "react";
import { IUsersProps } from "./IUsersProps";
import { Users } from "./Users";

export class  UsersPage extends React.Component<IUsersProps> {
    render() {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <Users store={this.props.store}/>
                </div>
            </div>
        );
    }
}