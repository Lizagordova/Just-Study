import {makeObservable, observable} from "mobx";
import {LessonViewModel} from "../Typings/viewModels/LessonViewModel";

class LessonStore {
    lessonsByChoosenCourse: LessonViewModel[];
    choosenLesson: LessonViewModel;

    constructor() {
        makeObservable(this, {
            lessonsByChoosenCourse: observable,
            choosenLesson: observable
        });
    }

    async getLessonsByCourse(courseId: number) {
        
    }
    
    setChoosenLesson(lesson: LessonViewModel) {
        
    }
}

export default LessonStore;