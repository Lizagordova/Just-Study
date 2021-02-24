import React from "react";
import { Spinner } from 'reactstrap';

export function renderLoadingProgress() {
    return(
        <Spinner color="primary"/>
    );
}

//<Progress striped bar color="warning" value="80"/>