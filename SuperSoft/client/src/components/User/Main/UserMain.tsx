﻿import React from "react";
import { observer } from  "mobx-react";
import {
    Card,
    CardHeader,
    Nav,
    NavItem,
    Button,
    ButtonDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    CardFooter,
    Navbar, NavbarToggler, Collapse
} from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { IUserMainProps } from "./IUserMainProps";
import DictionaryPage from "../../Common/Dictionary/DictionaryPage";
import TrainingPage from "../../Common/Training/TrainingPage";
import HomePage from "../Home/HomePage";
import MyLessonsPage from "../MyLessons/MyLessonsPage";
import { CourseViewModel } from "../../../Typings/viewModels/CourseViewModel";
import { makeObservable, observable } from "mobx";
import Notifications from "../../Common/Notifications/Notifications";

@observer
export class UserMain extends React.Component<IUserMainProps> {
    courseMenuOpen: boolean;
    notificationsOpen: boolean;
    update: boolean;
    isOpen: boolean;

    constructor(props: IUserMainProps) {
        super(props);
        makeObservable(this, {
            courseMenuOpen: observable,
            notificationsOpen: observable,
            update: observable,
            isOpen: observable
        });
        this.getInitialStateOfApplication();
    }

    getInitialStateOfApplication() {
        let courseStore = this.props.store.courseStore;
        courseStore.getUserCourses()
            .then((status) => {
                if(status === 200) {
                    let userCoursesIds = this.props.store.courseStore.userCourses.map(c => {
                        return c.courseId
                    });
                    courseStore.getCoursesInfo(userCoursesIds);
                }
            });
        let userId = this.props.store.userStore.currentUser.id;
        this.props.store.notificationStore.getNotifications(userId);
    }

    renderNotifications() {
        return(
            <>
                {this.notificationsOpen && <Notifications toggle={this.toggleNotifications} notificationStore={this.props.store.notificationStore} userStore={this.props.store.userStore} />}
            </>
        );
    }

    render() {
        let notificationsLength = this.props.store.notificationStore.currentNotifications.length;
        return (
            <div>
                <Navbar className="nav mainMenu" expand="lg">
                    <NavbarToggler
                        onClick={() => this.toggleOpen()}>
                        <i className="fa fa-bars" style={{color: "white"}}/>
                    </NavbarToggler>
                    <Collapse isOpen={this.isOpen} navbar>
                        <Nav tabs className="mr-auto menuNav" navbar>
                            <NavItem style={{marginRight: "5px", marginLeft: "5px"}}>
                                {this.renderCoursesToggler(this.props.store.courseStore.coursesInfo)}
                            </NavItem>
                            <NavItem>
                                <NavLink to="/home" exact className="nav-link menuNavLink">Главная</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/mylessons" exact className="nav-link menuNavLink">Мои уроки</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dictionary" exact className="nav-link menuNavLink">Словарь</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/trainings" exact className="nav-link menuNavLink">Тренировки</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={"#"}
                                         exact
                                         onClick={() => this.toggleNotifications()}
                                         className={`nav-link menuNavLink ${notificationsLength > 0 ? "notificationsIcon" : ""}`} style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: 'rgb(43, 69, 148)',
                                             border: "0px",
                                             textDecoration: 'none'
                                         }}>
                                    <i className={`fa fa-bell `}>
                                        {notificationsLength}
                                    </i>
                                </NavLink>
                            </NavItem>
                            <Button
                                outline
                                className="exitButton"
                                style={{color: "white", borderColor: "rgb(43, 69, 148)", fontSize: "1.3em"}}
                                onClick={() => this.exit()}>
                                Выйти
                            </Button>
                            {this.renderNotifications()}
                        </Nav>
                    </Collapse>
                </Navbar>
                <Switch>
                    <Route exact path="/home"
                           render={(props) => <HomePage store={this.props.store} courseChanged={this.update} />} />
                    <Route exact path="/mylessons"
                           render={(props) => <MyLessonsPage store={this.props.store} />} />
                    <Route exact path="/dictionary"
                           render={(props) => <DictionaryPage store={this.props.store} />} />
                    <Route exact path="/trainings"
                           render={(props) => <TrainingPage store={this.props.store} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
        );
    }

    async exit() {
        const response = await fetch("/exit");
        if(response.status === 200) {
            this.props.store.reset();
        }
    }

    renderCoursesToggler(courses: CourseViewModel[]) {
        let choosenCourse = this.props.store.courseStore.choosenCourse;
        return(
            <ButtonDropdown isOpen={this.courseMenuOpen} toggle={() => this.toggleCourseMenuOpen()}>
                <DropdownToggle
                    caret outline 
                    className="courseToggler"
                    style={{  marginTop: "10%" }}>
                    {choosenCourse.name === undefined || choosenCourse.name === null ? "Выбрать курс" : choosenCourse.name}
                </DropdownToggle>
                <DropdownMenu>
                    {courses.map((course) => {
                        return(
                            <DropdownItem
                                onClick={(e) => this.toggleCourse(course)}
                                key={course.id.toString()}
                            >{course.name}</DropdownItem>
                        );
                    })}
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    toggleCourseMenuOpen() {
        this.courseMenuOpen = !this.courseMenuOpen;
    }

    toggleCourse(course: CourseViewModel) {
        this.toggleUpdate();
        this.props.store.courseStore.setChoosenCourse(course);
        this.props.store.lessonStore.getLessonsByCourse(course.id);
        let choosenLessonId = this.props.store.lessonStore.choosenLesson.id;
        this.props.store.taskStore.getTasksByLesson(choosenLessonId);
        this.props.store.wordStore.getWordOfADay(new Date(), course.id);
    }

    toggleNotifications = () => {
        this.notificationsOpen = !this.notificationsOpen;
    };

    toggleUpdate() {
        this.update = !this.update;
    }

    toggleOpen() {
        this.isOpen = !this.isOpen;
    }
}