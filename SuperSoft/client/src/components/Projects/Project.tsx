import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { AddTask } from "../Tasks/AddTask";
import { AddUserToProject } from "./AddUserToProject";
import { Tasks } from "../Tasks/Tasks";
import { ProjectViewModel } from "../../Typings/viewModels/ProjectViewModel";
import { Card, CardText, CardTitle } from "reactstrap";

export class Project extends React.Component<IProjectsProps> {
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
                    <Tasks store={this.props.store}/>
                </div>
            </div>
            </>
        );
    }
}