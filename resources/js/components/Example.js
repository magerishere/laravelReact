import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Forms/Login";
import Register from "./Forms/Register";
import Shop from "./Shopping/Shop";



const Example = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Shop} />
                <Route path="/login" exact component={Login} />
                <Route path="/register" exact component={Register} />

            </Switch>
        </Router>
    );
};

export default Example;

if (document.getElementById("example")) {
    ReactDOM.render(<Example />, document.getElementById("example"));
}
