import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { AddProject } from "./AddProject";
import { Projects } from "./Projects";
import { makeObservable } from "mobx";
import { observer } from "mobx-react";

@observer
export class  ProjectsPage extends React.Component<IProjectsProps> {
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
        });
    }

    render() {
        return(
            <div className="container-fluid" style={{marginTop: "30px"}}>
                <div className="row justify-content-center">
                    <AddProject store={this.props.store} />
                </div>
                <div className="row justify-content-center" style={{marginTop: "20px"}}>
                    <div className="col-lg-12 col-sm-12">
                        <Projects store={this.props.store} />
                    </div>
                </div>
            </div>
        );
    }
}