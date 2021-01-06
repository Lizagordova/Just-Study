import React, { Component } from "react";
import CourseStore from "../../../stores/CourseStore";
import { Button } from "reactstrap";
import {action, makeObservable, observable} from "mobx";

class IAddNewCourseProps {
    courseStore: CourseStore;
}

export class AddNewCourse extends Component<IAddNewCourseProps> {
    addNewCourse: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addNewCourse: observable
        });
    }

    renderButton() {
        return(
            <>
                <Button outline color="primary" onClick={() => this.addNewCourseToggle()}>
                    Добавить курс
                </Button>
            </>
        )
    }

    render() {
        return(
            <>
                {!this.addNewCourse && this.renderButton()}
            </>
        );
    }

    @action
    addNewCourseToggle() {
        this.addNewCourse = !this.addNewCourse;
    }
}