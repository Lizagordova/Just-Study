import React, { Component } from 'react';
import { Accordion, Button } from "react-bootstrap";
import { Card, CardHeader, CardBody } from "reactstrap";
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import CompletedHomework from './CompletedHomework';

class IUserHomeworkProps {
    store: RootStore;
    userId: number;
}

@observer
class UserHomework extends Component<IUserHomeworkProps> {
    loadHomework: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            loadHomework: observable
        });
    }

    loadHomeworkToggle() {
        this.loadHomework = !this.loadHomework;
    }

    render() {
        let user = this.props.store.userStore.users.find(u => u.id === this.props.userId);
        return(
            <>
                {user !== undefined && <Card>
                    <CardHeader style={{backgroundColor: 'white'}}>
                        <Accordion.Toggle as={Button} variant="link" eventKey={user.id.toString()} onClick={() => this.loadHomeworkToggle()}>
                            <span>{user.firstName + ' ' + user.lastName}</span>
                        </Accordion.Toggle>
                    </CardHeader>
                    <Accordion.Collapse eventKey={user.id.toString()} key={user.id.toString()}>
                        <CardBody>
                            {this.loadHomework && <CompletedHomework userId={user.id} store={this.props.store} />}
                        </CardBody>
                    </Accordion.Collapse>
                </Card>}
            </>
        )
    }
}

export default UserHomework;