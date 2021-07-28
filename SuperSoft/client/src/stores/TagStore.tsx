import { makeObservable, observable } from "mobx";
import { TagViewModel } from "../Typings/viewModels/TagViewModel";
import {TagReadModel} from "../Typings/readModels/TagReadModel";
import {SubtagReadModel} from "../Typings/readModels/SubtagReadModel";

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

    async deleteSubtag(subtagId: number): Promise<number> {
        const response = await fetch("/deletesubtag", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                id: subtagId
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

    async addOrUpdateSubtag(subtag: SubtagReadModel, tagId: number): Promise<number> {
        const response = await fetch("/addorupdatesubtag", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                tagId: tagId, id: subtag.id, name: subtag.name
            })
        });
        if(response.status === 200) {
            this.getTags();
        }

        return response.status;
    }
}

export default TagStore;