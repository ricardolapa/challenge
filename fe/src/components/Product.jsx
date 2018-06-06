import React, { Component } from 'react';

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
        // TODO:
        // add product to basket
        // make a request to update current basket price
        console.log(product);
    }

    render() {
        return (
            <article className="col-sm-4">
                <h4>{this.state.description}</h4>
                <p>Category: {this.state.category}</p>
                <p>Price: {this.state.price}</p>
                <button onClick={ () => this.onAddProduct(this.state) }>Select</button>
            </article>
        );
    }
}