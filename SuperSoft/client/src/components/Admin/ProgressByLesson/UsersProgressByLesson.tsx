import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import Circle from "react-circle";
import {makeObservable, observable, toJS} from "mobx";
import {Accordion, Button} from "react-bootstrap";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { Card, CardHeader, CardBody } from "reactstrap";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";

class IUsersProgressByLessonProps {
    store: RootStore;
    lessonId: number;
    userId: number;
}

@observer
class UsersProgressByLesson extends Component<IUsersProgressByLessonProps> {
    progress: number = 0;
    update: boolean;

    constructor(props: IUsersProgressByLessonProps) {
        super(props);
        makeObservable(this, {
            progress: observable,
            update: observable
        });
        this.getProgress();
    }

    renderProgress(update: boolean) {
        return (
            <Circle
                size="150"
                progress={this.progress}
            />
        );
    }

    renderUserProgress(user: UserViewModel) {
        return (
            <>
                {<Card>
                    <CardHeader style={{backgroundColor: 'white'}}>
                        <span>{user.firstName} {user.lastName}</span>
                    </CardHeader>
                    <div className="row justify-content-center">
                        {this.renderProgress(this.update)}
                    </div>
                </Card>}
            </>
        );
    }

    render() {
        let user = this.props.store.userStore.users.find(u => u.id === this.props.userId);
        if(user === undefined) {
            user = new UserViewModel();
        }
        return(
            <>
                {this.renderUserProgress(user)}
            </>
        );
    }

    getProgress() {
        this.props.store.lessonStore.getUserProgressByLesson(this.props.lessonId, this.props.userId)
            .then((progress) => {
                this.progress = progress;
                this.toggleUpdate();
            });
    }
    
    toggleUpdate() {
        this.update = !this.update;
    }
}

export default UsersProgressByLesson;