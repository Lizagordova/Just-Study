import { makeObservable, observable } from "mobx";
import { FeedbackReadModel } from "../Typings/readModels/FeedbackReadModel";
import {FeedbackViewModel} from "../Typings/viewModels/FeedbackViewModel";
import {getToken} from "../functions/getToken";

class FeedbackStore {
    feedbacks: FeedbackViewModel[] = new Array<FeedbackViewModel>();

    constructor() {
        makeObservable(this, {
            feedbacks: observable
        });
    }

    async getFeedbacks(old: boolean): Promise<number> {
        console.log("old", old);
        const response = await fetch("/getfeedbacks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({old: old})
        });
        if(response.status === 200) {
            this.feedbacks = await response.json();
        }

        return response.status;
    }

    async addOrUpdateFeedback(feedback: FeedbackReadModel): Promise<number> {
        const response = await fetch("addorupdatefeedback", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                id: feedback.id, name: feedback.name,
                email: feedback.email, message: feedback.message, old: feedback.old})
        });

        return response.status;
    }
}

export default FeedbackStore;