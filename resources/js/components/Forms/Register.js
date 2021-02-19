import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import axios from "axios";
import { Link } from "react-router-dom";
export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            message: "",
        };
    }

    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    registerSubmit = async (e) => {
        e.preventDefault();
        const data = this.state;
        if (data.password === data.confirm_password) {
            const res = await axios.post("/user", data);
            console.log(res);

            if (res.data.status === 200) {
                console.log("dorost");
                this.props.history.push("/");
            }
        } else {
            this.setState({ message: "Confirm does not match!" });
        }
    };
    render() {
        return (
            <div>
                <Fade top cascade>
                    <div className="registerForm">
                        <div className="wrapper fadeInDown">
                            <div id="formContent">
                                <div className="fadeIn first">
                                    <img
                                        src="/images/avatar.png"
                                        alt="User Icon"
                                    />
                                </div>
                                <form onSubmit={this.registerSubmit}>
                                    {this.state.message !== "" && (
                                        <p className="bg-danger">
                                            <strong>
                                                {this.state.message}
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
                                    <input
                                        type="password"
                                        className="fadeIn third"
                                        name="confirm_password"
                                        placeholder="confirm Password"
                                        onChange={this.handlerInput}
                                        required
                                    />
                                    <input
                                        type="submit"
                                        className="fadeIn fourth"
                                        value="Register"
                                    />
                                </form>
                                <div id="formFooter">
                                    <Link to="/">Login?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
}
