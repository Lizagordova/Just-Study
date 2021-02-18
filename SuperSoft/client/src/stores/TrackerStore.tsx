﻿import { TrackerViewModel } from "../Typings/viewModels/TrackerViewModel";
import { makeObservable, observable } from "mobx";
import { TrackerReadModel } from "../Typings/readModels/TrackerReadModel";

class TrackerStore {
    currentTracker: TrackerViewModel = new TrackerViewModel();

    constructor() {
        makeObservable(this, {
            currentTracker: observable
        });
    }

    async getTracker(userId: number, courseId: number): Promise<number> {
        const response = await fetch("/gettracker", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: userId, courseId: courseId})
        });
        if(response.status === 200) {
            let currentTracker = await response.json();
            console.log("currentTracker", currentTracker);
            this.currentTracker = currentTracker;
        }

        return response.status;
    }

    async addOrUpdateTracker(tracker: TrackerReadModel) {
        const response = await fetch("/addorupdatetracker", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ id: tracker.id, courseId: tracker.courseId, userId: tracker.userId, trackersByDay: tracker.trackersByDay })
        });
    }
}

export default TrackerStore;