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
        this.materialsByChoosenLesson = new Array<LessonMaterialViewModel>(0);
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
            body: JSON.stringify({id: id, courseId: courseId, name: name, description: description, startDate: startDate, expireDate: expireDate, order: order})
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
        if(file.name.includes("mp4") || file.name.includes("mov")) {
            let status =  await this.addOrUpdateMaterial1(file);
            if(status === 200) {
                this.getMaterialsByLesson(this.choosenLesson.id);
            }
            return status;
        } else {
            let count = 0;
            const formData = new FormData();
            formData.append("file", file);
            formData.append("lessonId", this.choosenLesson.id.toString());
            const response = await fetch("/addorupdatematerial", {
                body: formData,
                method: "POST"
            });
            if(response.status === 200) {
                this.getMaterialsByLesson(this.choosenLesson.id);
            } else if(response.status === 500 && count !== 3) {
                count++;
                this.addOrUpdateMaterial(file);
            }

            return response.status;
        }
    }

    async addOrUpdateMaterial1(file: File): Promise<number> {
        let size = file.size;
        let start = 0;
        let chunkSize = 100000;
        let end = chunkSize;        
        while(start < size) {
            let chunk = file.slice(start, end, "video/mp4");
            const formData = new FormData();
            formData.append("offset", start.toString());
            formData.append("file", chunk);
            formData.append("fileName", file.name);
            formData.append("lessonId", this.choosenLesson.id.toString());
            const response = await fetch("/addorupdatematerial1", {
                body: formData,
                method: "POST"
            });
            if(response.status === 200) {
                start+= chunkSize;
                end+= chunkSize;
            }
        }

        return 200;
    }
    
    async getUserProgressByLesson(lessonId: number, userId: number): Promise<number> {
        const response = await fetch("/getuserprogressbylesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                lessonId: lessonId, userId: userId
            })
        });

        return await response.json();
    }
}

export default LessonStore;