import React from "react";
import RootStore from "../../stores/RootStore";
import { Label, Input, Button, Alert } from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";

interface IRegistrationProps {
    store: RootStore;
}

@observer
export class Registration extends React.Component<IRegistrationProps> {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    login: string;
    notRegistered: boolean;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            email: observable,
            password: observable,
            firstName: observable,
            lastName: observable,
            login: observable,
            notRegistered: observable,
        });
    }

    renderFirstNameInput() {
        return(
            <>
                <Label className="formLabel">Имя</Label>
                <Input
                    style={{width: "80%"}}
                    onChange={(e) => this.inputFirstName(e)}/>
            </>
        );
    }

    renderLastNameInput() {
        return(
            <>
                <Label className="formLabel">Фамилия</Label>
                <Input
                    style={{width: "80%"}}
                    onChange={(e) => this.inputLastName(e)}/>
            </>
        );
    }

    renderLoginInput() {
        return(
            <>
                <Label className="formLabel">Логин</Label>
                <Input
                    style={{width: "80%"}}
                    onChange={(e) => this.inputLogin(e)}/>
            </>
        );
    }

    renderEmailInput() {
        return(
            <>
                <Label className="formLabel">Email</Label>
                <Input
                    style={{width: "80%"}}
                    onChange={(e) => this.inputEmail(e)}/>
            </>
        );
    }

    renderPasswordInput() {
        return(
            <>
                <Label className="formLabel">Пароль</Label>
                <Input
                    style={{width: "80%"}}
                    type="password"
                    onChange={(e) => this.inputPassword(e)}/>
            </>
        );
    }

    renderRegisterButton() {
        return(
            <Button
                className="authButton"
                style={{backgroundColor: "black"}}
                onClick={() => this.register()}>
                Зарегистрироваться
            </Button>
        );
    }

    renderWarnings() {
        setTimeout(() => {
            this.notRegistered = false;
        }, 6000);
        return(
            <>
            {this.notRegistered && <Alert color="danger">Что-то пошло не так и не удалось зарегистрироваться :(</Alert>}
            </>
        );
    }

    render() {
        return(
            <div className="col-12 authorizationForm">
                {this.renderWarnings()}
                <div className="row justify-content-center">
                    {this.renderFirstNameInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderLastNameInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderLoginInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderEmailInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderPasswordInput()}
                </div>
                <div className="row justify-content-center">
                    {this.renderRegisterButton()}
                </div>
            </div>
        );
    }

    inputEmail(event: React.FormEvent<HTMLInputElement>) {
        this.email = event.currentTarget.value;
    }

    inputPassword(event: React.FormEvent<HTMLInputElement>) {
        this.password = event.currentTarget.value;
    }

    inputFirstName(event: React.FormEvent<HTMLInputElement>) {
        this.firstName = event.currentTarget.value;
    }

    inputLastName(event: React.FormEvent<HTMLInputElement>) {
        this.lastName = event.currentTarget.value;
    }

    inputLogin(event: React.FormEvent<HTMLInputElement>) {
        this.login = event.currentTarget.value;
    }

    async register() {
        const response = await fetch("/registration", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({login: this.login, email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName})
        });
        if(response.status === 200) {
            this.props.store.userStore.getCurrentUser()
                .then(() => {
                    this.props.store.userStore.registrationRequire(false);
                    this.props.store.userStore.wrongCredetianalsToggle(false);
                });
        } else {
            
        }
    }
}