﻿import React, { Component } from 'react';
import {makeObservable, observable, toJS} from "mobx";
import { TaskViewModel } from "../../../Typings/viewModels/TaskViewModel";
import { observer } from "mobx-react";
import { TagReadModel } from "../../../Typings/readModels/TagReadModel";
import { Task } from "./Task";
import RootStore from "../../../stores/RootStore";
import { Modal, ModalBody, Button, Alert } from  "reactstrap";
import { TagViewModel } from "../../../Typings/viewModels/TagViewModel";
import { SubtagReadModel } from "../../../Typings/readModels/SubtagReadModel";
import { SubtagViewModel } from "../../../Typings/viewModels/SubtagViewModel";
import { mapToSubtagReadModel } from "../../../functions/mapper";

class ITaskFromPoolUploadProps {
    store: RootStore;
    toggle: any;
}

@observer
class TaskFromPoolUpload extends Component<ITaskFromPoolUploadProps> {
    choosenSubtags: SubtagViewModel[] = new Array<SubtagViewModel>();
    ignoreIds: number[] = new Array<number>(0);
    notAttached: boolean;
    notReceived: boolean;
    update: boolean = false;

    constructor(props: ITaskFromPoolUploadProps) {
        super(props);
        makeObservable(this, {
            ignoreIds: observable,
            notAttached: observable,
            choosenSubtags: observable,
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

    updateTasksPool() {
        this.props.store.taskStore.getTasks(new Array<SubtagReadModel>(0), new Array<TagReadModel>(0), this.ignoreIds);
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
                                    <Task key={task.id} isTrainingOrPool={true} store={this.props.store} subtags={null} task={task} userId={this.props.store.userStore.currentUser.id} reviewMode={false} />
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
                    Применить
                </Button>
            </div>
        );
    }

    renderSubtags(subtags: SubtagViewModel[], update: boolean) {
        return (
            <div className="row" style={{marginTop: "10px", marginLeft: "10px", marginRight: "10px"}}>
                {subtags.map((subtag, i) => {
                    let outline = !this.choosenSubtags.includes(subtag);
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
                            onClick={() => this.toggleSubtag(subtag)}>
                            {subtag.name}
                        </Button>
                    );
                })}
            </div>
        );
    }

    renderFilters(tags: TagViewModel[]) {
        if(tags.length > 0) {
            return(
                <>
                    {this.renderSubtags(tags, this.update)}
                    {this.renderApplyButton()}
                </>
            );
        }
    }

    renderTaskFromPoolWindow() {
        let tags = this.props.store.tagStore.tags;
        return (
            <Modal
                centered={true}
                size="lg"
                isOpen={true}
                toggle={() => this.props.toggle()}
            >
                <i style={{marginLeft: '92%', width: '2%'}}
                   onClick={() => this.props.toggle()}
                   className="fa fa-window-close fa-2x" aria-hidden="true"/>
                <div className="row justify-content-center">
                   Банк заданий
                </div>
                {this.renderFilters(tags)}
                {this.renderBody()}
            </Modal>
        )
    }

    render() {
        return (
            <>
                {this.renderTaskFromPoolWindow()}
            </>
        );
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
            .getTasks(this.choosenSubtags.map(mapToSubtagReadModel))
            .then((status) => {
                this.notReceived = status !== 200;
            });
    }

    updateToggle() {
        this.update = !this.update;
    }

    toggleSubtag(subtag: SubtagViewModel) {
        if(this.choosenSubtags.filter(t => t.id === subtag.id).length > 0) {
            let choosenSubtags = this.choosenSubtags
                .filter(t => t !== subtag);
            this.choosenSubtags = choosenSubtags;
        } else {
            this.choosenSubtags.push(subtag);
        }
        this.updateToggle();
    }
}

export default TaskFromPoolUpload;