import { makeObservable, observable } from "mobx";
import { LessonViewModel } from "../Typings/viewModels/LessonViewModel";

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
        this.choosenLesson = lesson;
    }

    async addOrUpdateLesson(id: number, order: number, courseId: number, description: string, startDate: Date | Date[], expireDate: Date | Date[]): Promise<number> {
        return 200;
    }

    async deleteLesson(lessonId: number): Promise<number> {
        return 200;
    }
}

export default LessonStore;