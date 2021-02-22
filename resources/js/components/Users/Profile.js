import React, { Component } from "react";
import axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.userMeta;
    }

    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    formSubmit = async (e) => {
        e.preventDefault();

        const res = await axios.patch(`/user/${this.props.userId}`, this.state);
        if (res.data.status === 200) {
            console.log("dorost");
        } else {
            console.log("ghalat");
        }
    };
    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header card-header-primary">
                                <h4 className="card-title">Edit Profile</h4>
                                <p className="card-category">
                                    Complete your profile
                                </p>
                            </div>
                            <div className="card-body">
                                <form onSubmit={this.formSubmit}>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Company (disabled)
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    disabled
                                                />
                                            </div>
                                        </div>
                                   
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Email address (disabled)
                                                </label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    value={this.props.email}

                                                    disabled
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Fist Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="fname"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state
                                                            ? this.state.fname
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Last Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lname"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state
                                                            ? this.state.lname
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Adress
                                                </label>
                                                <input
                                                    type="text"
                                                    name="adress"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state
                                                            ? this.state.adress
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    City
                                                </label>
                                                <input
                                                    type="text"
                                                    name="city"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state
                                                            ? this.state.city
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Country
                                                </label>
                                                <input
                                                    type="text"
                                                    name="country"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state
                                                            ? this.state.country
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="bmd-label-floating">
                                                    Postal Code
                                                </label>
                                                <input
                                                    type="text"
                                                    name="postalCode"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state
                                                            ? this.state
                                                                  .postalCode
                                                            : ""
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>About Me</label>
                                                <div className="form-group">
                                                    <textarea
                                                        className="form-control"
                                                        name="about"
                                                        rows="5"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        value={
                                                            this.state
                                                                ? this.state
                                                                      .about
                                                                : ""
                                                        }
                                                    ></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary pull-right"
                                    >
                                        Update Profile
                                    </button>
                                    {/* <input type="submit" value="Edit" /> */}

                                    <div className="clearfix"></div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-profile">
                            <div className="card-avatar">
                                <a href="javascript:;">
                                    <img
                                        className="img"
                                        src="/images/avatar.png"
                                    />
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="card-category text-gray">
                                    CEO / Co-Founder
                                </h6>
                                <h4 className="card-title">Alec Thompson</h4>
                                <p className="card-description">
                                    Don't be scared of the truth because we need
                                    to restart the human foundation in truth And
                                    I love you like Kanye loves Kanye I love
                                    Rick Owens’ bed design but the back is...
                                </p>
                                <a
                                    href="javascript:;"
                                    className="btn btn-primary btn-round"
                                >
                                    Follow
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
