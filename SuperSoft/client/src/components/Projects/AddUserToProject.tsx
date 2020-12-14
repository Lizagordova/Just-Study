import React from "react";
import RootStore from "../../stores/RootStore";

export interface IAddUserToProjectProps {
    projectId: number,
    store: RootStore;
}

export class AddUserToProject extends React.Component<IAddUserToProjectProps>{
    render() {
        return(
            <></>
        );
    }
}