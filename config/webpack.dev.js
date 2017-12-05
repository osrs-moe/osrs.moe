const merge = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	devtool: "inline-source-map",
	devServer: {
		contentBase: "./dist",
		port: 8080,
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: require("html-webpack-template"),
			lang: "en",
			mobile: true,
			title: "osrs.moe",
			meta: [
				{
					name: "description",
					content: "A qt little site to help with tools for Oldschool RuneScape."
				}
			]
		})
	]
});
