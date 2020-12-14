import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { AddProject } from "./AddProject";
import { Projects } from "./Projects";
import { Project } from "./Project";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";

@observer
export class  ProjectsPage extends React.Component<IProjectsProps> {
    choosenProjectOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            choosenProjectOpen: observable
        });
    }

    renderChoosenProject() {
        return(
            <Project store={this.props.store} />
        )
    }

    renderProjects() {
        return(
            <>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <AddProject store={this.props.store} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        <Projects store={this.props.store} />
                    </div>
                </div>
            </>
        )
    }

    render() {
        return(
            <div className="container-fluid">
                {!this.choosenProjectOpen && this.renderProjects()}
                {this.choosenProjectOpen && this.renderChoosenProject()}
            </div>
        );
    }
}