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
		HttpClass.prototype.request('login', 
			{ user: 'Teste', pass: '1234' }
		).then((res) => {
			console.log(res);
			
            // this.setState({
			// 	products: res.data
			// });
        });
	}

	render() {
		const productList = this.state.products.map((product)=> {
			return <Product 
						key={product.id} 
						prod_id={product.prod_id} 
						description={product.description} 
						category={product.category} 
						price={product.price} 
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
