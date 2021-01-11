import { CourseViewModel } from "../Typings/viewModels/CourseViewModel";
import { makeObservable, observable } from "mobx";
import { UserCourseViewModel } from "../Typings/viewModels/UserCourseViewModel";

class CourseStore {
    coursesForTeacher: CourseViewModel[] = new Array<CourseViewModel>();
    userCourses: UserCourseViewModel[] = new Array<UserCourseViewModel>();
    choosenCourse: CourseViewModel = new CourseViewModel();
    usersByCourse: UserCourseViewModel[] = new Array<UserCourseViewModel>();

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

    async getUserCourses() {
        const response = await fetch("/getusercourses");
        if(response.status === 200) {
            this.userCourses = await response.json();
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
        const response = await fetch("/addorupdatecourse", {
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

    setChoosenCourse(course: CourseViewModel): void {
        this.choosenCourse = course;
    }
}

export default CourseStore;