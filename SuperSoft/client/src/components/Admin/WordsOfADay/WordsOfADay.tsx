import React, { Component } from 'react';
import { observer } from "mobx-react";
import Calendar from "react-calendar";
import {makeObservable, observable} from "mobx";
import WordOfADay from "../../Common/WordsOfADay/WordOfADay";
import RootStore from "../../../stores/RootStore";

class IWordsOfADayProps {
    store: RootStore
}

@observer
class WordsOfADay extends Component<IWordsOfADayProps> {
    choosenDate: Date | Date[] = new Date();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            choosenDate: observable
        });
    }

    renderCalendar() {
        const choosenDate = typeof this.choosenDate === "string" ? new Date(this.choosenDate) : this.choosenDate;
        return(
            <Calendar
                value={choosenDate}
                onChange={(date) => this.inputDate(date)}
            />
        );
    }

    renderWordOfADay() {
        return(
            <>
                <WordOfADay date={this.choosenDate} store={this.props.store}/>
            </>
        );
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        {this.renderCalendar()}
                    </div>
                    <div className="col-lg-9 col-md-6 col-sm-12 col-xs-12">
                        {this.renderWordOfADay()}
                    </div>
                </div>
            </div>
        );
    }

    inputDate(date: Date | Date[]) {
        this.choosenDate = date;
    }
}

export default WordsOfADay;