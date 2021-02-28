import React, { Component } from "react";
import Fade from "react-reveal/Fade";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../../css/app.css";

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
    handlerInputPassword = (e) => {
        const myInput = e.target.value;
        const letter = document.getElementById("letter");
        const capital = document.getElementById("capital");
        const number = document.getElementById("number");
        const length = document.getElementById("length");

        const lowerCaseLetters = /[a-z]/g;

        if (myInput.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        const upperCaseLetters = /[A-Z]/g;
        if (myInput.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        const numbers = /[0-9]/g;
        if (myInput.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if (myInput.length >= 8) {
            length.classList.remove("invalid");
            length.classList.add("valid");
        } else {
            length.classList.remove("valid");
            length.classList.add("invalid");
        }
        this.setState({ password: myInput });
    };
    registerSubmit = async (e) => {
        e.preventDefault();
        const data = this.state;
        if (data.password === data.confirm_password) {
            const res = await axios.post("/user", data);

            if (res.data.status === 200) {
                const response = await axios.post("/user/login", this.state);
                if (response.data.status === 200) {
                    this.props.history.push("/");
                }
            }
        } else {
            this.setState({ message: "Confirm does not match!" });
        }
    };

    onFocusPassword = () => {
        document.getElementById("message").style.display = "block";
    };
    onBlurPassword = () => {
        document.getElementById("message").style.display = "none";
    };

    render() {
        return (
            <div>
                <Fade top cascade>
                    <div className="registerForm">
                        <div className="wrapper fadeInDown">
                            <div id="formContent">
                                <div className="fadeIn first">
                                    <a href="/">
                                        <img
                                            src="/images/avatar.png"
                                            alt="User Icon"
                                        />
                                    </a>
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
                                        id="psw"
                                        onFocus={this.onFocusPassword}
                                        onBlur={this.onBlurPassword}
                                        placeholder="Password"
                                        onChange={this.handlerInputPassword}
                                        minLength="8"
                                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                        title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
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
                                    <div id="message">
                                        <h3>
                                            Password must contain the following:
                                        </h3>
                                        <p id="letter" className="invalid">
                                            A <b>lowercase</b> letter
                                        </p>
                                        <p id="capital" className="invalid">
                                            A <b>capital (uppercase)</b> letter
                                        </p>
                                        <p id="number" className="invalid">
                                            A <b>number</b>
                                        </p>
                                        <p id="length" className="invalid">
                                            Minimum <b>8 characters</b>
                                        </p>
                                    </div>
                                </form>
                                <div id="formFooter">
                                    <Link to="/login">Login?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fade>
            </div>
        );
    }
}
