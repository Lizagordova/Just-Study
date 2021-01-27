import React, { Component } from 'react';
import {TrackerViewModel} from "../../../Typings/viewModels/TrackerViewModel";
import TrackerStore from "../../../stores/TrackerStore";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import {renderSpinner} from "../../../functions/renderSpinner";
import NaStarteTracker from "./Types/NaStarteTracker";

class ITrackerProps {
    trackerStore: TrackerStore;
    userId: number;
    courseId: number;
}

@observer
class Tracker extends Component<ITrackerProps> {
    perceived: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            perceived: observable
        });
        this.getTracker();
    }

    renderTracker(tracker: TrackerViewModel) {
        return (
            <NaStarteTracker tracker={tracker} trackerStore={this.props.trackerStore} userId={this.props.userId} courseId={this.props.courseId} />
        );
    }
    
    render() {
        let currentTracker = this.props.trackerStore.currentTracker;
        return(
            <>
                {!this.perceived && renderSpinner()}
                {this.renderTracker(currentTracker)}
            </>
        );
    }

    getTracker() {
        this.props.trackerStore.getTracker(this.props.userId, this.props.courseId)
            .then((status) => {
                this.perceived = status !== 200;
            });
    }
}

export default Tracker;