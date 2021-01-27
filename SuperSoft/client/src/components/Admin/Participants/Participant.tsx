﻿import React, { Component } from 'react';
import { observer } from "mobx-react";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import CourseStore from "../../../stores/CourseStore";
import { UserCourseViewModel } from "../../../Typings/viewModels/UserCourseViewModel";
import { Label, Button, Alert, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { makeObservable, observable } from "mobx";
import Calendar from "react-calendar";
import { UserRole } from "../../../Typings/enums/UserRole";
import { Tarif } from "../../../Typings/enums/Tarif";
import { translateTarif } from "../../../functions/translater";

class IParticipantProps {
    participant: UserViewModel;
    courseStore: CourseStore;
    deleteParticipant: any;
}

@observer
class Participant extends Component<IParticipantProps> {
    notSaved: boolean;
    saved: boolean;
    details: UserCourseViewModel;
    roleMenuOpen: boolean;
    tarifOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notSaved: observable,
            saved: observable,
            details: observable,
            roleMenuOpen: observable,
        });
    }

    componentDidMount(): void {
        let participant = this.props.participant;
        let details = this.props.courseStore.usersByCourse.filter(u => u.userId === participant.id)[0];
    }

    renderParticipant(participant: UserViewModel, details: UserCourseViewModel) {
        return(
            <tr>
                <td>
                    {this.renderName(participant)}
                </td>
                <td>
                    {this.renderTarif(details)}
                </td>
                <td>
                    {this.renderStartDate(details)}
                </td>
                <td>
                    {this.renderEndDate(details)}
                </td>
                <td>
                    {this.renderRole(details)}
                </td>
                <td>
                    {this.renderControlButtons()}
                </td>
            </tr>
        );
    }

    renderName(participant: UserViewModel) {
        return(
            <Label>
                {participant.lastName} {participant.firstName}
            </Label>
        );
    }

    renderTarif(details: UserCourseViewModel) {
        return(
            <Dropdown isOpen={this.tarifOpen} toggle={() => this.toggleTarif()}>
                <DropdownToggle caret>
                    {translateTarif(details.tarif)}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="1" onClick={() => this.tarifChange(Tarif.Usual)}>{translateTarif(Tarif.Usual)}</DropdownItem>
                    <DropdownItem id="2" onClick={() => this.tarifChange(Tarif.Premium)}>{translateTarif(Tarif.Premium)}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderStartDate(details: UserCourseViewModel) {
        return(
            <Calendar
                value={details.startDate}
                onChange={(date) => this.inputDate(date, "startDate")}
            />
        );
    }

    renderEndDate(details: UserCourseViewModel) {
        return(
            <Calendar
                value={details.expireDate}
                onChange={(date) => this.inputDate(date, "expireDate")}
            />
        );
    }

    renderRole(details: UserCourseViewModel) {
        return(
            <Dropdown isOpen={this.roleMenuOpen} toggle={() => this.toggleRoleMenu()}>
                <DropdownToggle caret>
                    {details.role}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="1" onClick={() => this.roleChange(UserRole.Admin)}>Учитель</DropdownItem>
                    <DropdownItem id="2" onClick={() => this.roleChange(UserRole.User)}>Ученик</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderControlButtons() {
        return(
            <>
                <Button color="success" onClick={() => this.updateParticipant()}>
                    СОХРАНИТЬ
                </Button>
                <Button color="danger" onClick={() => this.props.deleteParticipant()}>
                    УДАЛИТЬ
                </Button>
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderParticipant(this.props.participant, this.details)}
            </>
        );
    }

    updateParticipant() {
        this.props.courseStore.addOrUpdateUserCourseDetails(this.details)
            .then((status) => {
                this.notSaved = status !== 200;
                this.saved = status === 200;
            });
    }

    inputDate(date: Date | Date[], type: string) {
        if (type === "startDate") {
            this.details.startDate = date;
        } else if (type === "expireDate") {
            this.details.expireDate = date;
        }
    }

    toggleRoleMenu() {
        this.roleMenuOpen = !this.roleMenuOpen;
    }

    roleChange(role: UserRole) {
        this.details.role = role;
    }

    tarifChange(tarif: Tarif) {
        this.details.tarif = tarif;
    }

    toggleTarif() {
        this.tarifOpen = !this.tarifOpen;
    }
}

export default Participant;