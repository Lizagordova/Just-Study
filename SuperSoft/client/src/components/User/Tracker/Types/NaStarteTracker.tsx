import React, { Component } from 'react';
import { TrackerViewModel } from "../../../../Typings/viewModels/TrackerViewModel";
import TrackerStore from "../../../../stores/TrackerStore";
import { Table } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { TrackerReadModel } from "../../../../Typings/readModels/TrackerReadModel";
import { mapToTrackerReadModel } from "../../../../functions/mapper";
import {TrackerByDayReadModel} from "../../../../Typings/readModels/TrackerByDayReadModel";

class INaStarteTrackerProps {
    tracker: TrackerViewModel;
    trackerStore: TrackerStore;
}

@observer
class NaStarteTracker extends Component<INaStarteTrackerProps> {
    days: number[] = new Array<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    tracker: TrackerReadModel = new TrackerReadModel();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            tracker: observable
        });
        this.tracker = mapToTrackerReadModel(this.props.tracker);
    }

    renderTracker(tracker: TrackerViewModel) {
        return(
            <Table>
                {this.renderHead()}
            </Table>
        );
    }

    renderHead() {
        return(
            <thead>
            <tr>
                <td></td>
                {this.days.map((day, i) => {
                    return(
                        <td>{i + 1}</td>
                    );
                })}
            </tr>
            </thead>
        );
    }

    renderBody() {
        return (
            <>
                <tr>
                    {this.renderRowOfTrackerByDay("ПРОСМОТР ВЕБИНАРА", "webinarWatch")}
                    {this.renderRowOfTrackerByDay("ВЫПОЛНЕНИЕ ДОМАШНЕГО ЗАДАНИЯ", "completedHomework")}
                    {this.renderRowOfTrackerByDay("СЛОВО ДНЯ", "wordOfADay")}
                    {this.renderRowOfTrackerByDay("СЛОВАРЬ УРОКА", "dictionaryOfLesson")}
                    {this.renderRowOfTrackerByDay("УЧАСТИЕ В ЧАТЕ", "chatParticipation")}
                </tr>
            </>
        );
    }

    renderRowOfTrackerByDay(header: string, type: string) {
        return (
            <>
                <th>{header}</th>
                {this.days.map((day, i) => {
                    let trackerByDay = this.getTrackerByDay(day);
                    return(
                        <>
                            <td id={(i + 1).toString()} onClick={(e) => this.handleChange(type, Number(e.currentTarget.id))}>
                                {trackerByDay.vebinarWatch === true
                                ? <i className="fa fa-check" aria-hidden="true"/> :
                                <i className="fa fa-times" aria-hidden="true"/>
                            }
                            </td>
                        </>
                    );
                })}
            </>
        );
    }

    render() {
        return(
            <>
                {this.renderTracker(this.props.tracker)}
            </>
        );
    }

    getTrackerByDay(day: number): TrackerByDayReadModel {
        let trackerByDay = this.tracker.trackersByDay.find(t => t.day === day);
        if(trackerByDay === undefined) {
            trackerByDay = new TrackerByDayReadModel();
            trackerByDay.day = day;
        }

        return trackerByDay;
    }

    handleChange(type: string, id: number) {
        
    }

    isCompleted(trackerByDay: TrackerByDayReadModel, type: number, id: number) {
        
    }
}

export default NaStarteTracker;