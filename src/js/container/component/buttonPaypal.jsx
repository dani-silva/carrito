import React from 'react';

class ButtonPaypal extends React.Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		paypal.Button.render({

	        // Set your environment

	        env: 'sandbox', // sandbox | production

	        // Specify the style of the button

	        style: {
	            label: 'paypal',
	            size:  'responsive',    // small | medium | large | responsive
	            shape: 'rect',     // pill | rect
	            color: 'blue',     // gold | blue | silver | black
	            tagline: false    
	        },

	        // PayPal Client IDs - replace with your own
	        // Create a PayPal app: https://developer.paypal.com/developer/applications/create

	        client: {
	            sandbox:    'AfM7yYBMajgKJEMcHH5Y8vAA1piwnG0cAt42CtitV03hTg0JhyslqVbMxe2fha1abw_ZUddc88othJ3Y',
	            production: '<insert production client id>'
	        },

	        payment: function(data, actions) {
	            return actions.payment.create({
	                payment: {
	                    transactions: [
	                        {
	                            amount: { total: `${this.props.total}.00` , currency: 'USD' }
	                        }
	                    ]
	                }
	            });
	        },

	        onAuthorize: function(data, actions) {
	            return actions.payment.execute().then(function() {
	                window.alert('Payment Complete!');
	            });
	        }

    	}, '#paypal-button-container');

    	console.log(this.props.total)
	}

	render() {
		return (

 			<div id='paypal-button-container' className='contButtonPay'></div>

		)
	}
}

export default ButtonPaypal;