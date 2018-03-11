import React from 'react';
import Product from './product.jsx';

class Products extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
	 	return (
	 		<div className='shop' onClick={this.props.modal ? ()=>{this.props.viewModal()} : null}>
	 		
		 		<ul className='listShop'>
	 		
		 		{
		 			this.props.products.map( (product, i) => 
		 				
		 				<li className='contProductShop' key={i}>

			 				<Product style='productShop' product={ product } />

			 				{ 
			 					product.name == 'Master Account'

			 					?

				 					this.props.cart.some( element => element.name == 'Master Account')

				 					? <button className='buttonAdd disable'> Amount 1 </button>
				 					
				 					: <button onClick={() => { this.props.addProduct( product ) }} className='buttonAdd'> Add </button>


				 				: 

				 					this.props.cart.some( element => element.id == product.id)

				 					? <button onClick={() => { this.props.addProduct( product ) }} className='buttonAdd'> Amount { product.items } </button>
				 					
				 					: <button onClick={() => { this.props.addProduct( product ) }} className='buttonAdd'> Add </button>
				 					

			 				}

			 			</li>
		 			)
		 		}
	 			
	 			</ul>
	 			
	 		</div>
	 	)
	}
}

export default Products;