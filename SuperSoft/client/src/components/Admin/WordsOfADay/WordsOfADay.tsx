import React, {Component} from 'react';
import {observer} from "mobx-react";
import Calendar from "react-calendar";
import {makeObservable, observable} from "mobx";
import {Button} from "reactstrap";
import WordOfADay from "../../Common/WordsOfADay/WordOfADay";
import RootStore from "../../../stores/RootStore";
import {UserRole} from "../../../Typings/enums/UserRole";

class IWordsOfADayProps {
    store: RootStore
}

@observer
class WordsOfADay extends Component<IWordsOfADayProps> {
    choosenDate: Date | Date[];
    showUserAnswers: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            choosenDate: observable,
            showUserAnswers: observable,
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
                <WordOfADay date={this.choosenDate} store={this.props.store}/>
            </>
        );
    }
    
    renderGetUserAnswersButton() {
        return(
            <>
                {<Button outline color="secondary" onClick={() => this.getUserAnswers()}>
                    ПОЛУЧИТЬ ОТВЕТЫ ПОЛЬЗОВАТЕЛЕЙ
                </Button>}</>
        );
    }

    renderUserAnswers() {
        return (
            <UserAnswers wordId={this.state.id}/>
        );
    }

    renderUserAnswersControl() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
                <>
                    {!this.showUserAnswers && this.renderGetUserAnswersButton()}
                    {this.showUserAnswers && this.renderUserAnswers()}
                </>
            );
        }
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
                <div className="row justify-content-center">
                    {this.renderUserAnswersControl()}
                </div>
            </div>
        );
    }

    inputDate(date: Date | Date[]) {
        this.choosenDate = date;
    }
}

export default WordsOfADay;