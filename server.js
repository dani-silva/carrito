const express = require('express'),
	app = express(),
	publicDir = __dirname + '/src/server/views',
	path = require('path'),
	dist = express.static(path.join(__dirname, '/src/server/static')),
	distApp = express.static(path.join(__dirname, '/dist')),
	port = (process.env.PORT || 3000),
	routes = require('./src/server/routes/modules/shoppingcart/shoppingcart');

app
	.set('port', port)
	.set('views', publicDir)
	.set('view engine', 'ejs')
	.use(dist)
	.use(distApp)

	.use('/shoppingcart', routes)

	.listen(app.get('port'), () => console.log('servidor corriendo: ' + port));

