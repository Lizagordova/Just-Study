﻿import React, { Component } from 'react';
import  { Tab, Nav } from "react-bootstrap";
import { Alert, Button, Col, Row, Collapse } from "reactstrap";
import { observer } from "mobx-react";
import { observable, makeObservable, action } from "mobx";
import { CourseViewModel } from "../../../Typings/viewModels/CourseViewModel";
import { renderSpinner } from "../../../functions/renderSpinner";
import { AddNewCourse } from "./AddNewCourse";
import RootStore from "../../../stores/RootStore";
import {Course} from "./Course";

class ICoursesPageProps {
    store: RootStore;
}

@observer
class CoursesPage extends Component<ICoursesPageProps> {
    notDeleted: boolean = false;
    isNavOpen: boolean = true;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable,
            isNavOpen: observable
        });
    }

    componentDidMount(): void {
        this.props.store.courseStore.getCoursesForTeacher();
    }

    renderCourse() {
        let coursesExists = this.props.store.courseStore.coursesForTeacher.length !== 0;
        if(!coursesExists) {
            return(
                <Alert>Добавьте курсы. Пока нет ни одного курса.</Alert>
            );
        } else {
            return (
                <Course store={this.props.store}/>
            );
        }
    }

    toggleNav() {
        this.isNavOpen = !this.isNavOpen;
    }

    renderCautions() {
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return (
            <>
                {this.notDeleted && <Alert>Что-то пошло не так и курс не удалился</Alert>}
            </>
        );
    }

    renderCoursesMenu(courses: CourseViewModel[]) {
        let rowHeight = this.isNavOpen ? courses.length * 130 : 40;
            return (
                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    {this.renderCautions()}
                    <Row>
                        <Col sm={3} style={{height: `${rowHeight}px`}}>
                            <Button color="primary" onClick={() => this.toggleNav()}>КУРСЫ</Button>
                            <Collapse isOpen={this.isNavOpen}>
                                <Nav variant="pills" className="flex-column">
                                    <div className="container-fluid">
                                        {courses.map((course) => {
                                            return (
                                                <Nav.Item key={course.id}>
                                                    <div className="row" key={course.id}>
                                                        <i style={{marginLeft: '96%', width: '2%'}}
                                                           onClick={() => this.deleteCourse(course.id)}
                                                           className="fa fa-window-close fa-2x" aria-hidden="true"/>
                                                            <Nav.Link
                                                                eventKey={course.id}
                                                                className="nav-link lesson"
                                                                onClick={() => this.changeCourse(course)}>
                                                                {course.name}
                                                            </Nav.Link>
                                                    </div>
                                                </Nav.Item>
                                            );
                                        })}
                                        {<AddNewCourse courseStore={this.props.store.courseStore}/>}
                                    </div>
                                </Nav>
                            </Collapse>
                        </Col>
                        <Col sm={9}>
                            {this.renderCourse()}
                        </Col>
                    </Row>
                </Tab.Container>
            );
    }

    render() {
        let courses = this.props.store.courseStore.coursesForTeacher;
        return (
            <div style={{marginTop: "5px"}}>
                {courses !== undefined && this.renderCoursesMenu(courses)}
                {courses === undefined && renderSpinner()}
            </div>
        );
    }

    deleteCourse(courseId: number) {
        let result = window.confirm('Вы уверены, что хотите удалить этот курс?');
        if(result) {
            this.props.store.courseStore.deleteCourse(courseId)
                .then((status) => {
                    this.notDeleted = status !== 200;
            });
        }
    }

    changeCourse(course: CourseViewModel) {
        this.props.store.courseStore.setChoosenCourse(course);
        this.props.store.courseStore.getUsersByCourse(course.id);
        this.props.store.lessonStore.getLessonsByCourse(course.id);
        this.props.store.courseStore.getUsersByCourse(course.id);
        this.props.store.wordStore.getWordOfADay(new Date(), course.id);
    }
}

export default CoursesPage;