import React from 'react';
import Cart from './component/cart.jsx'
import Products from './component/products.jsx'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			cart: [],
			modal: false,
			total: 0
		}

		this.products = [
			{
				id: 100,
				name: 'Master Account',
				price: 50,
				description: 'Master account for 1 year more 3 associate accounts',
			},
			{
				id: 101,
				name: 'Associate',
				price: 10,
				description: 'Associate Account',
			},
			{
				id: 102,
				name: 'Associate 5',
				price: 40,
				description: 'Associate 5 accounts',
			}
		];

		this.addProduct = this.addProduct.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.viewModal = this.viewModal.bind(this)

	}

	addProduct(product) {
		let addCart = this.state.cart;

		addCart.push(product);

		this.setState({
			cart: addCart
		});
	}

	deleteProduct(id) {
		let addCart = this.state.cart;

		addCart.splice(id,1);

		this.setState({
			cart: addCart
		});
	}

	viewModal() {
		let modal = this.state.modal ? false : true;

		this.setState({
			modal: modal
		})
	}

	render(){

		let total = this.state.total;

		this.state.cart.map((product) => total += product.price );

	 	return(
	 		<div className='container'>

		 		<Cart deleteProduct={this.deleteProduct} modal={this.state.modal} viewModal={this.viewModal} total={total} cart={this.state.cart} />

		 		<Products modal={this.state.modal} viewModal={this.viewModal} addProduct={this.addProduct} products={this.products} cart={this.state.cart}/>
	 			
	 		</div>
	 	)
	}
}

export default App;