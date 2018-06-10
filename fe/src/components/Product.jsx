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
            prod_id: props.prod_id,
            qty: props.qty
        }
    }

    render() {
        return (
            <div>
                <h4>{this.state.description}</h4>
                <p>Category: {this.state.category}</p>
                <p>{this.state.price}</p>
            </div>
        );
    }
}