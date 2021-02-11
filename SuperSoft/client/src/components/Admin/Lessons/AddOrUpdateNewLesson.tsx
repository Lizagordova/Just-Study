import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { makeObservable, observable } from "mobx";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input } from "reactstrap";
import { observer } from "mobx-react";
import Calendar from "react-calendar";

class IAddOrUpdateNewLessonProps {
    store: RootStore;
    edit: boolean = false;
    lessonToEdit: LessonViewModel | undefined;
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

    constructor() {
        // @ts-ignore
        super();
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
        });
    }

    componentDidMount(): void {
        if(this.props.edit) {
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
        } else {
            this.order = this.props.store.lessonStore.lessonsByChoosenCourse.length + 1;
        }
    }

    renderButton() {
        return(
            <Button outline color="primary" onClick={() => this.addOrUpdateNewLessonToggle()}>
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
                <Label className="inputLabel" align="center">Напишите номер урока(в каком порядке он должен идти)</Label>
                <Input
                    style={{width: "70%"}}
                    value={this.order}
                    onChange={(e) => this.inputOrder(e)}/>
            </>
        );
    }

    renderStartDateInput() {
        return(
            <>
                <Label className="inputLabel" align="center">Выберите дату начала доступа урока</Label>
                <Calendar
                    value={this.startDate}
                    onChange={(date) => this.inputDate(date, "startDate")}
                />
            </>
        );
    }

    renderEndDateInput() {
        return(
            <>
                <Label className="inputLabel" align="center">Выберите дату окончания доступа урока</Label>
                <Calendar
                    value={this.expireDate}
                    onChange={(date) => this.inputDate(date, "expireDate")}
                />
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
 
    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.notSaved && <Alert color="danger">Что-то пошло не так и урок не сохранилось</Alert>}
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
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.addOrUpdateNewLessonToggle()}
                   className="fa fa-window-close" aria-hidden="true"/>
            <div className="row justify-content-center">
                УРОК
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
                {!this.addOrUpdateNewLesson && this.renderButton()}
            </>
        );
    }

    addOrUpdateNewLessonToggle() {
        this.addOrUpdateNewLesson = !this.addOrUpdateNewLesson;
    }

    addOrUpdateLesson() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        this.props.store.lessonStore
            .addOrUpdateLesson(this.id, this.order, courseId, this.description, this.startDate, this.expireDate)
            .then((status) => {
                this.notSaved = status !== 200;
                this.saved = status === 200;
        });
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

    inputDate(date: Date | Date[], dateType: string) {
        if(dateType === "startDate") {
            this.startDate = date;
        } else if(dateType === "expireDate") {
            this.expireDate = date;
        }
    }
}