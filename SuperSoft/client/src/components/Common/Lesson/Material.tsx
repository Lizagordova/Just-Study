import React, {Component} from 'react';
import {LessonMaterialViewModel} from "../../../Typings/viewModels/LessonMaterialViewModel";
import {observer} from "mobx-react";
import {Alert} from "reactstrap";
import {makeObservable, observable} from "mobx";
import LessonStore from "../../../stores/LessonStore";
import {UserViewModel} from "../../../Typings/viewModels/UserViewModel";
import {UserRole} from "../../../Typings/enums/UserRole";
import {getFileName} from "../../../functions/getFileName";

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
        if(material.path.includes("pptx")) {
            let path = material.path.replace("client/build", ".");
            return (
                <>
                    {this.renderDeleteButton()}
                    <iframe
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=[https://juststudy.ru.com/${path}]`}
                        width='100%' height='600px' frameBorder='0'/>
                </>
            );
        } else if(material.path.includes("pdf")) {
            let path = material.path.replace("client/build", ".");
            return (
                <>
                    {this.renderDeleteButton()}
                    <embed src={path} type="application/pdf" width="100%" height="600px"  contentEditable={false}/>
                 </>
            );
        } 
        else if(material.path.includes("mp4")) {
            let path = material.path.replace("client/build", ".");
            return (
                <>
                    {this.renderDeleteButton()}
                    <iframe src={path} className="materialContent" />
                </>
            );
        } else if(material.path.includes("docx") || material.path.includes("doc")) {
            let path = material.path.replace("client/build", ".");
            let fileName = getFileName(path);
            return(
                <>
                    {this.renderDeleteButton()}
                    <a href={path} type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" target="_blank">{fileName}</a>

                </>
            );
        } else {
            return (
                <Alert color="primary">Пока данный формат не поддерживается.</Alert>
            );
        }
    }

    renderCautions() {
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return (
            <>
                {this.notDeleted && <Alert color="danger">Что-то пошло не так и материал не удалился</Alert>}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderMaterial(this.props.material)}
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