import React, { Component } from 'react';
import CourseStore from "../../../stores/CourseStore";
import  { Tab, Nav } from "react-bootstrap";
import { Alert, Button, Col, Row }from "reactstrap";
import { observer } from "mobx-react";
import { observable, makeObservable, action } from "mobx";
import {CourseViewModel} from "../../../Typings/viewModels/CourseViewModel";
import {renderSpinner} from "../../../functions/renderSpinner";
import {AddNewCourse} from "./AddNewCourse";

class ICoursesPageProps {
    courseStore: CourseStore;
}

@observer
class CoursesPage extends Component<ICoursesPageProps> {
    notDeleted: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable
        });
    }

    componentDidMount(): void {
        this.props.courseStore.getCourses();
    }

    renderCoursesMenu(courses: CourseViewModel[]) {
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                {this.notDeleted && <Alert>Что-то пошло не так и курс не удалился</Alert>}
                <Row>
                    <Col sm={2}>
                        <Nav  variant="pills" className="flex-column">
                            <div className="container-fluid">
                            {courses.map((course) => {
                                return (
                                    <Nav.Item key={course.id}>
                                        <div className="row" key={course.id}>
                                            <div className="col-8">
                                                <Nav.Link
                                                      eventKey={course.id}
                                                      className="nav-link lesson"
                                                      onClick={() => this.changeCourse(course)}>
                                                    {course.name}
                                                </Nav.Link>
                                            </div>
                                            <div className="col-2 col-lg-offset-10">
                                                <i className="fa fa-window-close"
                                                   aria-hidden="true"
                                                   onClick={() => this.deleteCourse(course.id)}/>
                                            </div>
                                        </div>
                                    </Nav.Item>
                                );
                            })}
                            {<AddNewCourse courseStore={this.props.courseStore}/>}
                            </div>
                        </Nav>
                    </Col>
                    <Col sm={10}>
                        <Course />
                    </Col>
                </Row>
            </Tab.Container>
        );
    }

    render() {
        let courses = this.props.courseStore.courses;
        return (
            <>
                {courses !== undefined && this.renderCoursesMenu(courses)}
                {courses === undefined && renderSpinner()}
            </>
        );
    }

    deleteCourse(courseId: number) {
        let result = window.confirm('Вы уверены, что хотите удалить этот курс?');
        if(result) {
            this.props.courseStore.deleteCourse(courseId)
                .then((status) => {
                    this.notDeleted = status !== 200;
            });
        }
    }

    changeCourse(course: CourseViewModel) {
        this.props.courseStore.setChoosenCourse(course);
        this.props.courseStore.getUsersByCourse(course.id);
    }
}

export default CoursesPage;