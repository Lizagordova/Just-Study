import React, { Component } from 'react';
import {makeObservable, observable, toJS} from "mobx";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { observer } from "mobx-react";
import { TagReadModel } from "../../../Typings/readModels/TagReadModel";
import { Task } from "./Task";
import RootStore from "../../../stores/RootStore";
import { Modal, ModalBody, Button, Alert } from  "reactstrap";

class ITaskFromPoolUploadProps {
    store: RootStore;
}

@observer
class TaskFromPoolUpload extends Component<ITaskFromPoolUploadProps> {
    tasks: TaskViewModel[] = new Array<TaskViewModel>();
    ignoreIds: number[] = new Array<number>(0);
    tasksPoolOpen: boolean;
    notAttached: boolean;

    constructor(props: ITaskFromPoolUploadProps) {
        super(props);
        makeObservable(this, {
            tasks: observable,
            ignoreIds: observable,
            tasksPoolOpen: observable,
            notAttached: observable
        });
        this.updateTasksPool();
        this.setIgnoreIds();
    }

    setIgnoreIds() {
        this.ignoreIds = this.props.store.taskStore.tasksByChoosenLesson.map(t => t.id);
        this.updateTasksPool();
    }

    updateTasksPool() {
        this.props.store.taskStore.getTasks(new Array<TagReadModel>(0), this.ignoreIds);
    }

    renderCautions() {
        setTimeout(() => {
            this.notAttached = false;
        }, 6000);
        return (
            <>
                {this.notAttached && <Alert color="danger">Что-то пошло не так и не удалось прикрепить задачу к уроку</Alert>}
            </>
        );
    }

    renderTasks(tasks: TaskViewModel[]) {
        return (
            <>
                {tasks.map(task => {
                   return (
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-10 col-sm-12">
                                <Task key={task.id} isTrainingOrPool={true} store={this.props.store} tags={null} task={task} userId={this.props.store.userStore.currentUser.id}/>
                            </div>
                            <div className="col-lg-2 col-md-2 col-sm-2">
                                <i className="fa fa-plus fa-2x" aria-hidden="true" onClick={() => this.attachTaskToLesson(task.id)} />
                            </div>
                        </div>
                    );
                })}
            </>
        );
    }

    renderBody() {
        return (
            <ModalBody>
                {this.renderTasks(this.props.store.taskStore.tasksByQuery)}
            </ModalBody>
        )
    }
    
    renderTaskFromPoolWindow() {
        return (
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.toggleTasksPoolOpen()}
            >
                <i style={{marginLeft: '92%', width: '2%'}}
                   onClick={() => this.toggleTasksPoolOpen()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                <div className="row justify-content-center">
                    БАНК ЗАДАНИЙ
                </div>
                {this.renderBody()}
            </Modal>
        )
    }

    renderButton() {
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
                    onClick={() => this.toggleTasksPoolOpen()}
                    outline color="secondary">
                    ДОБАВИТЬ ЗАДАНИЕ ИЗ БАНКА ЗАДАНИЙ
                </Button>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.tasksPoolOpen && this.renderTaskFromPoolWindow()}
                {this.renderButton()}
            </>
        );
    }

    toggleTasksPoolOpen() {
        this.tasksPoolOpen = !this.tasksPoolOpen;
    }

    attachTaskToLesson(taskId: number) {
       let lessonId = this.props.store.lessonStore.choosenLesson.id;
        this.props.store.taskStore
            .attachTaskToLesson(taskId, lessonId)
                .then((status) => {
                    if(status === 200) {
                        this.props.store.taskStore.getTasksByLesson(lessonId)
                            .then((status1) => {
                                this.setIgnoreIds();
                            });
                    }
                    this.notAttached = status !== 200;
                });
    }
}

export default TaskFromPoolUpload;