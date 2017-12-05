const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_PATH = path.resolve(__dirname, "..");
const DIST_PATH = path.resolve(ROOT_PATH, "dist");

module.exports = {
	entry: "./src/index.ts",
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: "ts-loader",
				exclude: /node_modules/
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: ["css-loader", "sass-loader"]
				})
			}
		]
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		modules: ["node_modules", "src"],
		alias: {"mini-dark$": path.resolve(ROOT_PATH, "node_modules", "mini.css", "src", "flavors", "mini-dark.scss")}
	},
	plugins: [
		new ExtractTextPlugin("assets/style.[chunkhash].css"),
		new CleanWebpackPlugin([DIST_PATH], {root: ROOT_PATH}),
		new HtmlWebpackPlugin({
			inject: false,
			template: require("html-webpack-template"),
			baseHref: "/",
			lang: "en",
			mobile: true,
			title: "osrs.moe",
			meta: [
				{
					name: "description",
					content: "A qt little site to help with tools for Oldschool RuneScape."
				}
			],
			minify: {
				collapseWhitespace: true,
				removeComments: true,
			}
		}),
		new CopyWebpackPlugin(["static"])
	],
	output: {
		filename: "assets/bundle.[chunkhash].js",
		path: DIST_PATH
	}
};
