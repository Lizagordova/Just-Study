import React, { Component } from 'react';
import LessonStore from "../../../stores/LessonStore";
import { Alert, Button } from "reactstrap";
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
        let reader = new FileReader();
        // @ts-ignore
        let file = event.target.files[0];
        reader.onloadend = () => {
            this.file = file;
        };
        reader.readAsDataURL(file)
    }

    renderCautions() {
        return(
            <>
                {this.loading && renderSpinner()}
                {this.notLoaded && <Alert color="danger">Не удалось загрузить материал:(</Alert>}
                {this.loaded && <Alert color="success">Материал урока успешно сохранился!</Alert>}
            </>
        );
    }

    render() {
        return(
            <>
                
                <div className="row justify-content-center">
                    <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
                        <input className="fileInput"
                            type="file"
                            onChange={(e) => this.handleChange(e)} />
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <Button outline color="primary"
                             type="submit"
                             onClick={(e) => this.addOrUpdateMaterial(e)}>
                            <i className="fa fa-plus" aria-hidden="true"/>
                        </Button>
                    </div>
                </div>
            </>
        );
    }

    addOrUpdateMaterial(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
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