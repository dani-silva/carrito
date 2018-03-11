const express = require('express'),
	app = express(),
	publicDir = express.static(`${__dirname}/dist`),
	port = (process.env.PORT || 3000),
	routes = require('./src/server/routes/modules/shoppingCart/shoppingCart');

app.set('port', port)

app.use(publicDir)

app.use('/', routes.routes())

app.listen(app.get('port'), () => console.log('servidor corriendo: ' + port));

