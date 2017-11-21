var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
	filename: "[name].[contenthash].css",
	disable: process.env.NODE_EVN === "development"
})

module.exports = {
	context: __dirname,

	entry: {
		js: './static/pinterest/js/index.js',
		css: [
			'./static/pinterest/css/nav.scss',
			'./static/pinterest/css/pins.scss'
		]
	}, 

	output: {
		path: path.resolve('./static/pinterest/dist/js/'),
		filename: "[name].js",
	},

	plugins: [
		new BundleTracker({filename: './webpack-stats.json'}),
		new ExtractTextPlugin('./dist/css/main.scss', {
			allChunks: true
		})
	],

	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: 'babel-loader', 
				exclude: /node_modules/
			},
			{
				test: /\.jsx$/, 
				loader: 'babel-loader', exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: extractSass.extract({
					use: [{
						loader: "css-loader"
					}, {
						loader: "sass-loader"
					}],
					// use style-loader in development
					fallback: "style-loader"
				})
		],
	},
	// Automatically compile when files change
	watch: true,

	// Automatically reload page when compilation is done
	devServer: {
		inline: true
	}
}