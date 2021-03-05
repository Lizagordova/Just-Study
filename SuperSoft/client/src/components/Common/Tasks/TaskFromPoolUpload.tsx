import React, { Component } from 'react';
import {makeObservable, observable, toJS} from "mobx";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { observer } from "mobx-react";
import { TagReadModel } from "../../../Typings/readModels/TagReadModel";
import { Task } from "./Task";
import RootStore from "../../../stores/RootStore";
import { Modal, ModalBody, Button, Alert } from  "reactstrap";
import {TagViewModel} from "../../../Typings/viewModels/TagViewModel";

class ITaskFromPoolUploadProps {
    store: RootStore;
}

@observer
class TaskFromPoolUpload extends Component<ITaskFromPoolUploadProps> {
    choosenTags: TagViewModel[] = new Array<TagViewModel>();
    ignoreIds: number[] = new Array<number>(0);
    tasksPoolOpen: boolean;
    notAttached: boolean;
    notReceived: boolean;
    update: boolean = false;

    constructor(props: ITaskFromPoolUploadProps) {
        super(props);
        makeObservable(this, {
            ignoreIds: observable,
            tasksPoolOpen: observable,
            notAttached: observable,
            choosenTags: observable,
            update: observable,
            notReceived: observable
        });
        this.updateTasksPool();
        this.setIgnoreIds();
    }

    setIgnoreIds() {
        this.ignoreIds = this.props.store.taskStore.tasksByChoosenLesson.map(t => t.id);
        this.updateTasksPool();
    }

    componentDidUpdate(prevProps: Readonly<ITaskFromPoolUploadProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(this.ignoreIds !== this.props.store.taskStore.tasksByChoosenLesson.map(t => t.id)) {
            this.setIgnoreIds();
        }
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
        if(tasks.length > 0) {
            return (
                <>
                    {tasks.map(task => {
                        return (
                            <div className="row justify-content-center" style={{marginTop: "10px"}}>
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
        } else {
            return (
                <Alert color="primary">Пока нет заданий по заданным критериям в банке заданий.</Alert>
            );
        }
    }

    renderBody() {
        return (
            <ModalBody>
                {this.renderTasks(this.props.store.taskStore.tasksByQuery)}
            </ModalBody>
        )
    }

    renderApplyButton() {
        return (
            <div className="row justify-content-center" style={{marginTop: "10px", marginBottom: "10px"}}>
                <Button
                    color="primary"
                    style={{width: '50%'}}
                    onClick={() => this.applyTags()}>
                    ПРИМЕНИТЬ
                </Button>
            </div>
        );
    }

    renderTags(tags: TagViewModel[], update: boolean) {
        return (
            <div className="row" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                {tags.map((tag, i) => {
                    let outline = !this.choosenTags.includes(tag);
                    if(tag.id !== 1 && tag.id !== 2 && tag.id !== 3) {//todo: неприятный хардкод 
                        return (
                            <Button
                                outline={outline} color="primary"
                                style={{
                                    marginLeft: "10px",
                                    marginBottom: "10px",
                                    height: "auto",
                                    width: "auto",
                                    fontSize: "0.8em"
                                }}
                                active={false}
                                key={i}
                                onClick={() => this.toggleTag(tag)}>
                                {tag.name}
                            </Button>
                        );
                    }
                })}
            </div>
        );
    }

    renderFilters(tags: TagViewModel[]) {
        if(tags.length > 0) {
            return(
                <>
                    {this.renderTags(tags, this.update)}
                    {this.renderApplyButton()}
                </>
            );
        }
    }

    renderTaskFromPoolWindow() {
        let tags = this.props.store.taskStore.tags;
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
                {this.renderFilters(tags)}
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

    applyTags() {
        this.props.store.taskStore
            .getTasks(this.choosenTags)
            .then((status) => {
                this.notReceived = status !== 200;
            });
    }

    updateToggle() {
        this.update = !this.update;
    }

    toggleTag(tag: TagViewModel) {
        if(this.choosenTags.filter(t => t.id === tag.id).length > 0) {
            let choosenTags = this.choosenTags
                .filter(t => t !== tag);
            this.choosenTags = choosenTags;
        } else {
            this.choosenTags.push(tag);
        }
        this.updateToggle();
    }
}

export default TaskFromPoolUpload;