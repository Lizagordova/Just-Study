import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Tab, Nav } from "react-bootstrap";
import { Alert, Button, Col, Collapse, Row } from "reactstrap";
import { renderSpinner } from "../../../functions/renderSpinner";
import {AddOrUpdateNewLesson} from "./AddOrUpdateNewLesson";
import {LessonPage} from "./LessonPage";

class ILessonsMenuProps {
    store: RootStore;
}

@observer
export class LessonsMenu extends Component<ILessonsMenuProps> {
    editLesson: boolean = false;
    lessonToEdit: LessonViewModel;
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
            isNavOpen: observable,
        });
    }

    toggleNav() {
        this.isNavOpen = !this.isNavOpen;
    }

    editLessonToggle(lesson: LessonViewModel) {
        this.editLesson = true;
        this.lessonToEdit = lesson;
    }

    lessonToggle(lesson: LessonViewModel) {
        this.props.store.lessonStore.setChoosenLesson(lesson);
    }

    renderLessonsMenu(lessons: LessonViewModel[]) {
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                {this.notDeleted && <Alert>Что-то пошло не так и урок не удалился</Alert>}
                <Row>
                    <Col sm={2}>
                        <Button color="primary" className="lessonToggle" onClick={() => this.toggleNav()}>УРОКИ</Button>
                        <Collapse isOpen={this.isNavOpen}>
                            <Nav variant="pills" className="flex-column">
                                {lessons.map((lesson) => {
                                    // @ts-ignore
                                    let isDisabled = new Date() < Date.parse(lesson.expireDate)  && new Date() > Date.parse(lesson.startDate);
                                    return (
                                        <>
                                            <Nav.Item>
                                                <div className="row">
                                                    <div className="col-8">
                                                        <Nav.Link
                                                             eventKey={lesson.id}
                                                             className="nav-link lesson"
                                                             onClick={() => this.lessonToggle(lesson)}>
                                                            Урок {lesson.order}
                                                        </Nav.Link>
                                                    </div>
                                                    <div className="col-4 col-lg-offset-8">
                                                        <i className="fa fa-window-close deleteLesson"
                                                           aria-hidden="true"
                                                           onClick={() => this.deleteLesson(lesson.id)}/>
                                                        <i className="fa fa-edit"
                                                           aria-hidden="true"
                                                           onClick={() => this.editLessonToggle(lesson)}/>
                                                    </div>
                                                </div>
                                            </Nav.Item>
                                        </>
                                    )
                                })}
                                <AddOrUpdateNewLesson store={this.props.store} edit={false} lessonToEdit={undefined}/>
                            </Nav>
                        </Collapse>
                    </Col>
                    <Col sm={10}>
                        <LessonPage store={this.props.store}/>
                    </Col>
                    {this.editLesson && <AddOrUpdateNewLesson store={this.props.store} edit={true} lessonToEdit={this.lessonToEdit}  />}
                </Row>
            </Tab.Container>
        )
    }

    render() {
        let lessons = this.props.store.lessonStore.lessonsByChoosenCourse;
        return(
            <>
                {lessons !== undefined && lessons.length > 0 && this.renderLessonsMenu(lessons)}
                {(lessons === undefined || lessons.length === 0) && renderSpinner()}
            </>
        );
    }

    deleteLesson(lessonId: number) {
        let result = window.confirm('Вы уверены, что хотите удалить этот урок?');
        if(result) {
            this.props.store.lessonStore.deleteLesson(lessonId)
                .then((status) => {
                    this.notDeleted = status !== 200;
                    this.deleted = status === 200;
            });
        }
    }
}