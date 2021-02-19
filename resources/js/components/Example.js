import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/app.css";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import Panel from "./Users/Panel";

const Example = () => {
    return (
        <Router>
            
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/register" exact component={Register} />
                <Route path="/panel" exact component={Panel} />
            </Switch>
        </Router>
    );
};

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
