import React, { Component } from 'react';
import { Alert, Button, CardImg, CardText, Input } from "reactstrap";
import { ISubtaskProps } from "./ISubtaskProps";
import { SubtaskViewModel } from "../../../Typings/viewModels/SubtaskViewModel";
import { makeObservable, observable } from "mobx";
import { observer } from "mobx-react";
import { UserRole } from "../../../Typings/enums/UserRole";
import { UserSubtaskReadModel } from "../../../Typings/readModels/UserSubtaskReadModel";
import { UserSubtaskViewModel } from "../../../Typings/viewModels/UserSubtaskViewModel";

@observer
export class InsertWordsIntoGapsSubtask extends Component<ISubtaskProps> {
    render() {
        return(
            <>
                InsertWordsIntoGaps
            </>
        );
    }
}