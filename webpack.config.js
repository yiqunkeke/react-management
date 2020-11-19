const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/app.jsx',
    output: {
        // 如果不加 publicPath, 则在 index.html中引入css和js文件时，会直接 main.css  app.js
        // 加上之后，会从 /dist/main.css     /dist/app.js
        // publicPath: '/dist/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/app.js'
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8000,
      open: true,
      hot: true
    },
    module: {
        rules: [
          { // react
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          { // css
            test: /\.css$/,
            use: [
                 MiniCssExtractPlugin.loader, 
                'css-loader'
            ]
          },
          { // sass
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ],
          },
          { // image
            test: /\.(png|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'images/[name].[ext]'
                },
              },
            ],
          },
          { // font-awesome
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: ['url-loader'],
          },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({  // 处理 html
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
          filename: 'css/[name].css'
        }) // 独立css文件
    ],
    performance: {
      hints:false //关闭 webpack 的性能提示
    },
};