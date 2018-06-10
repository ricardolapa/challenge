import React, { Component } from 'react';
import App from '../App';

export class Product extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            description: props.description,
            category: props.category,
            price: props.price,
            prod_id: props.prod_id
        }
    }

    onAddProduct(product) {
        App.prototype.onAddProduct(product);
    }

    render() {
        return (
            <div className="col-sm-4 ">
                <article className="product">
                    <h4>{this.state.description}</h4>
                    <p>Category: {this.state.category}</p>
                    <p>{this.state.price}</p>
                    <button className="btn btn-default" onClick={ () => this.onAddProduct(this.state) }>Add to Chart</button>
                </article>
            </div>
        );
    }
}