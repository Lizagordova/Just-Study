import React, { Component } from 'react';
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import Circle from "react-circle";
import CourseStore from "../../../stores/CourseStore";

class IOverallProgressProps {
    courseStore: CourseStore;
    currentUser: UserViewModel;
}

class OverallProgress extends Component<IOverallProgressProps> {
    renderProgress() {
        let completedPercentage = this.computeProgress();
        return(
            <Circle//todo: изучи побольше, может быть тут можно несколько данных отображать
                size="300"
                progress={completedPercentage}
            />
        );
    }

    render() {
        return(
            <>
                {this.renderProgress()}
            </>
        );
    }

    computeProgress(): number {
        let userId = this.props.currentUser.id;
        let courseId = this.props.courseStore.choosenCourse.id;
        let userProgress = 0;
        this.props.courseStore
            .getUserCourseProgress(userId, courseId)
            .then((progress) => {
                userProgress =  progress;
            });

        return userProgress;
    }
}

export default OverallProgress;