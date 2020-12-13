import React from "react";
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from "reactstrap";
import classnames from "classnames";
import {MyTasks} from "./MyTasks";
import { observer } from "mobx-react";
import {action, makeObservable, observable} from "mobx";
import {IMyWorkProps} from "./IMyWorkProps";
import {TaskStatus} from "../../Typings/enums/TaskStatus";

@observer
export class  MyWorkPage extends React.Component<IMyWorkProps> {
    activeTab: string = "1";
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
           activeTab: observable
       })
    }

    render() {
        return (
            <div style={{marginTop: 35}} className="container-fluid">
                <Row>
                    <Col sm="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.activeTab === "1"})}
                                    onClick={(e) => this.toggleTab("1")}>Текущие</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.activeTab === "2"})}
                                    onClick={(e) => this.toggleTab("2")}>Законченные</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className={classnames({ active: this.activeTab === "3"})}
                                    onClick={(e) => this.toggleTab("3")}>Будущие</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <MyTasks store={this.props.store} tasksStatus={TaskStatus.Current}/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <MyTasks store={this.props.store} tasksStatus={TaskStatus.Completed}/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <MyTasks store={this.props.store} tasksStatus={TaskStatus.Future}/>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        );
    }

    @action
    toggleTab(activeTab: string): void {
        this.activeTab = activeTab;
    }
}