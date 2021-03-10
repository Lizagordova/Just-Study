import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import Circle from "react-circle";
import {makeObservable, observable, toJS} from "mobx";
import {Accordion, Button} from "react-bootstrap";
import { LessonViewModel } from "../../../Typings/viewModels/LessonViewModel";
import { Card, CardHeader, CardBody } from "reactstrap";

class ICourseProgress {
    store: RootStore;
    lesson: LessonViewModel;
}

@observer
class LessonProgress extends Component<ICourseProgress> {
    progress: number = 0;

    constructor(props: ICourseProgress) {
        super(props);
        makeObservable(this, {
            progress: observable
        });
        this.getProgress();
    }

    renderProgress() {
        return (
            <Circle
                size="300"
                progress={this.progress}
            />
        )
    }

    renderLesson(lesson: LessonViewModel) {
        return (
            <>
                {<Card>
                    <CardHeader style={{backgroundColor: 'white'}}>
                        <span>{lesson.name}</span>
                    </CardHeader>
                    <div className="row justify-content-center">
                        {this.renderProgress()}
                    </div>
                </Card>}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderLesson(this.props.lesson)}
            </>
        );
    }

    getProgress() {
        this.props.store.lessonStore.getProgressByLesson(this.props.lesson.id)
            .then((progress) => {
                this.progress = progress;
            });
    }
}

export default LessonProgress;