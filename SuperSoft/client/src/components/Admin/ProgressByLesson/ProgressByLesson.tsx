import React, { Component } from 'react';
import { observer } from "mobx-react";
import {Accordion, Button} from "react-bootstrap";
import RootStore from "../../../stores/RootStore";
import UsersProgressByLesson from "./UsersProgressByLesson";

class IProgressByLesson {
    store: RootStore;
}

@observer
class ProgressByLesson extends Component<IProgressByLesson> {
    renderUsers() {
        let users = this.props.store.courseStore.usersByCourse;
        return(
            <Accordion defaultActiveKey="0">
                {users.map((userCourse) => {
                    if(userCourse.userId !== this.props.store.userStore.currentUser.id) {
                        return(
                            <UsersProgressByLesson store={this.props.store} lessonId={this.props.store.lessonStore.choosenLesson.id} userId={userCourse.userId}/>
                        );
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

export default ProgressByLesson;