import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Nav, Tab } from "react-bootstrap";
import { Button, Col, Collapse, Row, Alert } from "reactstrap";
import {makeObservable, observable, toJS} from "mobx";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import LessonPage from "./LessonPage";
import {renderSpinner} from "../../../functions/renderSpinner";
import {AddOrUpdateNewLesson} from "../../Admin/Lessons/AddOrUpdateNewLesson";

class IMyLessonsPageProps {
    store: RootStore;
}


@observer
class MyLessonsPage extends Component<IMyLessonsPageProps> {
    isNavOpen: boolean = true;
    courseId: number;
    courseAvailable: boolean = false;

    constructor(props: IMyLessonsPageProps) {
        super(props);
        makeObservable(this, {
            isNavOpen: observable,
            courseId: observable,
            courseAvailable: observable,
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

    renderLessonsList(lessons: LessonViewModel[]) {
        let defaultActiveKey = lessons[0] !== undefined ? lessons[0].id : 0;
        return (
            <>
                {lessons.map((lesson) => {
                    // @ts-ignore
                    let isDisabled = new Date() < Date.parse(lesson.expireDate)  && new Date() > Date.parse(lesson.startDate);
                    return (
                        <Nav.Item key={lesson.id}>
                            <div className="row" key={lesson.id} style={{height: "auto"}}>
                                <Nav.Link
                                    style={{height: "auto"}}
                                    eventKey={lesson.id}
                                    className="nav-link lesson"
                                    disabled={isDisabled}
                                    onClick={() => this.lessonToggle(lesson)}>
                                    {lesson.name}
                                </Nav.Link>
                            </div>
                        </Nav.Item>
                    );
                })}
            </>
        );
    }
    
    renderLessonsMenu(lessons: LessonViewModel[]) {
        let defaultActiveKey = lessons[0] !== undefined ? lessons[0].id : 0;
        return(
            <>
                <div className="row">
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                        <Button
                            onClick={() => this.toggleNav()}
                            style={{marginBottom: "3px", width: "100%", backgroundColor: "rgb(65, 105, 225)"}}>Уроки</Button>
                        <Collapse isOpen={this.isNavOpen}>
                            <Nav variant="pills" className="flex-column" defaultActiveKey={defaultActiveKey}>
                                <div className="container-fluid">
                                    {lessons.length > 0 && this.renderLessonsList(lessons)}
                                </div>
                            </Nav>
                        </Collapse>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        <LessonPage store={this.props.store}/>
                    </div>
                </div>
            </>
        );
    }
    
    renderCautions() {
        return(
            <Alert color="danger">Курс не доступен. Обратитесь к администратору.</Alert>
        );
    }

    render() {
        let lessons = this.props.store.lessonStore.lessonsByChoosenCourse;
        this.courseAvailable = this.choosenCourseIsAvailable();
        return(
            <div className="container-fluid">
                {(lessons === undefined || lessons.length === 0) && this.courseAvailable && renderSpinner()}
                {this.courseAvailable && this.renderLessonsMenu(lessons)}
                {!this.courseAvailable && this.renderCautions()}
            </div>
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
        console.log("courseStore", courseStore);
        console.log("choosenCourseId", choosenCourseId);
        if(choosenCourseId === 0) {
            return false;
        }
        let userCourse = courseStore.userCourses.filter(uc => uc.courseId === choosenCourseId)[0];
        console.log("userCourse", toJS(userCourse));
        if(userCourse === undefined || (userCourse.expireDate < new Date() || userCourse.startDate > new Date())) {
            return false;
        }

        return true;
    }
}

export default MyLessonsPage;