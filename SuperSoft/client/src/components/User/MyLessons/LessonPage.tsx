import React, { Component } from 'react';
import { Nav, Tab } from "react-bootstrap";
import { Lesson } from "../../Common/Lesson/Lesson";
import { makeObservable, observable } from "mobx";
import { Card, CardHeader } from "reactstrap";
import { observer } from "mobx-react";
import RootStore from "../../../stores/RootStore";
import Homework from "./Homework";

class ILessonPageProps {
    store: RootStore;
}

@observer
class LessonPage extends Component<ILessonPageProps> {
    lessonActive: boolean;
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
            <Tab.Container>
                <Card>
                    <CardHeader>
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link"
                                    eventKey="Lesson"
                                    onClick={() => this.toggleMenu("lesson")}>
                                    УРОК
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    className="nav-link"
                                    eventKey="Homework"
                                    onClick={() => this.toggleMenu("homework")}>
                                    ДОМАШНЯЯ РАБОТА
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </CardHeader>
                    {this.lessonActive && <Lesson store={this.props.store} />}
                    {this.homeworkActive && <Homework store={this.props.store} />}
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
        if(turnOn === "lesson") {
            this.lessonActive = true;
        } else if (turnOn === "homework") {
            this.homeworkActive = true;
        }
    }
}

export default LessonPage;