import React, { Component } from "react";
import CourseStore from "../../../stores/CourseStore";
import { Alert, Button, Modal, ModalBody, ModalFooter, ModalHeader, Label, Input } from "reactstrap";
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
    saved: boolean = false;

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
        );
    }

    renderCourseNameInput() {
        return(
            <>
                <Label>
                    Введите название курса
                </Label>
                <Input
                    onChange={(e) => this.inputName(e)}/>
            </>
        );
    }

    renderDescriptionInput() {
        return(
            <>
                <Label>Введите описание курса</Label>
                <Input onChange={(e) => this.inputDescription(e)}/>
            </>
        );
    }

    renderSaveButton() {
        return(
            <Button
                className="saveLessonButton"
                onClick={() => this.addCourse()}>
                Сохранить курс
            </Button>
        );
    }

    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.notSaved && <Alert color="danger">Что-то пошло не так и курс не сохранилось</Alert>}
                    {this.saved && <Alert color="success">Всё удачно сохранилось</Alert>}
                    <div className="row justify-content-center">
                        {this.renderCourseNameInput()}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderDescriptionInput()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    {this.renderSaveButton()}
                </ModalFooter>
            </>
        );
    }

    renderCancelButton() {
        return(
            <Button
                color="primary"
                onClick={() => this.addNewCourseToggle()}>
                ОТМЕНИТЬ
            </Button>
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
                {this.renderCancelButton()}
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