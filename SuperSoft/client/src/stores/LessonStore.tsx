import { makeObservable, observable } from "mobx";
import { LessonViewModel } from "../Typings/viewModels/LessonViewModel";
import { LessonMaterialViewModel } from "../Typings/viewModels/LessonMaterialViewModel";

class LessonStore {
    lessonsByChoosenCourse: LessonViewModel[];
    choosenLesson: LessonViewModel;
    materialsByChoosenLesson: LessonMaterialViewModel[];

    constructor() {
        makeObservable(this, {
            lessonsByChoosenCourse: observable,
            choosenLesson: observable,
            materialsByChoosenLesson: observable,
        });
    }

    async getLessonsByCourse(courseId: number) {
        
    }

    setChoosenLesson(lesson: LessonViewModel) {
        this.choosenLesson = lesson;
        this.getMaterialsByLesson(lesson.id);
    }

    async addOrUpdateLesson(id: number, order: number, courseId: number, description: string, startDate: Date | Date[], expireDate: Date | Date[]): Promise<number> {
        return 200;
    }

    async deleteLesson(lessonId: number): Promise<number> {
        return 200;
    }

    async getMaterialsByLesson(lessonId: number) {
        
    }

    async deleteMaterial(materialId: number): Promise<number> {
        return 200;
    }
}

export default LessonStore;