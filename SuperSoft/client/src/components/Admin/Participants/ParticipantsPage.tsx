import React, { Component }from 'react';
import { observer } from "mobx-react";
import CourseStore from "../../../stores/CourseStore";
import { makeObservable, observable } from "mobx";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import UserStore from "../../../stores/UserStore";
import { Button, Alert } from "reactstrap";

class IParticipantsPageProps {
    courseStore: CourseStore;
    userStore: UserStore;
}

@observer
class ParticipantsPage extends Component<IParticipantsPageProps> {
    participants: UserViewModel[];
    saved: boolean;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            participants: observable,
            saved: observable,
            notSaved: observable,
        });
    }

    componentDidMount(): void {
        let usersByCourse = this.props.courseStore.usersByCourse;
        let users = this.props.userStore.users;
        this.participants = users.filter(u => usersByCourse
            .map(uc => uc.userId)
            .includes(u.id))
    }

    renderCurrentParticipants(participants: UserViewModel[]) {
        return(
            <>
                {participants.map(p => {
                    
                })}
            </>
        );
    }

    renderRestUsers() {
        return(
            <></>
        );
    }

    renderAttachButton() {
        return(
            <Button>
                Сохранить
            </Button>
        )
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
            
        )
    }
    
    render() {
        return(
            <>
                {this.renderSavedDetails()}
                {this.renderCurrentParticipants(this.participants)}
                {this.renderDividingLine()}
                {this.renderRestUsers()}
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
}

export default ParticipantsPage;