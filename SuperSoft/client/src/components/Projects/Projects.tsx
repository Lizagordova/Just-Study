import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Table } from "reactstrap";
import { UserViewModel } from "../../Typings/viewModels/UserViewModel";
import { Tab, Nav, Alert } from "react-bootstrap";
import {Project} from "./Project";

export class Projects extends React.Component<IProjectsProps> {
    getResponsible(userId: number): UserViewModel {
        return this.props.store.userStore.users.find(u => u.id === userId) as UserViewModel;
    }

    renderProjects(projects: ProjectViewModel[]) {
        return(
            <Table bordered style={{backgroundColor: "#C4DFE6", color:"003b46"}}>
                <thead>
                <tr>
                    <th>Номер</th>
                    <th>Название</th>
                    <th>Дата начала</th>
                    <th>Дедлайн</th>
                    <th>Ответственный</th>
                </tr>
                </thead>
                <tbody>
                <tr key="1">
                    <th>id</th>
                    <th>name</th>
                    <th>startDate</th>
                    <th>deadlineDate</th>
                    <th>responsible</th>
                </tr>
                {projects.map((project) => {
                    let responsible = this.getResponsible(project.id);//здесь project.responsibleId
                    return(
                        <tr key={project.id}>
                            <th>
                                <a href="" onClick={(e) => {this.props.store.projectStore.setChoosenProject(project)}}>
                                    {project.name}
                                </a>
                            </th>
                            <th>{project.startDate}</th>
                            <th>{project.deadlineDate}</th>
                            <th>{responsible.firstName + responsible.lastName}</th>
                        </tr>
                    )
                })}
                </tbody>
            </Table>
        )
    }

    renderMenu(projects: ProjectViewModel[]) {
        // @ts-ignore
        return(
            <Tab.Container>
                <div className="row justify-content-center">
                    <div className="col-3">
                        <Nav variant="pills" className="flex-column">
                            {projects.map((project) => {
                                return (
                                    <Nav.Item onClick={() => {this.props.store.projectStore.setChoosenProject(project)}}>
                                        <Nav.Link eventKey={project.id}>{project.name}</Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </div>
                    <div className="col-9">
                        <Tab.Content>
                            {projects.map((project) => {
                                return (
                                    <Tab.Pane eventKey={project.id}>
                                        <Project store={this.props.store} />
                                    </Tab.Pane>
                                );
                            })}
                        </Tab.Content>
                    </div>
                </div>
            </Tab.Container>
        );
    }

    render() {
        let projects = this.props.store.projectStore.projects;
        return(
            <>
                {projects.length === 0 && <Alert variant="primary">
                    <span>Пока нет никаких проектов</span>
                </Alert>}
                {this.renderMenu(projects)}
            </>
        )
    }
}