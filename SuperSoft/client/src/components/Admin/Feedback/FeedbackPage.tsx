import React, { Component } from "react";
import {makeObservable, observable, toJS} from "mobx";
import FeedbackStore from "../../../stores/FeedbackStore";
import {  Card, Alert, NavItem, NavLink } from "reactstrap";
import { Nav } from "react-bootstrap";
import {observer} from "mobx-react";
import {FeedbackViewModel} from "../../../Typings/viewModels/FeedbackViewModel";
import Feedback from "../../Common/Feedback/Feedback";

class IFeedbackPageProps {
    feedbackStore: FeedbackStore;
}

@observer
class FeedbackPage extends Component<IFeedbackPageProps> {
    showNew: boolean;
    showOld: boolean;
    activeKey: string;

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
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <Nav variant="tabs" defaultActiveKey="new" activeKey={this.activeKey} style={{marginTop: "10px"}}>
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="new"
                                    className="nav-link" style={{fontSize: "1.5em"}}
                                    onClick={() =>  this.feedbackToggle(ShowType.New)}
                                >Новые</Nav.Link>
                            </Nav.Item>
                            <NavItem>
                                <NavLink
                                    eventKey="old"
                                    className="nav-link"
                                    style={{fontSize: "1.5em"}}
                                    onClick={() =>  this.feedbackToggle(ShowType.Old)}>Старые</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                 </div>
            </Card>
        );
    }

    renderFeedbacks(feedbacks: FeedbackViewModel[]) {
        if(feedbacks.length === 0) {
            return (
                <Alert style={{marginTop: "10px"}}>
                    Пока нет никаких фидбеков.
                </Alert>
            );
        } else {
            return(
                <>
                    {feedbacks.map((f) => {
                        return (
                            <Feedback key={f.id} feedback={f} feedbackStore={this.props.feedbackStore} old={this.showOld}/>
                        )})}
                </>
            );
        }
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
            this.activeKey = "new";
            this.props.feedbackStore.getFeedbacks(false);
        } else if(type === ShowType.Old) {
            this.showNew = false;
            this.showOld = true;
            this.activeKey = "old";
            this.props.feedbackStore.getFeedbacks(true);
        }
    }
}

enum ShowType {
    New, 
    Old
}

export default FeedbackPage;