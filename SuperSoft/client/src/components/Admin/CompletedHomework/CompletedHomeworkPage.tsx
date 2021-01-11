import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Accordion } from "react-bootstrap";
import UserHomework from "./UserHomework";

class ICompletedHomeworkPageProps {
    store: RootStore;
}


export class CompletedHomeworkPage extends Component<ICompletedHomeworkPageProps> {
    renderUsers() {
        let users = this.props.store.courseStore.usersByCourse;
        return(
            <Accordion defaultActiveKey="0">
                {users.map((user) => {
                    return <UserHomework userId={user.userId} store={this.props.store}/>
                })}
            </Accordion>
        );
    }
}