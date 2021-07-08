import React, { Component } from 'react';
import { Nav, Tab } from "react-bootstrap";
import { Lesson } from "../../Common/Lesson/Lesson";
import { makeObservable, observable } from "mobx";
import { Card, CardHeader } from "reactstrap";
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import Homework from "./Homework";
import HomeworkPage from "../../Admin/Homework/HomeworkPage";
import {CompletedHomeworkPage} from "../../Admin/CompletedHomework/CompletedHomeworkPage";
import ProgressByLesson from "../../Admin/ProgressByLesson/ProgressByLesson";

class ILessonPageProps {
    store: RootStore;
}

@observer
class LessonPage extends Component<ILessonPageProps> {
    lessonActive: boolean = true;
    homeworkActive: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            lessonActive: observable,
            homeworkActive: observable
        });
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
                    </Nav>
                </div>
                <div className="justify-content-center">
                    {this.lessonActive && <Lesson store={this.props.store} />}
                    {this.homeworkActive && <Homework store={this.props.store} />}
                </div>
            </>
            
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
        if(turnOn === "lesson") {
            this.lessonActive = true;
        } else if (turnOn === "homework") {
            this.homeworkActive = true;
        }
    }
}

export default LessonPage;