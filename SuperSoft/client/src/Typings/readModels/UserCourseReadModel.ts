//     This code was generated by a Reinforced.Typings tool. 
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.

import { Tarif } from '../enums/Tarif';
import { UserRole } from '../enums/UserRole';

export class UserCourseReadModel
{
	public userId: number;
	public courseId: number;
	public tarif: Tarif;
	public startDate: any;
	public expireDate: any;
	public role: UserRole;
}