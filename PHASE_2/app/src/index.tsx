import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Globe from "./Globe";
import NavBar from "./NavBar";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      
      <Switch>
        <Route exact path="/" component={Globe} />
      </Switch>
      <NavBar/>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
