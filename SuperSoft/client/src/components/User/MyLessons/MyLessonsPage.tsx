import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";

class IMyLessonsPageProps {
    store: RootStore;
}


@observer
class MyLessonsPage extends Component<IMyLessonsPageProps> {
    constructor() {
        // @ts-ignore
        super();
    }

    render() {
        return(
            <></>
        );
    }
}

export default MyLessonsPage;