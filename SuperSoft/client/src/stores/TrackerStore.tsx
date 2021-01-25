import { TrackerViewModel } from "../Typings/viewModels/TrackerViewModel";
import { makeObservable, observable } from "mobx";

class TrackerStore {
    currentTracker: TrackerViewModel;

    constructor() {
        makeObservable(this, {
            currentTracker: observable
        });
    }

    async getTracker(userId: number, courseId: number): Promise<number> {
        let tracker = new TrackerViewModel();
        const response = await fetch("/gettracker", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: userId, courseId: courseId})
        });
        if(response.status === 200) {
            this.currentTracker = await response.json();
        }

        return response.status;
    }
    
    async addOrUpdateTracker(userId: number) {
        
    }
}

export default TrackerStore;