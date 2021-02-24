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
                                            className="form-control"
                                            onChange={this.handlerInput}
                                            value={this.state.newPassword}
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
