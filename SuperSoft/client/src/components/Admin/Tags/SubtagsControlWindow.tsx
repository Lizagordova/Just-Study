import React, { Component } from "react";
import TagStore from "../../../stores/TagStore";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { Button, Modal, ModalBody, Input } from "reactstrap";
import {SubtagReadModel} from "../../../Typings/readModels/SubtagReadModel";
import {SubtagViewModel} from "../../../Typings/viewModels/SubtagViewModel";

class ITagsControlWindowProps {
    tagStore: TagStore;
    toggle: any;
    tagId: number;
}

@observer
class SubtagsControlWindow extends Component<ITagsControlWindowProps> {
    notDeleted: boolean;
    notAdded: boolean;
    addSubtagInputOpen: boolean;
    newTagName: string = "";
    subtags: SubtagViewModel[] = new Array<SubtagViewModel>();

    constructor(props: ITagsControlWindowProps) {
        super(props);
        makeObservable(this, {
            notDeleted: observable,
            notAdded: observable,
            addSubtagInputOpen: observable,
            newTagName: observable,
            subtags: observable
        });
        this.setSubtags();
    }

    componentDidUpdate(prevProps: Readonly<ITagsControlWindowProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.props.tagId !== prevProps.tagId) {
            this.setSubtags();
        }
    }

    setSubtags() {
        let foundTag = this.props.tagStore.tags.filter(t => t.id === this.props.tagId)[0];
        if(foundTag !== undefined) {
            this.subtags = foundTag.subtags;
        }
    }

    renderSubtags(subtags: SubtagViewModel[]) {
        return (
            <>
                {subtags.map((subtag) => {
                    return(
                        <div className="row justify-content-center" key={subtag.id}>
                            <i style={{marginLeft: '88%', width: '2%'}}
                               onClick={() => this.deleteTag(subtag.id)}
                               className="fa fa-window-close fa-2x" aria-hidden="true"/>
                            <Button
                                outline color="secondary"
                                style={{width: "70%", fontSize: "0.8em"}}>
                                {subtag.name}
                            </Button>
                        </div>
                    );
                })}
            </>
        );
    }

    renderAddSubtagButton() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <Button
                        style={{marginTop: "10px"}}
                        outline color="secondary"
                        onClick={() => this.addSubtagInputOpenToggle()}>
                        Добавить подтег
                    </Button>
                </div>
            </div>
        );
    }

    renderSaveButton() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <Button
                        color="success"
                        style={{marginTop: "10px", width: "80%"}}
                        onClick={() => this.saveNewSubtag()}>
                        Сохранить
                    </Button>
                </div>
            </div>
        );
    }

    renderAddSubtagInput() {
        return(
            <>
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.addSubtagInputOpenToggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                <Input style={{width: "90%"}}
                    placeholder="Введите название подтега"
                    onChange={(e) => this.handleChange(e)}/>
                {this.renderSaveButton()}
            </>
        );
    }

    renderAddSubtagWindow() {
        return (
            <>
                {!this.addSubtagInputOpen && this.renderAddSubtagButton()}
                {this.addSubtagInputOpen && this.renderAddSubtagInput()}
            </>
        );
    }

    renderBody() {
        return(
            <ModalBody>
                {this.renderSubtags(this.subtags)}
                {this.renderAddSubtagWindow()}
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

    saveNewSubtag() {
        let subtagReadModel = new SubtagReadModel();
        subtagReadModel.name = this.newTagName;
        this.props.tagStore
            .addOrUpdateSubtag(subtagReadModel, this.props.tagId)
            .then((status) => {
                this.notAdded = status !== 200;
                if(status === 200) {
                    this.newTagName = "";
                    this.addSubtagInputOpen = false;
                }
            });
    }

    addSubtagInputOpenToggle() {
        this.addSubtagInputOpen = !this.addSubtagInputOpen;
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        this.newTagName = event.currentTarget.value;
    }
}

export default SubtagsControlWindow;