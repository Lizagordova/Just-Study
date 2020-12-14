import React from "react";
import { IUsersProps } from "./IUsersProps";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { Table } from "reactstrap";

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
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        return(
                            <tr>
                                <th>{user.id}</th>
                                <th>{user.firstName} {user.lastName}</th>
                                <th>{user.email}</th>
                                <th>{user.role}</th>
                            </tr>
                        )
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