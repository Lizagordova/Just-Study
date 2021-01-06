import { CourseViewModel } from "../Typings/viewModels/CourseViewModel";
import { makeObservable, observable } from "mobx";
import { UserCourseViewModel } from "../Typings/viewModels/UserCourseViewModel";

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

    getCourses() {
        
    }

    getUserCourse(courseId: number) {
        
    }

    getUsersByCourse(courseId: number) {
        
    }

    addOrUpdateCourse() {
        
    }

    async deleteCourse(courseId: number): Promise<number> {
        return 200;
    }
    
    setChoosenCourse(course: CourseViewModel): void {
        this.choosenCourse = course;
    }
}

export default CourseStore;