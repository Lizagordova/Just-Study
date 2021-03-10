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
            <Tab.Container defaultActiveKey="lesson">
                <Card>
                    <CardHeader className="menuHeader">
                        <Nav variant="pills" defaultActiveKey="lesson">
                            <Nav.Item>
                                <Nav.Link
                                     className="nav-link"
                                     eventKey="lesson"
                                     onClick={() => this.toggleMenu("lesson")}>
                                    УРОК
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                     className="nav-link"
                                     eventKey="homework"
                                     onClick={() => this.toggleMenu("homework")}>
                                    ДОМАШНЯЯ РАБОТА
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                     className="nav-link"
                                     eventKey="completedHomework"
                                     onClick={() => this.toggleMenu("completedHomework")}>
                                    ВЫПОЛНЕННЫЕ ДОМАШНИЕ РАБОТЫ
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link"
                                    eventKey="progress"
                                    onClick={() => this.toggleMenu("progress")}>
                                    ПРОГРЕСС
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </CardHeader>
                    {this.lessonActive && <Lesson store={this.props.store}/>}
                    {this.homeworkActive && <HomeworkPage store={this.props.store}/>}
                    {this.completedHomeworkActive && <CompletedHomeworkPage store={this.props.store}/>}
                    {this.progressActive && <ProgressByLesson store={this.props.store} />}
                </Card>
            </Tab.Container>
        );
    }

    render() {
        return(
            <>
                {this.renderLessonMenu()}
            </>
        );
    }

    toggleMenu(turnOn: string) {
        this.lessonActive = false;
        this.homeworkActive = false;
        this.completedHomeworkActive = false;
        if(turnOn === "lesson") {
            this.lessonActive = true;
        } else if (turnOn === "homework") {
            this.homeworkActive = true;
        } else if (turnOn === "completedHomework") {
            this.completedHomeworkActive = true;
        }
    }
}