import React, { Component } from 'react';
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import Circle from "react-circle";
import CourseStore from "../../../stores/CourseStore";
import {observer} from "mobx-react";
import {makeObservable, observable} from "mobx";

class IOverallProgressProps {
    courseStore: CourseStore;
    currentUser: UserViewModel;
}

@observer
class OverallProgress extends Component<IOverallProgressProps> {
    progress: number = 0;

    constructor(props: IOverallProgressProps) {
        super(props);
        makeObservable(this, {
            progress: observable
        });
        this.computeProgress();
    }

    renderProgress() {
        return(
            <Circle//todo: изучи побольше, может быть тут можно несколько данных отображать
                size="300"
                progress={this.progress}
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

    computeProgress() {
        let userId = this.props.currentUser.id;
        let courseId = this.props.courseStore.choosenCourse.id;
        this.props.courseStore
            .getUserCourseProgress(userId, courseId)
            .then((progress) => {
                this.progress =  progress;
            });
    }
}

export default OverallProgress;