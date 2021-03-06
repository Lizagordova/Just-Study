﻿import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Alert } from "reactstrap";
import WordsOfADay from "../../Admin/WordsOfADay/WordsOfADay";
import OverallProgress from "./OverallProgress";
import Tracker from "../Tracker/Tracker";

class IHomePageProps {
    store: RootStore;
    courseChanged: boolean;
}

@observer
class HomePage extends Component<IHomePageProps> {
    renderCautions() {
        let coursesLength = this.props.store.courseStore.userCourses.length;
        return(
            <>
                {coursesLength !== 0 && <Alert color="danger">Курс не доступен. Обратитесь к администратору.</Alert>}
                {coursesLength === 0 && <Alert color="danger">Вы пока ещё не зачислены ни на один курс.</Alert>}
            </>
        );
    }

    renderHomeContent() {
        return(
            <>
                {this.renderWordsOfADay()}
                {this.renderOverallProgress()}
                {this.renderTracker()}
            </>
        );
    }

    renderWordsOfADay() {
        return(
            <WordsOfADay store={this.props.store}/>
        );
    }

    renderOverallProgress() {
        return(
            <OverallProgress courseStore={this.props.store.courseStore} currentUser={this.props.store.userStore.currentUser} progressStore={this.props.store.progressStore}  courseChanged={this.props.courseChanged}/>
        );
    }

    renderTracker() {
        let courseId = this.props.store.courseStore.choosenCourse.id;
        let userId = this.props.store.userStore.currentUser.id;
        return(
            <Tracker courseId={courseId} trackerStore={this.props.store.trackerStore} userId={userId} />
        );
    }

    render() {
        let courseAvailable = this.choosenCourseIsAvailable();
        return(
            <>
                {courseAvailable && this.renderHomeContent()}
                {!courseAvailable && this.renderCautions()}
            </>
        );
    }
    
    choosenCourseIsAvailable(): boolean {
        let courseStore = this.props.store.courseStore;
        let choosenCourseId = courseStore.choosenCourse.id;
        if(choosenCourseId === 0 || choosenCourseId === undefined) {
            return false;
        }
        let userCourse = courseStore.userCourses.filter(uc => uc.courseId === choosenCourseId)[0];
        if(userCourse.expireDate < new Date() || userCourse.startDate > new Date()) {
            return false;
        }

        return true;
    }
}

export default HomePage;