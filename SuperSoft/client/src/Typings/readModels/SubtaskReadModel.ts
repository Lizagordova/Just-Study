//     This code was generated by a Reinforced.Typings tool. 
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { SubtaskType } from '../enums/SubtaskType';

export class SubtaskReadModel
{
	public id: number;
	public text: string;
	public path: string;
	public order: number;
	public subtaskType: SubtaskType;
	public file: any;
	public taskId: number;
}
