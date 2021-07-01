import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Nav, Tab } from "react-bootstrap";
import { Button, Col, Collapse, Row, Alert } from "reactstrap";
import {makeObservable, observable, toJS} from "mobx";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import LessonPage from "./LessonPage";
import {renderSpinner} from "../../../functions/renderSpinner";

class IMyLessonsPageProps {
    store: RootStore;
}


@observer
class MyLessonsPage extends Component<IMyLessonsPageProps> {
    isNavOpen: boolean = true;
    courseId: number;

    constructor(props: IMyLessonsPageProps) {
        super(props);
        makeObservable(this, {
            isNavOpen: observable,
            courseId: observable,
        });
        if(this.props.store.courseStore.choosenCourse.id !== undefined) {
            this.getLessons();
        }
        
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
        let rowHeight = this.isNavOpen ? lessons.length * 80 + 50  : 60;
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3} style={{height: `${rowHeight}px`}}>
                        <Button color="primary" onClick={() => this.toggleNav()}>Уроки</Button>
                        <Collapse isOpen={this.isNavOpen}>
                            <Nav variant="pills" className="flex-column">
                                <div className="container-fluid">
                                    {lessons.map((lesson) => {
                                        let currentDate = new Date().toString();
                                        let isDisabled = Date.parse(currentDate) > Date.parse(lesson.expireDate)  && Date.parse(currentDate) < Date.parse(lesson.startDate);
                                        return (
                                                <Nav.Item key={lesson.id}>
                                                    <div className="row" key={lesson.id}>
                                                        <Nav.Link
                                                            key={lesson.id}
                                                            eventKey={lesson.id}
                                                            disabled={isDisabled}
                                                            className="nav-link lesson"
                                                            onClick={() => this.lessonToggle(lesson)}>
                                                            {lesson.name}
                                                        </Nav.Link>
                                                    </div>
                                                </Nav.Item>
                                        );
                                    })}
                                </div>
                            </Nav>
                        </Collapse>
                    </Col>
                    <Col sm={9}>
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
                {(lessons === undefined || lessons.length === 0) && renderSpinner()}
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
        if(userCourse === undefined || (userCourse.expireDate < new Date() || userCourse.startDate > new Date())) {
            return false;
        }

        return true;
    }
}

export default MyLessonsPage;