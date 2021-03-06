import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";
import Circle from "react-circle";
import { makeObservable, observable } from "mobx";
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
    loadProgress: boolean = false;

    constructor(props: ICourseProgress) {
        super(props);
        makeObservable(this, {
            progress: observable,
            loadProgress: observable
        });
        this.getProgress();
    }

    loadProgressToggle() {
        this.loadProgress = !this.loadProgress;
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
                        <Accordion.Toggle as={Button} variant="link" eventKey={lesson.id.toString()} onClick={() => this.loadProgressToggle()}>
                            <span>{lesson.name}</span>
                        </Accordion.Toggle>
                    </CardHeader>
                    <Accordion.Collapse eventKey={lesson.id.toString()} key={lesson.id.toString()}>
                        <CardBody>
                            {this.loadProgress && this.renderProgress()}
                        </CardBody>
                    </Accordion.Collapse>
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