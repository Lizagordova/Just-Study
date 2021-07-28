import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { Tab, Nav } from "react-bootstrap";
import { Alert, Button, NavItem, Collapse, Row } from "reactstrap";
import { NavLink } from "react-router-dom";
import { renderSpinner } from "../../../functions/renderSpinner";
import { AddOrUpdateNewLesson } from "./AddOrUpdateNewLesson";
import { LessonPage } from "./LessonPage";

class ILessonsMenuProps {
    store: RootStore;
}

@observer
export class LessonsMenu extends Component<ILessonsMenuProps> {
    notDeleted: boolean = false;
    deleted: boolean = false;
    isNavOpen: boolean = true;
    loading: boolean = true;
    update: boolean = false;
    selectedElementId: number;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable,
            deleted: observable,
            isNavOpen: observable,
            loading: observable,
            update: observable,
            selectedElementId: observable
        });
    }

    toggleNav() {
        this.isNavOpen = !this.isNavOpen;
    }

    lessonToggle(lesson: LessonViewModel) {
        this.props.store.lessonStore.setChoosenLesson(lesson);
        this.props.store.taskStore.getTasksByLesson(lesson.id);
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

    renderLessonsList(lessons: LessonViewModel[]) {
        let defaultActiveKey = lessons[0] !== undefined ? lessons[0].id : 0;
        return (
           <>
               {lessons.map((lesson) => {
                   // @ts-ignore
                   let isDisabled = new Date() < Date.parse(lesson.expireDate)  && new Date() > Date.parse(lesson.startDate);
                   // @ts-ignore
                   return (
                       <Nav.Item key={lesson.id}
                                
                                 className="lessonDraggable"
                                 draggable="true"
                                 // @ts-ignore
                                 onDragOver={(event) => this.allowDrop(event)}
                                 // @ts-ignore
                                 onDragStart={(event) => console.log("dragging started with id", event.target.id)}
                                 // @ts-ignore
                                onDragEnd={(event) => this.onDragEnd(event.target.id)}>
                           <div className="row" key={lesson.id} style={{height: "auto"}}>
                               <Nav.Link
                                   // @ts-ignore
                                   id={lesson.id}
                                   style={{height: "auto"}}
                                   eventKey={lesson.id}
                                   className="nav-link lesson"
                                   onClick={() => this.lessonToggle(lesson)}>
                                   {lesson.name}
                               </Nav.Link>
                           </div>
                       </Nav.Item>
                   );
               })}
           </>
        );
    }

    renderLessonsMenu(lessons: LessonViewModel[], update: boolean) {
        let defaultActiveKey = lessons[0] !== undefined ? lessons[0].id : 0;
        return(
            <>
                {this.renderCautions()}
                <div className="row" style={{marginRight: "1px", marginLeft: "1px"}}>
                    <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12" style={{marginTop: "10px"}}>
                        <Button
                            onClick={() => this.toggleNav()} 
                            style={{marginBottom: "3px", width: "100%", backgroundColor: "rgb(65, 105, 225)"}}>
                            Уроки</Button>
                        <Collapse isOpen={this.isNavOpen}>
                            <Nav variant="pills" className="flex-column" defaultActiveKey={defaultActiveKey} style={{}}>
                                <div className="container-fluid">
                                    {lessons.length > 0 && this.renderLessonsList(lessons)}
                                    <AddOrUpdateNewLesson store={this.props.store} edit={false} lessonToEdit={undefined} cancelEdit={undefined}/>
                                </div>
                            </Nav>
                        </Collapse>
                    </div>
                    <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                        {this.renderLessonPage()}
                    </div>
                </div>
            </>
        );
    }
    
    renderLessonPage() {
        let lessonChoosen = this.props.store.lessonStore.choosenLesson;
        let lessonExists = lessonChoosen !== undefined && lessonChoosen.id !== undefined; 
        return(
            <>
                {lessonExists && <LessonPage store={this.props.store} lessonActive={true} update={this.updateToggle}/>}
                {!lessonExists && <Alert color="success">Выберите или добавьте урок:)</Alert>}
            </>
        );
    }

    render() {
        let lessons = this.props.store.lessonStore.lessonsByChoosenCourse;
        return(
            <>
                {lessons !== undefined && this.renderLessonsMenu(lessons, this.update)}
                {(lessons === undefined) && renderSpinner()}
            </>
        );
    }
    
    updateToggle = () => {
        this.update = !this.update;
    }

    allowDrop(event: any) {
        event.preventDefault();
        this.selectedElementId = event.target.id;
    }

    onDragEnd(draggableLessonId: number) {
        let lessons = this.props.store.lessonStore.lessonsByChoosenCourse;
        let draggableLesson = lessons.find(lesson => lesson.id == draggableLessonId);
        let draggableLessonIndex = lessons.findIndex(lesson => lesson.id == draggableLessonId);
        let dropToLesson = lessons.find(lesson => lesson.id == this.selectedElementId);
        let dropToLessonIndex = lessons.findIndex(lesson => lesson.id == this.selectedElementId);
        // @ts-ignore
        lessons[draggableLessonIndex] = dropToLesson;
        // @ts-ignore
        lessons[dropToLessonIndex] = draggableLesson;
        this.props.store.lessonStore.setLessonsByChoosenCourse(lessons, this.props.store.courseStore.choosenCourse.id);
        this.updateToggle();
    }
}