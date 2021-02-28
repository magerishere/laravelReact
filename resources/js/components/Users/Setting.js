import React, { Component } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPassword: "",
            newPassword: "",
            configNewPassword: "",
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
        this.setState({ newPassword: myInput });
    };

    onFocusPassword = () => {
        document.getElementById("message").style.display = "block";
    };
    onBlurPassword = () => {
        document.getElementById("message").style.display = "none";
    };

    formSubmit = async (e) => {
        e.preventDefault();
        if (this.state.newPassword === this.state.configNewPassword) {
            const res = await axios.post("/user/setting", this.state);
            if (res.data.status === 200) {
                const response = await axios.post("/user/logout", "");
                if (response.data.status === 200) {
                    window.location.replace("http://example.local/");
                }
            } else {
                this.setState({ message: "Current password was wrong!" });
            }
        } else {
            this.setState({ message: "Confirm does not match !" });
        }
    };
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">
                                    Change Your Password
                                </h4>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.formSubmit}>
                                    <div className="form-group">
                                        <label>Current Password</label>
                                        <input
                                            type="password"
                                            name="currentPassword"
                                            className="form-control"
                                            onChange={this.handlerInput}
                                            value={this.state.currentPassword}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>New Password</label>
                                        <input
                                            type="password"
                                            name="newPassword"
                                            id="psw"
                                            className="form-control"
                                            onChange={this.handlerInputPassword}
                                            onFocus={this.onFocusPassword}
                                            onBlur={this.onBlurPassword}
                                            value={this.state.newPassword}
                                            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                            title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Config New Password</label>
                                        <input
                                            type="password"
                                            name="configNewPassword"
                                            className="form-control"
                                            onChange={this.handlerInput}
                                            value={this.state.configNewPassword}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="submit"
                                            className="btn btn-primary"
                                            value="Submit"
                                        />{" "}
                                        <label>
                                            {this.state.message ? (
                                                <Fade right>
                                                    <p className="bg-danger text-dark">
                                                        {" "}
                                                        <strong>
                                                            {this.state.message}
                                                        </strong>{" "}
                                                    </p>
                                                </Fade>
                                            ) : (
                                                <p>
                                                    {" "}
                                                    When you submit,You
                                                    automatically logout{" "}
                                                </p>
                                            )}
                                        </label>
                                    </div>
                                </form>
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
