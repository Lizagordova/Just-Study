import React, { Component } from "react";
import './App.css';
import RootStore from "./stores/RootStore";
import { Main } from "./components/Main/Main";

class App extends Component {
   render() {
       const store = new RootStore();
       return(
           <div className="App">
             <Main store={store}/>
           </div>
       );
   }


}

export default App;