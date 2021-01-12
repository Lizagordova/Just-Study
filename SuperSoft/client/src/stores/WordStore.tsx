import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import { makeObservable, observable } from "mobx";
import {UserWordViewModel} from "../Typings/viewModels/UserWordViewModel";

class WordStore {
    words: WordViewModel[] = new Array<WordViewModel>();
    userWords: UserWordViewModel[] = new Array<UserWordViewModel>();

    constructor() {
        makeObservable(this, {
            words: observable,
            userWords: observable,
        });
    }
}

export default WordStore;