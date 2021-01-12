import React from "react";
import { observer } from  "mobx-react";
import { IAdminMainProps } from "./IAdminMainProps";
import { Card, CardHeader, Nav, NavItem, Button } from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import CoursesPage from "../Courses/CoursesPage";
import DictionaryPage from "../../Common/Dictionary/DictionaryPage";

@observer
export class AdminMain extends React.Component<IAdminMainProps> {
    render() {
        return (
            <>
                <Card>
                    <CardHeader>
                        <Nav tabs className="nav">
                            <NavItem>
                                <NavLink to="/courses" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>КУРСЫ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/users" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>ПОЛЬЗОВАТЕЛИ</NavLink>
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
                    <Route exact path="/courses"
                           render={(props) => <CoursesPage store={this.props.store} />} />
                    {/*<Route exact path="/users"
                           render={(props) => <UsersPage store={this.props.store} />} />*/}
                    <Route exact path="/dictionary"
                           render={(props) => <DictionaryPage store={this.props.store} />} />
                    {/*<Route exact path="/trainings"
                           render={(props) => <TrainingsPage store={this.props.store} />} />*/}
                    <Redirect to="/courses" />
                </Switch>
            </>
        );
    }

    exit() {
        this.props.store.reset();
    }
}