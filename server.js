const express = require('express'),
	app = express(),
	publicDir = express.static(`${__dirname}/public`),
	port = (process.env.PORT || 3000),
	routes = require('./routes');

app.set('port', port)

app.use(publicDir)

app.use('/', routes.routes())

app.listen(app.get('port'), () => console.log('servidor corriendo: ' + port));

