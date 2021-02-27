import React, { Component } from "react";
import formatCurrency from "../../formatCurrency";
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false,
            finishBuy: false,
            total: 0,
            showAddress: false,
        };
    }

    handlerInput = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };

    createOrder = () => {
        const orders = {
            name: this.state.name,
            email: this.state.email,
            address: this.state.address,
            order: this.props.cartItems,
        };

        this.props.createOrder(orders);
        this.closeModel();
    };
    closeModel = () => {
        this.setState({ finishBuy: false });
    };

    checkMoney = () => {
        this.props.cartItems.reduce(
            (a, c) => a + c.price * c.count,
            0 < this.props.userMeta.charge
                ? this.setState({ finishBuy: true })
                : this.setState({ showCheckout: true })
        );
    };

    checkAddress = () => {
        const address = this.props.userMeta.address;
        if (address) {
            this.setState({ finishBuy: true });
        } else {
            this.setState({ showAddress: true });
        }
    };

    componentWillMount() {
        Modal.setAppElement("body");
    }

    render() {
        const { cartItems } = this.props;

        return (
            <div>
                {this.state.finishBuy && (
                    <Modal isOpen={true} onRequestClose={this.closeModel}>
                        <Zoom>
                            <div class="finishBuy offset-xl-2 col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12 padding">
                                <div class="card">
                                    <div class="card-header p-4">
                                        <button
                                            type="button"
                                            onClick={this.closeModel}
                                        >
                                            x
                                        </button>
                                        <a
                                            class="pt-2 d-inline-block"
                                            href="http://example.local/"
                                            data-abc="true"
                                        >
                                            example.com
                                        </a>
                                        <div class="float-right">
                                            <h3 class="mb-0">
                                                Invoice #BBB10234
                                            </h3>
                                            Date: 12 Jun,2019
                                        </div>
                                    </div>
                                    <div class="card-body">
                                        <div class="row mb-4">
                                            <div class="col-sm-6">
                                                <h5 class="mb-3">From:</h5>
                                                <h3 class="text-dark mb-1">
                                                    فروشگاه الهه
                                                </h3>
                                                <div>
                                                    {" "}
                                                    اسلامشهر خیابان شیرازی
                                                </div>
                                                <div>
                                                    فرمانداری دانشگاه اسلامشهر
                                                </div>
                                                <div>
                                                    Email: elahe@elahe.com
                                                </div>
                                                <div>
                                                    Phone: +91 9897 989 989
                                                </div>
                                            </div>
                                            {this.props.auth ? (
                                                <div class="col-sm-6 ">
                                                    <h5 class="mb-3">To:</h5>
                                                    <h3 class="text-dark mb-1">
                                                        {
                                                            this.props.userMeta
                                                                .fname
                                                        }
                                                    </h3>
                                                    <div>
                                                        {
                                                            this.props.userMeta
                                                                .country
                                                        }{" "}
                                                        {
                                                            this.props.userMeta
                                                                .city
                                                        }{" "}
                                                    </div>
                                                    <div>
                                                        {
                                                            this.props.userMeta
                                                                .address
                                                        }
                                                    </div>
                                                    <div>
                                                        Email:{" "}
                                                        {this.props.user.email}
                                                    </div>
                                                    <div>
                                                        Phone: +91 9895 398 009
                                                    </div>
                                                </div>
                                            ) : (
                                                <div class="col-sm-6 ">
                                                    <h5 class="mb-3">To:</h5>
                                                    <h3 class="text-dark mb-1">
                                                        {this.state.name}
                                                    </h3>
                                                    <div>ایران</div>
                                                    <div>
                                                        {this.state.address}
                                                    </div>
                                                    <div>
                                                        Email:{" "}
                                                        {this.state.email}
                                                    </div>
                                                    <div>
                                                        Phone: +91 9895 398 009
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div class="table-responsive-sm">
                                            <table class="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th class="center">
                                                            #
                                                        </th>
                                                        <th>Item</th>
                                                        <th>Description</th>
                                                        <th class="right">
                                                            Price
                                                        </th>
                                                        <th class="center">
                                                            Qty
                                                        </th>
                                                        <th class="right">
                                                            Total
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {cartItems.map(
                                                        (cartItem) => (
                                                            <tr
                                                                key={
                                                                    cartItem.id
                                                                }
                                                            >
                                                                <td class="center">
                                                                    {
                                                                        cartItem.id
                                                                    }
                                                                </td>
                                                                <td class="left strong">
                                                                    {
                                                                        cartItem.title
                                                                    }
                                                                </td>
                                                                <td class="left">
                                                                    {cartItem.description.substring(
                                                                        0,
                                                                        30
                                                                    )}
                                                                    ...
                                                                </td>
                                                                <td class="right">
                                                                    {formatCurrency(
                                                                        cartItem.price
                                                                    )}
                                                                </td>
                                                                <td class="center">
                                                                    {
                                                                        cartItem.count
                                                                    }
                                                                </td>
                                                                <td class="right">
                                                                    {formatCurrency(
                                                                        cartItem.price *
                                                                            cartItem.count
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="row">
                                            <div class="col-lg-4 col-sm-5"></div>
                                            <div class="col-lg-4 col-sm-5 ml-auto">
                                                <table class="table table-clear">
                                                    <tbody>
                                                        <tr>
                                                            <td class="left">
                                                                <strong class="text-dark">
                                                                    Subtotal
                                                                </strong>
                                                            </td>
                                                            <td class="right">
                                                                {formatCurrency(
                                                                    cartItems.reduce(
                                                                        (
                                                                            a,
                                                                            c
                                                                        ) =>
                                                                            a +
                                                                            c.price *
                                                                                c.count,
                                                                        0
                                                                    )
                                                                )}
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td class="left">
                                                                <strong class="text-dark">
                                                                    Discount
                                                                    (10%)
                                                                </strong>
                                                            </td>
                                                            <td class="right">
                                                                {formatCurrency(
                                                                    cartItems.reduce(
                                                                        (
                                                                            a,
                                                                            c
                                                                        ) =>
                                                                            a +
                                                                            c.price *
                                                                                c.count,
                                                                        0
                                                                    ) * 0.1
                                                                )}
                                                            </td>
                                                        </tr>

                                                        <tr>
                                                            <td class="left">
                                                                <strong class="text-dark">
                                                                    Total
                                                                </strong>{" "}
                                                            </td>
                                                            <td class="right">
                                                                <strong class="text-dark">
                                                                    {formatCurrency(
                                                                        cartItems.reduce(
                                                                            (
                                                                                a,
                                                                                c
                                                                            ) =>
                                                                                a +
                                                                                c.price *
                                                                                    c.count,
                                                                            0
                                                                        ) -
                                                                            cartItems.reduce(
                                                                                (
                                                                                    a,
                                                                                    c
                                                                                ) =>
                                                                                    a +
                                                                                    c.price *
                                                                                        c.count,
                                                                                0
                                                                            ) *
                                                                                0.1
                                                                    )}
                                                                </strong>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer bg-white">
                                        <p class="mb-0">
                                            {this.props.auth
                                                ? "We will save your bill product in your account"
                                                : "We will send your bill product to your email"}
                                        </p>
                                        <input
                                            type="submit"
                                            value="Finish"
                                            className="button primary"
                                            onClick={() => this.createOrder()}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
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
                                    {this.props.auth ? (
                                        <a href="/dashboard">Check Here!</a>
                                    ) : (
                                        <p>
                                            we sent your bill product to your
                                            email
                                        </p>
                                    )}
                                </p>
                            )}
                            {this.props.message === "" &&
                                cartItems.map((item) => (
                                    <li key={item.id}>
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
                                        this.checkMoney();
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
                                                    <p>
                                                        You have not enough
                                                        money
                                                    </p>
                                                    <div className="row col-md-12">
                                                        <button
                                                            className="button primary col-md-6"
                                                            type="button"
                                                            onClick={() =>
                                                                this.checkAddress()
                                                            }
                                                        >
                                                            Continue
                                                        </button>

                                                        <a
                                                            href="/charge"
                                                            className="col-md-5"
                                                        >
                                                            <button
                                                                className="button primary"
                                                                type="button"
                                                            >
                                                                Charge
                                                            </button>
                                                        </a>
                                                    </div>
                                                </li>
                                                {this.state.showAddress && (
                                                    <Fade left>
                                                    <li>
                                                        <p>
                                                            Please first set
                                                            your address
                                                        </p>
                                                        <div>
                                                            <a
                                                                href="/profile"
                                                            >
                                                                <button
                                                                    className="button primary"
                                                                    type="button"
                                                                >
                                                                    Set Address
                                                                </button>
                                                            </a>
                                                        </div>
                                                    </li>
                                                    </Fade>
                                                )}
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
                                                        type="button"
                                                        onClick={() =>
                                                            this.setState({
                                                                finishBuy: true,
                                                            })
                                                        }
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
