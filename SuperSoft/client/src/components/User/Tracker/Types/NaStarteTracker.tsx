import React, { Component } from 'react';
import { TrackerViewModel } from "../../../../Typings/viewModels/TrackerViewModel";
import TrackerStore from "../../../../stores/TrackerStore";
import { Table } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";
import { TrackerReadModel } from "../../../../Typings/readModels/TrackerReadModel";
import { mapToTrackerReadModel } from "../../../../functions/mapper";
import { TrackerByDayReadModel } from "../../../../Typings/readModels/TrackerByDayReadModel";

class INaStarteTrackerProps {
    tracker: TrackerViewModel;
    trackerStore: TrackerStore;
    userId: number;
    courseId: number;
}

@observer
class NaStarteTracker extends Component<INaStarteTrackerProps> {
    days: number[] = new Array<number>(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    tracker: TrackerReadModel = new TrackerReadModel();

    constructor(props: INaStarteTrackerProps) {
        super(props);
        makeObservable(this, {
            tracker: observable
        });
        this.tracker = mapToTrackerReadModel(this.props.tracker, this.props.userId, this.props.courseId, this.days.length);
    }

    componentWillUnmount(): void {
        this.addOrUpdateTracker();
    }

    renderTracker() {
        return(
            <Table>
                {this.renderHead()}
                {this.renderBody()}
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
                    {this.renderRowOfTrackerByDay(TrackerType.WebinarWatch)}
                    {this.renderRowOfTrackerByDay(TrackerType.CompletedHomework)}
                    {this.renderRowOfTrackerByDay(TrackerType.WordOfADay)}
                    {this.renderRowOfTrackerByDay(TrackerType.DictionaryOfLesson)}
                    {this.renderRowOfTrackerByDay(TrackerType.ChatParticipation)}
                </tr>
            </>
        );
    }

    renderRowOfTrackerByDay(type: TrackerType) {
        return (
            <>
                <th>{this.getHeader(type)}</th>
                {this.days.map((day, i) => {
                    let trackerByDay = this.getTrackerByDay(day);
                    return(
                        <>
                            <td id={day.toString()} onClick={(e) => this.handleChange(type, Number(e.currentTarget.id))}>
                                {this.isCompleted(trackerByDay, type)
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
                {this.renderTracker()}
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

    handleChange(type: TrackerType, day: number) {
        let trackerByDay = this.tracker.trackersByDay.filter(t => t.day === day)[0];
        let index = this.tracker.trackersByDay.indexOf(trackerByDay);
        if(type === TrackerType.ChatParticipation) {
            trackerByDay.chatParticipation = !trackerByDay.chatParticipation;
        } else if(type === TrackerType.CompletedHomework) {
            trackerByDay.completedHomework = !trackerByDay.completedHomework;
        } else if(type === TrackerType.DictionaryOfLesson) {
            trackerByDay.dictionaryOfLesson = !trackerByDay.dictionaryOfLesson;
        } else if(type === TrackerType.WordOfADay) {
            trackerByDay.wordOfADay = !trackerByDay.wordOfADay;
        } else if(type === TrackerType.WebinarWatch) {
            trackerByDay.webinarWatch = !trackerByDay.webinarWatch;
        }
        this.tracker.trackersByDay[index] = trackerByDay;
    }

    isCompleted(trackerByDay: TrackerByDayReadModel, type: TrackerType): boolean {
        if(type === TrackerType.ChatParticipation) {
            return trackerByDay.chatParticipation;
        } else if(type === TrackerType.CompletedHomework) {
            return trackerByDay.completedHomework;
        } else if(type === TrackerType.DictionaryOfLesson) {
            return trackerByDay.dictionaryOfLesson;
        } else if(type === TrackerType.WordOfADay) {
            return trackerByDay.wordOfADay;
        } else if(type === TrackerType.WebinarWatch) {
            return trackerByDay.webinarWatch;
        }

        return false;
    }

    getHeader(type: TrackerType): string {
        if(type === TrackerType.ChatParticipation) {
            return "УЧАСТИЕ В ЧАТЕ";
        } else if(type === TrackerType.CompletedHomework) {
            return "ВЫПОЛНЕНИЕ ДОМАШНЕГО ЗАДАНИЯ";
        } else if(type === TrackerType.DictionaryOfLesson) {
            return "СЛОВАРЬ УРОКА";
        } else if(type === TrackerType.WordOfADay) {
            return "СЛОВО ДНЯ";
        } else if(type === TrackerType.WebinarWatch) {
            return "ПРОСМОТР ВЕБИНАРА";
        }
        return "";
    }

    addOrUpdateTracker() {
        this.props.trackerStore.addOrUpdateTracker(this.tracker);
    }
}

export default NaStarteTracker;

enum TrackerType {
    WebinarWatch,
    CompletedHomework,
    WordOfADay,
    DictionaryOfLesson,
    ChatParticipation
}