import React, { Component } from 'react';
import './App.css';
import Menu from "./Menu";
import {RootStore} from "../stores/RootStore";
import {observable} from "mobx";
import {UserViewModel} from "../Typings/viewModels/UserViewModel";

/*function App() {
   return (
       <div className="App">
           Хоп хей лала лей
       </div>
   );    
}

export default App;*/

class App extends Component {
   render() {
       const store = new RootStore();
       return(
           <div className="App">
             дшяф
           </div>
       );
   }


}

export default App;