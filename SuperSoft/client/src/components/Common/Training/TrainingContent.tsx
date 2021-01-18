import React, { Component } from "react";
import TaskStore from "../../../stores/TaskStore";
import { Button } from "reactstrap";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { observer } from "mobx-react";

class ITrainingContentProps {
    taskStore: TaskStore;
}

@observer
class TrainingContent extends Component<ITrainingContentProps> {
    choosenTags: TagViewModel[];

    constructor() {
        // @ts-ignore
        super();
    }
    renderFilters() {
        let tags = this.props.taskStore.tags;
        return(
            <>
                {tags.map((tag) => {
                    return(
                        <Button >
                            {tag.name}
                        </Button>
                    );
                })}
            </>
        );
    }

    renderTasks() {
        return(
            <></>
        );
    }

    render() {
        return(
            <>
                {this.renderFilters()}
                {this.renderTasks()}
            </>
        )
    }
}

export default TrainingContent;