import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Tab, Nav, Alert } from "react-bootstrap";
import { Project } from "./Project";
import { observer } from "mobx-react";
import { renderSpinner } from "../../functions/renderSpinner";

@observer
export class Projects extends React.Component<IProjectsProps> {
    renderMenu(projects: ProjectViewModel[], choosenProject: ProjectViewModel) {
        // @ts-ignore
        return(
            <Tab.Container defaultActiveKey={`${choosenProject.id === undefined ? 0 : choosenProject.id.toString()}`}>
                <div className="row justify-content-center">
                    <div className="col-4">
                        <Nav variant="pills" className="flex-column" activeKey={`${choosenProject.id === undefined ? 0 : choosenProject.id.toString()}`}>
                            <div className="container">
                                {projects.map((project) => {
                                    return (
                                        <div className="row">
                                            <Nav.Item key={project.id}
                                                 style={{width: "100%"}}
                                                 onClick={() => {this.changeData(project)}}>
                                                <Nav.Link eventKey={project.id}>{project.name}</Nav.Link>
                                            </Nav.Item>
                                        </div>
                                    );
                                })}
                            </div>
                        </Nav>
                    </div>
                    <div className="col-8">
                        <Tab.Content>
                            {projects.map((project) => {
                                return (
                                    <Tab.Pane eventKey={project.id}
                                         key={project.id}>
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

    changeData(project: ProjectViewModel) {
        this.props.store.projectStore.setChoosenProject(project);
        this.props.store.projectStore.getProjectUsers(project.id);
        this.props.store.taskStore.getTasks(project.id)
    }
}