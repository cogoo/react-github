//@ts-check
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => ({
	output: {
		chunkFilename: '[name].lazy-chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			}
		]
	},
	plugins: [new MiniCssExtractPlugin()]
});
