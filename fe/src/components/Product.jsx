import React, { Component } from 'react';

export class Product extends Component
{
    constructor(props) {
        super(props);
        this.state = {
            name: props.name,
            email: props.email,
            id: props.id
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
                <h4>{this.state.name}</h4>
                <p>{this.state.email}</p>
                <button onClick={ () => this.onAddProduct(this.state) }>Select</button>
            </article>
        );
    }
}