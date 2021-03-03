import React, { Component } from "react";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Button, Modal, ModalBody, Alert, Label, Input } from "reactstrap";
import {FeedbackReadModel} from "../../../Typings/readModels/FeedbackReadModel";
import FeedbackStore from "../../../stores/FeedbackStore";

class IAddFeedbackProps {
    feedbackStore: FeedbackStore;
}

@observer
class AddFeedbackWindow extends Component<IAddFeedbackProps> {
    addFeedback: boolean;
    name: string = "";
    email: string = "";
    message: string = "";
    notSaved: boolean;
    saved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            addFeedback: observable,
            name: observable,
            email: observable,
            message: observable,
            notSaved: observable,
            saved: observable
        });
    }

    renderButton() {
        return(
            <i className="fa fa-commenting fa-2x" aria-hidden="true" onClick={() =>  this.addFeedbackToggle()}/>
        );
    }

    renderCautions() {
        return (
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и Ваш комментарий не сохранился. Попробуйте ещё раз!</Alert>}
                {this.saved && <Alert color="success">Спасибо за Ваш комментарий!</Alert>}
            </>
        );
    }

    getLabel(type: FeedbackDataType): string {
        let label = "";
        if(type === FeedbackDataType.Name) {
            label = "Ваше имя:"
        } else if(type === FeedbackDataType.Email) {
            label = "Email:";
        } else if(type === FeedbackDataType.Message) {
            label = "Комментарий:";
        }

        return label;
    }

    getDefaultInputValue(type: FeedbackDataType): string {
        let value = "";
        if(type === FeedbackDataType.Name) {
            value = this.name;
        } else if(type === FeedbackDataType.Email) {
            value = this.email;
        } else if(type === FeedbackDataType.Message) {
            value = this.message;
        }

        return value;
    }

    renderDataInput(type: FeedbackDataType) {
        let defaultValue = this.getDefaultInputValue(type);
        return(
            <>
                <Label className="inputLabel" align="center">
                    {this.getLabel(type)}
                </Label>
                <Input
                    style={{width: "70%"}}
                    defaultValue={defaultValue}
                    onChange={(e) => this.inputData(e, type)}/>
            </>
        );
    }
    
    renderBody() {
        return(
            <>
                <ModalBody>
                    {this.renderCautions()}
                    <div className="row justify-content-center">
                        {this.renderDataInput(FeedbackDataType.Name)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderDataInput(FeedbackDataType.Email)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderDataInput(FeedbackDataType.Message)}
                    </div>
                </ModalBody>
                <div className="row justify-content-center">
                    {this.renderSaveButton()}
                </div>
            </>
        );
    }

    renderSaveButton() {
        return (
            <Button
                outline color="success"
                style={{width: "80%", marginBottom: "10px"}}
                onClick={() => this.saveFeedback()}>
                Сохранить
            </Button>
        );
    }

    renderCancelButton() {
        return(
            <Button
                color="primary"
                onClick={() => this.addFeedbackToggle()}>
                ОТМЕНИТЬ
            </Button>
        );
    }

    renderAddFeedbackWindow() {
        return(
            <Modal
                centered={true}
                size="lg"
                isOpen={this.addFeedback}
                toggle={() => this.addFeedbackToggle()}
            >
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.addFeedbackToggle()}
                   className="fa fa-window-close" aria-hidden="true"/>
                <div className="row justify-content-center">
                    ОБРАТНАЯ СВЯЗЬ
                </div>
                {this.renderBody()}
                {this.renderCancelButton()}
            </Modal>
        );
    }

    render() {
        return(
            <div className="row justify-content-center" style={{marginTop: "15px"}}>
                {this.addFeedback && this.renderAddFeedbackWindow()}
                {this.renderButton()}
            </div>
        );
    }

    addFeedbackToggle() {
        this.addFeedback = !this.addFeedback;
    }

    inputData(event: React.FormEvent<HTMLInputElement>, type: FeedbackDataType) {
        if(type === FeedbackDataType.Name) {
            this.name = event.currentTarget.value;
        } else if(type === FeedbackDataType.Email) {
            this.email = event.currentTarget.value;
        } else if(type === FeedbackDataType.Message) {
            this.message = event.currentTarget.value;
        }
    }

    saveFeedback() {
        let feedbackReadModel = new FeedbackReadModel();
        feedbackReadModel.email = this.email;
        feedbackReadModel.name = this.name;
        feedbackReadModel.message = this.message;
        this.props.feedbackStore
            .addOrUpdateFeedback(feedbackReadModel)
            .then((status) => {
                this.notSaved = status !== 200;
                this.saved = status === 200;
            });
    }
}

enum FeedbackDataType {
    Name,
    Email,
    Message
}
export default AddFeedbackWindow;