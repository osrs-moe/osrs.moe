const merge = require("webpack-merge");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlCriticalPlugin = require("html-critical-webpack-plugin");
const common = require("./webpack.common.js");
const path = require("path");

const ROOT_PATH = path.resolve(__dirname, "..");
const DIST_PATH = path.resolve(ROOT_PATH, "dist");

module.exports = merge(common, {
	plugins: [
		new OptimizeCssAssetsPlugin(),
		new UglifyJSPlugin({
			parallel: true
		}),
		new HtmlCriticalPlugin({
			base: DIST_PATH,
			src: "index.html",
			dest: "index.html",
			inline: true,
			minify: true,
			extract: true,
			width: 1920,
			height: 1080,
			penthouse: {
				blockJSRequests: false,
			}
		})
	]
});
