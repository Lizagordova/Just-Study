import React from "react";
import { IUsersProps } from "./IUsersProps";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { Table } from "reactstrap";
import { observer } from "mobx-react";
import { User } from "./User";

@observer
export class  Users extends React.Component<IUsersProps> {
    renderUsers(users: UserViewModel[]) {
        return(
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Имя Фамилия</th>
                        <th>Email</th>
                        <th>Роль</th>
                        <th>Управление</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return(
                           <User store={this.props.store} currentUser={user}/>
                        );
                    })}
                </tbody>
            </Table>
        );
    }

    render() {
        return(
            <>
                {this.renderUsers(this.props.store.userStore.users)}
            </>
        );
    }
}