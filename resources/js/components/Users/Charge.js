import React, { Component } from "react";
import axios from "axios";
import Fade from "react-reveal/Fade";

export default class Charge extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberCard: "",
            cvv2Card: "",
            monthCard: "",
            yearCard: "",
            nameCard: "",
            message: "",
        };
    }
    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    formSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/user/card", this.state);
        if (res.data.status === 200) {
            this.setState({
                message: "card has been added",
                numberCard: "",
                cvv2Card: "",
                monthCard: "",
                yearCard: "",
                nameCard: "",
            });
        }
    };
    addUseCard = (card) => {
        this.setState({ useCard: card });
    };
    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        {this.state.useCard ? (
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">
                                            Charge Account
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.formSubmit}>
                                            <div className="form-group">
                                                <label>Number Card</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        this.state.useCard
                                                            .number
                                                    }
                                                    disabled
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label>CVV2</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={
                                                            this.state.useCard
                                                                .cvv2
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label>Year Card</label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={
                                                            this.state.useCard
                                                                .year
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label>Month Card</label>

                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={
                                                            this.state.useCard
                                                                .month
                                                        }
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Name Card </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={
                                                        this.state.useCard
                                                            .name
                                                            ? this.state.useCard
                                                                  .name
                                                            : "None"
                                                    }
                                                    disabled
                                                />
                                            </div>

                                            <div className="form-group clearfix">
                                                <input
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    value="Charge"
                                                />{" "}
                                                <label>
                                                    {this.state.message ? (
                                                        <Fade right>
                                                            <p>
                                                                {" "}
                                                                <strong>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .message
                                                                    }
                                                                </strong>{" "}
                                                            </p>
                                                        </Fade>
                                                    ) : (
                                                        // <p>
                                                        //     {" "}
                                                        //     Add your card to use it
                                                        //     for buy{" "}
                                                        // </p>
                                                        "Add your card to use it for buy"
                                                    )}
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">
                                            Add Credit Card {"&&"} Charge
                                            Account
                                        </h4>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={this.formSubmit}>
                                            <div className="form-group">
                                                <label>Number Card</label>
                                                <input
                                                    type="text"
                                                    name="numberCard"
                                                    minLength="16"
                                                    maxLength="16"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={
                                                        this.state.numberCart
                                                    }
                                                    required
                                                />
                                            </div>
                                            <div className="row">
                                                <div className="form-group col-md-6">
                                                    <label>CVV2</label>
                                                    <input
                                                        type="password"
                                                        name="cvv2Card"
                                                        maxLength="4"
                                                        minLength="3"
                                                        className="form-control"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        value={
                                                            this.state.cvv2Card
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label>Year Card</label>

                                                    <input
                                                        type="text"
                                                        name="yearCard"
                                                        maxLength="2"
                                                        minLength="2"
                                                        className="form-control"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        value={
                                                            this.state.yearCard
                                                        }
                                                        required
                                                    />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label>Month Card</label>

                                                    <input
                                                        type="text"
                                                        name="monthCard"
                                                        maxLength="2"
                                                        minLength="2"
                                                        className="form-control"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        value={
                                                            this.state.monthCard
                                                        }
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Name Card </label>
                                                <input
                                                    type="text"
                                                    name="nameCard"
                                                    className="form-control"
                                                    onChange={this.handlerInput}
                                                    value={this.state.nameCard}
                                                    placeholder=" ( Optional )"
                                                />
                                            </div>

                                            <div className="form-group clearfix">
                                                <input
                                                    type="submit"
                                                    className="btn btn-primary"
                                                    value="Add"
                                                />{" "}
                                                <label>
                                                    {this.state.message ? (
                                                        <Fade right>
                                                            <p>
                                                                {" "}
                                                                <strong>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .message
                                                                    }
                                                                </strong>{" "}
                                                            </p>
                                                        </Fade>
                                                    ) : (
                                                        // <p>
                                                        //     {" "}
                                                        //     Add your card to use it
                                                        //     for buy{" "}
                                                        // </p>
                                                        "Add your card to use it for buy"
                                                    )}
                                                </label>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Your Card</h4>
                                </div>
                                <div className="card-body">
                                    <table className="table table-hover">
                                        <thead>
                                            <th>Name</th>
                                            <th>Number Card</th>
                                            <th>Use</th>
                                        </thead>
                                        <tbody>
                                            {this.props.userCard.map((card) => (
                                                <tr>
                                                    <td>
                                                        {card.name
                                                            ? card.name
                                                            : "None"}
                                                    </td>
                                                    <td>{card.number}</td>
                                                    <td>
                                                        <input
                                                            onClick={() =>
                                                                this.addUseCard(
                                                                    card
                                                                )
                                                            }
                                                            type="button"
                                                            value="Use"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
