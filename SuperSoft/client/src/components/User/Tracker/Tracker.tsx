import React, { Component } from 'react';
import {TrackerViewModel} from "../../../Typings/viewModels/TrackerViewModel";
import TrackerStore from "../../../stores/TrackerStore";
import { observer } from "mobx-react";
import { makeObservable, observable, toJS } from "mobx";
import { renderSpinner } from "../../../functions/renderSpinner";
import NaStarteTracker from "./Types/NaStarteTracker";

class ITrackerProps {
    trackerStore: TrackerStore;
    userId: number;
    courseId: number;
}

@observer
class Tracker extends Component<ITrackerProps> {
    perceived: boolean;

    constructor(props: ITrackerProps) {
        super(props);
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
        console.log("currentTracker", toJS(currentTracker));
        return(
            <div style={{marginTop: "20px",  marginLeft:"10px"}}>
                {!this.perceived && renderSpinner()}
                {this.perceived && this.renderTracker(currentTracker)}
            </div>
        );
    }

    getTracker() {
        this.props.trackerStore.getTracker(this.props.userId, this.props.courseId)
            .then((status) => {
                this.perceived = status === 200;
            });
    }
}

export default Tracker;