import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Card, CardHeader, Alert } from "reactstrap";
import { Nav, Tab } from "react-bootstrap";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { LessonsMenu } from "../Lessons/LessonsMenu";
import WordsOfADay from "../WordsOfADay/WordsOfADay";
import ParticipantsPage from "../Participants/ParticipantsPage";

class ICourseProps {
    store: RootStore;
}

@observer
export class Course extends Component<ICourseProps> {
    lessonsActive: boolean = true;
    wordsOfADay: boolean = false;
    participants: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            lessonsActive: observable,
            wordsOfADay: observable,
            participants: observable,
        });
    }

    componentDidMount(): void {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        this.props.store.lessonStore.getLessonsByCourse(courseId);
    }

    renderCourseContent() {
            return(
                <>
                    {this.lessonsActive && <LessonsMenu store={this.props.store}/>}
                    {this.wordsOfADay && <WordsOfADay store={this.props.store} />}
                    {this.participants && <ParticipantsPage courseStore={this.props.store.courseStore} userStore={this.props.store.userStore} />}
                </>
            );
    }

    renderCourseMenu() {
        return(
            <Tab.Container>
                <Card>
                    <CardHeader className="menuCourseHeader">
                        <Nav variant="pills">
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => this.menuToggle("lessons")}
                                    className="nav-link"
                                    eventKey="lessons">
                                    УРОКИ
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => this.menuToggle("wordsOfADay")}
                                    className="nav-link"
                                    eventKey="wordsOfADay">
                                    СЛОВА ДНЯ
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link
                                    onClick={() => this.menuToggle("participants")}
                                    className="nav-link"
                                    eventKey="participants">
                                    УЧАСТНИКИ
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </CardHeader>
                </Card>
                {this.renderCourseContent()}
            </Tab.Container>
        );
    }

    render() {
        let courseChoosen = this.props.store.courseStore.choosenCourse.id !== undefined;
        return(
            <>
                {courseChoosen && this.renderCourseMenu()}
                {!courseChoosen && <Alert>Выберите курс</Alert>}
            </>
        );
    }

    menuToggle(turnOn: string) {
        this.lessonsActive = false;
        this.wordsOfADay = false;
        this.participants = false;
        if(turnOn === "lessons") {
            this.lessonsActive = true;
        } else if(turnOn === "wordsOfADay") {
            this.wordsOfADay = true;
        } else if(turnOn === "participants") {
            this.participants = true;
        }
    }
}