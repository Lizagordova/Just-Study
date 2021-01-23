import React, {Component} from 'react';
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { Button, Input } from "reactstrap";
import { translatePartOfSpeech } from "../../../functions/translater";
import { PartOfSpeech } from "../../../Typings/enums/PartOfSpeech";
import { ExampleReadModel } from "../../../Typings/readModels/ExampleReadModel";
import { WordReadModel } from "../../../Typings/readModels/WordReadModel";
import { transformValueToPartOfSpeech } from "../../../functions/transformer";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { UserRole } from "../../../Typings/enums/UserRole";
import WordStore from "../../../stores/WordStore";
import {WordOfADayReadModel} from "../../../Typings/readModels/WordOfADayReadModel";
import { mapWordReadModel } from "../../../functions/mapper";

class IAddOrUpdateWordOfADayProps {
    word: WordViewModel;
    courseId: number;
    currentUser: UserViewModel;
    wordStore: WordStore;
    date: Date | Date[];
    addOrUpdateWordOfADayToggle: any;
}

@observer
class AddOrUpdateWordOfADay extends Component<IAddOrUpdateWordOfADayProps> {
    word: WordReadModel;
    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable
        })
    }

    componentDidMount(): void {
        this.word = this.props.word;
    }

    renderWordInput(word: WordViewModel) {
        return(
            <Input
                placeholder="слово"
                className="form-control rounded-0"
                name="word"
                value={word.word}
                onChange={(e) => this.handleChangeFromInput(e)}
            />
        );
    }

    renderPartOfSpeechInput() {
        return (
            <Input type="select" id="exampleSelect" onClick={(e) => this.handlePartOfSpeech(e)}>
                <option value="Noun">{translatePartOfSpeech(PartOfSpeech.Noun)}</option>
                <option value="Adjective">{translatePartOfSpeech(PartOfSpeech.Adjective)}</option>
                <option value="Verb">{translatePartOfSpeech(PartOfSpeech.Verb)}</option>
                <option value="Adverb">{translatePartOfSpeech(PartOfSpeech.Adverb)}</option>
            </Input>
        );
    }

    renderRussianMeaningInput(word: WordViewModel) {
        return (
            <textarea
                placeholder="значение(на русском)"
                cols={30}
                rows={1}
                className="form-control rounded-0 fileInput"
                onChange={(e) => this.handleChangeFromTextarea(e)}
                name="russianMeaning"
                value={word.russianMeaning}
            />
        );
    }

    renderEnglishMeaningInput(word: WordViewModel) {
        return (
            <textarea
                placeholder="значение(на английском)"
                cols={30}
                rows={1}
                className="form-control rounded-0 fileInput"
                onChange={(e) => this.handleChangeFromTextarea(e)}
                name="englishMeaning"
                value={word.englishMeaning}
            />
        );
    }

    renderExampleInput(word: WordViewModel) {
        return (
            <textarea
                placeholder="пример"
                cols={30}
                rows={1}
                className="form-control rounded-0 fileInput"
                onChange={(e) => this.handleChangeFromTextarea(e)}
                name="example">{word.examples[0]}</textarea>
        )
    }

    renderSaveButton() {
        return (
            <Button 
                outline color="secondary"
                width="100%"
                type="submit"
                onClick={() => this.handleSave()}>
                СОХРАНИТЬ
            </Button>
        );
    }

    renderAddOrUpdateWordOfADayWindow(word: WordViewModel) {
        return (
            <div className="row rowUpload" id={word.id.toString()}>
                <div className="col-12">
                    <div className="row justify-content-center">
                        {this.renderWordInput(word)}
                    </div>
                    <div className="row justify-content-center">
                         {this.renderPartOfSpeechInput()}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderRussianMeaningInput(word)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderEnglishMeaningInput(word)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderExampleInput(word)}
                    </div>
                    <div className="row justify-content-center">
                        {this.renderSaveButton()}
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return(
            <>
                {this.renderAddOrUpdateWordOfADayWindow(this.props.word)}
            </>
        );
    }

    handleChangeFromInput(event: React.ChangeEvent<HTMLInputElement>) {
        let targetName = event.target.name;
        if(targetName === 'word') {
            this.word.word = targetName;
        } else if(targetName === 'russianMeaning') {
            this.word.russianMeaning = targetName;
        } else if(targetName === 'englishMeaning') {
            this.word.englishMeaning = targetName;
        } else if(targetName === 'example') {
            //todo: наверно, проверку надо делать
            if(this.word.examples.length === 0) {
                this.word.examples.push(new ExampleReadModel());
            }
            this.word.examples[0].example= targetName;
        }
    }

    handleChangeFromTextarea(event: React.ChangeEvent<HTMLTextAreaElement>) {
        let targetName = event.target.name;
        if(targetName === 'russianMeaning') {
            this.word.russianMeaning = targetName;
        } else if(targetName === 'englishMeaning') {
            this.word.englishMeaning = targetName;
        } else if(targetName === 'example') {
            //todo: наверно, проверку надо делать
            if(this.word.examples.length === 0) {
                this.word.examples.push(new ExampleReadModel());
            }
            this.word.examples[0].example= targetName;
        }
    }

    handlePartOfSpeech(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        this.word.partOfSpeech = transformValueToPartOfSpeech(event.currentTarget.value);
    }

    handleSave() {
        let role = this.props.currentUser.role;
        if(role === UserRole.Admin) {
            let wordOfADay = new WordOfADayReadModel();
            wordOfADay.word = mapWordReadModel(this.word);
            wordOfADay.courseId = this.props.courseId;
            wordOfADay.date = this.props.date;
            this.props.wordStore.addOrUpdateWordOfADay(wordOfADay)
                .then((status) => {
                    this.props.addOrUpdateWordOfADayToggle()
                })
        }
    }
}

export default AddOrUpdateWordOfADay;