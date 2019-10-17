const path = require("path");
const webpack = require("webpack");
const CssExtract = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const HtmlRuntimePlugin = require("html-webpack-inline-runtime-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const PATHS = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
  static: path.resolve(__dirname, "static")
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
      publicPath: URIS.publicPath
    },
    resolve: {
      extensions: [".ts", ".js"]
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
      }
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loaders: ["babel-loader", "ts-loader"]
        },
        {
          test: /\.css$/,
          use: [
            dev ? "style-loader" : CssExtract.loader,
            { loader: "css-loader", options: { importLoaders: 1 } },
            {
              loader: "postcss-loader",
              options: {
                plugins: [
                  require("tailwindcss"),
                  require("autoprefixer"),
                  require("cssnano")
                ]
              }
            }
          ]
        }
      ]
    },
    plugins: [
      dev ? null : new CleanWebpackPlugin(),
      new webpack.HashedModuleIdsPlugin(),
      dev ? null : new CssExtract({filename: "[name].[contenthash].css"}),
      new HtmlPlugin({ title: "osrs.moe" }),
      dev ? null : new HtmlRuntimePlugin(),
      dev ? null : new CopyPlugin([{ from: PATHS.static, to: PATHS.dist }])
    ].filter(Boolean)
  };
};
