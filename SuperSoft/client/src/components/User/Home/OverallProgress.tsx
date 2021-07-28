import React, { Component } from 'react';
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import Circle from "react-circle";
import CourseStore from "../../../stores/CourseStore";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import ProgressStore from "../../../stores/ProgressStore";

class IOverallProgressProps {
    courseStore: CourseStore;
    progressStore: ProgressStore;
    currentUser: UserViewModel;
    courseChanged: boolean;
}

@observer
class OverallProgress extends Component<IOverallProgressProps> {
    progress: number = 0;
    update: boolean;

    constructor(props: IOverallProgressProps) {
        super(props);
        makeObservable(this, {
            progress: observable,
            update: observable
        });
        this.computeProgress();
    }

    componentDidUpdate(prevProps: Readonly<IOverallProgressProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.courseChanged !== prevProps.courseChanged) {
            this.computeProgress();
        }
    }

    renderProgress(update: boolean) {
        return(
            <Circle//todo: изучи побольше, может быть тут можно несколько данных отображать
                size="300"
                progress={this.progress}
            />
        );
    }

    render() {
        return(
            <div style={{marginTop: "10px"}}>
                {this.renderProgress(this.update)}
            </div>
        );
    }

    computeProgress() {
        let userId = this.props.currentUser.id;
        let courseId = this.props.courseStore.choosenCourse.id;
        this.props.progressStore
            .getUserCourseProgress(userId, courseId)
            .then((progress) => {
                this.progress =  progress;
            });
    }

    toggleUpdate() {
        this.update = !this.update;
    }
}

export default OverallProgress;