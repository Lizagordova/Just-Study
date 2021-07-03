import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Card, CardHeader, Alert } from "reactstrap";
import { Nav, Tab } from "react-bootstrap";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { LessonsMenu } from "../Lessons/LessonsMenu";
import WordsOfADay from "../WordsOfADay/WordsOfADay";
import ParticipantsPage from "../Participants/ParticipantsPage";
import CourseProgress from "../Progress/CourseProgress";

class ICourseProps {
    store: RootStore;
    update: boolean;
}

@observer
export class Course extends Component<ICourseProps> {
    lessonsActive: boolean = true;
    wordsOfADay: boolean = false;
    participants: boolean = false;
    courseProgress: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            lessonsActive: observable,
            wordsOfADay: observable,
            participants: observable,
            courseProgress: observable
        });
    }

    componentDidMount(): void {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        this.props.store.lessonStore.getLessonsByCourse(courseId);
    }

    renderCourseContent() {
            return(
                <div className="container-fluid">
                    {this.lessonsActive && <LessonsMenu store={this.props.store}/>}
                    {this.wordsOfADay && <WordsOfADay store={this.props.store} />}
                    {this.participants && <ParticipantsPage courseStore={this.props.store.courseStore} userStore={this.props.store.userStore} update={this.props.update}/>}
                    {this.courseProgress && <CourseProgress store={this.props.store} />}
                </div>
            );
    }

    renderCourseMenu() {
        return(
            <>
                <div className="row" style={{marginLeft: "2%", marginTop: "1%"}}>
                    <Nav variant="pills">
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => this.menuToggle("lessons")}
                                className="nav-link"
                                eventKey="lessons">
                                Уроки
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => this.menuToggle("wordsOfADay")}
                                className="nav-link"
                                eventKey="wordsOfADay">
                                Слова дня
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => this.menuToggle("participants")}
                                className="nav-link"
                                eventKey="participants">
                                Участники
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link
                                onClick={() => this.menuToggle("progress")}
                                className="nav-link"
                                eventKey="progress">
                                Прогресс
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </div>
                <div className="row"  style={{marginLeft: "2%", marginTop:"5px"}}>
                    {this.renderCourseContent()}
                </div>
            </>
        );
    }

    render() {
        let courseChoosen = this.props.store.courseStore.choosenCourse.id !== undefined;
        return(
            <div className="container-fluid">
                {courseChoosen && this.renderCourseMenu()}
                {!courseChoosen && <Alert style={{marginTop: "1%"}}>Выберите курс</Alert>}
            </div>
        );
    }

    menuToggle(turnOn: string) {
        this.lessonsActive = false;
        this.wordsOfADay = false;
        this.participants = false;
        this.courseProgress = false;
        if(turnOn === "lessons") {
            this.lessonsActive = true;
        } else if(turnOn === "wordsOfADay") {
            this.wordsOfADay = true;
        } else if(turnOn === "participants") {
            this.participants = true;
        } else if(turnOn === "progress") {
            this.courseProgress = true;
        }
    }
}