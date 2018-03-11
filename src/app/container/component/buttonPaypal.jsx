import React from 'react';

class ButtonPaypal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status: 'PayPal'
		}
		
		this.buy = this.buy.bind(this)
	}

	buy(items) {

		this.setState({
			status: 'Wait'
		})

		document.querySelector('.contButtonPay').classList.add('process')

		let jsonSend = encodeURIComponent(JSON.stringify(items, ' ', ''));

		let http = new XMLHttpRequest();

		http.onreadystatechange = () => {

			if (http.readyState == 4 && http.status == 200) {

				window.location.href = http.response;

			} 
		}

		http.open('POST', `buy/${jsonSend}`, true);

		http.send();

	}

	render() {
		return (

 			<div onClick={() => this.buy(this.props.cart)} className='contButtonPay'>{this.state.status}</div>

		)
	}
}

export default ButtonPaypal;