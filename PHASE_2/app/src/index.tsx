import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Globe from "./Globe";
import TimeRangeSlider from "./TimeRangeSlider";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Switch>
        <Route exact path="/" component={Globe} />
      </Switch>
      <TimeRangeSlider/>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);
