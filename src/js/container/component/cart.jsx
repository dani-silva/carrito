import React from 'react';
import Product from './product.jsx';
import ButtonPaypal from './buttonPaypal.jsx';

const Modal = (props) => (
	<div className='modalCart'>
		{
			props.buy.length == 0

			? 

				<div className='emptyCart'>
					Empty cart
				</div>

			:

				<ul className='contItemsCart'>
			 		{
			 			props.buy.map( (product, i) => 
		 				<li className='itemModalCart' key={i}>
			 				<Product style='productModal' product={ product } /> 
			 				<span onClick={()=>{props.delete(i)}} className='buttonDelete'> <img src='images/cancel.svg' /> </span>
			 			</li>
			 			)
			 		}
				</ul>
			
		}

		{

			props.buy.length == 0

			? null

			: <ButtonPaypal total={props.total} />
			
		}

	</div>
);

class Cart extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			modal: false
		}

		this.viewModal = this.viewModal.bind(this)
	}

	viewModal() {
		let modal = this.state.modal ? false : true;

		this.setState({
			modal: modal
		})
	}

	render(){
 
		return(
	 		<div className='cart'>

	 			<h1 className='title'>Finshape</h1>
	 		
		 		<div className='contCart'>
		 			
					<img onClick={()=>{this.props.viewModal()}} className='buttonCart' src='images/cart.svg' />
					
		 			<div className='cartInfo'>

						<span> Cart: {this.props.cart.length} </span>

						<span> Sub Total: $ {this.props.total} </span>

					</div>
					
	 				{ 
	 					this.props.modal 

	 					? <Modal total={this.props.total} delete={this.props.deleteProduct} buy={this.props.cart} />

	 					: null
	 				}
					
	 			</div>
	 			
	 		</div>
	 	)
	}
}

export default Cart;