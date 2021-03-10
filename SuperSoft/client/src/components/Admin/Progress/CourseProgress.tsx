import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Accordion } from "react-bootstrap";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import LessonProgress from "./LessonProgress";

class ICourseProgress {
    store: RootStore;
}

@observer
class CourseProgress extends Component<ICourseProgress> {
    progress: number = 0;
    
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            progress: observable
        });
    }

    renderLessons(lessons: LessonViewModel[]) {
        return (
            <>
                {lessons.map((lesson, i) => {
                    return (
                       <LessonProgress store={this.props.store} lesson={lesson} key={i} />
                    );
                })}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderLessons(this.props.store.lessonStore.lessonsByChoosenCourse)}
            </>
        );
    }
}

export default CourseProgress;