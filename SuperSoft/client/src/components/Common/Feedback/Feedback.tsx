import React, { Component } from "react";
import { FeedbackViewModel } from "../../../Typings/viewModels/FeedbackViewModel";
import { observer } from "mobx-react";
import FeedbackStore from "../../../stores/FeedbackStore";
import { Button } from "reactstrap";
import { mapToFeedbackReadModel } from "../../../functions/mapper";

class IFeedbackProps {
    feedback: FeedbackViewModel;
    feedbackStore: FeedbackStore;
    old: boolean;
}

@observer
class Feedback extends Component<IFeedbackProps> {
    renderFeedback(feedback: FeedbackViewModel) {
        return (
            <div className="row" style={{border: "1px solid black", marginTop: "5px", marginBottom: "5px", marginLeft: "5px"}}>
                <div className="col-lg-3 col-md-3 col-sm-12">
                    <span><b>{feedback.name} {feedback.email}</b></span>
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12" style={{marginBottom: "10px", marginTop: "10px"}}>
                    <span style={{fontSize: "0.8em"}}>{feedback.message}</span>
                </div>
                <div className="col-lg-2 col-md-2 col-sm-12" style={{marginBottom: "10px", marginTop: "10px"}}>
                    <Button
                        style={{marginLeft: "10px"}}
                        outline color="secondary"
                        onClick={() => this.addOrUpdateFeedback(feedback)}>
                        {this.getButtonName()}
                    </Button>
                </div>
            </div>
        );
    }

    render() {
        return(
            <>
                {this.renderFeedback(this.props.feedback)}
            </>
        );
    }

    addOrUpdateFeedback(feedback: FeedbackViewModel) {
        let feedbackReadModel = mapToFeedbackReadModel(feedback, !this.props.old);
        this.props.feedbackStore
            .addOrUpdateFeedback(feedbackReadModel)
            .then(() => {
                this.props.feedbackStore.getFeedbacks(this.props.old)
            });
    }

    getButtonName(): string {
        let name = "";
        if(this.props.old) {
            name = "Разархивировать";
        } else {
            name = "Архивировать"
        }
        
        return name;
    }
}

export default Feedback;