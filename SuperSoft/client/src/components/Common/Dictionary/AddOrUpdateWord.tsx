import React, { Component } from 'react';
import { Button, Card, CardBody, Input, Modal, Alert } from "reactstrap";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import UserStore from "../../../stores/UserStore";
import WordStore from "../../../stores/WordStore";
import { observer } from "mobx-react";
import { WordReadModel } from "../../../Typings/readModels/WordReadModel";
import { makeObservable, observable } from "mobx";
import { ExampleReadModel } from "../../../Typings/readModels/ExampleReadModel";
import { translatePartOfSpeech } from "../../../functions/translater";
import { PartOfSpeech } from "../../../Typings/enums/PartOfSpeech";
import { transformValueToPartOfSpeech } from "../../../functions/transformer";
import { UserRole } from "../../../Typings/enums/UserRole";

class IAddOrUpdateWordProps {
    word: WordViewModel;
    userStore: UserStore;
    wordStore: WordStore;
    addOrUpdateWordToggle: any;
}

@observer
class AddOrUpdateWord extends Component<IAddOrUpdateWordProps> {
    word: WordReadModel = new WordReadModel();
    notSaved: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            word: observable,
            notSaved: observable
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

    componentDidUpdate(prevProps: Readonly<IAddOrUpdateWordProps>, prevState: Readonly<{}>, snapshot?: any): void {
        this.notSaved = false;
    }

    renderCloseButton() {
        return (
            <div className="row justify-content-end">
                <Button
                    type="submit"
                    onClick={() => this.props.addOrUpdateWordToggle()}>
                    <i className="fa fa-window-close" aria-hidden="true"/>
                </Button>
            </div>
        );
    }

    renderWordInput() {
        return (
            <div className="col-lg-2">
                <Input
                    type="text"
                    value={this.word.word}
                    placeholder="СЛОВО"
                    onChange={(e) => this.handleChange(e)}
                />
            </div>
        );
    }

    renderPartOfSpeechInput() {
        return (
            <div className="col-lg-1">
                <Input type="select" id="exampleSelect" onClick={(e) => this.handlePartOfSpeech(e)}>
                    <option value="Noun">{translatePartOfSpeech(PartOfSpeech.Noun)}</option>
                    <option value="Adjective">{translatePartOfSpeech(PartOfSpeech.Adjective)}</option>
                    <option value="Verb">{translatePartOfSpeech(PartOfSpeech.Verb)}</option>
                    <option value="Adverb">{translatePartOfSpeech(PartOfSpeech.Adverb)}</option>
                </Input>
            </div>
        );
    }

    renderRussianMeaningInput() {
        return (
            <div className="col-lg-3">
                <Input
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                    name="russianMeaning"
                    placeholder="ЗНАЧЕНИЕ(НА РУССКОМ)"
                    value={this.word.russianMeaning}
                />
            </div>
        );
    }

    renderEnglishMeaningInput() {
        return (
            <div className="col-lg-3">
                <Input
                    type="text"
                    onChange={(e) => this.handleChange(e)}
                    name="englishMeaning"
                    value={this.word.englishMeaning}
                    placeholder="ЗНАЧЕНИЕ(НА АНГЛИЙСКОМ)"
                />
            </div>
        );
    }

    renderExampleInput() {
        return (
            <div className="col-lg-2">
                <Input
                    type="text"
                    placeholder="ПРИМЕР"
                    value={this.word.examples[0].example}
                    onChange={(e) => this.handleChange(e)}
                    name="example"
                />
            </div>
        );
    }

    renderSaveButton() {
        return (
            <Button outline color="secondary"
                    width="100%"
                    type="submit"
                    onClick={() => this.handleSave()}>
                СОХРАНИТЬ
            </Button>
        );
    }

    renderBody() {
        return(
            <Card style={{width: '90%', marginBottom: '5px'}}>
                <CardBody>
                    {this.renderCloseButton()}
                    <div className="row" id={this.word.id.toString()}>
                        {this.renderWordInput()}
                        {this.renderPartOfSpeechInput()}
                        {this.renderRussianMeaningInput()}
                        {this.renderEnglishMeaningInput()}
                        {this.renderExampleInput()}
                    </div>
                    <div className="row justify-content-center" style={{marginTop: '3px'}}>
                        {this.renderSaveButton()}
                    </div>
                </CardBody>
            </Card>
        );
    }

    renderCautions() {
        return(
            <>
                {this.notSaved && <Alert color="danger">Что-то пошло не так и слово не сохранилось:(</Alert>}
            </>
        );
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

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
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

    handlePartOfSpeech(event: React.MouseEvent<HTMLInputElement, MouseEvent>) {
        this.word.partOfSpeech = transformValueToPartOfSpeech(event.currentTarget.value);
    }

    handleSave() {
        let role = this.props.userStore.currentUser.role;
        if (role === UserRole.Admin) {
            this.props.wordStore.addOrUpdateWordToDictionary(this.word)
                .then((status) => {
                    if(status === 200) {
                        this.props.addOrUpdateWordToggle();
                    }
                    this.notSaved = status !== 200;
            });
        } else if (role === UserRole.User) {
            let userId = this.props.userStore.currentUser.id;
            this.props.wordStore.addOrUpdateWordToUserDictionary(this.word, userId)
                .then((status) => {
                    if(status === 200) {
                        this.props.addOrUpdateWordToggle();
                    }
                    this.notSaved = status !== 200;
            });
        }
    }
}

export default AddOrUpdateWord;
