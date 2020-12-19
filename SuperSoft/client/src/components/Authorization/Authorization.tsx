import React from "react";
import RootStore from "../../stores/RootStore";
import { Label, Input, Button }from "reactstrap";
import { observer } from "mobx-react";
import { makeObservable, observable } from "mobx";

interface IAuthorizationProps {
    store: RootStore;
}

@observer
export class Authorization extends React.Component<IAuthorizationProps> {
    email: string;
    password: string;

    constructor() {
        // @ts-ignore
        super();
        makeObservable(this, {
            email: observable,
            password: observable
        });
    }

    render() {
        return(
            <div className="container" style={{backgroundColor:"#66A5AD", marginTop: "25%", color: "#fff", fontSize: "1.5em"}}>
                <div className="row justify-content-center">
                    <Label style={{width: "100%", marginTop: "10px"}}>EMAIL</Label>
                    <Input
                        style={{width: "80%"}}
                        onChange={(e) => this.inputEmail(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Label style={{width: "100%"}}>ПАРОЛЬ</Label>
                    <Input
                        style={{width: "80%"}}
                        type="password"
                        onChange={(e) => this.inputPassword(e)}/>
                </div>
                <div className="row justify-content-center">
                    <Button
                        style={{width: "80%", backgroundColor: "#07575b", marginTop: "25px", marginBottom: "15px"}}
                        onClick={() => this.authorize()}>
                        ВОЙТИ
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

    async authorize() {
        const response = await fetch("/authorization", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({email: this.email, password: this.password})
        });
        if(response.status === 200) {
            this.props.store.userStore.authorizationRequire(false);
        } else {
            this.props.store.userStore.authorizationRequire(true);
        }
    }
}