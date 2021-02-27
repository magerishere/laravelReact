import React from "react";
import Cart from "./Cart";
import Filter from "./Filter";
import Products from "./Products";
import data from "../../data.json";
import "../../../css/shop.css";
import { Link } from "react-router-dom";
import axios from "axios";
import formatCurrency from "../../formatCurrency";

class Shop extends React.Component {
    constructor() {
        super();
        this.state = {
            products: data.products,
            cartItems: localStorage.getItem("cartItems")
                ? JSON.parse(localStorage.getItem("cartItems"))
                : [],
            sort: "",
            auth: false,
            user: {},
            userMeta: {},
            message: "",
        };
    }
    filterProducts = (event) => {
        // imp
        if (event.target.value === "") {
            this.setState({ size: "", products: data.products });
        } else {
            this.setState({
                size: event.target.value,
                products: data.products.filter(
                    (product) =>
                        product.availableSizes.indexOf(event.target.value) >= 0
                ),
            });
        }
    };

    removeFromCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        this.setState({
            cartItems: cartItems.filter((x) => x.id !== product.id),
        });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(cartItems.filter((x) => x.id !== product.id))
        );
    };

    addToCart = (product) => {
        const cartItems = this.state.cartItems.slice();
        let alreadyInCart = false;
        cartItems.forEach((item) => {
            if (item.id === product.id) {
                item.count++;
                alreadyInCart = true;
            }
        });
        if (!alreadyInCart) {
            cartItems.push({ ...product, count: 1 });
        }
        this.setState({ cartItems });
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    };

    async componentDidMount() {
        const res = await axios.get("/user");
        if (res.data.status === 200) {
            this.setState({
                auth: true,
                user: res.data.user,
                userMeta: res.data.userMeta,
            });
        } else {
            this.setState({ auth: false });
        }
    }

    sortProducts = (event) => {
        // imp
        let sort = event.target.value;
        const products = this.state.products
            .slice()
            .sort((a, b) =>
                sort === "lowest"
                    ? a.price > b.price
                        ? 1
                        : -1
                    : sort === "highest"
                    ? a.price < b.price
                        ? 1
                        : -1
                    : a.id > b.id
                    ? 1
                    : -1
            );
        this.setState({ sort: sort, products: products });
    };

    createOrder = async (orders) => {
        let total = Math.round(
            orders.order.reduce((a, c) => a + c.price * c.count, 0)
        );

        const size = this.state.size;
        if (this.state.auth) {
            const res = await axios.post("/product", {
                products: orders.order,
                size: size,
                total: total,
            });

            if (res.data.status === 200) {
                this.setState({
                    message: "Your order successfuly submit!",
                });
                localStorage.clear();
            } else {
                console.log("ghalat");
            }
        } else {
            const res = await axios.post("/customer", {
                products: orders.order,
                name: orders.name,
                email: orders.email,
                address: orders.address,
            });
            if (res.data.status === 200) {
                this.setState({ message: "Your order successfuly submit!" });
                localStorage.clear();
            }
        }
    };

    render() {
        return (
            <div className="grid-container">
                <header>
                    <a href="/">فروشگاه الهه</a>
                    <div className="toolbar">
                        {this.state.auth ? (
                            <div>
                                <a href="/charge">
                                    {formatCurrency(this.state.userMeta.charge)}
                                </a>
                                {" / "}
                                <a href="/dashboard">Dashboard</a>
                            </div>
                        ) : (
                            <div>
                                <Link to="/login">Login</Link>
                                {" / "}
                                <Link to="/register">Register</Link>
                            </div>
                        )}
                    </div>
                </header>
                <main>
                    <div className="content">
                        <div className="main">
                            <Filter
                                count={this.state.products.length}
                                sort={this.state.sort}
                                size={this.state.size}
                                filterProducts={this.filterProducts}
                                sortProducts={this.sortProducts}
                            />
                            <Products
                                products={this.state.products}
                                addToCart={this.addToCart}
                            ></Products>
                        </div>
                        <div className="sidebar">
                            <Cart
                                cartItems={this.state.cartItems}
                                removeFromCart={this.removeFromCart}
                                createOrder={this.createOrder}
                                auth={this.state.auth}
                                message={this.state.message}
                                user={this.state.user}
                                userMeta={this.state.userMeta}
                            />
                        </div>
                    </div>
                </main>
                <footer>All right is reserved.</footer>
            </div>
        );
    }
}

export default Shop;
