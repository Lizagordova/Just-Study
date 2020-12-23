import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { AddTask } from "../Tasks/AddTask";
import { AddUserToProject } from "./AddUserToProject";
import { Tasks } from "../Tasks/Tasks";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Card, CardText, CardTitle, Label } from "reactstrap";
import classnames from "classnames";
import { TaskStatus } from "../../Typings/enums/TaskStatus";
import { Col, Nav, NavItem, Row, TabContent, TabPane, NavLink, Alert } from "reactstrap";
import { action, makeObservable, observable } from "mobx";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { renderSpinner } from "../../functions/renderSpinner";
import { observer } from "mobx-react";
import Circle from "react-circle";
import { formatDate } from "../../functions/formatDate";

@observer
export class Project extends React.Component<IProjectsProps> {
    activeTab: string = "1";
    loaded: boolean;
    notDeleted: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            activeTab: observable,
            loaded: observable
        });
    }

    componentDidMount(): void {
        this.props.store.projectStore.getProjects();
        this.props.store.taskStore.getTasks(this.props.store.projectStore.choosenProject.id)
            .then(() => this.loaded = true);
    }

    renderProjectDiagram() {
        let completedPercentage = this.props.store.taskStore.completedPercentage;
        return (
            <Circle
                size="300"
                progress={completedPercentage}
                />
        );
    }

    getResponsible(responsibleId: number) {
        let responsible = this.props.store.userStore.users.filter(u => u.id === responsibleId)[0];
        if(responsible === undefined) {
            return undefined;
        } else {
            return responsible;
        }
    }

    renderResponsible(responsible: UserViewModel | undefined) {
        if(responsible === undefined) {
            return(
                <Alert>Руководитель не выбран</Alert>
            );
        } else {
            return(
                <CardText>Руководитель: <span>{responsible?.firstName} {responsible?.lastName}</span></CardText>
            )
        }
    }

    renderProjectInfo(project: ProjectViewModel) {
        let responsible = this.getResponsible(project.responsiblePerson);
        return (
            <div className="row justify-content-center" style={{marginTop: "35px"}}>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Card style={{backgroundColor: "#66A5AD", color: "#fff"}}>
                        <CardTitle style={{fontSize: "1.3em"}}>{project.name}</CardTitle>
                        {this.renderResponsible(responsible)}
                        <CardText><Label style={{width: "100%", fontSize: "1.2em"}}>Дата начала:</Label> {formatDate(project.startDate)}</CardText>
                        <CardText><Label style={{width: "100%", fontSize: "1.2em"}}>Дедлайн:</Label> {formatDate(project.deadlineDate)}</CardText>
                        <CardText><Label style={{width: "100%", fontSize: "1.2em"}}>Описание:</Label> {project.description}</CardText>
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
                                    className={classnames({ active: this.activeTab === "1"})}
                                    onClick={(e) => this.toggleTab("1")}
                                >Текущие</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="#"
                                    className={classnames({ active: this.activeTab === "2"})}
                                    onClick={(e) => this.toggleTab("2")}>Законченные</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    to="#"
                                    className={classnames({ active: this.activeTab === "3"})}
                                    onClick={(e) => this.toggleTab("3")}>Будущие</NavLink>
                            </NavItem>
                        </Nav>
                        <TabContent activeTab={this.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                    <Col sm="12">
                                        <Tasks store={this.props.store} status={TaskStatus.InProgress}/>
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
            <div className="container-fluid">
                <div className="row justify-content-center">
                    {this.notDeleted && <Alert color="danger">Что-то пошло не так и проект не удалился :(</Alert>}
                    <i className="fa fa-window-close cool-close-button" aria-hidden="true"
                       onClick={() => this.deleteProject(this.props.store.projectStore.choosenProject.id)}/>
                </div>
                {this.renderProjectInfo(this.props.store.projectStore.choosenProject)}
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-sm-6">
                        <AddTask store={this.props.store}/>
                    </div>
                    <div className="col-lg-3 col-sm-6">
                        <AddUserToProject store={this.props.store}/>
                    </div>
                </div>
                <div className="row justify-content-center">
                    {this.loaded && this.renderTasksMenu()}
                    {!this.loaded && renderSpinner()}
                </div>
            </div>
            </>
        );
    }

    @action
    toggleTab(activeTab: string): void {
        this.activeTab = activeTab;
    }

    deleteProject(projectId: number) {
        console.log("i want to delete...");
        this.props.store.projectStore.deleteProject(projectId)
            .then((status) => {
                if(status === 200) {
                    this.props.store.projectStore.getProjects();
                    this.notDeleted = false;
                } else {
                    this.notDeleted = true;
                }
            });
    }
}