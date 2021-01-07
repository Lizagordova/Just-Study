import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { makeObservable, observable } from "mobx";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label } from "reactstrap";
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
            saved: observable
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
        )
    }

    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.notSaved && <Alert color="danger">Что-то пошло не так и урок не сохранилось</Alert>}
                    <div className="row justify-content-center">
                        <Label className="instruction" style={{width: "100%"}} align="center">
                            Введите описание урока
                        </Label>
                        <input
                            value={this.description}
                            onChange={(e) => this.inputDescription(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <Label style={{width: "100%"}} align="center">Напишите номер урока(в каком порядке он должен идти)</Label>
                        <input
                            value={this.order}
                            onChange={(e) => this.inputOrder(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-6">
                            <Label style={{width: "100%"}} align="center">Выберите дату начала доступа урока</Label>
                            <Calendar
                                value={this.startDate}
                                onChange={(date) => this.inputDate(date, "startDate")}
                            /></div>
                        <div className="col-6">
                            <Label style={{width: "100%"}} align="center">Выберите дату окончания доступа урока</Label>
                            <Calendar
                                value={this.expireDate}
                                onChange={(date) => this.inputDate(date, "expireDate")}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="saveLessonButton"
                        onClick={() => this.addOrUpdateLesson()}>
                        Сохранить урок
                    </Button>
                </ModalFooter>
            </>
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
                <ModalHeader>
                    УРОК
                </ModalHeader>
                {this.renderBody()}
                <Button
                    color="primary"
                    onClick={() => this.addOrUpdateNewLessonToggle()}>ОТМЕНИТЬ</Button>
            </Modal>
        );
    }

    render() {
        return(
            <>
                {this.addOrUpdateNewLesson && this.renderAddOrUpdateNewLessonWindow()}
                {!this.addOrUpdateNewLesson && this.renderButton()}
            </>
        )
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

    inputDate(date: Date | Date[], dateType: string) {
        if(dateType === "startDate") {
            this.startDate = date;
        } else if(dateType === "expireDate") {
            this.expireDate = date;
        }
    }
}