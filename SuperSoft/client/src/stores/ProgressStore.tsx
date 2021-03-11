class ProgressStore {
    async getProgressByLesson(lessonId: number): Promise<number> {
        const response = await fetch("/getprogressbylesson", {
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

    async getUserCourseProgress(userId: number, courseId: number): Promise<number> {//todo: доделать + сделать модельку под прогресс
        const response = await fetch("/getusercourseprogress", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: userId, courseId: courseId})
        });

        return await response.json();
    }

    async getUserProgressByLesson(userId: number, lessonId: number): Promise<number> {//todo: доделать + сделать модельку под прогресс
        const response = await fetch("/getuserprogressbylesson", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: userId, lessonId: lessonId})
        });

        return await response.json();
    }
}

export default ProgressStore;