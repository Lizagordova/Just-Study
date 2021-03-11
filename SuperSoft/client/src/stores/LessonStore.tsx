import { makeObservable, observable } from "mobx";
import { LessonViewModel } from "../Typings/viewModels/LessonViewModel";
import { LessonMaterialViewModel } from "../Typings/viewModels/LessonMaterialViewModel";

class LessonStore {
    lessonsByChoosenCourse: LessonViewModel[] = new Array<LessonViewModel>();
    choosenLesson: LessonViewModel = new LessonViewModel();
    materialsByChoosenLesson: LessonMaterialViewModel[] = new Array<LessonMaterialViewModel>();

    constructor() {
        makeObservable(this, {
            lessonsByChoosenCourse: observable,
            choosenLesson: observable,
            materialsByChoosenLesson: observable,
        });
    }

    setChoosenLesson(lesson: LessonViewModel) {
        this.choosenLesson = lesson;
        this.getMaterialsByLesson(lesson.id);
    }

    async getLessonsByCourse(courseId: number) {
        const response = await fetch("getlessonsbycourse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: courseId})
        });
        if(response.status === 200) {
            const data = await response.json();
            this.lessonsByChoosenCourse = data;
            if(data[0] !== undefined) {
                this.choosenLesson = data[0];
                this.getMaterialsByLesson(this.choosenLesson.id);
            } else {
                this.materialsByChoosenLesson = new Array<LessonMaterialViewModel>();
            }
        }
    }

    async addOrUpdateLesson(id: number, order: number, courseId: number, name: string, description: string, startDate: Date | Date[], expireDate: Date | Date[]): Promise<number> {
        const response = await fetch("addorupdatelesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: id, courseId: courseId, name: name, description: description, startDate: startDate, expireDate: expireDate})
        });
        if(response.status === 200) {
            this.getLessonsByCourse(courseId);
        }

        return response.status;
    }

    async deleteLesson(lessonId: number, courseId: number): Promise<number> {
        const response = await fetch("deletelesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: lessonId})
        });
        if(response.status === 200) {
            this.getLessonsByCourse(courseId);
        }

        return response.status;
    }

    async getMaterialsByLesson(lessonId: number): Promise<number> {
        const response = await fetch("getmaterialsbylesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: lessonId})
        });
        if(response.status === 200) {
            this.materialsByChoosenLesson = await response.json();
        }

        return response.status;
    }

    async deleteMaterial(materialId: number): Promise<number> {
        const response = await fetch("deletematerial", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: materialId})
        });
        if(response.status === 200) {
            this.getMaterialsByLesson(this.choosenLesson.id);
        }

        return response.status;
    }

    async addOrUpdateMaterial(file: File): Promise<number> {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("lessonId", this.choosenLesson.id.toString());
        const response = await fetch("/addorupdatematerial", {
            body: formData,
            method: "POST"
        });
        if(response.status === 200) {
            this.getMaterialsByLesson(this.choosenLesson.id);
        }

        return response.status;
    }

    async getUsersProgressByLesson(lessonId: number): Promise<number> {//todo: создать
        const response = await fetch("/getUsersProgressByLesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: lessonId
            })
        });

        return await response.json();
    }
}

export default LessonStore;