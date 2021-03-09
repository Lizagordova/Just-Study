import React, {Component} from 'react';
import {observer} from "mobx-react";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import CourseStore from "../../../stores/CourseStore";
import {UserCourseViewModel} from "../../../Typings/viewModels/UserCourseViewModel";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label, Alert } from "reactstrap";
import {makeObservable, observable, toJS} from "mobx";
import Calendar from "react-calendar";
import {UserRole} from "../../../Typings/enums/UserRole";
import {Tarif} from "../../../Typings/enums/Tarif";
import {translateCourseRole, translateRole, translateTarif} from "../../../functions/translater";
import {renderSpinner} from "../../../functions/renderSpinner";
import {CourseRole} from "../../../Typings/enums/CourseRole";

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
    startDateCalendarOpen: boolean;
    expireDateCalendarOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notSaved: observable,
            saved: observable,
            details: observable,
            roleMenuOpen: observable,
            tarifOpen: observable,
            startDateCalendarOpen: observable,
            expireDateCalendarOpen: observable
        });
    }

    componentDidMount(): void {
        let participant = this.props.participant;
        this.details = this.props.courseStore.usersByCourse.filter(u => u.userId === participant.id)[0];
    }

    renderWarnings() {
        setTimeout(() => {
            this.notSaved = false;
            this.saved = false;
        }, 6000);
        return(
            <>
                {this.notSaved && <Alert color="danger">Не удалось обновить данные</Alert>}
                {this.saved && <Alert color="success">Данные успешно обновились :)</Alert>}
            </>
        );
    }

    renderParticipant(participant: UserViewModel, details: UserCourseViewModel) {
        return(
            <>
                {this.renderWarnings()}
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
            </>
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
                    <DropdownItem key="1" id="1" onClick={() => this.tarifChange(Tarif.Usual)}>{translateTarif(Tarif.Usual)}</DropdownItem>
                    <DropdownItem key="2" id="2" onClick={() => this.tarifChange(Tarif.Premium)}>{translateTarif(Tarif.Premium)}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderStartDate(details: UserCourseViewModel) {
        return (
            <>
                {<span onClick={() => this.toggleStartDate()}>{new Date(details.startDate).toLocaleDateString()}</span>}
                {this.startDateCalendarOpen && this.renderStartDateCalendar(details)}
            </>
        );
    }

    renderStartDateCalendar(details: UserCourseViewModel) {
        const startDate = typeof details.startDate === "string" ? new Date(details.startDate) : details.startDate;
        return(
            <Calendar
                minDate={new Date(2021)}
                value={startDate}
                onChange={(date) => this.inputDate(date, "startDate")}
            />
        );
    }

    renderEndDate(details: UserCourseViewModel) {
        return (
            <>
                {<span onClick={() => this.toggleExpireDate()}>{new Date(details.expireDate).toLocaleDateString()}</span>}
                {this.expireDateCalendarOpen && this.renderEndDateCalendar(details)}
            </>
        );
    }

    renderEndDateCalendar(details: UserCourseViewModel) {
        const expireDate = typeof details.expireDate === "string" ? new Date(details.expireDate) : details.expireDate;
        return(
            <Calendar
                minDate={new Date(2021)}
                value={expireDate}
                onChange={(date) => this.inputDate(date, "expireDate")}
            />
        );
    }

    renderRole(details: UserCourseViewModel) {
        return(
            <Dropdown isOpen={this.roleMenuOpen} toggle={() => this.toggleRoleMenu()}>
                <DropdownToggle caret>
                    {translateCourseRole(details.courseRole)}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem id="1" key="1" onClick={() => this.roleCourseChange(CourseRole.Teacher)}>{translateCourseRole(CourseRole.Teacher)}</DropdownItem>
                    <DropdownItem id="2" key="2" onClick={() => this.roleCourseChange(CourseRole.Pupil)}>{translateCourseRole(CourseRole.Pupil)}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        );
    }

    renderControlButtons() {
        return(
            <>
                <Button 
                    style={{width: "90%", marginBottom: "4px"}}
                    outline color="success" onClick={() => this.updateParticipant()}>
                    СОХРАНИТЬ
                </Button>
                <Button
                    style={{width: "90%", marginBottom: "10px"}}
                    outline color="danger" onClick={() => this.props.deleteParticipant(this.props.participant)}>
                    УДАЛИТЬ
                </Button>
            </>
        );
    }

    render() {
        return (
            <>
                {this.details !== undefined && this.renderParticipant(this.props.participant, this.details)}
                {this.details === undefined && renderSpinner()}
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

    roleCourseChange(role: CourseRole) {
        this.details.courseRole = role;
    }

    tarifChange(tarif: Tarif) {
        this.details.tarif = tarif;
    }

    toggleTarif() {
        this.tarifOpen = !this.tarifOpen;
    }

    toggleStartDate() {
        this.startDateCalendarOpen = !this.startDateCalendarOpen;
    }

    toggleExpireDate() {
        this.expireDateCalendarOpen = !this.expireDateCalendarOpen;
    }
}

export default Participant;