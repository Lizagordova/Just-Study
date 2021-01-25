import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import { Alert } from "reactstrap";
import WordsOfADay from "../../Admin/WordsOfADay/WordsOfADay";
import OverallProgress from "./OverallProgress";

class IHomePageProps {
    store: RootStore;
}

@observer
class HomePage extends Component<IHomePageProps> {
    
    constructor() {
        // @ts-ignore
        super();
    }

    renderCautions() {
        return(
            <Alert color="danger">Курс не доступен. Обратитесь к администратору.</Alert>
        )
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
            <OverallProgress courseStore={this.props.store.courseStore} currentUser={this.props.store.userStore.currentUser}/>
        );
    }

    renderTracker() {
        return(
            <></>
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
        if(choosenCourseId === 0) {
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