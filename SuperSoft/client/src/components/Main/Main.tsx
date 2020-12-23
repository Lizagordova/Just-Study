import React from "react";
import { IMainProps } from "./IMainProps";
import { Card, CardHeader, Nav, NavItem, Button } from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { MyWorkPage } from "../MyWork/MyWorkPage";
import { ProjectsPage } from "../Projects/ProjectsPage";
import { UsersPage } from "../Users/UsersPage";
import { observer } from  "mobx-react";
import 'react-calendar/dist/Calendar.css'

@observer
export class Main extends React.Component<IMainProps> {
    render() {
        return(
            <>
                <Card>
                    <CardHeader>
                        <Nav tabs className="nav">
                              <NavItem>
                                  <NavLink to="/mywork" exact className="nav-link" style={{fontSize: "1.5em"}} activeStyle={{color: '#ffffff', backgroundColor:'#003B46', textDecoration: 'none'}}>МОЯ РАБОТА</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink to="/projects" exact className="nav-link" style={{fontSize: "1.5em"}} activeStyle={{color: '#ffffff', backgroundColor:'#003B46', textDecoration: 'none'}}>ПРОЕКТЫ</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink to="/users" exact className="nav-link" style={{fontSize: "1.5em"}} activeStyle={{color: '#ffffff', backgroundColor:'#003B46', textDecoration: 'none'}}>ПОЛЬЗОВАТЕЛИ</NavLink>
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
                    <Route exact path="/mywork" 
                         render={(props) => <MyWorkPage store={this.props.store} />} />
                    <Route exact path="/projects"
                         render={(props) => <ProjectsPage store={this.props.store} />} />
                    <Route exact path="/users"
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