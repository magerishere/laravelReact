import React, { Component } from "react";
import "../../../css/panel.css";
import axios from "axios";
import formatCurrency from "../../formatCurrency";
export default class Panel extends Component {
    constructor(props) {
        super(props);
        this.state = { products: [], email: "" };
    }
    async componentDidMount() {
        const res = await axios.get("/user");
        if (res.data.status === 200) {
            const email = res.data.user.email;
            this.setState({ email: email });
        }
        const response = await axios.get("/product");
        if (response.data.status === 200) {
            const products = response.data.products;
            this.setState({ products: products });
            console.log(products);
        }
    }
    render() {
        return (
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
                                <li className="nav-item active  ">
                                    <a
                                        className="nav-link"
                                        href="./dashboard.html"
                                    >
                                        <i className="material-icons">
                                            dashboard
                                        </i>
                                        <p>Dashboard</p>
                                    </a>
                                </li>
                                <li className="nav-item ">
                                    <a className="nav-link" href="./user.html">
                                        <i className="material-icons">person</i>
                                        <p>User Profile</p>
                                    </a>
                                </li>
                                <li className="nav-item ">
                                    <a
                                        className="nav-link"
                                        href="./tables.html"
                                    >
                                        <i className="material-icons">
                                            content_paste
                                        </i>
                                        <p>Table List</p>
                                    </a>
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
                                        Welcome {this.state.email}
                                    </a>
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
                                                    Mike John responded to your
                                                    email
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
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-lg-5 col-md-6 col-sm-6">
                                        <div className="card card-stats">
                                            <div className="card-header card-header-success card-header-icon">
                                                <div className="card-icon">
                                                    <i className="material-icons">
                                                        store
                                                    </i>
                                                </div>
                                                <p className="card-category">
                                                    Revenue
                                                </p>
                                                <h3 className="card-title">
                                                    $34,245
                                                </h3>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">
                                                        date_range
                                                    </i>{" "}
                                                    Last 24 Hours
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-lg-7 col-md-6 col-sm-6">
                                        <div className="card card-chart">
                                            <div className="card-header card-header-success">
                                                <h4 className="card-title">
                                                    Product Status
                                                </h4>
                                                <div
                                                    className="ct-chart"
                                                    id="dailySalesChart"
                                                ></div>
                                            </div>
                                            <div className="card-body">
                                                <h4 className="card-title">
                                                    Daily Sales
                                                </h4>
                                                <p className="card-category">
                                                    <span className="text-success">
                                                        <i className="fa fa-long-arrow-up"></i>{" "}
                                                        55%{" "}
                                                    </span>{" "}
                                                    increase in today sales.
                                                </p>
                                            </div>
                                            <div className="card-footer">
                                                <div className="stats">
                                                    <i className="material-icons">
                                                        access_time
                                                    </i>{" "}
                                                    updated 4 minutes ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <div className="card">
                                            <div className="card-header card-header-success">
                                                <h4 className="card-title">
                                                    Employees Stats
                                                </h4>
                                                <p className="card-category">
                                                    New employees on 15th
                                                    September, 2016
                                                </p>
                                            </div>
                                            <div className="card-body table-responsive">
                                                <table className="table table-hover">
                                                    <thead className="text-success">
                                                        <th>ID</th>
                                                        <th>Name</th>
                                                        <th>Count</th>
                                                        <th>Price</th>
                                                        <th>Total</th>
                                                    </thead>
                                                    <tbody>
                                                        {this.state.products.map(
                                                            (product) => (
                                                                <tr>
                                                                    <td>
                                                                        {
                                                                            product.id
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            product.name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            product.count
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {formatCurrency(
                                                                            product.price
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        {product.count *
                                                                            product.price}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                        document.write(new Date().getFullYear())
                                    </script>
                                    , made with{" "}
                                    <i className="material-icons">favorite</i>{" "}
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
        );
    }
}
