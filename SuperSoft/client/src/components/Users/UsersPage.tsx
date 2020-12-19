import React from "react";
import { IUsersProps } from "./IUsersProps";
import { Users } from "./Users";
import {AddUser} from "./AddUser";

export class  UsersPage extends React.Component<IUsersProps> {
    render() {
        return(
            <div className="container-fluid" style={{marginTop: "30px"}}>
                <div className="row justify-content-center">
                    <AddUser store={this.props.store}/>
                </div>
                <div className="row justify-content-center" style={{marginTop: "20px"}}>
                    <Users store={this.props.store}/>
                </div>
            </div>
        );
    }
}