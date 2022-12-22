const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/client/index.js',
    mode: 'development',
    devtool: 'inline-source-map',
    stats: 'verbose',
    output: {
        clean: true,
        libraryTarget: "this"
      },
      devServer: {
        port: 3000
      },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {presets: ['@babel/preset-env']}
                }
              },
            {
                test: /.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
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
        }),
        new MiniCssExtractPlugin({filename:"[name].css"}),
        new CleanWebpackPlugin({
            dry: true,
            verbose: true,
            protectWebpackAssets: false,
            cleanStaleWebpackAssets: true
        }),
    ]
}
