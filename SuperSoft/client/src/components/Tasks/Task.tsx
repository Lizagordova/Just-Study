import React from "react";
import { ITaskProps } from "../MyWork/ITaskProps";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { TaskViewModel } from "../../Typings/viewModels/TaskViewModel";
import {renderSpinner} from "../../functions/renderSpinner";

export class Task extends React.Component<ITaskProps> {
    task: TaskViewModel;

    componentDidMount(): void {
        this.task = this.props.task;
    }

    renderStatusDropdown() {
        return(
            <></>
        );
    }

    renderResponsible() {
        return(
            <></>
        );
    }
    
    renderTester() {
        return(
            <></>
        );
    }

    renderTaskPriority() {
        return(
            <></>
        );
    }

    renderTask(task: TaskViewModel) {
        let author = this.props.store.userStore.users.filter(u => u.id === task.id)[0];
        return(
            <>
                <ModalHeader>{task.header}</ModalHeader>
                <ModalBody>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                {task.description}
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <div className="row justify-content-center">
                                    {this.renderTaskPriority()}
                                </div>
                                <div className="row justify-content-center">
                                    {this.renderStatusDropdown()}
                                </div>
                                <div className="row justify-content-center">
                                    {this.renderResponsible()}
                                </div>
                                <div className="row justify-content-center">
                                    {this.renderTester()}
                                </div>
                                <div className="row justify-content-center">
                                    {author.firstName} {author.lastName}
                                </div>
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{backgroundColor: "#66A5AD", width: "100%"}}
                        onClick={() => this.save()}>
                        СОХРАНИТЬ
                    </Button>
                </ModalFooter>
            </>
        );
    }

    render() {
        return(
            <>
                {this.task !== undefined && this.renderTask(this.task)}
                {this.task === undefined && renderSpinner()}
            </>
        );
    }

    save() {
        let task = this.task;
        this.props.store.taskStore.addOrUpdateTask(task.header, task.description, task.startDate, task.deadlineDate, task.taskType, task.status, task.priority, 0,0,0, task.id, 0)
    }
}