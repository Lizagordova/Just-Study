import React, {Component} from 'react';
import RootStore from "../../../stores/RootStore";
import {LessonViewModel} from "../../../Typings/viewModels/LessonViewModel";
import {makeObservable, observable} from "mobx";
import {Alert, Button, Fade, Input, Label, Modal, ModalBody} from "reactstrap";
import {observer} from "mobx-react";
import Calendar from "react-calendar";
import {WarningType} from "../../../consts/WarningType";
import {DateType} from "../../../consts/DateType";
import {renderWarning} from "../../../functions/renderWarnings";
import {addDays} from "../../../functions/addDays";

class IAddOrUpdateNewLessonProps {
    store: RootStore;
    edit: boolean = false;
    lessonToEdit: LessonViewModel | undefined;
    cancelEdit: any | undefined;
}

@observer
export class AddOrUpdateNewLesson extends Component<IAddOrUpdateNewLessonProps> {
    addOrUpdateNewLesson: boolean;
    id: number = 0;
    order: number = 0;
    description: string = "";
    startDate: Date | Date[] = new Date();
    expireDate: Date | Date[] = new Date();
    notSaved: boolean = false;
    saved: boolean = false;
    name: string = "";
    warningTypes: WarningType[] = new Array<WarningType>();
    isValid: boolean = true;

    constructor(props: IAddOrUpdateNewLessonProps) {
        super(props);
        makeObservable(this, {
            addOrUpdateNewLesson: observable,
            id: observable,
            order: observable,
            description: observable,
            startDate: observable,
            expireDate: observable,
            notSaved: observable,
            saved: observable,
            name: observable,
            warningTypes: observable,
            isValid: observable,
        });
        if(this.props.edit) {
            this.fillData();
        }
    }

    componentDidUpdate(prevProps: Readonly<IAddOrUpdateNewLessonProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.lessonToEdit !== this.props.lessonToEdit) {
            this.fillData()
        }
    }

    fillData() {
        let lessonToEdit = this.props.lessonToEdit;
        if(lessonToEdit !== undefined) {
            this.id = lessonToEdit.id;
            this.order = lessonToEdit.order;
            this.description = lessonToEdit.description;
            this.startDate = lessonToEdit.startDate;
            this.expireDate = lessonToEdit.expireDate;
            this.name = lessonToEdit.name;
        }
        this.addOrUpdateNewLesson = true;
    }

    renderButton() {
        return(
            <Button 
                style={{marginTop: "10px", marginBottom: "10px"}}
                outline
                className="addNewLesson"
                onClick={() => this.addOrUpdateNewLessonToggle()}>
                Добавить урок
            </Button>
        );
    }

    renderLessonDescription() {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Введите описание урока
                </Label>
                <Input
                    style={{width: "70%"}}
                    value={this.description}
                    onChange={(e) => this.inputDescription(e)}/>
            </>
        );
    }

    renderNameDescription() {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Введите название урока
                </Label>
                <Input
                    style={{width: "70%"}}
                    value={this.name}
                    onChange={(e) => this.inputName(e)}/>
            </>
        );
    }

    renderOrderInput() {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Напишите номер урока(в каком порядке он должен идти)
                </Label>
                <Input
                    style={{width: "70%"}}
                    defaultValue={this.props.store.lessonStore.lessonsByChoosenCourse.length + 1}
                    value={this.order}
                    onChange={(e) => this.inputOrder(e)}/>
            </>
        );
    }

    renderStartDateInput() {
        const startDate = typeof this.startDate === "string" ? new Date(this.startDate) : this.startDate;
        return(
            <>
                <Label className="inputLabel" align="center">Выберите дату начала доступа урока</Label>
                <Calendar
                    value={startDate}
                    onChange={(date) => this.inputDate(date, DateType.StartDate)}
                />
            </>
        );
    }

    renderEndDateInput() {
        const expireDate = typeof this.expireDate === "string" ? new Date(this.expireDate) : this.expireDate;
        return(
            <>
                <Label className="inputLabel" align="center">Выберите дату окончания доступа урока</Label>
                <Calendar
                    value={expireDate}
                    onChange={(date) => this.inputDate(date, DateType.EndDate)}
                />
            </>
        );
    }

    renderWarnings() {
        return (
            <>
                {this.warningTypes.includes(WarningType.EndDateLessThanStartDate) 
                    && renderWarning(WarningType.EndDateLessThanStartDate)}
                {this.warningTypes.includes(WarningType.StartDateMoreThanEndDate) 
                    && renderWarning(WarningType.StartDateMoreThanEndDate)}
                {this.warningTypes.includes(WarningType.ChoosenDateLessThanToday)
                    && renderWarning(WarningType.ChoosenDateLessThanToday)}
                {this.warningTypes.includes(WarningType.NotValid)
                    && renderWarning(WarningType.NotValid)}
            </>
        );
    }
    
    renderSaveLessonButton() {
        return (
            <Button
                outline color="success"
                style={{width: "80%", marginBottom: "10px"}}
                onClick={() => this.addOrUpdateLesson()}>
                Сохранить урок
            </Button>
        );
    }
 
    renderCautions() {
        return (
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и урок не сохранился</Alert>}
                {this.saved && <Alert color="success">Урок успешно сохранился!</Alert>}
            </>
        );
    }

    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.renderCautions()}
                    <div className="row justify-content-center">
                        {this.renderNameDescription()}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderLessonDescription()}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderOrderInput()}
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            {this.renderStartDateInput()}
                        </div>
                        <div className="col-6">
                            {this.renderEndDateInput()}
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {this.renderWarnings()}
                    </div>
                </ModalBody>
                <div className="row justify-content-center">
                    {this.renderSaveLessonButton()}
                </div>
            </>
        );
    }

    renderCancelButton() {
        return(
            <Button
                color="primary"
                onClick={() => this.addOrUpdateNewLessonToggle()}>
                ОТМЕНИТЬ
            </Button>
        );
    }

    renderAddOrUpdateNewLessonWindow() {
        return(
            <Modal
                centered={true}
                size="lg"
                isOpen={this.addOrUpdateNewLesson}
                toggle={() => this.addOrUpdateNewLessonToggle()}
            >
                <i style={{marginLeft: '92%', width: '2%'}}
                   onClick={() => this.addOrUpdateNewLessonToggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
            <div className="row justify-content-center" style={{fontSize: "1.3em"}}>
                Урок
            </div>
                {this.renderBody()}
                {this.renderCancelButton()}
            </Modal>
        );
    }

    render() {
        return(
            <>
                {this.addOrUpdateNewLesson && this.renderAddOrUpdateNewLessonWindow()}
                {!this.props.edit && this.renderButton()}
            </>
        );
    }

    addOrUpdateNewLessonToggle() {
        if(this.props.cancelEdit !== undefined) {
            this.props.cancelEdit();
        }
        this.initialState();
        this.addOrUpdateNewLesson = !this.addOrUpdateNewLesson;
    }

    initialState() {
        this.id = 0;
        this.order = this.props.store.lessonStore.lessonsByChoosenCourse.length + 1;
        this.description = "";
        this.startDate = new Date();
        this.expireDate = new Date();
        this.notSaved = false;
        this.saved = false;
        this.name = "";
    }

    addOrUpdateLesson() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        if(this.isValid) {
            this.props.store.lessonStore
                .addOrUpdateLesson(this.id, this.order, courseId, this.name, this.description, this.startDate, this.expireDate)
                .then((status) => {
                    this.notSaved = status !== 200;
                    this.saved = status === 200;
                });
        } else {
            if(!this.warningTypes.includes(WarningType.NotValid)) {
                this.warningTypes.push(WarningType.NotValid);    
            }
        }
        
    }

    inputDescription(event: React.FormEvent<HTMLInputElement>) {
        this.description = event.currentTarget.value;
    }

    inputOrder(event: React.FormEvent<HTMLInputElement>) {
        this.order = Number(event.currentTarget.value);
    }

    inputName(event: React.FormEvent<HTMLInputElement>) {
        this.name = event.currentTarget.value;
    }

    inputDate(date: Date | Date[], dateType: DateType) {
        if(dateType === DateType.StartDate) {
            this.startDate = date;
        } else if(dateType === DateType.EndDate) {
            this.expireDate = date;
        }
        this.validate(date, dateType);
    }
    
    validate(date: Date | Date[], dateType: DateType) {
        let warningsTypes = new Array<WarningType>();
        if(date < addDays(new Date(), -1)) {
            warningsTypes.push(WarningType.ChoosenDateLessThanToday);
        }
        if(dateType === DateType.EndDate && date < this.startDate) {
            warningsTypes.push(WarningType.EndDateLessThanStartDate);
        }
        if(dateType === DateType.StartDate && date > this.expireDate) {
            warningsTypes.push(WarningType.StartDateMoreThanEndDate);
        }
        this.warningTypes = warningsTypes;
        this.isValid = warningsTypes.length === 0;
    }
}