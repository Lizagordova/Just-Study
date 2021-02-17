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

class ITaskProps {
    store: RootStore;
    task: TaskViewModel;
    userId: number;
}

@observer
export class Task extends Component<ITaskProps> {
    notDeleted: boolean;
    editTaskWindowOpen: boolean;
    addSubtask: boolean;
    userTask: UserTaskViewModel = new UserTaskViewModel();

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            notDeleted: observable,
            editTaskWindowOpen: observable,
            addSubtask: observable,
        });
    }

    addSubtaskToggle() {
        this.addSubtask = !this.addSubtask;
    }

    renderControlButtons() {
        let role = this.props.store.userStore.currentUser.role;
        if(role === UserRole.Admin) {
            return(
            <>
                <i style={{marginLeft: '98%', width: '2%'}}
                   onClick={() => this.deleteTask()}
                   className="fa fa-window-close" aria-hidden="true"/>
                <i style={{marginLeft: '98%', width: '2%'}}
                    onClick={() => this.editTaskToggle()}
                    className="fa fa-edit" aria-hidden="true"/>
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
            let taskType = this.props.task.taskType;
            return(
                <>
                    {this.addSubtask && <AddSubtask order={order} taskId={taskId} taskStore={this.props.store.taskStore} taskType={taskType} toggle={this.addSubtaskToggle}/>}
                </>
            );
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
                    {this.renderSubtasks(task.subtasks)}
                </CardBody>
                {this.renderAddSubtask()}
            </Card>
        )
    }

    renderSubtasks(subtasks: SubtaskViewModel[]) {
       return(
           <>
               {subtasks.map((subtask) => {
                   return(
                       <>{this.renderSubtask(subtask)}</>
                   );
               })}
               {this.renderAddSubtaskButton()}
           </>
       );
    }

    renderSubtask(subtask: SubtaskViewModel) {
        let userId = this.props.userId;
        let userSubtask = this.userTask.userSubtasks.find(u => u.subtaskId === subtask.id);
        let taskId = this.props.task.id;
        if(userSubtask === undefined) {
            userSubtask = new UserSubtaskViewModel();
        }
        if(subtask.subtaskType === SubtaskType.DetailedAnswer) {
            return(
                <DetailedAnswerSubtask subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id} />
            );
        } else if(subtask.subtaskType === SubtaskType.FillGaps) {
            return(
                <FillGapsSubtask subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id}/>
            );
        } /*else if(subtask.subtaskType === SubtaskType.InsertWordsIntoGaps) {
            return(
                <InsertWordsIntoGapsSubtask subtask={subtask} store={this.props.store} userSubtask={userSubtask} />
            );
        }*/ else if(subtask.subtaskType === SubtaskType.LoadAudio) {
            return(
                <LoadAudioSubtask subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id}/>
            );
        } else if(subtask.subtaskType === SubtaskType.RightVerbForm) {
            return(
                <RightVerbFormSubtask subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id}/>
            );
        } else if(subtask.subtaskType === SubtaskType.LoadFile) {
            return(
                <LoadFileSubtask subtask={subtask} store={this.props.store} userId={userId} userSubtask={userSubtask} taskId={taskId} key={subtask.id}/>
            );
        }
    }

    render() {
        let task = this.props.task;
        console.log("task", toJS(task));
        return(
            <>
                {this.renderTask(task)}
                {this.notDeleted &&  <Alert className="alertSaved" color="danger">Что-то пошло не так, задание не удалилось:(</Alert>}
                {this.editTaskWindowOpen && <TaskEdit task={task} taskStore={this.props.store.taskStore} toggle={this.editTaskToggle} lessonId={this.props.store.lessonStore.choosenLesson.id}/>}
            </>
        );
    }

    deleteTask() {
        let result = window.confirm('Вы уверены, что хотите удалить ВСЁ задание?');
        if(result) {
            this.props.store.taskStore
                .deleteTask(this.props.task.id, this.props.store.lessonStore.choosenLesson.id)
                    .then((status) => {
                        this.notDeleted = status !== 200;
                    });
            }
    }

    editTaskToggle() {
        this.editTaskWindowOpen = !this.editTaskWindowOpen;
    }
}