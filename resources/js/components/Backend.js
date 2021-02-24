import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./Users/Dashboard";
import Profile from "./Users/Profile";
import "../../css/panel.css";
import Setting from "./Users/Setting";
import formatCurrency from "../formatCurrency";
import Charge from "./Users/Charge";

class Backend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            userId: Number,
            email: "",
            userMeta: {},
            total: 0,
            addClassActive: 1,
        };
    }

    async componentDidMount() {
        const res = await axios.get("/user");
        if (res.data.status === 200) {
            const userId = res.data.user.id;
            const email = res.data.user.email;
            const userMeta = res.data.userMeta;
            console.log(res.data.user);
            console.log(userId);
            this.setState({
                userId: userId,
                email: email,
                userMeta: userMeta,
            });
        }
        const response = await axios.get("/product");
        if (response.data.status === 200) {
            const products = response.data.products;
            this.setState({ products: products });
            console.log(products);

            let { total } = this.state;
            this.state.products.forEach((product) =>
                this.setState({
                    total: (total += product.price * product.count),
                })
            );
        }
    }
    addClassActive = (value) => {
        this.setState({ addClassActive: value });
    };

    logout = async () => {
        const res = await axios.post("/user/logout", "");
        if (res.data.status === 200) {
            window.location.replace("http://example.local/");
        } else {
            console.log("Ghalat");
        }
    };
    render() {
        return (
            <Router>
                <div className="panel-wrapper">
                    <div className="wrapper ">
                        <div
                            className="sidebar"
                            data-color="purple"
                            data-background-color="white"
                            data-image="../assets/img/sidebar-1.jpg"
                        >
                            <div className="logo">
                                <a href="/" className="simple-text logo-normal">
                                    Home
                                </a>
                            </div>
                            <div className="sidebar-wrapper">
                                <ul className="nav">
                                    <li
                                        className={`nav-item ${
                                            this.state.addClassActive === 1
                                                ? " active"
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            onClick={() =>
                                                this.addClassActive(1)
                                            }
                                            className="nav-link"
                                            to="/dashboard"
                                        >
                                            <i className="material-icons">
                                                dashboard
                                            </i>
                                            <p>Dashboard</p>
                                        </Link>
                                    </li>
                                    <li
                                        className={`nav-item ${
                                            this.state.addClassActive === 2
                                                ? " active"
                                                : ""
                                        }`}
                                    >
                                        <Link
                                            onClick={() =>
                                                this.addClassActive(2)
                                            }
                                            className="nav-link"
                                            to="/profile"
                                        >
                                            <i className="material-icons">
                                                person
                                            </i>
                                            <p>User Profile</p>
                                        </Link>
                                    </li>
                                    <li
                                        className={`nav-item ${
                                            this.state.addClassActive === 3
                                                ? "active"
                                                : ""
                                        }  `}
                                    >
                                        <Link
                                            onClick={() =>
                                                this.addClassActive(3)
                                            }
                                            className="nav-link"
                                            to="/setting"
                                        >
                                            <i className="material-icons">
                                                content_paste
                                            </i>
                                            <p>Setting</p>
                                        </Link>
                                        <Link
                                            onClick={() =>
                                                this.addClassActive(4)
                                            }
                                            className="nav-link"
                                            to="/charge"
                                        >
                                            <i className="material-icons">
                                                bubble_chart
                                            </i>
                                            <p>Charge</p>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="main-panel">
                            <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top ">
                                <div className="container-fluid">
                                    <div className="navbar-wrapper">
                                        <a
                                            className="navbar-brand"
                                            href="javascript:;"
                                        >
                                            Welcome {this.state.email}{" "}
                                        </a>
                                        Your Money Account :{" "}
                                        {this.state.userMeta
                                            ? "$" + this.state.userMeta.charge
                                            : "$0"}
                                        <Link to="/charge">
                                            {" "}
                                            <button
                                                type="button"
                                                class="btn btn-primary btn-sm"
                                            >
                                                <span class="glyphicon glyphicon-plus"></span>{" "}
                                                Charge
                                            </button>
                                        </Link>
                                    </div>
                                    <button
                                        className="navbar-toggler"
                                        type="button"
                                        data-toggle="collapse"
                                        aria-controls="navigation-index"
                                        aria-expanded="false"
                                        aria-label="Toggle navigation"
                                    >
                                        <span className="sr-only">
                                            Toggle navigation
                                        </span>
                                        <span className="navbar-toggler-icon icon-bar"></span>
                                        <span className="navbar-toggler-icon icon-bar"></span>
                                        <span className="navbar-toggler-icon icon-bar"></span>
                                    </button>
                                    <div className="collapse navbar-collapse justify-content-end">
                                        <ul className="navbar-nav">
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link"
                                                    href="http://example.com"
                                                    id="navbarDropdownMenuLink"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i className="material-icons">
                                                        notifications
                                                    </i>
                                                    <span className="notification">
                                                        5
                                                    </span>
                                                    <p className="d-lg-none d-md-block">
                                                        Some Actions
                                                    </p>
                                                </a>
                                                <div
                                                    className="dropdown-menu dropdown-menu-right"
                                                    aria-labelledby="navbarDropdownMenuLink"
                                                >
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Mike John responded to
                                                        your email
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        You have 5 new tasks
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        You're now friend with
                                                        Andrew
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Another Notification
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Another One
                                                    </a>
                                                </div>
                                            </li>
                                            <li className="nav-item dropdown">
                                                <a
                                                    className="nav-link"
                                                    href="javascript:;"
                                                    id="navbarDropdownProfile"
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i className="material-icons">
                                                        person
                                                    </i>
                                                    <p className="d-lg-none d-md-block">
                                                        Account
                                                    </p>
                                                </a>
                                                <div
                                                    className="dropdown-menu dropdown-menu-right"
                                                    aria-labelledby="navbarDropdownProfile"
                                                >
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Profile
                                                    </a>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                    >
                                                        Settings
                                                    </a>
                                                    <div className="dropdown-divider"></div>
                                                    <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        onClick={() =>
                                                            this.logout()
                                                        }
                                                    >
                                                        Log out
                                                    </a>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </nav>

                            <div className="content">
                                {/* content */}

                                <Switch>
                                    <Route path="/dashboard">
                                        <Dashboard
                                            products={this.state.products}
                                            total={this.state.total}
                                        />
                                    </Route>
                                    <Route path="/profile">
                                        <Profile
                                            email={this.state.email}
                                            userId={this.state.userId}
                                            userMeta={this.state.userMeta}
                                            handlerInput={this.handlerInput}
                                        />
                                    </Route>
                                    <Route path="/setting">
                                        <Setting />
                                    </Route>
                                    <Route path="/charge">
                                        <Charge />
                                    </Route>
                                </Switch>
                                <footer className="footer">
                                    <div className="container-fluid">
                                        <nav className="float-left">
                                            <ul>
                                                <li>
                                                    <a href="https://creative-tim.com/presentation">
                                                        About Us
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                        <div className="copyright float-right">
                                            &copy;
                                            <script>
                                                document.write(new
                                                Date().getFullYear())
                                            </script>
                                            , made with{" "}
                                            <i className="material-icons">
                                                favorite
                                            </i>{" "}
                                            by
                                            <a
                                                href="https://www.creative-tim.com"
                                                target="_blank"
                                            >
                                                Creative Tim
                                            </a>{" "}
                                            for a better web.
                                        </div>
                                    </div>
                                </footer>
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export default Backend;

if (document.getElementById("backend")) {
    ReactDOM.render(<Backend />, document.getElementById("backend"));
}
