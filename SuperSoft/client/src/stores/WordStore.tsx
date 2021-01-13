import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import { makeObservable, observable } from "mobx";
import {UserWordViewModel} from "../Typings/viewModels/UserWordViewModel";

class WordStore {
    dictionary: WordViewModel[] = new Array<WordViewModel>();
    userDictionary: UserWordViewModel[] = new Array<UserWordViewModel>();

    constructor() {
        makeObservable(this, {
            dictionary: observable,
            userDictionary: observable,
        });
    }

   async deleteWordFromDictionary(wordId: number): Promise<number> {
        return 200;
    }
    
    async deleteWordFromUserDictionary(wordId: number, userId: number): Promise<number> {
        return 200;
    }
    
    async getDictionary() {
        
    }
    
    async getUserDictionary() {
        
    }
}

export default WordStore;