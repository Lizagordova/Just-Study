import { CourseViewModel } from "../Typings/viewModels/CourseViewModel";
import {makeObservable, observable, toJS} from "mobx";
import { UserCourseViewModel } from "../Typings/viewModels/UserCourseViewModel";

class CourseStore {
    coursesForTeacher: CourseViewModel[] = new Array<CourseViewModel>();
    userCourses: UserCourseViewModel[] = new Array<UserCourseViewModel>();
    choosenCourse: CourseViewModel = new CourseViewModel();
    usersByCourse: UserCourseViewModel[] = new Array<UserCourseViewModel>();
    coursesInfo: CourseViewModel[] = new Array<CourseViewModel>();

    constructor() {
        makeObservable(this, {
            coursesForTeacher: observable,
            userCourses: observable,
            choosenCourse: observable,
            usersByCourse: observable
        });
    }

    async getCoursesForTeacher() {
        const response = await fetch("/getcoursesforteacher");
        if (response.status === 200) {
            this.coursesForTeacher = await response.json();
        } else {
            this.coursesForTeacher = new Array<CourseViewModel>();
        }
    }

    async getUserCourses(): Promise<number> {
        const response = await fetch("/getusercourses");
        if(response.status === 200) {
            let courses = await response.json();
            this.userCourses = courses;
        }

        return response.status;
    }

    async getCoursesInfo(ids: number[]) {
        const response = await fetch("/getcoursesinfo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({coursesIds: ids})
        });
        if(response.status === 200) {
            let coursesInfo = await response.json();
            this.coursesInfo = coursesInfo;
            if(coursesInfo.length > 0) {
                this.choosenCourse = coursesInfo[0];
            }
        }
    }

    async getUsersByCourse(courseId: number) {
        const response = await fetch("/getusersbycourse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: courseId})
        });
        if(response.status === 200) {
            this.usersByCourse = await response.json();
        }
    }

    async addOrUpdateCourse(id: number, name: string, description: string): Promise<number> {
        const response = await fetch("addorupdatecourse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id, name: name, description: description})
        });
        if(response.status === 200) {
            this.getCoursesForTeacher();
        }

        return response.status;
    }

    async deleteCourse(courseId: number): Promise<number> {
        const response = await fetch("/deletecourse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: courseId})
        });
        if(response.status === 200) {
            this.getCoursesForTeacher();
        }

        return response.status;
    }

    async addOrUpdateParticipantsList(participants: number[], courseId: number): Promise<number> {
        const response = await fetch("/addorupdateparticipantslist", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({participantsIds: participants, id: courseId})
        });
        if(response.status === 200) {
            this.getUsersByCourse(courseId);
        }

        return response.status;
    }

    async addOrUpdateUserCourseDetails(details: UserCourseViewModel): Promise<number> {
        const response = await fetch("/addorupdateusercoursedetails", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: details.userId,
            courseRole: details.courseRole, tarif: details.tarif, startDate: details.startDate,
            expireDate: details.expireDate, courseId: details.courseId})
        });
        if(response.status === 200) {
            this.getUsersByCourse(details.courseId);
        }

        return response.status;
    }

    async computeUserCourseProgress(userId: number, courseId: number): Promise<number> {//todo: доделать + сделать модельку под прогресс
        return 200;
    }

    async deleteUserFromCourse(userId: number, courseId: number): Promise<number> {
        const response = await fetch("/deleteuserfromcourse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: userId, courseId: courseId})
        });
        if(response.status === 200) {
            this.getUsersByCourse(courseId);
        }

        return response.status;
    }

    setChoosenCourse(course: CourseViewModel): void {
        this.choosenCourse = course;
    }
}

export default CourseStore;