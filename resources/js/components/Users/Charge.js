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
            useCard: null,
            charge: null,
            deleteList: [],
        };
    }
    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    deleteListHandler = (cardId) => {
        const deleteList = this.state.deleteList;
        const index = deleteList.indexOf(cardId);
        if (index > -1) {
            deleteList.splice(index, 1);
        } else {
            deleteList.push(cardId);
        }

        this.setState({ deleteList });
    };
    deleteListSubmit = async () => {
        const res = await axios.post("/user/card/delete", {
            deleteList: this.state.deleteList,
        });

        if (res.data.status === 200) {
            let html = document.getElementsByClassName("deleteSuccess");
            for (let i = 0; i < html.length; i++) {
                html[i].style.display = "none";
            }
            this.setState({ deleteList: [] });
        }
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
    chargeSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("/user/charge", {
            charge: this.state.charge,
        });
        if (res.data.status === 200) {
            this.setState({ message: "Succesful" });
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
                            <Fade right cascade>
                                <div className="col-md-7">
                                    <div className="card">
                                        <div className="card-header card-header-primary row">
                                            <h4 className="card-title col-md-8">
                                                Charge Account
                                            </h4>
                                            <input
                                                type="button"
                                                className="btn btn-danger col-md-3"
                                                value="back"
                                                onClick={() =>
                                                    this.setState({
                                                        useCard: null,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={this.chargeSubmit}>
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
                                                                this.state
                                                                    .useCard
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
                                                                this.state
                                                                    .useCard
                                                                    .year
                                                            }
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-3">
                                                        <label>
                                                            Month Card
                                                        </label>

                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={
                                                                this.state
                                                                    .useCard
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
                                                                ? this.state
                                                                      .useCard
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
                                                            <input
                                                                type="text"
                                                                name="charge"
                                                                placeholder="How Much Charge...?"
                                                                value={
                                                                    this.state
                                                                        .charge
                                                                }
                                                                onChange={
                                                                    this
                                                                        .handlerInput
                                                                }
                                                            />
                                                        )}
                                                    </label>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </Fade>
                        ) : (
                            <div className="col-md-7">
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
                                                        this.state.numberCard
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
                        <Fade right cascade>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-header card-header-primary row">
                                        <h4 className="card-title col-md-7">
                                            Your Card
                                        </h4>
                                        {this.state.deleteList.length > 0 && (
                                            <Fade right>
                                                <input
                                                    type="button"
                                                    className="btn btn-danger col-md-4"
                                                    value="Delete"
                                                    onClick={() =>
                                                        this.deleteListSubmit()
                                                    }
                                                />
                                            </Fade>
                                        )}
                                    </div>
                                    <div className="card-body">
                                        {this.props.userCard.length > 0 && (
                                            <table className="table table-hover">
                                                <thead>
                                                    <th>Name</th>
                                                    <th>Number Card</th>
                                                    <th>Use</th>
                                                </thead>
                                                <tbody>
                                                    {this.props.userCard.map(
                                                        (card) => (
                                                            <tr key={card.id}
                                                                className={
                                                                    this.state.deleteList.indexOf(
                                                                        card.id
                                                                    ) > -1
                                                                        ? "bg-danger deleteSuccess"
                                                                        : ""
                                                                }
                                                            >
                                                                <td
                                                                    onClick={() =>
                                                                        this.deleteListHandler(
                                                                            card.id
                                                                        )
                                                                    }
                                                                >
                                                                    {card.name
                                                                        ? card.name
                                                                        : "None"}
                                                                </td>
                                                                <td
                                                                    onClick={() =>
                                                                        this.deleteListHandler(
                                                                            card.id
                                                                        )
                                                                    }
                                                                >
                                                                    {
                                                                        card.number
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <input
                                                                        onClick={() =>
                                                                            this.addUseCard(
                                                                                card
                                                                            )
                                                                        }
                                                                        className="btn btn-primary"
                                                                        type="button"
                                                                        value="Use"
                                                                    />
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </div>
        );
    }
}
