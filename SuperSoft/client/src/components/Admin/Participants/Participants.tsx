import React, { Component } from 'react';
import { observer } from "mobx-react";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import CourseStore from "../../../stores/CourseStore";
import Participant from "./Participant";

class IParticipantsProps {
    participants: UserViewModel[];
    deleteParticipant: any;
    courseStore: CourseStore;
}

@observer
class Participants extends Component<IParticipantsProps>{
    renderParticipants(participants: UserViewModel[]) {
        return(
            <>
                <thead>
                <tr>
                    <td>ФИО</td>
                    <td>Тариф</td>
                    <td>Дата начала</td>
                    <td>Дата окончания</td>
                    <td>Роль</td>
                </tr>
                </thead>
                {participants.map(p => {
                    return(
                        <Participant participant={p} courseStore={this.props.courseStore} deleteParticipant={this.props.deleteParticipant}/>
                    );
                })}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderParticipants(this.props.participants)}
            </>
        );
    }
}

export default Participants;