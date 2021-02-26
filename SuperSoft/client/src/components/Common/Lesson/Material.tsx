import React, {Component} from 'react';
import {LessonMaterialViewModel} from "../../../Typings/viewModels/LessonMaterialViewModel";
import {observer} from "mobx-react";
import {Alert} from "reactstrap";
import {makeObservable, observable} from "mobx";
import LessonStore from "../../../stores/LessonStore";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import {UserRole} from "../../../Typings/enums/UserRole";

class IMaterialProps {
    lessonStore: LessonStore;
    material: LessonMaterialViewModel;
    currentUser: UserViewModel;
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
    
    renderDeleteButton() {
        if(this.props.currentUser.role === UserRole.Admin) {
            return(
                <i style={{marginLeft: '95%', width: '3%'}}
                   onClick={() => this.delete()}
                   className="fa fa-window-close" aria-hidden="true" />
            );
        }
    }

    renderMaterial(material: LessonMaterialViewModel) {
        if(material.path.includes("pptx") || material.path.includes("pdf")) {
            let path = material.path.replace("client/build", ".");
            console.log("path", path);
            return (
                <iframe
                    src={`https://view.officeapps.live.com/op/embed.aspx?src=[https://localhost:5001/${path}]`}
                    width='100%' height='600px' frameBorder='0'/>
            );
            /*return (
                <iframe src={path} width='962px' height='565px' frameBorder='0' />
            );*/
        } else if(material.path.includes("mp4")) {
            let path = material.path.replace("client/build", ".");
            return (
                <>
                    {this.renderDeleteButton()}
                    <iframe src={path} className="materialContent" />
                </>
            );
        } else {
            return(
                <>
                    {material.id} {material.path} {material.url}
                </>
            );
        }
    }

    render() {
        return(
            <>
                {this.renderMaterial(this.props.material)}
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и материал не удалился</Alert>}
            </>
        );
    }

    delete() {
        let materialId = this.props.material.id;
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