import React, { Component } from 'react';
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { observer } from "mobx-react";
import { Modal, ModalBody, Label } from "reactstrap";
import { ExampleViewModel } from "../../../Typings/viewModels/ExampleViewModel";

class WordDetailsWindowProps {
    word: WordViewModel;
    toggle: Function;
}

@observer
class WordDetailsWindow extends Component<WordDetailsWindowProps> {
    constructor(props: WordDetailsWindowProps) {
        super(props);
    }

    renderExamples(examples: ExampleViewModel[]) {
        if(examples.length > 0) {
            return(
                <>
                    <div className="row">
                        <Label className="wordDetails wordDetailsTitle">Примеры:</Label>
                    </div>
                    {examples.map(example => {
                        return (
                            <div className="row" >
                                <Label className="wordDetails">{example.example}</Label>
                            </div>
                        );
                    })}
                </>
            );
        }
    }
    
    renderRussianMeaning(russianMeaning: string) {
        return (
            <Label className="wordDetails" align="center">
                {russianMeaning}
            </Label>
        );
    }

    renderEnglishMeaning(englishMeaning: string) {
        return (
            <Label className="wordDetails" align="center">
                {englishMeaning}
            </Label>
        );
    }
    
    renderBody(word: WordViewModel) {
        return(
            <>
                <ModalBody>
                    <div className="row">
                        {this.renderRussianMeaning(word.russianMeaning)}
                    </div>
                    <div className="row">
                        {this.renderEnglishMeaning(word.englishMeaning)}
                    </div>
                    {this.renderExamples(this.props.word.examples)}
                </ModalBody>
            </>
        );
    }
    
    renderWordDetailsWindow() {
        return (
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.props.toggle()}
            >
                <div className="row justify-content-center">
                    <span style={{fontSize: "1.6em", fontWeight: "bold"}}>
                        {this.props.word.word}
                    </span>
                </div>
                {this.renderBody(this.props.word)}
            </Modal>
        );
    }
    
    render() {
        return (
            <>
                {this.renderWordDetailsWindow()}
            </>
        );
    }
}

export default WordDetailsWindow;