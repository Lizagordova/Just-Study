import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { Nav } from "react-bootstrap";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { Lesson } from "../../Common/Lesson/Lesson";
import HomeworkPage from "../Homework/HomeworkPage";
import { CompletedHomeworkPage } from "../CompletedHomework/CompletedHomeworkPage";
import ProgressByLesson from "../ProgressByLesson/ProgressByLesson";
import {Alert} from "reactstrap";
import {LessonViewModel} from "../../../Typings/viewModels/LessonViewModel";
import {AddOrUpdateNewLesson} from "./AddOrUpdateNewLesson";

class ILessonPageProps {
    store: RootStore;
    lessonActive: boolean;
    update: any;
}

@observer
export class LessonPage extends Component<ILessonPageProps> {
    lessonActive: boolean;
    homeworkActive: boolean;
    completedHomeworkActive: boolean;
    progressActive: boolean;
    notDeleted: boolean = false;
    deleted: boolean = false;
    editLesson: boolean = false;

    constructor(props: ILessonPageProps) {
        super(props);
        makeObservable(this, {
            lessonActive: observable,
            homeworkActive: observable,
            completedHomeworkActive: observable,
            progressActive: observable,
            notDeleted: observable,
            deleted: observable,
            editLesson: observable,
        });
        this.lessonActive = this.props.lessonActive;
    }

    componentDidUpdate(prevProps: Readonly<ILessonPageProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.lessonActive !== this.props.lessonActive) {
            this.lessonActive = this.props.lessonActive;
        }
    }

    editToggle = () => {
        this.editLesson = !this.editLesson;
    };

    editLessonToggle(lesson: LessonViewModel) {
        this.editLesson = true;
    }
    
    renderCautions() {
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return (
            <>
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и урок не удалился</Alert>}
            </>
        );
    }
    
    renderControls() {
        return (
            <div className="controls">
                <i className="fa fa-edit fa-2x" style={{marginRight: "4px"}} onClick={() => this.editToggle()}/>
                <i className="fa fa-trash-o fa-2x"  onClick={() => this.deleteLesson()}/>
            </div>
        );
    }
    
    renderLessonMenu() {
        return(
            <>
                {this.renderCautions()}
                <div className="row justify-content-end">
                    {this.renderControls()}
                </div>
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
                {this.editLesson && <AddOrUpdateNewLesson store={this.props.store} edit={true} lessonToEdit={this.props.store.lessonStore.choosenLesson} cancelEdit={this.editToggle}/>}
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

    deleteLesson() {
        let result = window.confirm('Вы уверены, что хотите удалить этот урок?');
        if(result) {
            this.props.store.lessonStore.deleteLesson(this.props.store.lessonStore.choosenLesson.id, this.props.store.courseStore.choosenCourse.id)
                .then((status) => {
                    this.notDeleted = status !== 200;
                    if(status === 200) {
                        this.props.update();
                    }
                });
        }
    }
}