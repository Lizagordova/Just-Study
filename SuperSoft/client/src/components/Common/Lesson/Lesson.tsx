import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { UserRole } from "../../../Typings/enums/UserRole";
import { Content } from "./Content";
import { ContentUpload } from "../../Admin/Lessons/ContentUpload";
import { Label } from "reactstrap";
import {observer} from "mobx-react";

class ILessonProps {
    store: RootStore;
}

@observer
export class Lesson extends Component<ILessonProps> {
    renderContentUpload() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
                <div className="row justify-content-center">
                    <div className="col-lg-12 col-sm-12">
                        <ContentUpload lessonStore={this.props.store.lessonStore} courseId={this.props.store.courseStore.choosenCourse.id}/>
                    </div>
                </div>
            );
        }
    }

    renderLessonDescription() {
        return(
            <div className="row justify-content-center">
                <div className="col-lg-12 col-sm-12">
                    <Label>{this.props.store.lessonStore.choosenLesson.description}</Label>
                </div>
            </div>
        );
    }

    render() {
        return(
            <div className="container-fluid">
                {this.renderLessonDescription()}
                <Content lessonStore={this.props.store.lessonStore} courseId={this.props.store.courseStore.choosenCourse.id} currentUser={this.props.store.userStore.currentUser}/>
                {this.renderContentUpload()}
            </div>
        );
    }
}