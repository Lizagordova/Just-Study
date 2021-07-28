import React from "react";
import RootStore from "../../stores/RootStore";
import { Label, Input, Button, Alert }from "reactstrap";
import { observer } from "mobx-react";
import {makeObservable, observable, toJS} from "mobx";

interface IAuthorizationProps {
    store: RootStore;
}

@observer
export class Authorization extends React.Component<IAuthorizationProps> {
    login: string;
    password: string;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            login: observable,
            password: observable
        });
    }

    renderWarnings() {
        setTimeout(() => {
            this.props.store.userStore.wrongCredetianalsToggle(false);
        }, 6000);
        return(
            <>
                {this.props.store.userStore.wrongCredetianals && <div className="row justify-content-center">
                    <Alert color="danger" style={{width: "90%"}}>Пользователя с такими данными не существует. Попробуйте ещё раз</Alert>
                </div> }
            </>
        );
    }

    renderLoginInput() {
        return (
            <>
                <Label className="formLabel">Логин</Label>
                <Input
                    style={{width: "80%"}}
                    onChange={(e) => this.inputLogin(e)}/>
            </>
        );
    }

    renderPasswordInput() {
        return (
            <>
                <Label className="formLabel">Пароль</Label>
                <Input
                    style={{width: "80%"}}
                    type="password"
                    onChange={(e) => this.inputPassword(e)}/>
            </>
        );
    }

    renderEnterButton() {
        return(
            <Button
                className="authButton"
                style={{backgroundColor: "black"}}
                onClick={() => this.authorize()}>
                Войти
            </Button>
        );
    }

    render() {
        return(
            <div className="container-fluid authorizationForm">
                {this.renderWarnings()}
                <div className="row justify-content-center">
                    {this.renderLoginInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderPasswordInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderEnterButton()}
                </div>
            </div>
        );
    }

    inputLogin(event: React.FormEvent<HTMLInputElement>) {
        this.login = event.currentTarget.value;
    }

    inputPassword(event: React.FormEvent<HTMLInputElement>) {
        this.password = event.currentTarget.value;
    }

    async authorize() {
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({login: this.login, password: this.password, email: this.login})
        });
        if(response.status === 200) {
            let data = await response.json();
            let token = data.access_token;
            console.log("tokennnn", token);
            this.props.store.userStore.getCurrentUser(token)
                .then(() => {
                    this.props.store.userStore.authorizationRequire(false);
                    this.props.store.userStore.wrongCredetianalsToggle(false);
                    this.props.store.userStore.getUsers();
                });
        } else {
            this.props.store.userStore.authorizationRequire(true);
            this.props.store.userStore.wrongCredetianalsToggle(true);
        }
    }
}