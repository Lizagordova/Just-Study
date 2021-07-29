import { WordViewModel } from "../Typings/viewModels/WordViewModel";
import {makeObservable, observable, toJS} from "mobx";
import { UserWordViewModel } from "../Typings/viewModels/UserWordViewModel";
import { WordReadModel } from "../Typings/readModels/WordReadModel";
import { UserWordReadModel } from "../Typings/readModels/UserWordReadModel";
import {WordOfADayReadModel} from "../Typings/readModels/WordOfADayReadModel";
import {getToken} from "../functions/getToken";

class WordStore {
    dictionary: WordViewModel[] = new Array<WordViewModel>();
    userDictionary: UserWordViewModel[] = new Array<UserWordViewModel>();
    wordOfADay: WordViewModel = new WordViewModel();

    constructor() {
        makeObservable(this, {
            dictionary: observable,
            userDictionary: observable,
            wordOfADay: observable
        });
    }

   async deleteWordFromDictionary(wordId: number): Promise<number> {
       const response = await fetch("/deletewordfromdictionary", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8',
               'Authorization': `Bearer ${getToken()}`
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
               'Content-Type': 'application/json;charset=utf-8',
               'Authorization': `Bearer ${getToken()}`
           },
           body: JSON.stringify({userId: userId, word: word})
       });
       if(response.status === 200) {
           this.getUserDictionary(userId);
       }

       return response.status;
   }

   async getDictionary(): Promise<number> {
        const response = await fetch("/getdictionary", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if(response.status === 200) {
            this.dictionary = await response.json();
        }

        return response.status;
   }

   async getUserDictionary(userId: number): Promise<number> {
       const response = await fetch("/getuserdictionary", {
           method: "POST",
           headers: {
               'Content-Type': 'application/json;charset=utf-8',
               'Authorization': `Bearer ${getToken()}`
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
               'Content-Type': 'application/json;charset=utf-8',
               'Authorization': `Bearer ${getToken()}`
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
        const response = await fetch("/addorupdatewordtouserdictionary", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                word: word,
                userId: userId
            })
        });
        if(response.status === 200) {
            this.getDictionary()
                .then((status) => {
                    this.getUserDictionary(userId);
                });
        }

        return response.status;
    }

    async addOrUpdateUserWordsProgress(userWords: UserWordReadModel[]) {
        const response = await fetch("/addorupdateuserwordsprogress", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
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

    async deleteWordOfADay(wordId: number): Promise<number> {
        const response = await fetch("/deletewordofaday", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                id: wordId
            })
        });

        return response.status;
    }

    async getWordOfADay(date: Date | Date[], courseId: number): Promise<WordViewModel> {
        let wordOfADay = new WordViewModel();
        let dateWithTime = new Date(date.toString());
        dateWithTime.setHours(12);
        const response = await fetch("/getwordofaday", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                courseId: courseId, date: dateWithTime
            })
        });
        if(response.status === 200) {
            wordOfADay = await response.json();
            this.wordOfADay = wordOfADay;
        }

        return wordOfADay;
    }

    async addOrUpdateWordOfADay(wordOfADay: WordOfADayReadModel): Promise<number> {
        let dateWithTime = new Date(wordOfADay.date.toString());
        dateWithTime.setHours(12);
        wordOfADay.date = dateWithTime;
        const response = await fetch("/addorupdatewordofaday", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                word: wordOfADay.word,
                courseId: wordOfADay.courseId,
                date: wordOfADay.date
            })
        });

        return response.status;
    }

    async getUserWordsProgress(wordId: number, userId: number): Promise<UserWordViewModel> {
        let userWord = new UserWordViewModel();
        let word = new WordReadModel();
        word.id = wordId;
        const response = await fetch("/getuserwordsprogress", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                userId: userId,
                word: word
            })
        });
        if(response.status === 200) {
            userWord = await response.json();
        }
 
        return userWord;
    }

    async addOrUpdateUserWordProgress(userWord: UserWordReadModel): Promise<number> {
        const response = await fetch("/addorupdateuserword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                userId: userWord.userId, word: userWord.word,
                rightAnswers: userWord.rightAnswers, answer: userWord.answer,
                countOfAttempts: userWord.countOfAttempts, status: userWord.status
            })
        });

        return response.status;
    }

    async getAnswersToWordOfADayByWord(wordId: number, courseId: number): Promise<UserWordViewModel[]> {
        let userWords = new Array<UserWordViewModel>();
        const response = await fetch("/getanswerstowordofadaybyword", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
               id: wordId,
                courseId: courseId
            })
        });
        if(response.status === 200) {
            userWords = await response.json();
        }

        return userWords;
    }
}

export default WordStore;