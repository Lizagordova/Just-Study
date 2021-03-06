import React, { Component } from 'react';
import { observer } from "mobx-react";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import CourseStore from "../../../stores/CourseStore";
import Participant from "./Participant";
import { Table } from "reactstrap";

class IParticipantsProps {
    participants: UserViewModel[];
    deleteParticipant: any;
    courseStore: CourseStore;
}

@observer
class Participants extends Component<IParticipantsProps>{
    renderParticipants(participants: UserViewModel[]) {
        return(
            <Table style={{marginTop: "10px"}}>
                <thead>
                    <tr>
                        <td>ФИО</td>
                        <td>Тариф</td>
                        <td>Дата начала</td>
                        <td>Дата окончания</td>
                        <td>Роль</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                {participants.map(p => {
                    return(
                        <Participant key={p.id} participant={p} courseStore={this.props.courseStore} deleteParticipant={this.props.deleteParticipant} />
                    );
                })}
                </tbody>
            </Table>
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