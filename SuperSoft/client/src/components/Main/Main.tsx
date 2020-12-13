﻿import React from "react";
import { IMainProps } from "./IMainProps";
import { Card, CardHeader, Nav, NavItem } from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { MyWorkPage } from "../MyWork/MyWorkPage";
import { ProjectsPage } from "../Projects/ProjectsPage";
import { UsersPage } from "../Users/UsersPage";
import { observer } from  "mobx-react";

@observer
export class Main extends React.Component<IMainProps> {
    render() {
        return(
            <>
                <Card>
                    <CardHeader>
                        <Nav tabs className="nav">
                              <NavItem>
                                  <NavLink to="/mywork" exact className="nav-link" activeStyle={{color: '#ffffff', backgroundColor:'#66A5AD', textDecoration: 'none'}}>МОЯ РАБОТА</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink to="/projects" exact className="nav-link" activeStyle={{color: '#ffffff', backgroundColor:'#66A5AD', textDecoration: 'none'}}>ПРОЕКТЫ</NavLink>
                              </NavItem>
                              <NavItem>
                                  <NavLink to="/users" exact className="nav-link" activeStyle={{color: '#ffffff', backgroundColor:'#66A5AD', textDecoration: 'none'}}>ПОЛЬЗОВАТЕЛИ</NavLink>
                              </NavItem>
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
}