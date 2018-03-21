'use strict';

let webpack = require('webpack');
let path = require('path');

let DIST_DIR  = path.resolve(__dirname, 'dist');
let SRC_DIR  = path.resolve(__dirname, 'src');

let config = {

	entry: {
		cart: `${ SRC_DIR }/app/index.jsx`
	},

	output: {
		path: `${ DIST_DIR }/`,
		filename: '[name].js',
		publicPath: '/app/'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: `${ SRC_DIR }/app`,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	},

	watch: true
};

module.exports = config;
