const path = require('path');
const modeConfig = env => require(`./build-utils/webpack.${env}`)(env);
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

module.exports = ({ mode } = { mode: 'production' }) => {
	return webpackMerge(
		{
			mode: mode,
			output: {
				publicPath: '/',
				filename: 'bundle.js',
				path: path.resolve(__dirname, 'public')
			},
			module: {
				rules: [
					{
						enforce: 'pre',
						test: /\.js$/,
						exclude: /node_modules/,
						loader: 'eslint-loader'
					},
					{
						test: /\.js$/,
						use: 'babel-loader'
					}
				]
			},
			plugins: [
				new webpack.ProgressPlugin(),
				new HtmlWebpackPlugin({
					template: './src/index.html'
				})
			]
		},
		modeConfig(mode)
	);
};
