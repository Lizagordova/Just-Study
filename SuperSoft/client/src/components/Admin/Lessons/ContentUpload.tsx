import React, { Component } from 'react';
import LessonStore from "../../../stores/LessonStore";
import { Alert, Button } from "reactstrap";
import { observer } from "mobx-react";
import {makeObservable, observable} from "mobx";

class IContentProps {
    lessonStore: LessonStore;
    courseId: number;
}

@observer
export class ContentUpload extends Component<IContentProps> {
    file: File;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            file: observable
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
        this.props.lessonStore.addOrUpdateMaterial(this.file);
    }
}