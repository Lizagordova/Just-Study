import React, {Component} from 'react';
import RootStore from "../../../stores/RootStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { renderSpinner } from "../../../functions/renderSpinner";
import TaskUpload from "../Tasks/TaskUpload";

class IHomeworkPageProps {
    store: RootStore;
}

class HomeworkPage extends Component<IHomeworkPageProps> {
    renderTasks(tasks: TaskViewModel[]) {
        return (
            <></>
        );
    }

    render() {
        let tasks = this.props.store.taskStore.tasksByChoosenLesson;
        return(
            <>
                {(tasks === undefined || tasks.length === 0) && renderSpinner()}
                {(tasks !== undefined && tasks.length > 0) && this.renderTasks(tasks)}
                <TaskUpload store={this.props.store}/>
            </>
        );
    }
}

export default HomeworkPage;