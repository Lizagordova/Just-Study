import React, {Component} from 'react';
import {TaskViewModel} from "../../../Typings/viewModels/TaskViewModel";
import {Alert, Button, Card, CardBody, CardTitle} from 'reactstrap';
import {UserRole} from "../../../Typings/enums/UserRole";
import RootStore from "../../../stores/RootStore";
import {makeObservable, observable, toJS} from "mobx";
import {observer} from "mobx-react";
import {SubtaskViewModel} from "../../../Typings/viewModels/SubtaskViewModel";
import {SubtaskType} from "../../../Typings/enums/SubtaskType";
import {DetailedAnswerSubtask} from "./DetailedAnswerSubtask";
import {TaskEdit} from "../../Admin/Tasks/TaskEdit";
import {FillGapsSubtask} from "./FillGapsSubtask";
import {LoadAudioSubtask} from "./LoadAudioSubtask";
import {RightVerbFormSubtask} from "./RightVerbFormSubtask";
import {LoadFileSubtask} from "./LoadFileSubtask";
import {UserTaskViewModel} from "../../../Typings/viewModels/UserTaskViewModel";
import {UserSubtaskViewModel} from "../../../Typings/viewModels/UserSubtaskViewModel";
import AddSubtask from "../../Admin/Tasks/AddSubtask";
import {TaskType} from "../../../Typings/enums/TaskType";
import {TagViewModel} from "../../../Typings/viewModels/TagViewModel";
import {TagReadModel} from "../../../Typings/readModels/TagReadModel";

class ITaskProps {
    store: RootStore;
    task: TaskViewModel;
    userId: number;
    isTraining: boolean;
    tags: TagReadModel[] | null;
}

@observer
export class Task extends Component<ITaskProps> {
    notDeleted: boolean;
    editTaskWindowOpen: boolean;
    addSubtask: boolean;
    userTask: UserTaskViewModel = new UserTaskViewModel();
    update: boolean;

    constructor(props: ITaskProps) {
        super(props);
        makeObservable(this, {
            notDeleted: observable,
            editTaskWindowOpen: observable,
            addSubtask: observable,
            update: observable
        });
        this.getUserTask();
    }

    updateToggle() {
        this.update = !this.update;
    }

    componentDidUpdate(prevProps: Readonly<ITaskProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if(prevProps.task !== this.props.task) {
            this.getUserTask();
        }
    }

    getUserTask = () => {
        this.props.store.taskStore
            .getUserTask(this.props.task.id, this.props.userId)
            .then((userTask) => {
                this.userTask = userTask;
                this.updateToggle();
            });
    };

    addSubtaskToggle = () => {
        this.addSubtask = !this.addSubtask;
    };

    renderEditButton() {
        if(this.props.task.taskType !== TaskType.RightVerbForm && this.props.task.taskType !== TaskType.FillGaps) {
            return (
                <i style={{marginLeft: '98%', width: '2%'}}
                   onClick={() => this.editTaskToggle()}
                   className="fa fa-edit" aria-hidden="true"/>
            );
        }
    }
    
    renderDeleteButton() {
        return (
            <i style={{marginLeft: '98%', width: '2%'}}
               onClick={() => this.deleteTask()}
               className="fa fa-window-close" aria-hidden="true"/>
        );
    }

    renderControlButtons() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
            <>
                {this.renderDeleteButton()}
                {this.renderEditButton()}
            </>
            );
        }
    }

    renderAddSubtaskButton() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
                <Button className="addTask"
                     onClick={() => this.addSubtaskToggle()}
                     outline color="secondary">
                    <span className="addTaskText">
                        {!this.addSubtask ? 'ДОБАВИТЬ ПОДЗАДАНИЕ' : 'ОТМЕНИТЬ'}
                    </span>
                </Button>
            );
        }
    }

    renderAddSubtask() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            let order = this.props.task.subtasks.length;
            let taskId = this.props.task.id;
            if(this.addSubtask) {
                return(
                    <div className="row justify-content-center" style={{border: "1px solid black"}}>
                        {this.addSubtask && <AddSubtask order={order} taskId={taskId} taskStore={this.props.store.taskStore} toggle={this.addSubtaskToggle}/>}
                    </div>
                );
            }
        }
    }

    renderInstruction(task: TaskViewModel) {
        return(
            <CardTitle className="text-center" dangerouslySetInnerHTML={{__html: task.instruction}}/>
        );
    }

    renderText(task: TaskViewModel) {
        if(task.text !== undefined && task.text !== "") {
            return(
                <CardTitle className="text-center" dangerouslySetInnerHTML={{__html: task.text}}/>
            );
        }
    }

    renderTask(task: TaskViewModel) {
        return(
            <Card style={{width: '100%'}}>
                {this.renderControlButtons()}
                {this.renderInstruction(task)}
                {this.renderText(task)}
                <CardBody style={{marginLeft: '5%'}}>
                    {this.renderSubtasks(task.subtasks, this.update)}
                </CardBody>
                {this.renderAddSubtask()}
            </Card>
        )
    }

    renderSubtasks(subtasks: SubtaskViewModel[], update: boolean) {
       return(
           <>
               {subtasks.map((subtask, i) => {
                   return(
                       <>{this.renderSubtask(subtask, i, update)}</>
                   );
               })}
               {this.renderAddSubtaskButton()}
           </>
       );
    }

    renderSubtask(subtask: SubtaskViewModel, order: number, update: boolean) {
        let userId = this.props.userId;
        let userSubtask = this.userTask.userSubtasks.find(u => u.subtaskId === subtask.id);
        let taskId = this.props.task.id;
        if(userSubtask === undefined) {
            userSubtask = new UserSubtaskViewModel();
        }
        if(subtask.subtaskType === SubtaskType.DetailedAnswer) {
            return(
                <DetailedAnswerSubtask updateUserTask={this.getUserTask} subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id} order={order} />
            );
        } else if(subtask.subtaskType === SubtaskType.FillGaps) {
            return(
                <FillGapsSubtask updateUserTask={this.getUserTask} subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id} order={order} />
            );
        } /*else if(subtask.subtaskType === SubtaskType.InsertWordsIntoGaps) {
            return(
                <InsertWordsIntoGapsSubtask subtask={subtask} store={this.props.store} userSubtask={userSubtask} />
            );
        }*/ else if(subtask.subtaskType === SubtaskType.LoadAudio) {
            return(
                <LoadAudioSubtask updateUserTask={this.getUserTask} subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id} order={order} />
            );
        } else if(subtask.subtaskType === SubtaskType.RightVerbForm) {
            return(
                <RightVerbFormSubtask updateUserTask={this.getUserTask} subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id} order={order} />
            );
        } else if(subtask.subtaskType === SubtaskType.LoadFile) {
            return(
                <LoadFileSubtask updateUserTask={this.getUserTask} subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id} order={order} />
            );
        }
    }

    render() {
        let task = this.props.task;
        setTimeout(() => {
            this.notDeleted = false;
        }, 6000);
        return(
            <>
                {this.renderTask(task)}
                {this.notDeleted &&  <Alert className="alertSaved" color="danger">Что-то пошло не так, задание не удалилось:( Попробуйте ещё раз</Alert>}
                {this.editTaskWindowOpen && <TaskEdit task={task} taskStore={this.props.store.taskStore} toggle={this.editTaskToggle} lessonId={this.props.store.lessonStore.choosenLesson.id}/>}
            </>
        );
    }

    deleteTask() {
        let result = window.confirm('Вы уверены, что хотите удалить ВСЁ задание?');
        if(result) {
            this.props.store.taskStore
                .deleteTask(this.props.task.id)
                    .then((status) => {
                        if(this.props.isTraining) {
                            if(this.props.tags !== null) {
                                this.props.store.taskStore.getTasks(this.props.tags);
                            } else {
                                this.props.store.taskStore.getTasks(new Array<TagReadModel>(0));
                            }
                        } else {
                            this.props.store.taskStore.getTasksByLesson(this.props.store.lessonStore.choosenLesson.id);
                        }
                        this.notDeleted = status !== 200;
                    });
            }
    }

    editTaskToggle = () => {
        this.editTaskWindowOpen = !this.editTaskWindowOpen;
    }
}