import React, { Component } from 'react';
import { Card, CardText, Button, Progress, CardBody, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import UserStore from "../../../stores/UserStore";
import WordStore from "../../../stores/WordStore";
import { observer } from "mobx-react";
import { WordReadModel } from "../../../Typings/readModels/WordReadModel";
import { makeObservable, observable } from "mobx";

class IAddOrUpdateWordProps {
    word: WordViewModel;
    userStore: UserStore;
    wordStore: WordStore;
    addOrUpdateWordToggle: any;
}

@observer
class AddOrUpdateWord extends Component<IAddOrUpdateWordProps> {
    word: WordReadModel = new WordReadModel();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable
        });
    }

    componentDidMount(): void {
        let word = this.props.word;
        this.word.id = word.id;
        this.word.russianMeaning = word.russianMeaning;
        this.word.englishMeaning = word.englishMeaning;
        this.word.partOfSpeech = word.partOfSpeech;
        this.word.examples = word.examples;
    }

    renderBody() {
        
    }

    render() {
        return(
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.props.addOrUpdateWordToggle()}
            >
                {this.renderBody()}
                <Button
                    color="primary"
                    onClick={() => this.props.addOrUpdateWordToggle()}>
                    ОТМЕНИТЬ
                </Button>
            </Modal>
        );
    }
}

export default AddOrUpdateWord;
