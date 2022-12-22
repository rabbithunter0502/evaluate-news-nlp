const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const WorkboxPlugin = require("workbox-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = {
    entry: './src/client/index.js',
    mode: 'production',
    output: {
      clean: true,
      libraryTarget: "this"
      },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {presets: ['@babel/preset-env']}
                }
              },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader'
               ]
            },
            {
              test: /\.(png|jpg|jpeg|gif|ico|svg)$/,
              loader: 'file-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            favicon: "./src/client/assets/images/favicon.svg"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new WorkboxPlugin.GenerateSW({
          swDest: 'service-worker.js',
          maximumFileSizeToCacheInBytes: 10485760,
          clientsClaim: true,
          skipWaiting: true,
          cleanupOutdatedCaches: true
        })
    ]
}
