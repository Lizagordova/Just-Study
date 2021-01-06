import React from "react";
import { observer } from  "mobx-react";
import { Card, CardHeader, Nav, NavItem, Button } from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { IUserMainProps } from "./IUserMainProps";

@observer
export class UserMain extends React.Component<IUserMainProps> {
    render() {
        return (
            <>
                <Card>
                    <CardHeader>
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
                                <NavLink to="/mylessons" exact className="nav-link" style={{fontSize: "1.5em"}}
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
                           render={(props) => <MyWorkPage store={this.props.store} />} />
                    <Route exact path="/mylessons"
                           render={(props) => <ProjectsPage store={this.props.store} />} />
                    <Route exact path="/dictionary"
                           render={(props) => <UsersPage store={this.props.store} />} />
                    <Route exact path="/trainings"
                           render={(props) => <UsersPage store={this.props.store} />} />
                    <Redirect to="/mywork" />
                </Switch>
            </>
        );
    }

    exit() {
        this.props.store.reset();
    }
}