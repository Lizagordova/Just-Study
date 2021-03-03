import React, { Component } from "react";
import { makeObservable, observable } from "mobx";
import FeedbackStore from "../../../stores/FeedbackStore";
import { Nav, Card, CardHeader, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import {observer} from "mobx-react";
import {FeedbackViewModel} from "../../../Typings/viewModels/FeedbackViewModel";

class IFeedbackPageProps {
    feedbackStore: FeedbackStore;
}

@observer
class FeedbackPage extends Component<IFeedbackPageProps> {
    showNew: boolean;
    showOld: boolean;

    constructor(props: IFeedbackPageProps) {
        super(props);
        this.props.feedbackStore.getFeedbacks(false);
        makeObservable(this, {
            showNew: observable,
            showOld: observable
        })
    }

    renderMenu() {
        return (
            <Card>
                <CardHeader>
                    <Nav tabs className="nav">
                        <NavItem>
                            <NavLink to={"#"} exact className="nav-link" style={{fontSize: "1.5em"}}
                                onClick={() =>  this.feedbackToggle(ShowType.New)}
                                >Новые</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={"#"}
                                exact className="nav-link" style={{fontSize: "1.5em"}}
                                onClick={() =>  this.feedbackToggle(ShowType.Old)}>Старые</NavLink>
                        </NavItem>
                    </Nav>
                </CardHeader>
            </Card>
        );
    }

    renderFeedbacks(feedbacks: FeedbackViewModel[]) {
        return(
            <>
                {feedbacks.map((f) => {
                    return (
                        <div className="row" style={{border: "1px solid black", marginTop: "5px"}}>
                            <span style={{fontSize: "1.2em"}}><b>{f.name} {f.email}</b></span>
                            <span style={{fontSize: "0.8em"}}>{f.message}</span>
                        </div>
                    );
                })}
            </>
        );
    }

    render() {
        return (
            <>
                {this.renderMenu()}
                {this.renderFeedbacks(this.props.feedbackStore.feedbacks)}
            </>
        );
    }

    feedbackToggle(type: ShowType) {
        if(type === ShowType.New) {
            this.showNew = true;
            this.showOld = false;
            this.props.feedbackStore.getFeedbacks(false);
        } else if(type === ShowType.Old) {
            this.showNew = false;
            this.showOld = true;
            this.props.feedbackStore.getFeedbacks(true);
        }
    }
}

enum ShowType {
    New, 
    Old
}

export default FeedbackPage;