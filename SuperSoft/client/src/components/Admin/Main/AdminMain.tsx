import React from "react";
import { observer } from  "mobx-react";
import { IAdminMainProps } from "./IAdminMainProps";
import { Nav, NavItem, Button, Navbar, Collapse, NavbarToggler } from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import CoursesPage from "../Courses/CoursesPage";
import DictionaryPage from "../../Common/Dictionary/DictionaryPage";
import TrainingPage from "../../Common/Training/TrainingPage";
import UsersPage from "../Users/UsersPage";
import FeedbackPage from "../Feedback/FeedbackPage";
import { makeObservable, observable } from "mobx";


@observer
export class AdminMain extends React.Component<IAdminMainProps> {
    coursesChoosen: boolean = true;
    isOpen: boolean;
    
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            coursesChoosen: observable,
            isOpen: observable,
        });
    }
    
    render() {
        return (
            <div>
                <Navbar className="nav mainMenu" expand="lg">
                    <NavbarToggler
                        onClick={() => this.toggle()}>
                        <i className="fa fa-bars" style={{color: "white"}}/>
                    </NavbarToggler>
                    <Collapse isOpen={this.isOpen} navbar>
                        <Nav className="mr-auto menuNav" navbar tabs>
                            <NavItem>
                                <NavLink to="/courses" exact className="nav-link menuNavLink"
                                         style={{fontSize: "1.5em"}}>
                                    Курсы
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/users" exact className="nav-link menuNavLink"
                                >
                                    Пользователи
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dictionary" exact className="nav-link menuNavLink">
                                    Словарь
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/trainings" exact className="nav-link menuNavLink">
                                    Тренировки</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/feedbacks" exact className="nav-link menuNavLink">
                                    Обратная связь</NavLink>
                            </NavItem>
                            <Button
                                outline
                                className="exitButton"
                                style={{color: "white", borderColor: "white", fontSize: "1.3em"}}
                                onClick={() => this.exit()}>
                                Выйти
                            </Button>
                        </Nav>
                    </Collapse>
                </Navbar>           
                <Switch>
                    <Route exact path="/courses"
                           render={(props) => <CoursesPage store={this.props.store} />} />
                    {<Route exact path="/users"
                            render={(props) => <UsersPage store={this.props.store} />} />}
                    <Route exact path="/dictionary"
                           render={(props) => <DictionaryPage store={this.props.store} />} />
                    {<Route exact path="/trainings"
                            render={(props) => <TrainingPage store={this.props.store} />} />}
                    {<Route exact path="/feedbacks"
                            render={(props) => <FeedbackPage feedbackStore={this.props.store.feedbackStore}/>} />}
                    <Redirect to="/courses" />
                </Switch>
            </div>
        );
    }

    exit() {
        this.props.store.reset();
    }
    
    toggle() {
        this.isOpen = !this.isOpen;
    }
}