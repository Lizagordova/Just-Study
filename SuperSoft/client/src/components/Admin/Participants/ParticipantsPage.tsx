﻿import React, { Component }from 'react';
import { observer } from "mobx-react";
import CourseStore from "../../../stores/CourseStore";
import {makeObservable, observable, toJS} from "mobx";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import UserStore from "../../../stores/UserStore";
import { Button, Alert, Label } from "reactstrap";
import Participants from "./Participants";
import {UserCourseViewModel} from "../../../Typings/viewModels/UserCourseViewModel";

class IParticipantsPageProps {
    courseStore: CourseStore;
    userStore: UserStore;
}

@observer
class ParticipantsPage extends Component<IParticipantsPageProps> {
    participants: UserViewModel[] = new Array<UserViewModel>();
    restUsers: UserViewModel[] = new Array<UserViewModel>();
    saved: boolean;
    notSaved: boolean;
    notDeleted: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            participants: observable,
            saved: observable,
            notSaved: observable,
            restUsers: observable,
            notDeleted: observable
        });
    }

    componentDidMount(): void {
        this.setUsers();
    }

    setUsers() {
        let usersByCourse = this.props.courseStore.usersByCourse;
        let users = this.props.userStore.users;
        let participants = users.filter(u => usersByCourse
            .map(uc => uc.userId)
            .includes(u.id));
        this.restUsers = users.filter(function(u) {
            return !participants.includes(u);
        });
        console.log("participants", toJS(participants));
        console.log("usersByCourse", toJS(usersByCourse));
        this.participants = participants;
    }

    renderCurrentParticipants(participants: UserViewModel[]) {
        return(
            <Participants participants={participants} deleteParticipant={this.deleteParticipant} courseStore={this.props.courseStore} />
        );
    }

    renderRestUsers(users: UserViewModel[]) {
        return(
            <>
                {users.map(u => {
                    return(
                        <div className="row justify-content-center" style={{border: "1px solid black"}}>
                            <Label>
                                {u.lastName} {u.firstName}
                            </Label>
                            <i
                               style={{marginLeft: "10px"}}
                               onClick={() => this.addParticipant(u)}
                               className="fa fa fa-plus" aria-hidden="true"/>
                        </div>
                    )
                })}
            </>
        );
    }

    renderSaveButton() {
        return(
            <Button color="primary"
                onClick={(e) => this.save()}>
                Сохранить
            </Button>
        );
    }

    renderSavedDetails() {
        return(
            <>
                {this.saved && <Alert color="success">Список успешно обновлён!</Alert>}
                {this.notSaved && <Alert color="danged">Что-то пошло не так, и список не обновился :(</Alert>}
                {this.notDeleted && <Alert color="danged">Что-то пошло не так, и пользователь не удалился:(</Alert>}
            </>
        );
    }

    renderDividingLine() {
        return(
            <>
                <hr />
                <span style={{fontSize: "1.5em"}}>
                    Добавить:
                </span>
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderSavedDetails()}
                {this.renderCurrentParticipants(this.participants)}
                {this.renderSaveButton()}
                {this.renderDividingLine()}
                {this.renderRestUsers(this.restUsers)}
            </>
        );
    }

    save() {
        let participantsIds = this.participants.map(p => p.id);
        this.props.courseStore.addOrUpdateParticipantsList(participantsIds, this.props.courseStore.choosenCourse.id)
            .then((status) => {
                this.saved = status === 200;
                this.notSaved = status !== 200;
            });
    }

    deleteParticipant = (participant: UserViewModel) => {
        this.props.courseStore.deleteUserFromCourse(participant.id, this.props.courseStore.choosenCourse.id)
            .then((status) => {
                if(status === 200) {
                    this.props.courseStore.getUsersByCourse(this.props.courseStore.choosenCourse.id)
                        .then(() => {
                            this.setUsers(); 
                        });
                }
                 this.notDeleted = status !== 200;
                
            })
    };

    addParticipant(user: UserViewModel) {
        let userCourseViewModel = new UserCourseViewModel();
        userCourseViewModel.courseId = this.props.courseStore.choosenCourse.id;
        userCourseViewModel.userId = user.id;
        userCourseViewModel.expireDate = new Date();
        userCourseViewModel.startDate = new Date();
        this.props.courseStore.addOrUpdateUserCourseDetails(userCourseViewModel)
            .then((status) => {
                if(status === 200) {
                    this.props.courseStore.getUsersByCourse(this.props.courseStore.choosenCourse.id)
                        .then((status) => {
                            this.setUsers();
                        });
                }
            });
    }
}

export default ParticipantsPage;