import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Tab, Nav } from "react-bootstrap";
import { Card, CardHeader } from "reactstrap";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { Lesson } from "../../Common/Lesson/Lesson";
import HomeworkPage from "../Homework/HomeworkPage";
import { CompletedHomeworkPage } from "../CompletedHomework/CompletedHomeworkPage";
import ProgressByLesson from "../ProgressByLesson/ProgressByLesson";

class ILessonPageProps {
    store: RootStore;
    lessonActive: boolean;
}

@observer
export class LessonPage extends Component<ILessonPageProps> {
    lessonActive: boolean;
    homeworkActive: boolean;
    completedHomeworkActive: boolean;
    progressActive: boolean;

    constructor(props: ILessonPageProps) {
        super(props);
        makeObservable(this, {
            lessonActive: observable,
            homeworkActive: observable,
            completedHomeworkActive: observable,
            progressActive: observable
        });
        this.lessonActive = this.props.lessonActive;
    }

    componentDidUpdate(prevProps: Readonly<ILessonPageProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.lessonActive !== this.props.lessonActive) {
            this.lessonActive = this.props.lessonActive;
        }
    }

    renderLessonMenu() {
        return(
            <>
              <div className="row lessonMenuHeader">
                        <Nav variant="pills" defaultActiveKey="lesson">
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link menuNavLink"
                                    eventKey="lesson"
                                    onClick={() => this.toggleMenu("lesson")}>
                                    Урок
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link menuNavLink"
                                    eventKey="homework"
                                    onClick={() => this.toggleMenu("homework")}>
                                    Домашняя работа
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link menuNavLink"
                                    eventKey="completedHomework"
                                    onClick={() => this.toggleMenu("completedHomework")}>
                                    Выполненные домашние работы
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link menuNavLink"
                                    eventKey="progress"
                                    onClick={() => this.toggleMenu("progress")}>
                                    Прогресс
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                </div>
                <div className="justify-content-center">
                    {this.lessonActive && <Lesson store={this.props.store}/>}
                    {this.homeworkActive && <HomeworkPage store={this.props.store}/>}
                    {this.completedHomeworkActive && <CompletedHomeworkPage store={this.props.store}/>}
                    {this.progressActive && <ProgressByLesson store={this.props.store} />}
                </div>
            </>
        );
    }
    
    render() {
        return(
            <div className="container-fluid lessonContent">
                {this.renderLessonMenu()}
            </div>
        );
    }

    toggleMenu(turnOn: string) {
        this.lessonActive = false;
        this.homeworkActive = false;
        this.completedHomeworkActive = false;
        this.progressActive = false;
        if(turnOn === "lesson") {
            this.lessonActive = true;
        } else if (turnOn === "homework") {
            this.homeworkActive = true;
        } else if (turnOn === "completedHomework") {
            this.completedHomeworkActive = true;
        } else if (turnOn === "progress") {
            this.progressActive = true;
        }
    }
}