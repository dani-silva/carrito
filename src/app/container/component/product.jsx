import React from 'react';

class Product extends React.Component {
	constructor(props){
		super(props)
	}

	render(){
	 	return(
	 		<div className={this.props.style}>

	 			<h3>{this.props.product.name}</h3>
	 			<span>$ {this.props.product.price} USD</span>
	 			<p>{this.props.product.description}</p>
	 			
	 		</div>
	 	)
	}
}

export default Product;