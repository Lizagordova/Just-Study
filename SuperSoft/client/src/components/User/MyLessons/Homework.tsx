import React, {Component} from 'react';
import RootStore from "../../../stores/RootStore";
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";
import {Nav, Tab} from "react-bootstrap";
import {observer} from "mobx-react";
import {makeObservable, observable } from "mobx";
import {Alert} from "reactstrap";
import HomeworkTask from "./HomeworkTask";
import {NavigationType} from "../../../NavigationType";

class IHomeworkProps {
    store: RootStore;
}

@observer
class Homework extends Component<IHomeworkProps> {
    taskToRender: TaskViewModel = new TaskViewModel();
    tasksByChoosenLessonChanged: boolean;

    constructor(props: IHomeworkProps) {
        super(props);
        makeObservable(this, {
            taskToRender: observable,
            tasksByChoosenLessonChanged: observable
        });
        this.setTaskToRender();
    }
    
    setTaskToRender() {
        let tasksByChoosenLesson = this.props.store.taskStore.tasksByChoosenLesson;
        this.taskToRender =  tasksByChoosenLesson !== undefined && tasksByChoosenLesson !== null && tasksByChoosenLesson.length > 0
            ? tasksByChoosenLesson[0] : new TaskViewModel();
        this.props.store.taskStore.setTasksByChoosenLessonChanged(false);
    }
    
    renderTasks(tasks: TaskViewModel[]) {
        return(
            <>
                <div className="row taskNav">
                    <Nav variant="pills" defaultActiveKey="lesson">
                        {tasks.map((task, i) => {
                            return (
                                <Nav.Item key={i}>
                                    <Nav.Link
                                        active={task === this.taskToRender}
                                        className="nav-link"
                                        eventKey={i}
                                        onClick={() => this.taskToRender = task}
                                    >{ i + 1 }</Nav.Link>
                                </Nav.Item>
                            );
                        })}
                    </Nav>
                </div>
                <div className="row justify-content-center">
                    <div className="col-12">
                        {<HomeworkTask task={this.taskToRender} store={this.props.store} userId={this.props.store.userStore.currentUser.id} taskToggler={this.taskToggler}/>}
                    </div>
                </div>
            </>
        );
    }
    
    render() {
        let tasks = this.props.store.taskStore.tasksByChoosenLesson;
        let tasksByChoosenLessonChanged = this.props.store.taskStore.tasksByChoosenLessonChanged;
        if(tasksByChoosenLessonChanged) {
            this.setTaskToRender();
        }
        return(
            <>
                {tasks.length === 0 && <Alert color="primary">
                    Домашнего задания пока нет. Можно отдыхать:)
                </Alert>}
                {tasks.length !== 0 && this.renderTasks(tasks)}
            </>
        );
    }

    taskToggler = (navigation: NavigationType) => {
        let tasks = this.props.store.taskStore.tasksByChoosenLesson;
        let index = tasks.indexOf(this.taskToRender);
        if(navigation === NavigationType.Forward) {
            if(index + 1 < tasks.length) {
                this.taskToRender = tasks[index + 1];
            } else {
                this.taskToRender = tasks[0];
            }
        } else if(navigation === NavigationType.Back) {
            if(index - 1 >= 0) {
                this.taskToRender = tasks[index - 1];
            } else {
                this.taskToRender = tasks[tasks.length - 1];
            }
        }
    };
}

export default Homework;