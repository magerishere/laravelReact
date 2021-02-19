import axios from "axios";
import React, { Component } from "react";
import Fade from "react-reveal/Slide";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            rememberMe: false,
            error: "",
        };
    }

    async componentDidMount() {
        const res = await axios.get("/user");
        console.log(res.data.status);
    }

    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    loginSubmit = async (e) => {
        e.preventDefault();
        const data = this.state;
        const res = await axios.post("/user/login", data);
        if (res.data.status === 200) {
            this.props.history.push("/panel");
        } else {
            this.setState({ error: true });
        }
    };

    rememberMe = () => {
        const rememberMe = this.state.rememberMe;
        this.setState({ rememberMe: !rememberMe });
    };
    logout = async () => {
        const res = await axios.post("/user/logout",'');
        if (res.data.status === 200) {
            console.log("Dorost");
        } else {
            console.log("Ghalat");
        }
    };

    render() {
        return (
            <div>
                <Fade top cascade>
                    <div className="loginForm">
                        <div className="wrapper fadeInDown">
                            <div id="formContent">
                                <div className="fadeIn first">
                                    <img
                                        src="/images/avatar.png"
                                        alt="User Icon"
                                    />
                                </div>
                                <form onSubmit={this.loginSubmit}>
                                    {this.state.error && (
                                        <p className="bg-danger">
                                            <strong>
                                                Username or Password was wrong!
                                            </strong>
                                        </p>
                                    )}
                                    <input
                                        type="email"
                                        className="fadeIn second"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.handlerInput}
                                        required
                                    />
                                    <input
                                        type="password"
                                        className="fadeIn third"
                                        name="password"
                                        placeholder="Password"
                                        onChange={this.handlerInput}
                                        required
                                    />
                                    <div className="checkbox-container row">
                                        <label htmlFor="scales">
                                            Remember me
                                        </label>

                                        <input
                                            type="checkbox"
                                            id="scales"
                                            onClick={() => this.rememberMe()}
                                        />
                                    </div>

                                    <input
                                        type="submit"
                                        className="fadeIn fourth"
                                        value="Log In"
                                    />
                                </form>
                                <a className="underlineHover" href="#">
                                    Forgot Password?
                                </a>
                                <input
                                    type="button"
                                    value="logout"
                                    onClick={() => this.logout()}
                                />

                                <div id="formFooter">
                                    <Link to="/register">Register?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
}
