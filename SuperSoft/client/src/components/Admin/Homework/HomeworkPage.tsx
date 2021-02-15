import React, {Component} from 'react';
import RootStore from "../../../stores/RootStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { renderSpinner } from "../../../functions/renderSpinner";
import TaskUpload from "../Tasks/TaskUpload";
import { Task } from "../../Common/Tasks/Task";
import { Alert } from "reactstrap";
import { observer } from "mobx-react";

class IHomeworkPageProps {
    store: RootStore;
}

@observer
class HomeworkPage extends Component<IHomeworkPageProps> {
    renderTasks(tasks: TaskViewModel[]) {
        return (
            <>
                {tasks.map((task) => {
                    return(
                        <Task store={this.props.store} task={task}  userId={this.props.store.userStore.currentUser.id}/>
                    );
                })}
            </>
        );
    }

    render() {
        let tasks = this.props.store.taskStore.tasksByChoosenLesson;
        return(
            <>
                {tasks === undefined && renderSpinner()}
                {tasks.length === 0 && <Alert style={{marginTop: "10px"}} color="primary">Пока нет домашнего задания для этого урока</Alert>}
                {(tasks !== undefined && tasks.length > 0) && this.renderTasks(tasks)}
                <TaskUpload store={this.props.store}/>
            </>
        );
    }
}

export default HomeworkPage;