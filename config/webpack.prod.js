const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const common = require("./webpack.common.js");

module.exports = merge(common, {
	plugins: [
		new OptimizeCssAssetsPlugin(),
		new UglifyJSPlugin({
			parallel: true
		})
	]
});
