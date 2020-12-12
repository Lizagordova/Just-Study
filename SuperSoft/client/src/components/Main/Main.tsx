import React from "react";
import { IMainProps } from "./IMainProps";
import { Navbar, Card, CardHeader, Nav, NavItem } from "reactstrap";
import { NavLink, Switch, Route, Redirect } from "react-router-dom";
import { MyWorkPage } from "../MyWork/MyWorkPage";
import { ProjectsPage } from "../Projects/ProjectsPage";
import { UsersPage } from "../Users/UsersPage";

export class Main extends React.Component<IMainProps> {
    render() {
        return(
            <>
                <Card>
                    <CardHeader>
                        <Nav tabs>
                                <NavItem>
                                    <NavLink to="/mywork" exact activeStyle={{color: '#ffffff', backgroundColor:'#0366d6', textDecoration: 'none'}}>МОЯ РАБОТА</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/projects" exact activeStyle={{color: '#ffffff', backgroundColor:'#0366d6', textDecoration: 'none'}}>ПРОЕКТЫ</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink to="/users" exact activeStyle={{color: '#ffffff', backgroundColor:'#0366d6', textDecoration: 'none'}}>ПОЛЬЗОВАТЕЛИ</NavLink>
                                </NavItem>
                        </Nav>
                    </CardHeader>
                </Card>
                <Switch>
                    <Route exact path="/mywork" component={MyWorkPage}/>
                    <Route exact path="/projects" component={ProjectsPage}/>
                    <Route exact path="/users" component={UsersPage}/>
                    <Redirect to="/mywork" />
                </Switch>
            </>
        )
    }
    
   
}