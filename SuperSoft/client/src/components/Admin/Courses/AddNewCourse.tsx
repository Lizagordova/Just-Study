import React, { Component } from "react";
import CourseStore from "../../../stores/CourseStore";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { action, makeObservable, observable } from "mobx";
import { observer } from "mobx-react";

class IAddNewCourseProps {
    courseStore: CourseStore;
}

@observer
export class AddNewCourse extends Component<IAddNewCourseProps> {
    addNewCourse: boolean = false;
    id: number = 0;
    name: string = "";
    description: string = "";
    notSaved: boolean = false;
    saved: boolean = true;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addNewCourse: observable,
            id: observable,
            name: observable,
            description: observable,
            notSaved: observable,
            saved: observable
        });
    }

    renderButton() {
        return(
            <>
                <Button outline color="primary" onClick={() => this.addNewCourseToggle()}>
                    Добавить курс
                </Button>
            </>
        )
    }

    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.notSaved && <Alert color="danger">Что-то пошло не так и курс не сохранилось</Alert>}
                    {this.saved && <Alert color="success">Всё удачно сохранилось</Alert>}
                    <div className="row justify-content-center">
                        <label className="instruction">
                            Введите название курса
                        </label>
                        <input
                            onChange={(e) => this.inputName(e)}/>
                    </div>
                    <div className="row justify-content-center">
                        <label>Введите описание курса</label>
                        <input onChange={(e) => this.inputDescription(e)}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="saveLessonButton"
                        onClick={() => this.addCourse()}>
                        Сохранить курс
                    </Button>
                </ModalFooter>
            </>
        );
    }

    renderAddNewCourseWindow() {
        return(
            <Modal
                centered={true}
                size="lg"
                isOpen={this.addNewCourse}
                toggle={() => this.addNewCourseToggle()}
            >
                <ModalHeader >
                    СОЗДАНИЕ НОВОГО КУРСА
                </ModalHeader>
                {this.renderBody()}
                <Button
                    color="primary"
                    onClick={() => this.addNewCourseToggle()}>
                    ОТМЕНИТЬ
                </Button>
            </Modal>
        );
    }

    render() {
        return(
            <>
                {!this.addNewCourse && this.renderButton()}
                {this.addNewCourse && this.renderAddNewCourseWindow()}
            </>
        );
    }

    @action
    addNewCourseToggle() {
        this.addNewCourse = !this.addNewCourse;
    }

    addCourse() {
        this.props.courseStore
            .addOrUpdateCourse(this.id, this.name, this.description)
            .then((status) => {
                this.notSaved = status !== 200;
                this.saved = status === 200;
        });
    }

    inputName(event: React.FormEvent<HTMLInputElement>) {
        this.name = event.currentTarget.value;
    }

    inputDescription(event: React.FormEvent<HTMLInputElement>) {
        this.description = event.currentTarget.value;
    }
}