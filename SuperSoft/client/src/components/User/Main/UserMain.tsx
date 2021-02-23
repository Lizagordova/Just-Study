import React from "react";
import { observer } from  "mobx-react";
import { Card, CardHeader, Nav, NavItem, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
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

    constructor(props: IUserMainProps) {
        super(props);
        makeObservable(this, {
            courseMenuOpen: observable,
            notificationsOpen: observable,
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
                {this.notificationsOpen && <Notifications toggle={this.toggleNotifications()} notificationStore={this.props.store.notificationStore} userStore={this.props.store.userStore} />}
            </>
        );
    }

    render() {
        return (
            <>
                <Card>
                    <CardHeader className="mainMenuHeader">
                        <Nav tabs className="nav">
                            <NavItem>
                                {this.renderCoursesToggler(this.props.store.courseStore.coursesInfo)}
                            </NavItem>
                            <NavItem>
                                <NavLink to="/home" exact className="nav-link" style={{fontSize: "1.5em"}}
                                     activeStyle={{
                                         color: '#ffffff',
                                         backgroundColor: '#4169E1',
                                         textDecoration: 'none'
                                     }}>ГЛАВНАЯ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/mylessons" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#4169E1',
                                             textDecoration: 'none'
                                         }}>МОИ УРОКИ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dictionary" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                            color: '#ffffff',
                                             backgroundColor: '#4169E1',
                                             textDecoration: 'none'
                                         }}>СЛОВАРЬ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/trainings" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#4169E1',
                                             textDecoration: 'none'
                                         }}>ТРЕНИРОВКИ</NavLink>
                            </NavItem>
                            <NavItem>
                                <i className="icon-notification" onClick={() => this.toggleNotifications()} />
                            </NavItem>
                            <Button
                                outline color="primary"
                                onClick={() => this.exit()}>
                                ВЫЙТИ
                            </Button>
                        </Nav>
                    </CardHeader>
                    {this.renderNotifications()}
                </Card>
                <Switch>
                    <Route exact path="/home"
                           render={(props) => <HomePage store={this.props.store} />} />
                    <Route exact path="/mylessons"
                           render={(props) => <MyLessonsPage store={this.props.store} />} />
                    <Route exact path="/dictionary"
                           render={(props) => <DictionaryPage store={this.props.store} />} />
                    <Route exact path="/trainings"
                           render={(props) => <TrainingPage store={this.props.store} />} />
                    <Redirect to="/home" />
                </Switch>
            </>
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
                <DropdownToggle caret outline color="primary">
                    {choosenCourse.name}
                </DropdownToggle>
                <DropdownMenu>
                    {courses.map((course) => {
                        return(
                            <DropdownItem
                                onClick={(e) => this.toggleCourse(course)}
                                id={course.id.toString()}
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
        this.props.store.courseStore.setChoosenCourse(course);
        this.props.store.lessonStore.getLessonsByCourse(course.id);
        let choosenLessonId = this.props.store.lessonStore.choosenLesson.id;
        this.props.store.taskStore.getTasksByLesson(choosenLessonId);
    }

    toggleNotifications() {
        this.notificationsOpen = !this.notificationsOpen;
    }
}