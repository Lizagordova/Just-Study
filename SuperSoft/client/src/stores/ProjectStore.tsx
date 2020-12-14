import { ProjectViewModel } from "../Typings/viewModels/ProjectViewModel";
import {makeObservable, observable} from "mobx";

class ProjectStore {
    projects: ProjectViewModel[];
    choosenProject: ProjectViewModel;

    constructor() {
        makeObservable(this, {
            projects: observable,
            choosenProject: observable
        });
        this.setInitialData();
    }

    setInitialData() {
        this.getProjects()
            .then((projects) => {
                this.projects = projects;
                this.choosenProject = projects[0];
            });
    }

    setChoosenProject(project: ProjectViewModel): void {
        this.choosenProject = project;
    }

    async getProjects() {
        const response = await fetch("/getprojects");

        return await response.json();
    }

    async addNewProject(name: string, description: string, startDate: Date | Date[], deadlineDate: Date | Date[], responsibleId: number) {
        const response = await fetch("/addorupdateproject", {
            method: "POST",
            body: JSON.stringify({name: name, desciption: description, startDate: startDate, deadlineDate: deadlineDate, responsiblePerson: responsibleId})
        });
        if(response.status === 200) {
            const project = await response.json();
            this.projects.push(project);
        }

        return response.status;
    }
}

export default ProjectStore;