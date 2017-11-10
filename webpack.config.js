'use strict';

let webpack = require('webpack');
let path = require('path');

let DIST_DIR  = path.resolve(__dirname, 'public');
let SRC_DIR  = path.resolve(__dirname, 'src');

let config = {

	entry: `${ SRC_DIR }/js/index.jsx`,

	output: {
		path: `${ DIST_DIR }/`,
		filename: 'bundle.js',
		publicPath: '/app/'
	},

	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: `${ SRC_DIR }/js`,
				loader: 'babel-loader',
				exclude: '/node_modules/'
			}
		]
	},

	watch: true
};

module.exports = config;
