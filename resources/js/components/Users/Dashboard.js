import React, { Component } from "react";
import formatCurrency from "../../formatCurrency";
import moment from "moment";
import axios from "axios";

export default class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bill: "",
            products: [],
        };
    }

    addBill = async (bill) => {
        this.setState({ bill });
        const res = await axios.get(`/product/${bill.bill_id}`);
        if (res.data.status === 200) {
            this.setState({ products: res.data.products });
        }
    };

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-5 col-md-6 col-sm-6">
                            <div className="card card-stats">
                                <div className="card-header card-header-primary card-header-icon">
                                    <div className="card-icon">
                                        <i className="material-icons">store</i>
                                    </div>
                                    <p className="card-category">Total Cost</p>
                                    <h3 className="card-title">
                                        {formatCurrency(
                                            this.props.bills.reduce(
                                                (a, c) => a + c.total,
                                                0
                                            )
                                        )}
                                    </h3>
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">
                                            date_range
                                        </i>{" "}
                                        Last 24 Hours
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7 col-md-6 col-sm-6">
                            <div className="card card-chart">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Bill Info</h4>
                                    <div
                                        className="ct-chart"
                                        id="dailySalesChart"
                                    ></div>
                                </div>
                                <div className="card-body">
                                    {this.state.bill && (
                                        <table className="body-wrap">
                                            <tbody>
                                                <tr>
                                                    <td></td>
                                                    <td
                                                        className="container"
                                                        width="600"
                                                    >
                                                        <div className="content">
                                                            <table
                                                                className="main"
                                                                width="100%"
                                                                cellpadding="0"
                                                                cellspacing="0"
                                                            >
                                                                <tbody>
                                                                    <tr>
                                                                        <td className="content-wrap aligncenter">
                                                                            <table
                                                                                width="100%"
                                                                                cellpadding="0"
                                                                                cellspacing="0"
                                                                            >
                                                                                <tbody>
                                                                                    <tr>
                                                                                        <td className="content-block">
                                                                                            <h2>
                                                                                                Thanks
                                                                                                for
                                                                                                using
                                                                                                our
                                                                                                shop
                                                                                            </h2>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td className="content-block">
                                                                                            <table className="invoice">
                                                                                                <tbody>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            {
                                                                                                                this
                                                                                                                    .props
                                                                                                                    .email
                                                                                                            }
                                                                                                            <br />
                                                                                                            Invoice
                                                                                                            #
                                                                                                            {
                                                                                                                this
                                                                                                                    .state
                                                                                                                    .bill
                                                                                                                    .bill_id
                                                                                                            }
                                                                                                            <br />
                                                                                                            {moment(
                                                                                                                this
                                                                                                                    .state
                                                                                                                    .bill
                                                                                                                    .created_at
                                                                                                            ).fromNow()}
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                    <tr>
                                                                                                        <td>
                                                                                                            <table
                                                                                                                className="invoice-items"
                                                                                                                cellpadding="0"
                                                                                                                cellspacing="0"
                                                                                                            >
                                                                                                                <tbody>
                                                                                                                    {this.state.products.map(
                                                                                                                        (
                                                                                                                            product
                                                                                                                        ) => (
                                                                                                                            <tr>
                                                                                                                                <td>
                                                                                                                                    {
                                                                                                                                        product.name
                                                                                                                                    }{" "}
                                                                                                                                    {
                                                                                                                                        product.count
                                                                                                                                    }{" "}
                                                                                                                                    x
                                                                                                                                </td>
                                                                                                                                <td className="alignright">
                                                                                                                                    {formatCurrency(
                                                                                                                                        product.price
                                                                                                                                    )}
                                                                                                                                </td>
                                                                                                                            </tr>
                                                                                                                        )
                                                                                                                    )}

                                                                                                                    <tr className="total">
                                                                                                                        <td
                                                                                                                            className="alignright"
                                                                                                                            width="80%"
                                                                                                                        >
                                                                                                                            Total
                                                                                                                        </td>
                                                                                                                        <td className="alignright">
                                                                                                                            {formatCurrency(
                                                                                                                                this
                                                                                                                                    .state
                                                                                                                                    .bill
                                                                                                                                    .total
                                                                                                                            )}
                                                                                                                        </td>
                                                                                                                    </tr>
                                                                                                                </tbody>
                                                                                                            </table>
                                                                                                        </td>
                                                                                                    </tr>
                                                                                                </tbody>
                                                                                            </table>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="content-block">
                                                                                            {
                                                                                                this
                                                                                                    .state
                                                                                                    .bill
                                                                                                    .address
                                                                                            }
                                                                                        </td>
                                                                                    </tr>
                                                                                </tbody>
                                                                            </table>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    )}
                                </div>
                                <div className="card-footer">
                                    <div className="stats">
                                        <i className="material-icons">
                                            access_time
                                        </i>{" "}
                                        updated 4 minutes ago
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <div className="card">
                                <div className="card-header card-header-primary">
                                    <h4 className="card-title">Bills</h4>
                                </div>

                                <div className="card-body table-responsive">
                                    {this.props.bills.length > 0 && (
                                        <table className="table table-hover">
                                            <thead className="text-primary">
                                                <th>ID</th>
                                                <th>Total</th>
                                                <th>Created at</th>
                                                <th>Bill</th>
                                            </thead>
                                            <tbody>
                                                {this.props.bills.map(
                                                    (bill) => (
                                                        <tr key={bill.id}>
                                                            <td>
                                                                {bill.bill_id}
                                                            </td>
                                                            <td>
                                                                {formatCurrency(
                                                                    bill.total
                                                                )}
                                                            </td>
                                                            <td>
                                                                {moment(
                                                                    bill.created_at
                                                                ).fromNow()}
                                                            </td>
                                                            <td>
                                                                <a href="#">
                                                                    <button
                                                                        className="btn btn-primary"
                                                                        onClick={() =>
                                                                            this.addBill(
                                                                                bill
                                                                            )
                                                                        }
                                                                    >
                                                                        Bill
                                                                    </button>
                                                                </a>
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
                    </div>
                </div>
            </div>
        );
    }
}
