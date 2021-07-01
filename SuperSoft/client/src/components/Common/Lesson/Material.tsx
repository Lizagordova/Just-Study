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
    videoStarted: boolean;

    constructor(props: IMaterialProps) {
        super(props);
        makeObservable(this, {
            notDeleted: observable,
            videoStarted: observable
        });
    }
    
    renderDeleteButton() {
        if(this.props.currentUser.role === UserRole.Admin) {
            return(
                <i style={{marginLeft: '94%', width: '3%'}}
                   onClick={() => this.delete()}
                   className="fa fa-window-close fa-2x" aria-hidden="true" />
            );
        }
    }

    renderMaterial(material: LessonMaterialViewModel) {
        let path = material.path.replace("client/build", ".");
        if(path.includes("pptx")) {
            return (
                <>
                    {this.renderDeleteButton()}
                    <iframe
                        src={`https://view.officeapps.live.com/op/embed.aspx?src=[https://juststudy.ru.com/${path}]`}
                        width='100%' height='600px' frameBorder='0'/>
                </>
            );
        } else if(path.includes("pdf")) {
            return (
                <>
                    {this.renderDeleteButton()}
                    <embed src={`${path}#toolbar=0`} type="application/pdf" width="100%" height="600px"  contentEditable={false}/>
                 </>
            );
        } else if(path.includes("mp4")) {
            return (
                <>
                    {this.renderDeleteButton()}
                    <iframe src={path} className="materialContent" />
                </>
            );
        } else if(path.includes("mov")) {
            return (
                <>
                    {this.renderDeleteButton()}
                    <video id="videoPlayer" autoPlay={false} width="800" height="600" src={path} onClick={() => this.videoToggle()}/>
                    <video controls={true} width="800" height="600" src={path}/>
                </>
            );
        } else if(path.includes("docx") || path.includes("doc")) {
            let fileName = getFileName(path);
            return(
                <>
                    {this.renderDeleteButton()}
                    <a href={path} type="application/vnd.openxmlformats-officedocument.wordprocessingml.document" target="_blank">{fileName}</a>
                </>
            );
        } else {
            return (
                <>
                    {this.renderDeleteButton()}
                    <Alert color="primary">Пока данный формат не поддерживается.</Alert>
                </>
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

    videoToggle() {
        let video = document.getElementById("videoPlayer");
        if(this.videoStarted) {
            // @ts-ignore
            video.play();
        } else {
            // @ts-ignore
            video.pause();
        }

        this.videoStarted = !this.videoStarted;
    }
}