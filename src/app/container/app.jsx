import React from 'react';
import Cart from './component/cart.jsx'
import Products from './component/products.jsx'

class App extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			cart: [],
			modal: false,
			total: 0,
			message: null
		}

		this.alert = [
			{
				type:'Error!',
				message: 'Conecction error.'
			},
			{
				type:'Success!',
				message: 'Correct payment, licenses created.'
			},
			{
				type:'Registered!',
				message: 'Email registered with master license, it is not possible to continue with the purchase.'
			},
			{
				type:'No registered!',
				message: 'The email does not have a master license to link the associated licenses, it is not possible to continue with the purchase.'
			},
			{
				type:'Server!',
				message: ''
			}
		];

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
		this.viewModal = this.viewModal.bind(this);
		this.executePayment = this.executePayment.bind(this);
		this.consultEmail = this.consultEmail.bind(this);
		this.registerLicence = this.registerLicence.bind(this);

	}

	consultEmail(email){

        let t = this;
        let xhr = new XMLHttpRequest();
            
        xhr.onreadystatechange = () => {
            if (xhr.status == 200 && xhr.readyState == 4) 
            {        
                let response = JSON.parse(xhr.responseText);
                
				let filterPayer = this.props.receipt.transactions[0].item_list.items.filter( item => item.name == 'Master Account');
				// console.log(response)
				// console.log(filterPayer)

				if (response.status && filterPayer.length == 1) {
					
					null
					
				} else if (response.status && !filterPayer.length == 1) {
					t.setState({
						message: 3
					})
					
				} else if(response.childrenAccounts.length >= 1 && filterPayer.length == 1) {
					t.setState({
						message: 2
					})

				}
            }
        }

        xhr.onerror = () => {
            this.setState({
                message: 0
            })
        }
        
        xhr.open("POST", '/profile/getLicence', true);
        
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
        xhr.send(JSON.stringify(email));
    
	}

	componentDidMount() {
		if (this.props.receipt != null) {
			this.consultEmail({email: this.props.receipt.payer.payer_info.email})
		}
	}

	registerLicence(paymentData) {

        let t = this;
        let xhr = new XMLHttpRequest();
            
        xhr.onreadystatechange = () => {
            if (xhr.status == 200 && xhr.readyState == 4) 
            {        
                let response = JSON.parse(xhr.responseText);
                
				console.log(response)
				if (response.status) {

					t.alert[4].message = response.status;

					t.setState({
						message: 4
					})
					
				} else {
					t.setState({
						message: 1
					})
				}
            }
        }

        xhr.onerror = () => {
            this.setState({
                message: 0
            })
        }
        
        xhr.open("POST", '/profile/createLicence', true);
        
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
        xhr.send(JSON.stringify(paymentData));
    
	}

	executePayment(data) {
		document.querySelector('.buttonPay').style.cursor = 'no-drop';
		
		let paymentData = {
			payerId: data.payer.payer_info.payer_id,
			paymentId: data.id,
			amount: data.transactions[0].amount
		}

        let t = this;
        let xhr = new XMLHttpRequest();
            
        xhr.onreadystatechange = () => {
            if (xhr.status == 200 && xhr.readyState == 4) 
            {        
                let response = JSON.parse(xhr.responseText);
                
				if (response.httpStatusCode == 400) {

					t.alert[4].message = response.response.message;

					t.setState({
						message: 4
					})
					
				} else {

					this.registerLicence(response);
				}
            }
        }

        xhr.onerror = () => {
            this.setState({
                message: 0
            })
        }
        
        xhr.open("POST", '/shoppingcart/success', true);
        
        xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        
        xhr.send(JSON.stringify(paymentData));
    
	}

	addProduct(product) {
		let addCart = this.state.cart;

		if (addCart.some( el => el.name == product.name)) {

			let addItemCart = addCart;

			addItemCart.map(

				element => element.name == product.name 

					? element.items += 1

					: null

			)

			addCart = addItemCart;

		} else {

			product.items = 1;

			addCart.push(product);

		}

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

		console.log(this.props.receipt)
		
		let total = this.state.total;

		this.state.cart.map((product) => product.items == 1 ? total += product.price : total += product.price * product.items);

		if (this.props.receipt == null) {
			 return(
				 <div className='container'>
	
					 <Cart deleteProduct={this.deleteProduct} modal={this.state.modal} viewModal={this.viewModal} total={total} cart={this.state.cart} />
	
					 <Products modal={this.state.modal} viewModal={this.viewModal} addProduct={this.addProduct} products={this.products} cart={this.state.cart}/>
					 
				 </div>
			 )
		} else {
			return(
				<div className='container'>
					<Cart deleteProduct={this.deleteProduct} modal={this.state.modal} viewModal={this.viewModal} total={total} cart={this.state.cart} />
				
					<div className='receipt'>
						<h2 className='titleReceipt'>Receipt</h2>
						<p className='textReceipt'>{`Email: ${this.props.receipt.payer.payer_info.email} `}</p>
						<p className='textReceipt'>{`Nombre: ${this.props.receipt.payer.payer_info.first_name} ${this.props.receipt.payer.payer_info.last_name}`}</p>
						<ul>
						{
							this.props.receipt.transactions[0].item_list.items.map((item, index) => {
								return(
									<li className='productModal' key={index}>
										<h3>{item.name}</h3>
										<span>{`Price: ${item.price} ${item.currency}`}</span>
										<span>{`Quantity: ${item.quantity}`}</span>
									</li>
								)
							})	
						}
						</ul>
						<p className='textReceipt textTotalReceipt'>{`Total: ${this.props.receipt.transactions[0].amount.total} ${this.props.receipt.transactions[0].amount.currency}`}</p>
						{
							this.state.message || this.state.message === 0
							? 
								<p className={`messageAlert ${this.state.message == 1 ? 'successAlert' : null}`}>
									<strong>{this.alert[this.state.message].type} </strong>
									{this.alert[this.state.message].message}
								</p>				
							: null							
						}
						{
							this.state.message || this.state.message === 0
							? 
								this.state.message === 1
								? <a className='buttonsReceipt' href='/profile'>Go to profile</a>
								: null
							: <button className='buttonsReceipt buttonPay' onClick={() => this.executePayment(this.props.receipt)} >Pay now</button>
						}
						<a className='buttonsReceipt' href='/shoppingcart'>Back to shop</a>
					</div>
				</div>
			)
		}

	}
}

export default App;