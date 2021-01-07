﻿import React, { Component } from 'react';
import { LessonMaterialViewModel } from "../../../Typings/viewModels/LessonMaterialViewModel";
import { observer } from "mobx-react";
import  { Alert } from "reactstrap";
import { makeObservable, observable } from "mobx";
import LessonStore from "../../../stores/LessonStore";

class IMaterialProps {
    lessonStore: LessonStore;
    material: LessonMaterialViewModel;
}

@observer
export class Material extends Component<IMaterialProps> {
    notDeleted: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable
        });
    }

    renderMaterial(material: LessonMaterialViewModel) {
        return(
            <>
                {material.id} {material.path} {material.url}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderMaterial(this.props.material)}
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и материал не удалился</Alert>}
            </>
        );
    }

    delete(materialId: number) {
        let result = window.confirm('Вы уверены, что хотите удалить этот материал урока?');
        if(result) {
            this.props.lessonStore
                .deleteMaterial(materialId)
                .then((status) => {
                    this.notDeleted = status !== 200;
            });
        }
    }
}