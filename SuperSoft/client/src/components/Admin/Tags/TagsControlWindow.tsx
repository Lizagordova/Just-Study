import React, { Component } from "react";
import TagStore from "../../../stores/TagStore";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { Button, Modal, ModalBody, Input } from "reactstrap";
import {TagReadModel} from "../../../Typings/readModels/TagReadModel";
import {SubtagReadModel} from "../../../Typings/readModels/SubtagReadModel";

class ITagsControlWindowProps {
    tagStore: TagStore;
    toggle: any;
    tagId: number;
}

@observer
class TagsControlWindow extends Component<ITagsControlWindowProps> {
    notDeleted: boolean;
    notAdded: boolean;
    addTagInputOpen: boolean;
    newTagName: string = "";

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable,
            notAdded: observable,
            addTagInputOpen: observable,
            newTagName: observable,
        });
    }

    renderTags(tags: TagViewModel[]) {
        return (
            <>
                {tags.map((tag) => {
                    return(
                        <div className="row justify-content-center" key={tag.id}>
                            <i style={{marginLeft: '88%', width: '2%'}}
                               onClick={() => this.deleteTag(tag.id)}
                               className="fa fa-window-close fa-2x" aria-hidden="true"/>
                            <Button
                                outline color="secondary"
                                style={{width: "70%", fontSize: "0.8em"}}>
                                {tag.name}
                            </Button>
                        </div>
                    );
                })}
            </>
        );
    }

    renderAddTagButton() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <Button
                        style={{marginTop: "10px"}}
                        outline color="secondary"
                        onClick={() => this.addTagInputOpenToggle()}>
                        Добавить тег
                    </Button>
                </div>
            </div>
        );
    }

    renderAddTagInput() {
        return(
            <>
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.addTagInputOpenToggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                <Input style={{width: "90%"}}
                    placeholder="Введите название тега"
                    onChange={(e) => this.handleChange(e)}/>
                    <div className="container">
                        <div className="row justify-content-center">
                            <Button
                                color="success"
                                style={{marginTop: "10px", width: "80%"}}
                                onClick={() => this.saveNewTag()}>
                                Сохранить
                            </Button>
                        </div>
                    </div>
            </>
        );
    }

    renderAddTagWindow() {
        return (
            <>
                {!this.addTagInputOpen && this.renderAddTagButton()}
                {this.addTagInputOpen && this.renderAddTagInput()}
            </>
        );
    }

    renderBody() {
        return(
            <ModalBody>
                {this.renderTags(this.props.tagStore.tags)}
                {this.renderAddTagWindow()}
            </ModalBody>
        );
    }

    render() {
        return(
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
        );
    }

    deleteTag(tagId: number) {
        this.props.tagStore.deleteTag(tagId)
            .then((status) => {
                this.notDeleted = status !== 200;
            });
    }

    saveNewTag() {
        let subtagReadModel = new SubtagReadModel();
        subtagReadModel.name = this.newTagName;
        this.props.tagStore
            .addOrUpdateSubtag(subtagReadModel, this.props.tagId)
            .then((status) => {
                this.notAdded = status !== 200;
                if(status === 200) {
                    this.newTagName = "";
                    this.addTagInputOpen = false;
                }
            });
    }

    addTagInputOpenToggle() {
        this.addTagInputOpen = !this.addTagInputOpen;
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.newTagName = event.currentTarget.value;
    }
}

export default TagsControlWindow;