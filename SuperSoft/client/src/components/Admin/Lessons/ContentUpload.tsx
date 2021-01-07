import React, { Component } from 'react';
import LessonStore from "../../../stores/LessonStore";
import { LessonMaterialViewModel } from "../../../Typings/viewModels/LessonMaterialViewModel";
import { Material } from "../../Common/Lesson/Material";
import { renderSpinner } from "../../../functions/renderSpinner";

class IContentProps {
    lessonStore: LessonStore;
    courseId: number;
}

export class ContentUpload extends Component<IContentProps> {
    renderMaterials(materials: LessonMaterialViewModel[]) {
        return(
            <>
                {materials.map((material) => {
                    return(
                        <Material key={material.id} material={material} lessonStore={this.props.lessonStore} />
                    );
                })}
            </>
        );
    }

    render() {
        let materials = this.props.lessonStore.materialsByChoosenLesson;
        return(
            <>
                {materials !== undefined && materials.length > 0 && this.renderMaterials(materials)}
                {(materials === undefined || materials.length === 0) && renderSpinner()}
            </>
        );
    }
}