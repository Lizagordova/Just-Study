import React, { Component } from 'react';
import  { Tab, Nav } from "react-bootstrap";
import {
    Alert,
    Button,
    Col,
    Row,
    Collapse,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
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
    isNavOpen: boolean = false;
    updateParticipants: boolean = true;
    update: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable,
            isNavOpen: observable,
            updateParticipants: observable,
            update: observable,
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
                <Course store={this.props.store} update={this.updateParticipants}/>
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
    
    renderCoursesMenu(courses: CourseViewModel[], update: boolean) {
        return (
            <>
                <div className="row justify-content-start" style={{marginTop: "1%"}}>
                    <div style={{marginLeft: "5%"}}>
                        {this.renderCoursesToggler(courses)}
                    </div>
                   <div style={{marginLeft: "1%"}}>
                       {<AddNewCourse courseStore={this.props.store.courseStore}/>}
                   </div>
                    <div style={{marginLeft: "70%"}}>
                        {this.renderControls()}
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.renderCourse()}
                </div>
            </>
        )
    }
    renderCoursesToggler(courses: CourseViewModel[]) {
        let choosenCourse = this.props.store.courseStore.choosenCourse;
        return(
            <ButtonDropdown isOpen={this.isNavOpen} toggle={() => this.toggleNav()}>
                <DropdownToggle caret outline color="primary" className="courseToggler">
                    {choosenCourse.name === "" || choosenCourse.name === undefined ? "Курс" : choosenCourse.name}
                </DropdownToggle>
                <DropdownMenu>
                    {courses.map((course) => {
                        return(
                            <DropdownItem
                                onClick={(e) => this.changeCourse(course)}
                                key={course.id.toString()}
                            >{course.name}</DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    renderControls() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        if (courseId !== undefined && courseId !== null) {
            return (
                <div className="controls">
                    <i className="fa fa-trash-o fa-3x" style={{marginRight: "4px"}} onClick={() => this.deleteCourse()} />
                </div>
            );
        }
    }
    
    render() {
        let courses = this.props.store.courseStore.coursesForTeacher;
        return (
            <div style={{marginTop: "5px"}}>
                {courses !== undefined && this.renderCoursesMenu(courses, this.update)}
                {courses === undefined && renderSpinner()}
            </div>
        );
    }

    deleteCourse() {
        let result = window.confirm('Вы уверены, что хотите удалить этот курс?');
        if(result) {
            this.props.store.courseStore.deleteCourse(this.props.store.courseStore.choosenCourse.id)
                .then((status) => {
                    this.notDeleted = status !== 200;
                    if(status === 200) {
                        this.udpateToggle();
                    }
                    this.changeCourse(new CourseViewModel());
            });
        }
    }

    changeCourse(course: CourseViewModel) {
        this.props.store.courseStore.setChoosenCourse(course);
        this.props.store.courseStore.getUsersByCourse(course.id)
            .then(() => {
                this.updateParticipants = !this.updateParticipants;
            });
        this.props.store.lessonStore.getLessonsByCourse(course.id);
        this.props.store.courseStore.getUsersByCourse(course.id);
        this.props.store.wordStore.getWordOfADay(new Date(), course.id);
    }

    udpateToggle = () => {
        this.update = !this.update;
    }
}

export default CoursesPage;