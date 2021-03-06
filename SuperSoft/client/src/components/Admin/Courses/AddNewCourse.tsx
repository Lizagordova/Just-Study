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
                <Button
                    style={{marginTop: "10px"}}
                    outline color="primary" onClick={() => this.addNewCourseToggle()}>
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
                    style={{width: "70%"}}
                    onChange={(e) => this.inputName(e)}/>
            </>
        );
    }

    renderDescriptionInput() {
        return(
            <>
                <Label>Введите описание курса</Label>
                <Input
                    style={{width: "70%"}}
                    onChange={(e) => this.inputDescription(e)}/>
            </>
        );
    }

    renderSaveButton() {
        return(
            <Button
                style={{width: "80%", marginBottom: "10px"}}
                outline color="success"
                onClick={() => this.addCourse()}>
                Сохранить курс
            </Button>
        );
    }

    renderWarnings() {
        setTimeout(() => {
            this.notSaved = false;
            this.saved = false;
        }, 6000);
        return (
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и курс не сохранилось</Alert>}
                {this.saved && <Alert color="success">Всё удачно сохранилось</Alert>}
            </>
        );
    }

    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.renderWarnings()}
                    <div className="row justify-content-center">
                        {this.renderCourseNameInput()}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderDescriptionInput()}
                    </div>
                </ModalBody>
                <div className="row justify-content-center">
                    {this.renderSaveButton()}
                </div>
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
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.addNewCourseToggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                <div className="row justify-content-center">
                    СОЗДАНИЕ НОВОГО КУРСА
                </div>
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
        this.initialState();
    }

    initialState() {
        this.notSaved = false;
        this.saved = false;
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