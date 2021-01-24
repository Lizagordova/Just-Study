import React, { Component }from 'react';
import { observer } from "mobx-react";
import CourseStore from "../../../stores/CourseStore";
import { makeObservable, observable } from "mobx";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import UserStore from "../../../stores/UserStore";
import { Button, Alert, Label } from "reactstrap";

class IParticipantsPageProps {
    courseStore: CourseStore;
    userStore: UserStore;
}

@observer
class ParticipantsPage extends Component<IParticipantsPageProps> {
    participants: UserViewModel[];
    restUsers: UserViewModel[];
    saved: boolean;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            participants: observable,
            saved: observable,
            notSaved: observable,
            restUsers: observable
        });
    }

    componentDidMount(): void {
        let usersByCourse = this.props.courseStore.usersByCourse;
        let users = this.props.userStore.users;
        let participants = users.filter(u => usersByCourse
            .map(uc => uc.userId)
            .includes(u.id));
        this.restUsers = users.filter(function(u) {
            return !participants.includes(u);
        });
        this.participants = participants;
    }

    renderCurrentParticipants(participants: UserViewModel[]) {
        return(
            <>
                {participants.map(p => {
                    return(
                        <div className="row justify-content-center">
                            <Label>
                                {p.lastName} {p.firstName}
                            </Label>
                            <i style={{marginLeft: '98%', width: '2%'}}
                               onClick={() => this.deleteParticipant(p)}
                               className="fa fa-window-close" aria-hidden="true"/>
                        </div>
                    );
                })}
            </>
        );
    }

    renderRestUsers(users: UserViewModel[]) {
        return(
            <>
                {users.map(u => {
                    return(
                        <div className="row justify-content-center">
                            <Label>
                                {u.lastName} {u.firstName}
                            </Label>
                            <i style={{marginLeft: '98%', width: '2%'}}
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
                {this.notSaved && <Alert color="danged">Что-то пошло не так, и список не обновился:(</Alert>}
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
        this.props.courseStore.AddOrUpdateParticipantsList(participantsIds, this.props.courseStore.choosenCourse.id)
            .then((status) => {
                this.saved = status === 200;
                this.notSaved = status !== 200;
            });
    }

    deleteParticipant(participant: UserViewModel) {
        let participants = this.participants;
        this.participants = participants.filter(p => p.id !== participant.id);
    }

    addParticipant(user: UserViewModel) {
        let participants = this.participants;
        let restUsers = this.restUsers;
        participants.push(user);
        this.participants = participants;
        this.restUsers = restUsers.filter(u => u.id !== user.id);
    }
}

export default ParticipantsPage;