import React from "react";
import { IProjectsProps } from "./IProjectsProps";
import { observer } from "mobx-react";
import {makeObservable, observable} from "mobx";
import { Button, Modal, ModalHeader } from "reactstrap";

@observer
export class AddProject extends React.Component<IProjectsProps> {
    addProjectWindowOpen: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addProjectWindowOpen: observable
        })
    }
    
    toggleAddProjectWindow() {
        this.addProjectWindowOpen = !this.addProjectWindowOpen;
    }

    renderAddProjectWindow() {
        return(
            <Modal isOpen={this.addProjectWindowOpen} toggle={this.toggleAddProjectWindow}>
                <ModalHeader>
                    
                </ModalHeader>
            </Modal>
        )
    }

    renderButton() {
        return(
            <div className="row justify-content-center">
                <div className="col-lg-2 col-lg-offset-10 col-md-4 col-md-offset-8 col-sm-6 col-sm-offet-3 col-xs-12">
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={this.toggleAddProjectWindow}>Создать проект</Button>
                </div>
            </div>
        )
    }

    render() {
        return(
            <>
                {this.addProjectWindowOpen && this.renderAddProjectWindow()}
                {!this.addProjectWindowOpen && this.renderButton()}
            </>
        )
    }
}