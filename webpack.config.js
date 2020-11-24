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
    devtool: 'eval-cheap-module-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      port: 8000,
      open: true,
      hot: true,
      historyApiFallback: { // 404回退界面
        index: '/dist/index.html'
      },
      proxy: {
        // 后端定义的接口文档，都是以 /manage 开头
        '/manage': {
          target: 'http://admintest.happymmall.com', // 这里注意：只修改域名
          changeOrigin: true // changeOrigin 字段的作用：设置为true，在请求接口时，会认为通过http://admintest.happymmall.com请求。如果不加changeOrigin:true，则后台环境中接收的请求会是通过localhost:8000发出来的，服务器是不认的。所以需要加changeOrigin:true来伪装成用http://admintest.happymmall.com发出去请求。
        }
      }
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
    resolve: {
      alias: {
        page: path.join(__dirname, 'src/page'),
        component: path.join(__dirname, 'src/component'),
        util: path.join(__dirname, 'src/util'),
        api: path.join(__dirname, 'src/api'),
      },
      extensions: ['.js', '.jsx', '.json']
    }
};