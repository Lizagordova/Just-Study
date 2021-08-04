import React, {Component} from 'react';
import RootStore from "../../../stores/RootStore";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { renderSpinner } from "../../../functions/renderSpinner";
import TaskUpload from "../Tasks/TaskUpload";
import { Task } from "../../Common/Tasks/Task";
import { Alert, Button } from "reactstrap";
import { observer } from "mobx-react";
import TaskFromPoolUpload from "../../Common/Tasks/TaskFromPoolUpload";
import { makeObservable, observable } from "mobx";

class IHomeworkPageProps {
    store: RootStore;
}

@observer
class HomeworkPage extends Component<IHomeworkPageProps> {
    tasksPoolOpen: boolean = false;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            tasksPoolOpen: observable
        });
    }

    componentDidMount(): void {
        this.props.store.taskStore.getTasksByLesson(this.props.store.lessonStore.choosenLesson.id);
    }

    renderAddTaskFromPoolBankButton() {
        return (
            <div className="row justify-content-end" style={{marginLeft: "10%", marginTop: "10px"}}>
                <Button
                    style={{
                        marginLeft: "10px",
                        marginBottom: "10px",
                        height: "auto",
                        width: "30%",
                        fontSize: "0.8em"
                    }}
                    className="commonButton"
                    onClick={() => this.toggleTasksPoolOpen()}
                    outline>
                    Добавить задание из банка заданий
                </Button>
            </div>
        );
    }

    renderAddTaskFromPoolBank() {
        return (
            <>
                {this.renderAddTaskFromPoolBankButton()}
                {this.tasksPoolOpen && <TaskFromPoolUpload store={this.props.store} toggle={this.toggleTasksPoolOpen}/>}
            </>
        );
    }

    renderTasks(tasks: TaskViewModel[]) {
        return (
            <>
                {tasks.map((task) => {
                    return(
                        <Task store={this.props.store} task={task}  userId={this.props.store.userStore.currentUser.id} key={task.id} isTrainingOrPool={false} subtags={null} reviewMode={false} />
                    );
                })}
            </>
        );
    }

    render() {
        let tasks = this.props.store.taskStore.tasksByChoosenLesson;
        return(
            <>
                {this.renderAddTaskFromPoolBank()}
                {tasks === undefined && renderSpinner()}
                {tasks !== undefined && tasks.length === 0 && <Alert style={{marginTop: "10px"}} color="primary">Пока нет домашнего задания для этого урока</Alert>}
                {(tasks !== undefined && tasks.length > 0) && this.renderTasks(tasks)}
                <TaskUpload store={this.props.store} isTrainingOrPool={false}/>
            </>
        );
    }

    toggleTasksPoolOpen = () => {
        this.tasksPoolOpen = !this.tasksPoolOpen;
    }
}

export default HomeworkPage;