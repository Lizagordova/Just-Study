import React, { Component } from "react";
import './App.css';
import { RootStore } from "./stores/RootStore";
import { Main } from "./components/Main/Main";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';
import './styles/common.css';
import { BrowserRouter } from "react-router-dom";
import { observer, Provider } from  "mobx-react";
import {observable} from "mobx";

interface Props {
    store: RootStore;
}

@observer
class App extends Component<Props> {
   render() {
       const { store } = this.props;
       return(
           <div>
               <BrowserRouter>
                   <div className="App">
                       <Main store={store}/>
                   </div>
               </BrowserRouter>
           </div>
       );
   }


}

export default App;