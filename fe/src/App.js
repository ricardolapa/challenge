import React, { Component } from 'react';
import './App.css';
import HttpClass from './services/HttpClass';
import {Product} from './components/Product';
import { Navbar } from './components/Navbar';


class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
            secret: '',
			products: [],
			logedUser: '',
			isLogged: false
		}
	}

	onLogin() {        
        HttpClass.prototype.auth( 
			{ user: this.state.user, secret: this.state.secret }
		).then((res) => {
			this.handleUserResponse(res),
			this.loadProducts();
        },(err) => {
            console.log(err);
        });
	}
	
	onLogout() {
		this.setState({
			secret: '',
			logedUser: '',
			isLogged: false,
		})
	}

	handleUserResponse(res) {
		let response = atob(res.data);
		let responseSplited = response.split(':');
		let loggedUser = responseSplited[1];
		this.setState({
			secret: res.data,
			logedUser: loggedUser,
			isLogged: true,
			products: [],
		});
	}
	
	handleValues = (name, e) => {
        this.setState({ [name]: e.target.value });
	}
	
	loadProducts() {
		HttpClass.prototype.request('getproducts', 
			{ auth: this.state.secret }
		).then((res) => {
			this.setState({
				products: res.data
			})
		})
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
						<ul className="nav navbar-nav user-nav">
							<li>
								<span className="glyphicon glyphicon-user"></span> 
								<strong>{this.state.logedUser}</strong>
							</li>
							<li onClick={() => this.onLogout()}>
								<span className="glyphicon glyphicon-log-out"></span> 
								Logout
							</li>
						</ul>
					{/* END User Partial */}

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
