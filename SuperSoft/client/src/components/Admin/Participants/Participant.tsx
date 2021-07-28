import React, {Component} from 'react';
import {observer} from "mobx-react";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import CourseStore from "../../../stores/CourseStore";
import {UserCourseViewModel} from "../../../Typings/viewModels/UserCourseViewModel";
import {Alert, Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Label} from "reactstrap";
import {makeObservable, observable} from "mobx";
import Calendar from "react-calendar";
import {Tarif} from "../../../Typings/enums/Tarif";
import {translateCourseRole, translateTarif} from "../../../functions/translater";
import {CourseRole} from "../../../Typings/enums/CourseRole";
import {DateType} from "../../../consts/DateType";
import {WarningType} from "../../../consts/WarningType";
import {addDays} from "../../../functions/addDays";
import {renderWarning} from "../../../functions/renderWarnings";

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
    startDateExceedExpireDate: boolean;
    isValid: boolean = true;
    warningTypes: WarningType[] = new Array<WarningType>();

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
            expireDateCalendarOpen: observable,
            startDateExceedExpireDate: observable,
            isValid: observable,
            warningTypes: observable
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
                    {this.startDateExceedExpireDate && <Alert color="danger">Дата начала курса превышает дату конца окончания...</Alert>}
                    {this.warningTypes.length > 0 &&
                        <tr><td colSpan={6}>
                            {this.warningTypes.includes(WarningType.EndDateLessThanStartDate) && renderWarning(WarningType.EndDateLessThanStartDate)}
                            {this.warningTypes.includes(WarningType.StartDateMoreThanEndDate) && renderWarning(WarningType.StartDateMoreThanEndDate)}
                            {this.warningTypes.includes(WarningType.ChoosenDateLessThanToday) && renderWarning(WarningType.ChoosenDateLessThanToday)}
                            {this.warningTypes.includes(WarningType.NotValid) && renderWarning(WarningType.NotValid)}
                        </td></tr>
                    }
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
                <DropdownToggle caret className="specialDropdown">
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
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {<span onClick={() => this.toggleStartDate()}>{new Date(details.startDate).toLocaleDateString()}</span>}
                </div>
                {this.startDateCalendarOpen && <div className="row justify-content-center">
                    {this.renderStartDateCalendar(details)}
                </div>}
            </div>
        );
    }

    renderStartDateCalendar(details: UserCourseViewModel) {
        const startDate = typeof details.startDate === "string" ? new Date(details.startDate) : details.startDate;
        return(
            <Calendar
                minDate={new Date(2021)}
                value={startDate}
                onChange={(date) => this.inputDate(date, DateType.StartDate)}
            />
        );
    }

    renderEndDate(details: UserCourseViewModel) {
        return (
            <>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        {<span onClick={() => this.toggleExpireDate()}>{new Date(details.expireDate).toLocaleDateString()}</span>}
                    </div>
                    {this.expireDateCalendarOpen && <div className="row justify-content-center">
                        {this.renderEndDateCalendar(details)}
                    </div>}
                </div>
            </>
        );
    }

    renderEndDateCalendar(details: UserCourseViewModel) {
        const expireDate = typeof details.expireDate === "string" ? new Date(details.expireDate) : details.expireDate;
        return(
            <Calendar
                minDate={new Date(2021)}
                value={expireDate}
                onChange={(date) => this.inputDate(date, DateType.EndDate)}
            />
        );
    }

    renderRole(details: UserCourseViewModel) {
        return(
            <Dropdown isOpen={this.roleMenuOpen} toggle={() => this.toggleRoleMenu()}>
                <DropdownToggle caret className="specialDropdown">
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
                    Сохранить
                </Button>
                <Button
                    style={{width: "90%", marginBottom: "10px"}}
                    outline color="danger" onClick={() => this.props.deleteParticipant(this.props.participant)}>
                    Удалить
                </Button>
            </>
        );
    }

    render() {
        return (
            <>
                {this.details !== undefined && this.renderParticipant(this.props.participant, this.details)}
                {/*this.details === undefined && renderSpinner()*/}
            </>
        );
    }

    updateParticipant() {
        if(this.isValid) {
            this.startDateExceedExpireDate = new Date(this.details.startDate.toLocaleString()) > new Date(this.details.expireDate.toLocaleString());
            if(!this.startDateExceedExpireDate) {
                this.props.courseStore.addOrUpdateUserCourseDetails(this.details)
                    .then((status) => {
                        this.notSaved = status !== 200;
                        this.saved = status === 200;
                    });
            }
        } else {
            if(!this.warningTypes.includes(WarningType.NotValid)) {
                this.warningTypes.push(WarningType.NotValid);
            }
        }       
    }

    inputDate(date: Date | Date[], dateType: DateType) {
        if (dateType === DateType.StartDate) {
            this.details.startDate = date;
        } else if (dateType === DateType.EndDate) {
            this.details.expireDate = date;
        }
        this.validate(date, dateType)
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

    validate(date: Date | Date[], dateType: DateType) {
        let warningsTypes = new Array<WarningType>();
        if(this.details.startDate < addDays(new Date(), -1) || this.details.expireDate < addDays(new Date(), -1)) {
            warningsTypes.push(WarningType.ChoosenDateLessThanToday);
        }
        if((dateType === DateType.EndDate && date < this.details.startDate) || this.details.expireDate < this.details.startDate) {
            warningsTypes.push(WarningType.EndDateLessThanStartDate);
        }
        if((dateType === DateType.StartDate && date > this.details.expireDate) || this.details.startDate > this.details.expireDate) {
            warningsTypes.push(WarningType.StartDateMoreThanEndDate);
        }
        this.warningTypes = warningsTypes;
        this.isValid = warningsTypes.length === 0;
    }
}

export default Participant;