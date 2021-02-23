import React from "react";
import { Progress } from 'reactstrap';

export function renderLoadingProgress() {
    return(
        <Progress striped bar color="warning" value="80"/>
    );
}