import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Nav, Tab } from "react-bootstrap";
import { Button, Col, Collapse, Row, Alert } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import LessonPage from "./LessonPage";

class IMyLessonsPageProps {
    store: RootStore;
}


@observer
class MyLessonsPage extends Component<IMyLessonsPageProps> {
    isNavOpen: boolean;
    courseId: number;

    constructor(props: IMyLessonsPageProps) {
        super(props);
        makeObservable(this, {
            isNavOpen: observable,
            courseId: observable,
        });
        this.getLessons();
    }

    getLessons() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        this.props.store.lessonStore.getLessonsByCourse(courseId);
        this.courseId = courseId;
    }
    
    componentDidUpdate(prevProps: Readonly<IMyLessonsPageProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.store.courseStore.choosenCourse.id !== this.courseId) {
            this.getLessons();
        }
    }

    renderLessonsMenu(lessons: LessonViewModel[]) {
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
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
                                                    <Nav.Link
                                                        eventKey={lesson.id}
                                                        disabled={isDisabled}
                                                        className="nav-link lesson"
                                                        onClick={() => this.lessonToggle(lesson)}>
                                                        Урок {lesson.order}
                                                    </Nav.Link>
                                                </div>
                                            </Nav.Item>
                                        </>
                                    );
                                })}
                            </Nav>
                        </Collapse>
                    </Col>
                    <Col sm={10}>
                        <LessonPage store={this.props.store}/>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }

    renderCautions() {
        return(
            <Alert color="danger">Курс не доступен. Обратитесь к администратору.</Alert>
        );
    }

    render() {
        let lessons = this.props.store.lessonStore.lessonsByChoosenCourse;
        let courseAvailable = this.choosenCourseIsAvailable();
        return(
            <>
                
                {courseAvailable && this.renderLessonsMenu(lessons)}
                {!courseAvailable && this.renderCautions()}
            </>
        );
    }

    toggleNav() {
        this.isNavOpen = !this.isNavOpen;
    }

    lessonToggle(lesson: LessonViewModel) {
        this.props.store.lessonStore.setChoosenLesson(lesson);
        this.props.store.taskStore.getTasksByLesson(lesson.id);
    }

    choosenCourseIsAvailable(): boolean {
        let courseStore = this.props.store.courseStore;
        let choosenCourseId = courseStore.choosenCourse.id;
        if(choosenCourseId === 0) {
            return false;
        }
        let userCourse = courseStore.userCourses.filter(uc => uc.courseId === choosenCourseId)[0];
        if(userCourse.expireDate < new Date() || userCourse.startDate > new Date()) {
            return false;
        }

        return true;
    }
}

export default MyLessonsPage;