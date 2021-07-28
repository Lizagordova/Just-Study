import React, { Component } from 'react';
import WordStore from "../../../stores/WordStore";
import { observer } from "mobx-react";
import { Input } from "reactstrap";
import { WordViewModel } from "../../../Typings/viewModels/WordViewModel";
import {makeObservable, observable, toJS} from "mobx";
import { UserViewModel } from "../../../Typings/viewModels/UserViewModel";
import { UserRole } from "../../../Typings/enums/UserRole";
import { mapToWordReadModel } from "../../../functions/mapper";

class ISearchProps {
    wordStore: WordStore;
    user: UserViewModel;
}

@observer
class Search extends Component<ISearchProps> {
    foundWords: WordViewModel[] = new Array<WordViewModel>();
    selectOpen: boolean;
    firstFoundWordsSettled: boolean;

    constructor(props: ISearchProps) {
        super(props);
        makeObservable(this, {
            foundWords: observable,
            selectOpen: observable,
            firstFoundWordsSettled: observable
        });
        this.computeFoundWords(this.props.wordStore.dictionary);
    }

    renderSearchBox() {
       if(this.props.wordStore.userDictionary.length !== 0 && !this.firstFoundWordsSettled) {
            this.computeFoundWords(this.props.wordStore.dictionary);
            this.firstFoundWordsSettled = true;
        }
        return(
            <div>
                <Input type="text"
                    className="searchInput"
                    onFocus={() => this.selectOpenToggle()}
                    onChange={(e) => this.onChange(e)}
                />
                <button className="searchButton" type="submit"/>
            </div>
        );
    }

    renderWords() {
        return(
            <select className="searchSelect" size={4}>
                {this.foundWords.map((word) => {
                    return(
                            <option
                                key={word.id}
                                value={word.word}
                                id={word.id.toString()}
                                onClick={() => this.addWordToDictionary(word)}
                            >
                                {word.word}
                            </option>
                    )
                })}
            </select>
        )
    }

    render() {
        return(
            <div className="row" style={{marginLeft: "5px", marginRight: "5px"}}>
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="searchbar searchForm">
                        {this.renderSearchBox()}
                        {this.selectOpen && this.renderWords()}
                    </div>
                </div>
            </div>
        );
    }

    onChange(event: React.FormEvent<HTMLInputElement>) {
        let foundWords =  this.props.wordStore.dictionary
            .filter(w => w.word.toLowerCase()
                .includes(event.currentTarget.value.toLowerCase()));
        this.computeFoundWords(foundWords);
    }

    computeFoundWords(foundWords: WordViewModel[]) {
        let usersDictionary = this.props.wordStore.userDictionary
            .map(uw => {
                return uw.wordId
            });
        this.foundWords = foundWords.filter((w) => {
            return !usersDictionary.includes(w.id)
        });
    }

    addWordToDictionary(word: WordViewModel) {
        if(this.props.user.role === UserRole.User) {
            let wordReadModel = mapToWordReadModel(word);
            this.props.wordStore.addOrUpdateWordToUserDictionary(wordReadModel, this.props.user.id);
        }
    }

    selectOpenToggle() {
        this.selectOpen = !this.selectOpen;
    }
}

export default Search;