# react-management
React16+React-Router4 从零打造企业级电商后台管理系统

## 搭建项目：

1. 安装 webpack, webpack-cli

``` js
yarn add webpack webpack-cli -D
```

2. 添加 `webpack.config.js` 配置文件：

配置entry 和 output 

```js
const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }
};
```

3. 安装 html-webpack-plugin 插件

**在webpack官网，搜索 html-webpack-plugin 进行安装配置**

```js
    // 安装 html-webpack-plugin
    yarn add html-webpack-plugin -D
```

```js
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // 引入html-webpack-plugin
    module.exports = {
        entry: './src/app.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        },
        plugins: [ // 配置 html-webpack-plugin
            new HtmlWebpackPlugin({
                template: './src/index.html' // 并指定html模板文件
            })
        ]
    };
```

4. 在项目中安装并使用 babel

在webpack官网搜索，babel || 或者**直接去Babel官网，查看如何安装和配置**

```js  
    // 安装babel
    yarn add babel-loader @babel/core @babel/preset-env -D
```

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    },
    module: {  
        rules: [
          {  // 配置babel
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            }
          }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
};
```

5. 安装处理 React 的工具

**在 Babel官网去查，使用 babel处理react文件**

```js
    // 安装@babel/preset-react
    yarn add @babel/preset-react -D
```

**在React官网，查看并安装react**

```js
    // 安装react react-dom
    yarn add react react-dom -S
```

```js
    // 配置 react
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: './src/app.jsx',  // 入口文件由 app.js 改为 app.jsx
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        },
        module: {  
            rules: [
            {
                test: /\.jsx$/,  // 把babel转换文件的类型由 .js 改为 .jsx
                exclude: /(node_modules)/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'] // 在数组中添加 '@babel/preset-react'
                }
                }
            }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    };
```

6. 配置样式

**在webpack官网，搜索 css-loader、style-loader**

```js
    // 安装 css-loader 和 style-loader
    yarn add css-loader style-loader -D
```
```js
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.exports = {
        entry: './src/app.jsx',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        },
        module: {
            rules: [
            {
                test: /\.jsx$/,
                exclude: /(node_modules)/,
                use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react']
                }
                }
            },
            { // 配置 css-loader 和 style-loader
                test: /\.css$/,
                use: [
                    'style-loader', 
                    'css-loader'
                ]
            }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    };
```

7. 将打包好的样式，提取到单独的文件

默认在 app.jsx 中引入的 css 文件会被写入打包好的js中去。这样就会存在一个问题：样式文件要等到所有的js 文件加载完之后才会出来。也就是有很长时间的样式加载时间。

为了解决这个问题，需要**把样式文件单独打包到一个文件中**，并通过<link>标签插入到index.html文件的head标签中。

**在webpack官网，搜索MiniCssExtractPlugin**

```js
    // 安装 mini-css-extract-plugin
    yarn add mini-css-extract-plugin -D
```

```js
    // 配置 mini-css-extract-plugin
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    module.exports = {
        plugins: [new MiniCssExtractPlugin()],
        module: {
            rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            ],
        },
    };
```

8. 配置 sass

**在webpack官网，搜索sass-loader**, 参考配置

```js
    // 安装 sass-loader sass node-sass （配置参考webpack官网进行配置）
    yarn add sass-loader sass node-sass -D
```

9. 配置图片

**在webpack官网，搜索url-loader**, 参考配置

```js
    // 安装 surl-loader 和 file-loader（配置参考webpack官网进行配置）
    yarn add url-loader file-loader -D
```

10. 使用字体图标

**在 yarn 官网上搜索 font-awesome**进行安装

```js
    yarn add font-awesome -S
```
安装好之后， 在 node_modules目录中，可以找到 **font-awesome**文件目录，里面包含 css、less、scss、fonts目录

直接在入口文件app.jsx 中引入 font-awesome/css下的 `font-awesome.min.css`

在font-awesome/fonts目录下有多种字体文件，包含：.eot, .svg, .ttf, .woff, .woff2, .otf 文件。这些文件，需要在webpack.config.js中配置file-loader才能被webpack解析。

```js
    { // font-awesome
            test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
            use: ['url-loader'],
          },
```

11. 关闭webpack的性能提示

在webpack官网搜索 **performance**，可以关闭webpack在编译时对超出文件大小限制的提示

```js
    module.exports = {
    //...
    performance: {
        hints: false
    }
    };
```

12. 给打包出的文件配置放置的目录

css文件放在css文件目录，js 放在 js文件目录


13. 配置 webpack-dev-server

在webpack官网搜索 webpack-dev-server ，进行安装和配置

```js
    yarn add webpack-dev-server -D
```

**注意：如果webpack-dev-server报错，可能是 webpack-cli 与 webpack-dev-server 版本原因**

**解决办法**： 把webpack-cli的版本降级，至3.3.12可以成功启动webpack-dev-server

"webpack": "^5.5.1",

"webpack-cli": "3.3.12",

"webpack-dev-server": "^3.11.0"