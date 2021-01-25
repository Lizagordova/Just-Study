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

@observer
export class UserMain extends React.Component<IUserMainProps> {
    courseMenuOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            courseMenuOpen: observable
        });
    }

    componentDidMount(): void {
        let courseStore = this.props.store.courseStore;
        courseStore.getUserCourses()
            .then((status) => {
                if(status === 200) {
                    let userCoursesIds = this.props.store.courseStore.userCourses.map(c => c.courseId);
                    courseStore.getCoursesInfo(userCoursesIds);
                }
            });
    }

    render() {
        return (
            <>
                <Card>
                    <CardHeader>
                        {this.renderCoursesToggler(this.props.store.courseStore.coursesInfo)}
                        <Nav tabs className="nav">
                            <NavItem>
                                <NavLink to="/home" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>ГЛАВНАЯ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/home" exact className="nav-link" style={{fontSize: "1.5em"}}
                                     activeStyle={{
                                         color: '#ffffff',
                                         backgroundColor: '#003B46',
                                         textDecoration: 'none'
                                     }}>ГЛАВНАЯ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/mycourses" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>МОИ УРОКИ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dictionary" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                            color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>СЛОВАРЬ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/trainings" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>ТРЕНИРОВКИ</NavLink>
                            </NavItem>
                            <Button
                                outline color="primary"
                                onClick={() => this.exit()}>
                                ВЫЙТИ
                            </Button>
                        </Nav>
                    </CardHeader>
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
                    <Redirect to="/mywork" />
                </Switch>
            </>
        );
    }

    exit() {
        this.props.store.reset();
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
    }
}