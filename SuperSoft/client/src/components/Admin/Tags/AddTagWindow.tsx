import React, { Component } from "react";
import TagStore from "../../../stores/TagStore";
import { TagReadModel } from "../../../Typings/readModels/TagReadModel";
import { Button, Modal, ModalBody, Input, Alert } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";

class IAddTagProps {
    tagStore: TagStore;
    toggle: any;
}

@observer
class AddTagWindow extends Component<IAddTagProps> {
    newTagName: string = "";
    saved: boolean;
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            newTagName: observable,
            saved: observable,
            notSaved: observable
        });
    }

    renderCautions() {
        setTimeout(() => {
            this.saved = false;
            this.notSaved = false;
        }, 6000);
        return (
            <>
                {this.saved && <Alert color="danger">Тег удачно сохранился</Alert>}
                {this.notSaved && <Alert color="success">Что-то пошло не так и тег не добавился</Alert>}
            </>
        );
    }

    renderInput() {
        return (
            <Input style={{width: "90%"}}
                placeholder="Введите название тега"
                onChange={(e) => this.handleChange(e)}/>
        );
    }

    renderSaveButton() {
        return (
            <Button
                color="success"
                style={{marginTop: "10px", width: "80%"}}
                onClick={() => this.saveNewTag()}>
                Сохранить
            </Button>
        );
    }

    renderBody() {
        return (
            <ModalBody>
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.props.toggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                    {this.renderInput()}
                <div className="container">
                    <div className="row justify-content-center">
                        {this.renderSaveButton()}
                    </div>
                </div>
            </ModalBody>
        );
    }

    render() {
        return (
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.props.toggle()}
            >
                <i style={{marginLeft: '93%', width: '2%'}}
                   onClick={() => this.props.toggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                <div className="row justify-content-center" style={{fontSize: "1.3em"}}>
                    ТЕГИ
                </div>
                {this.renderBody()}
            </Modal>
        )
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.newTagName = event.currentTarget.value;
    }

    saveNewTag() {
        let tag = new TagReadModel();
        tag.name = this.newTagName;
        this.props.tagStore.addOrUpdateTag(tag)
            .then((status) => {
                this.saved = status === 200;
                this.notSaved = status !== 200;
            });
    }
}

export default AddTagWindow;