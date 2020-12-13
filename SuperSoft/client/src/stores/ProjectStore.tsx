import { ProjectViewModel } from "../Typings/viewModels/ProjectViewModel";
import {makeObservable, observable} from "mobx";

class ProjectStore {
    projects: ProjectViewModel[];
    
    constructor() {
        makeObservable(this, {
            projects: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getProjects()
            .then((projects) => {
                this.projects = projects;
            });
    }

    async getProjects() {
        const response = await fetch("/getprojects");
        return await response.json();
    }
}

export default ProjectStore;