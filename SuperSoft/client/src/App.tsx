import React, {Component} from "react";
import './App.css';
import {RootStore} from "./stores/RootStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/common.css';
import {BrowserRouter, NavLink} from "react-router-dom";
import {Authorization} from "./components/Authorization/Authorization";
import {observer} from "mobx-react";
import "authorization.css";
import {Nav, NavItem} from "reactstrap";
import {Registration} from "./components/Authorization/Registration";
import {UserRole} from "./Typings/enums/UserRole";

interface Props {
    store: RootStore;
}

@observer
class App extends Component<Props> {
    renderMain() {
        let role = this.props.store.userStore.currentUser.role;
        return(
            <>
                {role === UserRole.Admin && <AdminMain store={store}/>}
                {role === UserRole.User && <UserMain store={store}/>}
            </>
        );
    }

    renderMenu() {
        let store = this.props.store;
        return(
            <div className="container-fluid">
                <div className="row rowAuth justify-content-center">
                    <Nav tabs>
                        <NavItem>
                            <NavLink to={"#"}
                                  style={{color: 'white'}}
                                  onClick={() => this.props.store.userStore.registrationToggle()}
                                  className="nav-link"
                                  activeClassName="selected">ВХОД</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to={"#"} 
                                  style={{color: 'white'}}
                                  onClick={() => this.props.store.userStore.registrationToggle()}
                                  className="nav-link"
                                  activeClassName="selected">РЕГИСТРАЦИЯ</NavLink>
                        </NavItem>
                        {this.props.store.userStore.authorizationRequired && <Authorization store={store}/>}
                        {this.props.store.userStore.registrationRequired && <Registration store={store}/>}
                    </Nav>
                </div>
            </div>
        );
    }

    render() {
       const { store } = this.props;
       let authorizationRequired = this.props.store.userStore.authorizationRequired || this.props.store.userStore.registrationRequired;
       return(
           <div>
               <BrowserRouter>
                   <div className="App">
                       {!authorizationRequired && this.renderMain()}
                       {authorizationRequired && this.renderMenu()}
                   </div>
               </BrowserRouter>
           </div>
       );
   }
}

export default App;