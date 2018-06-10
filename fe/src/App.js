import React, { Component } from 'react';
import './App.css';
import HttpClass from './services/HttpClass';
import {Product} from './components/Product';
import { Navbar } from './components/Navbar';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			user: '',
            secret: '',
			products: [],
			logedUser: '',
			isLogged: false,
			shoppingBag: []
		}
	}

	onLogin() {
		this.state.loading = true; 
        HttpClass.prototype.auth( 
			{ user: this.state.user, secret: this.state.secret }
		).then((res) => {
			this.handleUserResponse(res);
			this.state.loading = false;
        },(err) => {
            console.log(err);
        });
	}
	
	onLogout() {
		this.setState({
			user: '',
			secret: '',
			logedUser: '',
			isLogged: false,
			products: [],
			shoppingBag: [],
			bagCounter: 0
		})
	}

	/**
	 * User Response Handler
	 * @param {object} res 
	 */
	handleUserResponse(res) {
		let response = atob(res.data);
		let responseSplited = response.split(':');
		let loggedUser = responseSplited[1];
		this.setState({
			secret: res.data,
			logedUser: loggedUser,
			isLogged: true,
		});
		this.loadProducts();
	}
	
	/**
	 * Two Way Binding from an input to a state.value
	 */
	handleValues = (name, e) => {
        this.setState({ [name]: e.target.value });
	}
	
	/**
	 * Products Request
	 */
	loadProducts() {
		this.state.loading = true;
		HttpClass.prototype.request('getproducts', 
			{ auth: this.state.secret }
		).then((res) => {
			this.setState({
				products: res.data
			});
			this.state.loading = false;
		})
	}

	/**
	 * Appends product to ShoppingBag
	 * @param {object} product 
	 */
	onAddProduct(product) {
		console.log(product);
		if (!this.productExists(product)) {
			this.state.shoppingBag.push(product);
			this.setState({
				bagCounter: this.state.shoppingBag.length
			});
		}
	}

	/**
	 * @param {object} product 
	 * @return {boolean} 
	 */
	productExists(product) {
		for (let i = 0; i < this.state.shoppingBag.length; i++) {
			if (this.state.shoppingBag[i] === product) {
				return true;
			}
		}
		return false;
	}

	onRemoveProduct(product) {		
		this.state.shoppingBag.map((item) => {
			if (item === product) {
				this.state.shoppingBag.pop(item);
			}
			this.setState({
				bagCounter: this.state.shoppingBag.length
			});
		})
	}

	/**
	 * changes an item quantity
	 * @param {object} product 
	 * @param {event} e 
	 */
	changeQty(product, e) {
		if (e.target.value < 1) {
			product.qty = 1
		} else { 
			product.qty = e.target.value;
		}
	}

	render() {
		const productList = this.state.products.map((product)=> {
			return (
				<div key={product.id} className="col-sm-4">
                	<article className="product">
						<Product 
							prod_id={product.prod_id} 
							description={product.description} 
							category={product.category} 
							price={product.price}
						/>
						<button className="btn btn-default" onClick={ () => this.onAddProduct(product) }>Add to Chart</button>
					</article>
				</div>
			);
		});	
		const shopBagList = this.state.shoppingBag.map((product, index)=> {
			return (
				<li key={index} 
					prod_id={product.prod_id} 
					description={product.description} 
					category={product.category} 
					price={product.price} 
				>
					{product.description} 
					<br/>
					Qty: &nbsp;
					<input type="number" min="1" placeholder="if not set, 1unit default" value={product.qty} onChange={ (e) => this.changeQty(product, e) } />

					<button className="btn" onClick={ () => this.onRemoveProduct(product) }>
						<span className="glyphicon glyphicon-remove-circle"></span>
					</button>
				</li>
			);
		});	

		return (
			<div className="App">
				<div className={this.state.loading ? 'lds-dual-ring' : 'hidden'}></div>
				{/* Navbar Partial */}
				<Navbar/>
				
				{/* Login Partial */}
					<div className={this.state.isLogged ? 'hidden': 'loginBox'} >
						
						<h3>Sign in</h3>
						<div className="input-group">
							<label>Username</label>
							<input className="form-control" type="text" value={this.state.user} onChange={(e) => this.handleValues("user", e)}/>
						</div>
						<div className="input-group">
							<label>Password</label>
							<input className="form-control" type="password" value={this.state.secret} onChange={(e) => this.handleValues("secret", e)}/>
						</div>
						<div className="input-group">
							<button className="btn btn-default" onClick={ () => this.onLogin() }>
								Sign in
							</button>
						</div>
					</div>
				{/* END Login Partial */}


				{/* Main App View */}
				<div className={this.state.isLogged ? 'container': 'hidden'}>
					{/* User Partial */}
						<div className="row">
							<ul className="nav navbar-nav user-nav">
								<li>
									<span className="glyphicon glyphicon-user"></span> 
									<strong>{this.state.logedUser}</strong>
								</li>
								<li >
									<a href="#" onClick={() => this.onLogout()}>
									<span className="glyphicon glyphicon-log-out"></span> 
									Logout
									</a>
								</li>
							</ul>
						</div>
					{/* END User Partial */}

					{/* ShoppingBag Partial */}
						<div className="row">
							<div className="col-sm-12">
								<small>{this.state.bagCounter ? 'Shopping Bag': ''}</small>
							</div>
						</div>
						<div className="row">
							<ul className="baglist">
								{shopBagList}
							</ul>
						</div>
					{/* ShoppingBag Partial */}

					{/* Product Partial */}
						<div className="row">
							{productList}
						</div>
					{/* Product Partial */}

				</div>
				{/* END Main App View */}

			</div>
		);
	}
}

export default App;
