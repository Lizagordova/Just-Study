import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Table } from "reactstrap";
import {UserViewModel} from "../../Typings/viewModels/UserViewModel";

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
                            <th>{project.name}</th>
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

    render() {
        let projects = this.props.store.projectStore.projects;
        return(
            <>
                {this.renderProjects(projects)}
            </>
        )
    }
}