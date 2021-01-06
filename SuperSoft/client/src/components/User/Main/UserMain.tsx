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
                                <NavLink to="/mywork" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>КУРСЫ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/projects" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>ПОЛЬЗОВАТЕЛИ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/users" exact className="nav-link" style={{fontSize: "1.5em"}}
                                         activeStyle={{
                                             color: '#ffffff',
                                             backgroundColor: '#003B46',
                                             textDecoration: 'none'
                                         }}>СЛОВАРЬ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/users" exact className="nav-link" style={{fontSize: "1.5em"}}
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
                </Switch>
            </>
        );
    }

    exit() {
        this.props.store.reset();
    }
}