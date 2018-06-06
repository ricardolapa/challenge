import React, { Component } from 'react';
import './App.css';
import HttpClass from './services/HttpClass';
import {Product} from './components/Product';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			products: []
		}
	}

	componentDidMount() {
		HttpClass.prototype.request('getproducts').then((res) => {
            this.setState({
				products: res.data
			});
        });
	}

	render() {
		const productList = this.state.products.map((product)=> {
			return <Product 
						key={product.id} 
						id={product.id} 
						name={product.name} 
						email={product.email} 
					/>;
		});	
		return (
			<div className="App">
				<div className="container">
					<div className="row">
						{productList}
					</div>
				</div>
			</div>
		);
	}
}

export default App;
