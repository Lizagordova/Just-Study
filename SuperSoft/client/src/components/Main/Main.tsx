import React from "react";
import { IMainProps } from "./IMainProps";
import { Navbar, Card, CardHeader, Nav, NavItem } from "reactstrap";
import { NavLink, Switch, Route } from "react-router-dom";
import { MyWork } from "../MyWork/MyWork";

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
                    <Route exact path="/mywork" component={MyWork}/>
                </Switch>
            </>
        )
    }
    
   
}