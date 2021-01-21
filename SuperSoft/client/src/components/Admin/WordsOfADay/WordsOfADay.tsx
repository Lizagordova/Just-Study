import React, { Component } from 'react';
import { observer } from "mobx-react";
import Calendar from "react-calendar";
import { makeObservable, observable } from "mobx";
import { Alert, Button } from "reactstrap";
import WordOfADay from "../../Common/WordsOfADay/WordOfADay";
import WordStore from "../../../stores/WordStore";
import UserStore from "../../../stores/UserStore";

class IWordsOfADayProps {
    wordStore: WordStore;
    userStore: UserStore;
}

@observer
class WordsOfADay extends Component<IWordsOfADayProps> {
    choosenDate: Date | Date[];

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            choosenDate: observable
        });
    }

    renderCalendar() {
        return(
            <Calendar
                value={this.choosenDate}
                onChange={(date) => this.inputDate(date)}
            />
        );
    }

    renderWordOfADay() {
        return(
            <>
                {this.state.itIsNotAllowedToWatchNextWords && <Alert color="primary">Пока нельзя смотреть слова дня на следующие дни:)</Alert>}
                <WordOfADay date={this.choosenDate}/>
            </>
        );
    }
    
    renderUserAnswers() {
        let role = this.props
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                        {this.renderCalendar()}
                    </div>
                    <div className="col-lg-9 col-md-6 col-sm-12 col-xs-12">
                        {this.renderWordOfADay()}
                    </div>
                </div>
                {this.state.role == '2' && <div className="row justify-content-center">
                    {!this.state.userAnswers &&
                    <Button outline color="secondary" onClick={() => this.getUserAnswers()}>
                        ПОЛУЧИТЬ ОТВЕТЫ ПОЛЬЗОВАТЕЛЕЙ
                    </Button>}
                    {this.state.userAnswers && <UserAnswers wordId={this.state.id}/>}
                </div>}
            </div>
        );
    }

    inputDate(date: Date | Date[]) {
        this.choosenDate = date;
    }
}

export class WordsOfADay;