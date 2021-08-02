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
                    <div className="row justify-content-center">
                        <Label style={{marginLeft: "0px", paddingLeft: "10px"}}>Примеры</Label>
                    </div>
                    {examples.map(example => {
                        return (
                            <div className="row justify-content-center">
                                <span style={{marginLeft: "0px", paddingLeft: "10px"}}>{example.example}</span>
                            </div>
                        );
                    })}
                </>
            );
        }
    }
    
    renderBody(word: WordViewModel) {
        return(
            <>
                <ModalBody>
                    <div className="row justify-content-center">
                        <span>{word.russianMeaning}</span>
                    </div>
                    <div className="row justify-content-center">
                        <span>{word.englishMeaning}</span>
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
                    <span style={{fontSize: "1.2em"}}>
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