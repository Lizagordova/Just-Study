import React from "react";
import { IMyWorkProps } from "./IMyWorkProps";
import { Nav, NavItem, NavLink } from "reactstrap";

export class  MyWorkPage extends React.Component<IMyWorkProps> {
    render() {
        let myTasks = this.props.store.taskStore.currentUserTasks;
        return(
            <div style={{marginTop: 35}}>
                <Nav tabs>
                    <NavItem>
                        <NavLink>Текущие</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Законченные</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink>Будущие</NavLink>
                    </NavItem>
                </Nav>
            </div>
        );
    }
}