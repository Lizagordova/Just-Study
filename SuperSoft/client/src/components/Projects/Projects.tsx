import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Tab, Nav, Alert } from "react-bootstrap";
import { Project } from "./Project";
import { observer } from "mobx-react";
import {renderSpinner} from "../../functions/renderSpinner";

@observer
export class Projects extends React.Component<IProjectsProps> {
    renderMenu(projects: ProjectViewModel[], choosenProject: ProjectViewModel) {
        // @ts-ignore
        return(
            <Tab.Container defaultActiveKey={`${choosenProject.id.toString()}`}>
                <div className="row justify-content-center">
                    <div className="col-3">
                        <Nav variant="pills" className="flex-column">
                            {projects.map((project) => {
                                return (
                                    <Nav.Item key={project.id} onClick={() => {this.props.store.projectStore.setChoosenProject(project)}}>
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
                                    <Tab.Pane eventKey={project.id} key={project.id}>
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
        let choosenProject =  this.props.store.projectStore.choosenProject;
        return(
            <>
                {projects.length === 0 && <Alert variant="primary">
                    <span>Пока нет никаких проектов</span>
                </Alert>}
                {choosenProject !== undefined && this.renderMenu(projects, choosenProject)}
                {choosenProject === undefined && renderSpinner()}
            </>
        )
    }
}