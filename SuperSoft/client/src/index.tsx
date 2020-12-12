import { render } from "react-dom";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from  "mobx-react";
import React from "react";
import RootStore from "./stores/RootStore";

const rootElement = document.getElementById("root");
const store = new RootStore();
render(
    <Provider store={store}>
        <App store={store}/>
    </Provider>,
    rootElement
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
