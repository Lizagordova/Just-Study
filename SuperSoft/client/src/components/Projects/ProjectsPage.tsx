import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import {AddProject} from "./AddProject";
import {Projects} from "./Projects";

export class  ProjectsPage extends React.Component<IProjectsProps> {
    render() {
        return(
            <div className="container-fluid">
                
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
            </div>
        );
    }
}