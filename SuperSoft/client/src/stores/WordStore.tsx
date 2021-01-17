import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import { makeObservable, observable } from "mobx";
import { UserWordViewModel } from "../Typings/viewModels/UserWordViewModel";
import { WordReadModel } from "../Typings/readModels/WordReadModel";
import { UserWordReadModel } from "../Typings/readModels/UserWordReadModel";

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
       const response = await fetch("/deletewordfromdictionary", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8'
           },
           body: JSON.stringify({id: wordId})
       });
       if(response.status === 200) {
           this.getDictionary();
       }

       return response.status;
    }

   async deleteWordFromUserDictionary(wordId: number, userId: number): Promise<number> {
        let word = new WordReadModel();
        word.id = wordId;
       const response = await fetch("/deletewordfromuserdictionary", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8'
           },
           body: JSON.stringify({userId: userId, word: word})
       });
       if(response.status === 200) {
           this.getUserDictionary(userId);
       }

       return response.status;
   }

   async getDictionary(): Promise<number> {
        const response = await fetch("/getdictionary");
        if(response.status === 200) {
            this.dictionary = await response.json();
        }

        return response.status;
   }

   async getUserDictionary(userId: number): Promise<number> {
       const response = await fetch("/getuserdictionary", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8'
           },
           body: JSON.stringify({id: userId})
       });
       if(response.status === 200) {
           this.userDictionary = await response.json();
       }

        return response.status;
   }

   async addOrUpdateWordToDictionary(word: WordReadModel): Promise<number> {
       const response = await fetch("/addorupdatewordtodictionary", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8'
           },
           body: JSON.stringify({
               id: word.id, word: word.word,
               russianMeaning: word.russianMeaning, englishMeaning: word.englishMeaning, 
               partOfSpeech: word.partOfSpeech, examples: word.examples
           })
       });
       if(response.status === 200) {
           this.getDictionary();
       }

       return response.status;
   }

    async addOrUpdateWordToUserDictionary(word: WordReadModel, userId: number): Promise<number> {
        const response = await fetch("/addorupdatewordtodictionary", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                word: word,
                userId: userId
            })
        });
        if(response.status === 200) {
            this.getDictionary();
            this.getUserDictionary(userId);
        }

        return response.status;
    }

    
    async addOrUpdateUserWordsProgress(userWords: UserWordReadModel[]) {
        const response = await fetch("/addorupdateuserwordsprogress", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                userWords: userWords
            })
        });
        if(response.status !== 200) {
            this.addOrUpdateUserWordsProgress(userWords);
        }

        return response.status;
    }
}

export default WordStore;