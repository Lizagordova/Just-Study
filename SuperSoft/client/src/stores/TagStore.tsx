﻿import { makeObservable, observable } from "mobx";
import { TagViewModel } from "../Typings/viewModels/TagViewModel";
import {TagReadModel} from "../Typings/readModels/TagReadModel";

class TagStore {
    tags: TagViewModel[] = new Array<TagViewModel>();

    constructor() {
        makeObservable(this, {
            tags: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getTags();
    }

    async getTags() {
        const response = await fetch("/gettags");
        if(response.status === 200) {
            this.tags = await response.json();
        }
    }

    async deleteTag(tagId: number): Promise<number> {
        const response = await fetch("/deletetag", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: tagId
            })
        });
        if(response.status === 200) {
            this.getTags();
        }

        return response.status;
    }

    async addOrUpdateTag(tag: TagReadModel): Promise<number> {
        const response = await fetch("/addorupdatetag", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: tag.id, name: tag.name
            })
        });
        if(response.status === 200) {
            this.getTags();
        }

        return response.status;
    }
}

export default TagStore;