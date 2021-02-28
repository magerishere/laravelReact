import React, { Component } from "react";
import formatCurrency from "../../formatCurrency";
import Fade from "react-reveal";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product: null,
        };
    }

    openModal = (product) => {
        this.setState({ product });
    };
    closeModal = () => {
        this.setState({ product: null });
    };
    render() {
        const { product } = this.state;
        return (
            <div>
                <Fade bottom cascade>
                    <ul className="products">
                        {this.props.products.length > 0 ? this.props.products.map((product) => (
                            <li key={product.id}>
                                <div className="product">
                                    <a
                                        href={"#" + product.id}
                                        onClick={() => this.openModal(product)}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                        ></img>
                                        <p>{product.title}</p>
                                    </a>
                                    <div className="product-price">
                                        <div>
                                            {formatCurrency(product.price)}
                                        </div>
                                        <button
                                            className="button primary"
                                            onClick={() =>
                                                this.props.addToCart(product)
                                            }
                                        >
                                            Add To Cart
                                        </button>
                                    </div>
                                </div>
                            </li>
                        )) : <h4>No Products</h4>}
                    </ul>
                </Fade>
                {product && (
                    <Modal isOpen={true} onRequestClose={this.closeModal}>
                        <Zoom>
                            <button
                                type="button"
                                className="close-modal"
                                onClick={this.closeModal}
                            >
                                x
                            </button>
                            <div className="product-details">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                ></img>
                                <div className="product-details-description">
                                    <p>
                                        <strong>{product.title}</strong>
                                    </p>
                                    <p>{product.description}</p>
                                    <p>
                                        AvailableSizes
                                        {product.availableSizes.map((x) => (
                                            <span key={x.length}>
                                                {" "}
                                                <button className="button">
                                                    {x}
                                                </button>
                                            </span>
                                        ))}
                                        <div className="product-price">
                                            <div>
                                                {formatCurrency(product.price)}
                                            </div>
                                            <button
                                                className="button primary"
                                                onClick={() => {
                                                    this.props.addToCart(
                                                        product
                                                    );
                                                    this.closeModal();
                                                }}
                                            >
                                                Add to cart
                                            </button>
                                        </div>
                                    </p>
                                </div>
                            </div>
                        </Zoom>
                    </Modal>
                )}
            </div>
        );
    }
}
