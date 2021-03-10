import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import {Accordion, Button} from "react-bootstrap";
import { Card, CardHeader, CardBody } from "reactstrap";
import { observer } from "mobx-react";
import CompletedHomework from "./CompletedHomework";
import {makeObservable, observable} from "mobx";

class ICompletedHomeworkPageProps {
    store: RootStore;
}

@observer
export class CompletedHomeworkPage extends Component<ICompletedHomeworkPageProps> {
    renderUsers() {
       let users = this.props.store.courseStore.usersByCourse;
        return(
            <Accordion defaultActiveKey="0">
                {users.map((userCourse) => {
                    if(userCourse.userId !== this.props.store.userStore.currentUser.id) {
                        let user = this.props.store.userStore.users.find(u => u.id === userCourse.userId);
                        return(
                            <>
                                {user !== undefined && <Card>
                                    <CardHeader style={{backgroundColor: 'white'}}>
                                        <Accordion.Toggle as={Button} variant="link" eventKey={user.id.toString()}>
                                            <span>{user.firstName + ' ' + user.lastName}</span>
                                        </Accordion.Toggle>
                                    </CardHeader>
                                    <Accordion.Collapse eventKey={user.id.toString()} key={user.id.toString()}>
                                        <CardBody>
                                            {<CompletedHomework userId={user.id} store={this.props.store} />}
                                        </CardBody>
                                    </Accordion.Collapse>
                                </Card>}
                            </>
                        )
                    }
                })}
            </Accordion>
        );
    }
    
    render() {
        return(
            <>
                {this.renderUsers()}
            </>
        );
    }
}