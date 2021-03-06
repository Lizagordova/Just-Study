import React, { Component } from "react";
import TagStore from "../../../stores/TagStore";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { Button, Modal, ModalBody, Input } from "reactstrap";
import {TagReadModel} from "../../../Typings/readModels/TagReadModel";

class ITagsControlWindowProps {
    tagStore: TagStore;
    toggle: any;
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
                            <i style={{marginLeft: '96%', width: '2%'}}
                               onClick={() => this.deleteTag(tag.id)}
                               className="fa fa-window-close fa-2x" aria-hidden="true"/>
                            <Button
                                style={{width: "70%"}}>
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
            <Button
                outline color="secondary"
                onClick={() => this.addTagInputOpenToggle()}>
                Добавить тег
            </Button>
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
                <Button
                    onClick={() => this.saveNewTag()}>
                    Сохранить
                </Button>
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
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.props.toggle()}
                   className="fa fa-window-close" aria-hidden="true"/>
                <div className="row justify-content-center">
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
        let tagReadModel = new TagReadModel();
        tagReadModel.name = this.newTagName;
        this.props.tagStore
            .addOrUpdateTag(tagReadModel)
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