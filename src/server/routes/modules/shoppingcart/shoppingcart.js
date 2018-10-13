const express = require('express'),
	paypal = require('paypal-rest-sdk'),
	config = require('config'),
	Router = express.Router();

paypal.configure({
  'mode': config.paypal.mode, //sandbox or live
  'client_id': config.paypal.client_id,
  'client_secret': config.paypal.client_secret
});

Router
	.get('/', (req, res) => res.render('shoppingcart',{data: null}))

	.post('/buy/:items', (req, res) => {
		
		let arrayItems = JSON.parse(req.params.items).map((item)=>{
			return {
				"name": item.name,
                "sku": item.id,
                "price": item.price,
                "currency": "USD",
                "quantity": item.items
			}
		});

		let total = 0;

		JSON.parse(req.params.items).map((product) => product.items == 1 ? total += product.price : total += product.price * product.items);

		const create_payment_json = {
		    "intent": "sale",
		    "payer": {
		        "payment_method": "paypal"
		    },
		    "redirect_urls": {
		        "return_url": `${config.server.host}:${config.server.port}/shoppingcart/receipt`,
		        "cancel_url": `${config.server.host}:${config.server.port}/shoppingcart`
		    },
		    "transactions": [{
		        "item_list": {
		            "items": arrayItems
		        },
		        "amount": {
		            "currency": "USD",
		            "total": total
		        },
		        "description": "Licence for 1 year."
		    }]
		};

		paypal.payment.create(create_payment_json, function (error, payment) {
		    if (error) {
		        throw error;
		    } else {
		    	for(let i = 0; i < payment.links.length; i++){
		    		if (payment.links[i].rel === 'approval_url') {
						//res.redirect(payment.links[i].href);
						res.send(payment.links[i].href);
		    		}
		    	}
	   		}
		});
		 
	})

	.get('/receipt', (req, res) => {

		const paymentId = req.query.paymentId;
		
		paypal.payment.get(paymentId, (error, result) => {
			res.render('shoppingcart', {data: result})

		})

	})

	.post('/success', (req, res) => {
		const execute_payment_json = {
			"payer_id": req.body.payerId,
			"transactions": [{
				"amount": req.body.amount
			}]
		};

		paypal.payment.execute(req.body.paymentId, execute_payment_json, function (error, payment) {
			if (error) {
			    res.send(error);
			} else {
			    res.send(payment);
			}
		});
	})

module.exports = Router;