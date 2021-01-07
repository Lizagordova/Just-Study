import { CourseViewModel } from "../Typings/viewModels/CourseViewModel";
import { makeObservable, observable } from "mobx";
import { UserCourseViewModel } from "../Typings/viewModels/UserCourseViewModel";
import {ICourseReadModel} from "../Typings/readModels/ICourseReadModel";

class CourseStore {
    courses: CourseViewModel[];
    userCourse: CourseViewModel;
    choosenCourse: CourseViewModel;
    usersByCourse: UserCourseViewModel;

    constructor() {
        makeObservable(this, {
            courses: observable,
            userCourse: observable,
            choosenCourse: observable,
            usersByCourse: observable
        });
    }

    async getCourses() {
        
    }

    getUserCourse(courseId: number) {
        
    }

    getUsersByCourse(courseId: number) {
        
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
            this.getCourses();
        }

        return response.status;
    }

    async deleteCourse(courseId: number): Promise<number> {
        return 200;
    }
    
    setChoosenCourse(course: CourseViewModel): void {
        this.choosenCourse = course;
    }
}

export default CourseStore;