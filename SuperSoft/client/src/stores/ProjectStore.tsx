import { ProjectViewModel } from "../Typings/viewModels/ProjectViewModel";
import { makeObservable, observable } from "mobx";

class ProjectStore {
    public projects: ProjectViewModel[];
    public choosenProject: ProjectViewModel;

    constructor() {
        makeObservable(this, {
            projects: observable,
            choosenProject: observable
        });
        this.projects = new Array<ProjectViewModel>(0);
        this.choosenProject = new ProjectViewModel();
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

    async getProjects(): Promise<ProjectViewModel[]> {
        const response = await fetch("/getprojects");
        if(response.status === 200) {
            return await response.json();
        } else {
            return new Array<ProjectViewModel>(0);
        }
    }

    async addNewProject(name: string, description: string, startDate: Date, deadlineDate: Date, responsibleId: number) {
        const response = await fetch("/addorupdateproject", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name, description: description,startDate: startDate, deadlineDate: deadlineDate, responsiblePerson: responsibleId })
        });
        if(response.status === 200) {
            const project = await response.json();
            console.log("new Project", project);
            console.log("this projects", this.projects);
            this.getProjects();
        }

        return response.status;
    }
}

export default ProjectStore;