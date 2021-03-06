﻿import React, { Component } from 'react';
import LessonStore from "../../../stores/LessonStore";
import { LessonMaterialViewModel } from "../../../Typings/viewModels/LessonMaterialViewModel";
import { Material } from "./Material";
import { renderSpinner } from "../../../functions/renderSpinner";
import { Alert } from "reactstrap";
import { observer } from "mobx-react";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import {toJS} from "mobx";

class IContentProps {
    lessonStore: LessonStore;
    courseId: number;
    currentUser: UserViewModel;
}

@observer
export class Content extends Component<IContentProps> {
    renderMaterials(materials: LessonMaterialViewModel[]) {
        return(
            <>
                {materials.map((material) => {
                    return(
                        <Material key={material.id} material={material} lessonStore={this.props.lessonStore}  currentUser={this.props.currentUser}/>
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
                {materials === undefined && renderSpinner()}
                {materials.length === 0 && <Alert color="primary">Пока нет материалов для данного урока:(</Alert>}
            </>
        );
    }
}