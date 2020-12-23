import { ProjectViewModel } from "../Typings/viewModels/ProjectViewModel";
import { makeObservable, observable } from "mobx";
import { ProjectRole } from "../Typings/enums/ProjectRole";
import { UserViewModel } from "../Typings/viewModels/UserViewModel";

class ProjectStore {
    public projects: ProjectViewModel[] = new Array<ProjectViewModel>(0);
    public choosenProject: ProjectViewModel = new ProjectViewModel();
    public choosenProjectUsers: UserViewModel[] = new Array<UserViewModel>(0);

    constructor() {
        makeObservable(this, {
            projects: observable,
            choosenProject: observable,
            choosenProjectUsers: observable
        });
        this.getProjects();
    }

    setChoosenProject(project: ProjectViewModel): void {
        this.choosenProject = project;
    }

    async getProjectUsers(projectId: number) {
        const response = await fetch("/getprojectusers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: projectId})
        });
        if(response.status === 200) {
            this.choosenProjectUsers = await response.json();
        }
    }

    async getProjects() {
        const response = await fetch("/getprojects");
        if(response.status === 200) {
            let projects = await response.json();
            this.projects = projects;
            this.choosenProject = projects[0];
        } else {
            return new Array<ProjectViewModel>(0);
        }
    }

    async addNewProject(name: string, description: string, startDate: Date | Date[], deadlineDate: Date | Date[], responsibleId: number) {
        const response = await fetch("/addorupdateproject", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ name: name, description: description,startDate: startDate, deadlineDate: deadlineDate, responsiblePerson: responsibleId })
        });
        if(response.status === 200) {
            const project = await response.json();
            this.getProjects();
        }

        return response.status;
    }
    
    async attachUserToProject(projectId: number, userId: number, projectRole: ProjectRole) {
        const response = await fetch("/attachusertoproject", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({userId: userId, role: projectRole, projectId: projectId})
        });

        return response.status;
    }

    async deleteProject(projectId: number) {
        console.log("i want to delete project", projectId);
        const response = await fetch("/deleteproject", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id: projectId})
        });

        return response.status;
    }
}

export default ProjectStore;