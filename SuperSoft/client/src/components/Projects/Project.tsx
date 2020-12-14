import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { AddTask } from "../Tasks/AddTask";
import { AddUserToProject } from "./AddUserToProject";
import { Tasks } from "../Tasks/Tasks";

export class Project extends React.Component<IProjectsProps> {
    render() {
        return(
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-lg-offset-4">
                        <AddTask store={this.props.store} />
                    </div>
                    <div className="col-lg-3 col-lg-offset-7">
                        <AddUserToProject store={this.props.store} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <Tasks store={this.props.store}/>
                </div>
            </div>
        )
    }
}