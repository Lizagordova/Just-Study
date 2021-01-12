import React, { Component } from 'react';
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { Card, CardText } from "reactstrap";
import { makeObservable, observable } from "mobx";


class IWordProps {
    word: WordViewModel;
}

class Word extends Component<IWordProps> {
    word: WordViewModel;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable
        })
    }
    
    renderWord() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.word.toUpperCase()}
            </div>
        );
    }

    renderPartOfSpeech() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.partOfSpeech}
            </div>
        );
    }

    renderEnglishMeaning() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.englishMeaning}
            </div>
        );
    }

    renderRussianMeaning() {
        return(
            <div className="col-lg-2 col-md-9 col-sm-9 col-xs-9">
                {this.word.russianMeaning}
            </div>
        );
    }

    renderProgress() {
        
    }
    
    renderWordCard() {
        return(
            <Card className="cardWord" body>
                <CardText>
                    <div className="row justify-content-center rowWord">
                        <div className="col-10">
                            <div className="row justify-content-center">
                                {this.renderWord()}
                                {this.renderPartOfSpeech()}
                                {this.renderEnglishMeaning()}
                                {this.renderRussianMeaning()}
                            </div>
                        </div>
                        <div className="col-2">
                            <div className="row justify-content-center">
                                <p onClick={() => this.handleDelete()}>
                                    <i className="fa fa-window-close" aria-hidden="true"/>
                                </p>
                            </div>
                            <div className="row justify-content-center">
                                <p onClick={() => this.handleEdit()}>
                                    <i className="fa fa-edit" aria-hidden="true"/>
                                </p>
                            </div>
                        </div>
                    </div>
                </CardText>
            </Card>
        );
    }

    render() {
        return(
            <>
                {this.renderWordCard()}
            </>
        );
    }
}