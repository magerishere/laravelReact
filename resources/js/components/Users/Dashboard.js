import React, { Component } from "react";
import formatCurrency from "../../formatCurrency";


export default class Dashboard extends Component {
 
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
                                        {formatCurrency(this.props.total)}
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
                                    <h4 className="card-title">
                                        Product Finish
                                    </h4>
                                    <div
                                        className="ct-chart"
                                        id="dailySalesChart"
                                    ></div>
                                </div>
                                <div className="card-body"></div>
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
                                    <h4 className="card-title">
                                        Products Status
                                    </h4>
                                </div>
                                <div className="card-body table-responsive">
                                    <table className="table table-hover">
                                        <thead className="text-primary">
                                            <th>ID</th>
                                            <th>Name</th>
                                            <th>Count</th>
                                            <th>Price</th>
                                            <th>Total</th>
                                           
                                            <th>Deliver</th>
                                        </thead>
                                        <tbody>
                                            {this.props.products.map(
                                                (product) => (
                                                    <tr key={product.id}>
                                                        <td>{product.id}</td>
                                                        <td>{product.name}</td>
                                                        <td>{product.count}</td>

                                                        <td>
                                                            {formatCurrency(
                                                                product.price
                                                            )}
                                                        </td>
                                                        <td>
                                                            {formatCurrency(
                                                                product.count *
                                                                    product.price
                                                            )}
                                                        </td>
                                        
                                                        <td>
                                                            {product.deliver
                                                                ? "Yes"
                                                                : "No"}
                                                        </td>
                                               
                                                    </tr>
                                                )
                                            )}
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
