import React, { Component } from "react";
import './App.css';
import { RootStore } from "./stores/RootStore";
import { Main } from "./components/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import 'font-awesome/css/font-awesome.min.css';
import './styles/common.css';
import { BrowserRouter } from "react-router-dom";
import { Authorization } from "./components/Authorization/Authorization";
import { observer } from "mobx-react";

interface Props {
    store: RootStore;
}

@observer
class App extends Component<Props> {
    render() {
       const { store } = this.props;
       let authorizationRequired = this.props.store.userStore.authorizationRequired;
       console.log("authorizationRequired", authorizationRequired);
       return(
           <div>
               <BrowserRouter>
                   <div className="App">
                       {!authorizationRequired && <Main store={store}/>}
                       {authorizationRequired && <Authorization store={store}/>}
                   </div>
               </BrowserRouter>
           </div>
       );
   }
}

export default App;