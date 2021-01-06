import { action, makeObservable, observable } from "mobx";
import { WordViewModel } from "../Typings/viewModels/WordViewModel";

class DictionaryStore {
    allWords: WordViewModel[];
    
    constructor() {
        makeObservable(this, {
            allWords: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getAllWords();
    }

    async getAllWords() {
        const response = await fetch("/getallwords");
        if(response.status === 200) {
            this.allWords = await response.json();
        }
    }
    
    async getUserDictionary() {
        
    }
}