//     This code was generated by a Reinforced.Typings tool. 
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { ExampleReadModel } from './ExampleReadModel';

export class WordReadModel
{
	public id: number;
	public word: string;
	public englishMeaning: string;
	public russianMeaning: string;
	public partOfSpeech: number;
	public examples: ExampleReadModel[];
}