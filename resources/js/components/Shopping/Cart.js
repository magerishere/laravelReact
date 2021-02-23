import React, { Component } from "react";
import formatCurrency from "../../formatCurrency";
import Fade from "react-reveal/Fade";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
        };
    }

    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createOrder = (e) => {
        e.preventDefault();
        const orders = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            order: this.props.cartItems,
        };

        this.props.createOrder(orders);
    };
    render() {
        const { cartItems } = this.props;
        return (
            <div>
                {cartItems.length === 0 ? (
                    <div className="cart cart-header">Cart is empty</div>
                ) : (
                    <div className="cart cart-header">
                        You have {cartItems.length} in cart
                    </div>
                )}

                <div className="cart">
                    <Fade right cascade>
                        <ul className="cart-items">
                            {this.props.message !== "" && (
                                <p>
                                    <strong>{this.props.message}</strong>
                                    <a href="/dashboard">Check Here!</a>
                                </p>
                            )}
                            {this.props.message === "" &&
                                cartItems.map((item) => (
                                    <li key={item._id}>
                                        <div>
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                            ></img>
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className="right">
                                                {formatCurrency(item.price)} x{" "}
                                                {item.count}{" "}
                                                <button
                                                    className="button"
                                                    onClick={() =>
                                                        this.props.removeFromCart(
                                                            item
                                                        )
                                                    }
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !== 0 && (
                    <div>
                        {this.props.message === "" && (
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total:{" "}
                                        {formatCurrency(
                                            cartItems.reduce(
                                                (a, c) => a + c.price * c.count,
                                                0
                                            )
                                        )}
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        this.setState({ showCheckout: true });
                                    }}
                                    className="button primary"
                                >
                                    Procced
                                </button>
                            </div>
                        )}
                        {this.props.message === "" && this.state.showCheckout && (
                            <Fade right cascade>
                                <div className="cart">
                                    <form onSubmit={this.createOrder}>
                                        {this.props.auth ? (
                                            <ul className="form-container">
                                                <li>
                                                    <button
                                                        className="button primary"
                                                        type="submit"
                                                    >
                                                        Checkout
                                                    </button>
                                                </li>
                                            </ul>
                                        ) : (
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input
                                                        name="name"
                                                        type="text"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input
                                                        name="address"
                                                        type="text"
                                                        onChange={
                                                            this.handlerInput
                                                        }
                                                        required
                                                    />
                                                </li>
                                                <li>
                                                    <button
                                                        className="button primary"
                                                        type="submit"
                                                    >
                                                        Checkout
                                                    </button>
                                                </li>
                                            </ul>
                                        )}
                                    </form>
                                </div>
                            </Fade>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
