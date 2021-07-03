import React, { Component } from 'react';
import { observer } from "mobx-react";
import CourseStore from "../../../stores/CourseStore";
import { makeObservable, observable } from "mobx";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import UserStore from "../../../stores/UserStore";
import { Button, Alert, Label } from "reactstrap";
import Participants from "./Participants";
import {UserCourseViewModel} from "../../../Typings/viewModels/UserCourseViewModel";
import {renderSpinner} from "../../../functions/renderSpinner";

class IParticipantsPageProps {
    courseStore: CourseStore;
    userStore: UserStore;
    update: boolean;
}

@observer
class ParticipantsPage extends Component<IParticipantsPageProps> {
    participants: UserViewModel[] = new Array<UserViewModel>();
    restUsers: UserViewModel[] = new Array<UserViewModel>();
    saved: boolean;
    notSaved: boolean;
    notDeleted: boolean;
    loading: boolean;
    update: boolean;

    constructor(props: IParticipantsPageProps) {
        super(props);
        makeObservable(this, {
            participants: observable,
            saved: observable,
            notSaved: observable,
            restUsers: observable,
            notDeleted: observable,
            loading: observable,
            update: observable
        });
        this.update = this.props.update;
        this.setUsers();
    }


    componentDidUpdate(prevProps: Readonly<IParticipantsPageProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.update !== this.update) {
            this.loading = true;
            this.setUsers();
        }
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
        this.participants = participants;
        this.loading = false;
        this.update = this.props.update;
    }

    renderCurrentParticipants(participants: UserViewModel[]) {
        return(
            <Participants participants={participants} deleteParticipant={this.deleteParticipant} courseStore={this.props.courseStore} update={this.update} />
        );
    }

    renderRestUsers(users: UserViewModel[]) {
        return(
            <>
                {users.map(u => {
                    return(
                        <div 
                            className="row justify-content-center"
                            style={{border: "1px solid black", marginBottom: "5px",
                                width: "20%", marginLeft: "1%", marginRight: "1%"}}
                            key={u.id}>
                            <Label style={{width: "80%", textAlign: "start"}}>
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
        setTimeout(() => {
            this.notSaved = false;
            this.saved = false;
            this.notDeleted = false;
        }, 6000);
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
            <div className="row justify-content-start">
                <span style={{fontSize: "1.5em", marginLeft: "1.7%"}}>
                    Добавить:
                </span>
            </div>
        );
    }

    renderParticipants(update: boolean) {
        return (
            <>
                {this.renderCurrentParticipants(this.participants)}
                {/*this.renderSaveButton()*/}
                {this.renderDividingLine()}
                {this.renderRestUsers(this.restUsers)}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderSavedDetails()}
                {this.loading && renderSpinner()}
                {!this.loading && this.renderParticipants(this.update)}
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