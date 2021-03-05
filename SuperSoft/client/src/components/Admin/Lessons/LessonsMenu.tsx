import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { Tab, Nav } from "react-bootstrap";
import { Alert, Button, Col, Collapse, Row } from "reactstrap";
import { renderSpinner } from "../../../functions/renderSpinner";
import { AddOrUpdateNewLesson } from "./AddOrUpdateNewLesson";
import { LessonPage } from "./LessonPage";

class ILessonsMenuProps {
    store: RootStore;
}

@observer
export class LessonsMenu extends Component<ILessonsMenuProps> {
    editLesson: boolean = false;
    lessonToEdit: LessonViewModel = new LessonViewModel();
    notDeleted: boolean = false;
    deleted: boolean = false;
    isNavOpen: boolean = true;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            editLesson: observable,
            lessonToEdit: observable,
            notDeleted: observable,
            deleted: observable,
            isNavOpen: observable
        });
    }

    toggleNav() {
        this.isNavOpen = !this.isNavOpen;
    }

    editToggle = () => {
        this.editLesson = !this.editLesson;
    };

    editLessonToggle(lesson: LessonViewModel) {
        this.editLesson = true;
        this.lessonToEdit = lesson;
    }

    lessonToggle(lesson: LessonViewModel) {
        this.props.store.lessonStore.setChoosenLesson(lesson);
        this.props.store.taskStore.getTasksByLesson(lesson.id);
    }

    renderCautions() {
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return (
            <>
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и урок не удалился</Alert>}
            </>
        );
    }

    renderLessonsMenu(lessons: LessonViewModel[]) {
        let rowHeight = this.isNavOpen ? lessons.length * 80 + 40 : 40;
        let defaultActiveKey = lessons[0] !== undefined ? lessons[0].id : 0;
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey={defaultActiveKey}>
                {this.renderCautions()}
                <Row>
                    <Col sm={3} style={{height: `${rowHeight}px`}}>
                        <Button color="primary" onClick={() => this.toggleNav()}>УРОКИ</Button>
                        <Collapse isOpen={this.isNavOpen}>
                            <Nav variant="pills" className="flex-column" defaultActiveKey={defaultActiveKey}>
                                <div className="container-fluid">
                                    {lessons.map((lesson) => {
                                        // @ts-ignore
                                        let isDisabled = new Date() < Date.parse(lesson.expireDate)  && new Date() > Date.parse(lesson.startDate);
                                        return (
                                                <Nav.Item key={lesson.id}>
                                                    <div className="row" key={lesson.id} style={{height: "auto"}}>
                                                        <div className="col-8" style={{height: "auto"}}>
                                                            <Nav.Link
                                                                style={{height: "auto"}}
                                                                eventKey={lesson.id}
                                                                className="nav-link lesson"
                                                                onClick={() => this.lessonToggle(lesson)}>
                                                                {lesson.name}
                                                            </Nav.Link>
                                                        </div>
                                                        <div className="col-2 col-lg-offset-10">
                                                            <i className="fa fa-window-close fa-2x"
                                                               aria-hidden="true"
                                                               onClick={() => this.deleteLesson(lesson.id)}/>
                                                            <i className="fa fa-edit fa-2x"
                                                               aria-hidden="true"
                                                               onClick={() => this.editLessonToggle(lesson)}/>
                                                        </div>
                                                    </div>
                                                </Nav.Item>
                                        );
                                    })}
                                    <AddOrUpdateNewLesson store={this.props.store} edit={false} lessonToEdit={undefined} cancelEdit={undefined}/>
                                </div>
                            </Nav>
                        </Collapse>
                    </Col>
                    <Col sm={9}>
                        {this.renderLessonPage()}
                    </Col>
                    {this.editLesson && <AddOrUpdateNewLesson store={this.props.store} edit={true} lessonToEdit={this.lessonToEdit} cancelEdit={this.editToggle}/>}
                </Row>
            </Tab.Container>
        );
    }

    renderLessonPage() {
        let lessonChoosen = this.props.store.lessonStore.choosenLesson !== undefined;
        return(
            <>
                {lessonChoosen && <LessonPage store={this.props.store} lessonActive={true}/>}
                {!lessonChoosen && <Alert color="success">Выберите или добавьте урок:)</Alert>}
            </>
        );
    }

    render() {
        let lessons = this.props.store.lessonStore.lessonsByChoosenCourse;
        return(
            <>
                {lessons !== undefined && lessons.length > 0 && this.renderLessonsMenu(lessons)}
                {lessons === undefined && renderSpinner()}
            </>
        );
    }

    deleteLesson(lessonId: number) {
        let result = window.confirm('Вы уверены, что хотите удалить этот урок?');
        if(result) {
            this.props.store.lessonStore.deleteLesson(lessonId, this.props.store.courseStore.choosenCourse.id)
                .then((status) => {
                    this.notDeleted = status !== 200;
                    this.deleted = status === 200;
            });
        }
    }
}