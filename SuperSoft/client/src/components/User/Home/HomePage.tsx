import React, { Component } from 'react';
import RootStore from "../../../stores/RootStore";
import { observer } from "mobx-react";

class IHomePageProps {
    store: RootStore;
}

@observer
class HomePage extends Component<IHomePageProps> {
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

export default HomePage;