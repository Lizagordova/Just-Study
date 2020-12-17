import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { AddTask } from "../Tasks/AddTask";
import { AddUserToProject } from "./AddUserToProject";
import { Tasks } from "../Tasks/Tasks";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Card, CardText, CardTitle } from "reactstrap";
import classnames from "classnames";
import { MyTasks } from "../MyWork/MyTasks";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { Col, Nav, NavItem, Row, TabContent, TabPane, NavLink } from "reactstrap";
import {action, makeObservable, observable} from "mobx";

export class Project extends React.Component<IProjectsProps> {
    activeTab: string = "1";
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            activeTab: observable
        });
    }

    renderProjectDiagram() {
        return (
            <>Диаграмма. Неважно, что ты не видишь её. Она тебя видит</>
        );
    }

    renderProjectInfo(project: ProjectViewModel) {
        let responsible = this.props.store.userStore.users.filter(u => u.id === project.responsiblePerson)[0];
        return (
            <div className="row justify-content-center">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Card>
                        <CardTitle><strong>{project.name}</strong></CardTitle>
                        <CardText>Руководитель: {responsible.firstName} {responsible.lastName}</CardText>
                        <CardText>Дата начала: {project.startDate}</CardText>
                        <CardText>Дедлайн: {project.deadlineDate}</CardText>
                        <CardText>Описание: {project.description}</CardText>
                    </Card>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    {this.renderProjectDiagram()}
                </div>
            </div>
        );
    }

    renderTasksMenu() {
        return(
            <div style={{marginTop: 35}} className="container-fluid">
                <Row>
                    <Col sm="12">
                        <Nav tabs>
                            <NavItem>
                                <NavLink
                                    to="#"
                                    activeStyle={{backgroundColor: "#66A5AD", color: "#FFFFFF"}}
                                    className={classnames({ active: this.activeTab === "1"})}
                                    onClick={(e) => this.toggleTab("1")}
                                >Текущие</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="#"
                                    activeStyle={{backgroundColor: "#66A5AD", color: "#FFFFFF"}}
                                    className={classnames({ active: this.activeTab === "2"})}
                                    onClick={(e) => this.toggleTab("2")}>Законченные</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="#"
                                    activeStyle={{backgroundColor: "#66A5AD", color: "#FFFFFF"}}
                                    className={classnames({ active: this.activeTab === "3"})}
                                    onClick={(e) => this.toggleTab("3")}>Будущие</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Tasks store={this.props.store} status={TaskStatus.Current}/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                    <Col sm="12">
                                        <Tasks store={this.props.store} status={TaskStatus.Completed}/>
                                    </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                    <Col sm="12">
                                        <Tasks store={this.props.store} status={TaskStatus.Future}/>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                    </Col>
                </Row>
            </div>
        )
    }

    render() {
        return (
            <>
            <div className="container">
                {this.renderProjectInfo(this.props.store.projectStore.choosenProject)}
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-lg-offset-4">
                        <AddTask store={this.props.store}/>
                    </div>
                    <div className="col-lg-3 col-lg-offset-7">
                        <AddUserToProject store={this.props.store}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.renderTasksMenu()}
                </div>
            </div>
            </>
        );
    }

    @action
    toggleTab(activeTab: string): void {
        this.activeTab = activeTab;
    }
}