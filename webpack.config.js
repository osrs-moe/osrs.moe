const path = require("path");
const CssExtract = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const dev = process.env.NODE_ENV !== "production";
process.traceDeprecation = true;

module.exports = {
  mode: dev ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  optimization: {
    minimizer: ["...", new CssMinimizerPlugin()],
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.css$/,
        use: [
          CssExtract.loader,
          { loader: "css-loader", options: { importLoaders: 1 } },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-import"),
                  require("tailwindcss")({
                    future: {
                      defaultLineHeights: true,
                      purgeLayersByDefault: true,
                      removeDeprecatedGapUtilities: true,
                      standardFontWeights: true,
                    },
                    purge: {
                      content: [
                        "./src/**/*.html",
                        "./src/**/*.css",
                        "./src/**/*.ts",
                      ],
                    },
                  }),
                  require("autoprefixer"),
                ],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    dev ? null : new CleanWebpackPlugin(),
    dev ? null : new CssExtract({ filename: "[name].[contenthash].css" }),
    new HtmlPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
    }),
  ].filter(Boolean),
};
