import React, {Component} from 'react';
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";
import { Button, Input, Modal, ModalBody, Alert, Label } from "reactstrap";
import { translatePartOfSpeech } from "../../../functions/translater";
import { PartOfSpeech } from "../../../Typings/enums/PartOfSpeech";
import { ExampleReadModel } from "../../../Typings/readModels/ExampleReadModel";
import { WordReadModel } from "../../../Typings/readModels/WordReadModel";
import { transformValueToPartOfSpeech } from "../../../functions/transformer";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { UserRole } from "../../../Typings/enums/UserRole";
import WordStore from "../../../stores/WordStore";
import { WordOfADayReadModel } from "../../../Typings/readModels/WordOfADayReadModel";
import { mapToWordReadModel, mapWordReadModel } from "../../../functions/mapper";

class IAddOrUpdateWordOfADayProps {
    word: WordViewModel;
    courseId: number;
    currentUser: UserViewModel;
    wordStore: WordStore;
    date: Date | Date[];
    cancelEdit: any;
}

@observer
class AddOrUpdateWordOfADay extends Component<IAddOrUpdateWordOfADayProps> {
    word: WordReadModel = new WordReadModel();
    notSaved: boolean = false;
    saved: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable,
            notSaved: observable,
            saved: observable
        });
    }

    componentDidMount(): void {
        this.word = mapToWordReadModel(this.props.word);
    }

    componentDidUpdate(prevProps: Readonly<IAddOrUpdateWordOfADayProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.word !== this.props.word) {
            this.word = mapToWordReadModel(this.props.word);
        }
    }

    renderCautions() {
        return(
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и слово дня не сохранилось!</Alert>}
                {this.saved && <Alert color="success">Слово дня успешно сохранилось!!</Alert>}
            </>
        );
    }

    renderWordInput(word: WordViewModel) {
        return(
            <>
                <Label className="inputLabel" align="center">
                    Слово
                </Label>
                <Input
                    style={{width: "80%"}}
                    placeholder="слово"
                    className="form-control rounded-0"
                    name="word"
                    value={word.word}
                    onChange={(e) => this.handleChangeFromInput(e)}
                />
            </>
        );
    }

    renderPartOfSpeechInput() {
        return (
            <>
                <Label className="inputLabel" align="center">
                    Часть речи
                </Label>
                <Input
                    style={{width: "80%"}}
                    type="select"
                    id="exampleSelect"
                    onClick={(e) => this.handlePartOfSpeech(e)}>
                    <option value="Noun">{translatePartOfSpeech(PartOfSpeech.Noun)}</option>
                    <option value="Adjective">{translatePartOfSpeech(PartOfSpeech.Adjective)}</option>
                    <option value="Verb">{translatePartOfSpeech(PartOfSpeech.Verb)}</option>
                    <option value="Adverb">{translatePartOfSpeech(PartOfSpeech.Adverb)}</option>
                </Input>
            </>
        );
    }

    renderRussianMeaningInput(word: WordViewModel) {
        return (
            <>
                <Label className="inputLabel" align="center">
                    Значение на русском
                </Label>
                <Input
                    style={{width: "80%"}}
                    className="form-control rounded-0 fileInput"
                    onChange={(e) => this.handleChangeFromInput(e)}
                    name="russianMeaning"
                    value={word.russianMeaning}
                />
            </>
        );
    }

    renderEnglishMeaningInput(word: WordViewModel) {
        return (
            <>
                <Label className="inputLabel" align="center">
                    Значение на английском
                </Label>
                <Input
                    style={{width: "80%"}}
                    className="form-control rounded-0 fileInput"
                    onChange={(e) => this.handleChangeFromInput(e)}
                    name="englishMeaning"
                    value={word.englishMeaning}
                />
            </>
        );
    }

    renderExampleInput(word: WordViewModel) {
        return (
            <>
                <Label className="inputLabel" align="center">
                    Пример
                </Label>
                <Input
                    style={{width: "80%"}}
                    placeholder="пример"
                    className="form-control rounded-0 fileInput"
                    onChange={(e) => this.handleChangeFromInput(e)}
                    name="example">{word.examples[0]}</Input>
            </>
        );
    }

    renderSaveButton() {
        return (
            <Button 
                outline color="success"
                width="100%"
                type="submit"
                style={{width: "80%", marginBottom: "10px"}}
                onClick={() => this.handleSave()}>
                СОХРАНИТЬ
            </Button>
        );
    }

    renderBody(word: WordViewModel) {
        return (
            <>
                <ModalBody>
                    {this.renderCautions()}
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
                </ModalBody>
                <div className="row justify-content-center">
                    {this.renderSaveButton()}
                </div>
            </>
        );
    }

    renderCancelButton() {
        return(
            <Button
                color="primary"
                onClick={() => this.props.cancelEdit()}>
                ОТМЕНИТЬ
            </Button>
        );
    }

    renderAddOrUpdateWordOfADayWindow(word: WordViewModel) {
        return (
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.props.cancelEdit()}
            >
                <i style={{marginLeft: '96%', width: '2%'}}
                   onClick={() => this.props.cancelEdit()}
                   className="fa fa-window-close" aria-hidden="true"/>
                <div className="row justify-content-center">
                    СЛОВО
                </div>
                {this.renderBody(word)}
                {this.renderCancelButton()}
            </Modal>
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
        let name = event.target.name;
        let value = event.target.value;
        if(name === 'word') {
            this.word.word = value;
        } else if(name === 'russianMeaning') {
            this.word.russianMeaning = value;
        } else if(name === 'englishMeaning') {
            this.word.englishMeaning = value;
        } else if(name === 'example') {
            //todo: наверно, проверку надо делать
            if(this.word.examples.length === 0) {
                this.word.examples.push(new ExampleReadModel());
            }
            this.word.examples[0].example = value;
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
                    this.notSaved = status !== 200;
                    this.saved = status === 200;
                });
        }
    }
}

export default AddOrUpdateWordOfADay;