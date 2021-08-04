import React, { Component } from "react";
import './App.css';
import { RootStore } from "./stores/RootStore";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.min.css';
import 'react-calendar/dist/Calendar.css';
import './styles/common.css';
import { BrowserRouter, NavLink } from "react-router-dom";
import { Authorization } from "./components/Authorization/Authorization";
import { observer } from "mobx-react";
import "./styles/authorization.css";
import { Nav, NavItem } from "reactstrap";
import { Registration } from "./components/Authorization/Registration";
import { UserRole } from "./Typings/enums/UserRole";
import { AdminMain } from "./components/Admin/Main/AdminMain";
import { UserMain } from "./components/User/Main/UserMain";
import  "../src/styles/lesson.css";
import AddFeedbackWindow from "./components/Common/Feedback/AddFeedbackWindow";

interface Props {
    store: RootStore;
}

@observer
class App extends Component<Props> {
    renderFooter() {
        return (
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="row justify-content-center">
                            <b style={{fontSize: "1em", color: "white"}}>Контакты:</b>
                        </div>
                        {/*<div className="row justify-content-center">
                            <a href="tel:+79190754485" style={{fontSize: "0.8em"}}>Гоша Кунаев</a>
                        </div>*/}
                        <div className="row justify-content-center" style={{fontSize: "0.8em", color: "white"}}>
                            <a href="tel:+79016957927" style={{fontSize: "0.8em", color: "white"}}>Тех. поддержка: Лиза Гордова</a>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <AddFeedbackWindow  feedbackStore={this.props.store.feedbackStore}/>
                    </div>
                </div>
            </div>
        );
    }

    renderMain(store: RootStore) {
        let role = this.props.store.userStore.currentUser.role;
        return(
            <>
                <main>
                    {role === UserRole.Admin && <AdminMain store={store}/>}
                    {role === UserRole.User && <UserMain store={store}/>}
                </main>
                <footer>
                    {this.renderFooter()}
                </footer>
            </>
        );
    }

    renderMenu(store: RootStore) {
        let height = this.props.store.userStore.authorizationRequired ? 450 : 700; 
        // @ts-ignore
        return(
            <div className="container-fluid parent">
                <div className="rowAuth block" style={{height: `${height}px`}}>
                    <div className="row justify-content-center">
                        <Nav tabs className="nav navAuth">
                            <NavItem>
                                <NavLink to={"#"}
                                         exact
                                         activeClassName=""
                                         onClick={() => this.props.store.userStore.registrationToggle("authorization")}
                                         className="nav-link authNavLink"
                                >Вход</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to={"#"}
                                         exact
                                         activeClassName=""
                                         onClick={() => this.props.store.userStore.registrationToggle("registration")}
                                         className="nav-link authNavLink">
                                    Регистрация</NavLink>
                            </NavItem>
                        </Nav>
                    </div>
                    <div className="row justify-content-center">
                        {this.props.store.userStore.authorizationRequired && <Authorization store={store}/>}
                        {this.props.store.userStore.registrationRequired && <Registration store={store}/>}
                    </div>
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
                       {!authorizationRequired && this.renderMain(store)}
                       {authorizationRequired && this.renderMenu(store)}
                   </div>
               </BrowserRouter>
           </div>
       );
   }
}

export default App;