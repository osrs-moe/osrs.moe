const path = require("path");
const webpack = require("webpack");
const CssExtract = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlRuntimePlugin = require("html-webpack-inline-runtime-plugin");

const PATHS = {
    src: path.resolve(__dirname, "src"),
    dist: path.resolve(__dirname, "dist"),
};

const URIS = {
    publicPath: "/"
};

module.exports = (_, opts) => {
    const dev = opts.mode !== "production";

    return {
        mode: dev ? "development" : "production",
        output: {
            path: PATHS.dist,
            filename: "[name].[contenthash].js",
            publicPath: URIS.publicPath,
        },
        resolve: {
            extensions: [".ts", ".js"]
        },
        optimization: {
            runtimeChunk: "single",
            splitChunks: {
                chunks: "all"
            }
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    loaders: ["babel-loader", "ts-loader"]
                },
                {
                    test: /\.scss$/,
                    use: [
                        dev ? "style-loader" : CssExtract.loader,
                        { loader: "css-loader", options: {importLoaders: 2}},
                        {
                            loader: "postcss-loader",
                            options: {
                                plugins: [require("autoprefixer"), require("cssnano")]
                            }
                        },
                        "sass-loader"
                    ]
                }
            ]
        },
        plugins: [
            dev ? null : new CleanWebpackPlugin(),
            new webpack.HashedModuleIdsPlugin(),
            dev ? null : new CssExtract(),
            new HtmlPlugin(),
            dev ? null : new HtmlRuntimePlugin(),


        ].filter(Boolean)

    }
};
