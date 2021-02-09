import React from "react";
import RootStore from "../../stores/RootStore";
import { Label, Input, Button, Alert }from "reactstrap";
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

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            email: observable,
            password: observable,
            firstName: observable,
            lastName: observable,
            login: observable
        });
    }

    render() {
        return(
            <div className="col-12 authorizationForm">
                <div className="row justify-content-center">
                    <Label className="formLabel">ИМЯ</Label>
                    <Input
                        style={{width: "80%"}}
                        onChange={(e) => this.inputFirstName(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Label className="formLabel">ФАМИЛИЯ</Label>
                    <Input
                        style={{width: "80%"}}
                        onChange={(e) => this.inputLastName(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Label className="formLabel">ЛОГИН</Label>
                    <Input
                        style={{width: "80%"}}
                        onChange={(e) => this.inputLogin(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Label className="formLabel">Email</Label>
                    <Input
                        style={{width: "80%"}}
                        onChange={(e) => this.inputEmail(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Label className="formLabel">ПАРОЛЬ</Label>
                    <Input
                        style={{width: "80%"}}
                        type="password"
                        onChange={(e) => this.inputPassword(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Button
                        style={{width: "80%", backgroundColor: "#07575b", marginTop: "25px", marginBottom: "15px"}}
                        onClick={() => this.register()}>
                        ЗАРЕГИСТРИРОВАТЬСЯ
                    </Button>
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
            body: JSON.stringify({email: this.email, password: this.password, firstName: this.firstName, lastName: this.lastName})
        });
        if(response.status === 200) {
            this.props.store.userStore.registrationRequire(false);
            this.props.store.userStore.wrongCredetianalsToggle(false);
            this.props.store.userStore.getCurrentUser();
        } else {
            
        }
    }
}