import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Panel from "./Users/Panel";
const Backend = () => {
    return (
        <Router>
            <Switch>
                <Route path="/dashboard" exact component={Panel} />
            </Switch>
        </Router>
    );
};

export default Backend;

if (document.getElementById("backend")) {
    ReactDOM.render(<Backend />, document.getElementById("backend"));
}
