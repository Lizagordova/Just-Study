import React, { Component } from 'react';
import LessonStore from "../../../stores/LessonStore";

class IContentProps {
    lessonStore: LessonStore;
    courseId: number;
}

export class Content extends Component<IContentProps> {
    render() {
        return(
            <></>
        );
    }
}