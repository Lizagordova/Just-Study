import React, { Component } from 'react';
import LessonStore from "../../../stores/LessonStore";
import { Alert, Button, Fade } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import {renderSpinner} from "../../../functions/renderSpinner";

class IContentProps {
    lessonStore: LessonStore;
    courseId: number;
}

@observer
export class ContentUpload extends Component<IContentProps> {
    file: File;
    notLoaded: boolean = false;
    loaded: boolean = false;
    loading: boolean = false;
    loadingFromClientStarted: boolean;
    loadingFromClientNotEnded: boolean;
    
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            file: observable,
            notLoaded: observable,
            loaded: observable,
            loading: observable
        });
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        event.preventDefault();
        this.loadingFromClientStarted = true;
        let reader = new FileReader();
        // @ts-ignore
        let file = event.target.files[0];
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            this.loadingFromClientStarted = false;
            this.file = file;
        };
        
    }

    renderCautions() {
        setTimeout(() => {
            this.loaded = false;
            this.notLoaded = false;
            this.loadingFromClientNotEnded = false;
        }, 6000);
        return(
            <>
                {this.loading && renderSpinner()}
                {this.notLoaded && <Alert color="danger">Не удалось загрузить материал:(</Alert>}
                {this.loaded && <Alert color="success">Материал урока успешно сохранился!</Alert>}
                {this.loadingFromClientNotEnded && <Alert color="primary">Материал ещё не загрузился, попробуйте попозже!</Alert>}
            </>
        );
    }

    renderInput() {
        return(
            <>
            <input className="fileInput"
                   type="file"
                   onChange={(e) => this.handleChange(e)} />
            <Fade in={true}
                style={{fontSize: "0.7em", color: "red", marginTop: "0px"}}>
                Допустимые форматы: pdf, mp4, mov, doc, docx
            </Fade>
        </>
        );
    }

    renderSubmitButton() {
        return (
            <Button outline color="primary"
                    type="submit"
                    onClick={(e) => this.addOrUpdateMaterial(e)}>
                <i className="fa fa-plus" aria-hidden="true"/>
            </Button>
        );
    }

    render() {
        return(
            <>
                {this.renderCautions()}
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        {this.renderInput()}
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        {this.renderSubmitButton()}
                    </div>
                </div>
            </>
        );
    }

    addOrUpdateMaterial(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if(this.loadingFromClientStarted) {
            this.loadingFromClientNotEnded = true;
        } else {
            this.loadingFromClientNotEnded = false;
            event.preventDefault();
            this.loading = true;
            this.props.lessonStore.addOrUpdateMaterial(this.file)
                .then((status) => {
                    this.notLoaded = status !== 200;
                    this.loading = false;
                    this.loaded = status === 200;
                });
        }
    }
}