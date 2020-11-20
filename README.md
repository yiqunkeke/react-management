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


## React

1. 视图层框架

    * 一个构建用户界面的框架

        把数据展示在DOM上、处理在DOM上触发的事件，把DOM事件返回给数据，在react中，这是两个分开的步骤。

    * 声明式框架

    * 数据驱动DOM，再用事件反馈给数据

        注意，需要通过事件把DOM的变化反馈给数据。    

2. 组件化

    * 组件组合而不是继承

        组合方式比继承更灵活

    * state && props

        **state就是react组件中的数据**，或者称之为状态

        **props 用来进行父子组件通信**。    **子组件可以通过props拿到父组件传递进来的数据和方法**。  这里需要注意，在react中，**组件间的数据传递方式是从上到下的，就需要父组件在props 里把操作方法也传递给子组件，通过一种类似回调的方式让父组件发生改变。**

    * 生命周期

3. JSX表达式

    用它来处理数据与DOM之间的关系，无需操作DOM

    * 一种JS扩展的表达式

    * 带有逻辑的标记语法，有别于HTML模板

        带有逻辑的JSX，实际上相当于一个脚本，相比HTML 模板更灵活

    * 对样式，逻辑表达式和事件的支持   

4. 虚拟DOM

    
## React优点

1. 简洁

    单向数据流和组件化的方式，可以很大程度上降低问题的复杂度

2. 灵活

    一切都是JS

3. 高效

    虚拟DOM    


## React缺点   

1. 思维转换

2. 依赖生态

    react只是一个视图层框架，想要发挥巨大能量需要依赖它的生态系统，比如react-router、redux

3. 更新频繁

## 了解JSX语法

1. 创建项目方式

    * 在已有项目上添加

    * 通过 create-react-app 建立

2.  JSX 基本语法

3. ReactDOM

```js
    ReactDOM.render(
        jsx, 
        document.getElementById('app')
    )
```    

4. 样式处理
    style={}
    className

5. 数据逻辑处理

```js
    import React from 'react'
    import ReactDOM from 'react-dom'

    import 'font-awesome/css/font-awesome.min.css' // 10. 配置好 font-awesome 之后 
    import './index.css'  // 4. 配置好样式 style-loader 和 css-loader之后
    import './index.scss'  // 8. 配置好样式 sass-loader 之后

    let name = 'Coco'
    let flag = true
    let list = ['coco', 'qianqian', 'yiqun']

    ReactDOM.render(
        <div>
            <i className="fa fa-address-book" aria-hidden="true"></i>
            {/* jsx、style、className、变量使用 */}
            <h1 style={{color: "yellow"}} className="jsx">Hello, world! I am {name}.</h1>
            {/* 条件判断 */}
            {
                flag ? <p>You are right</p> : <p>You are wrong</p>
            }
            {/* 数组循环 */}
            {
                list.map(item => {
                    return <p key={item}>I am {item}</p>
                })
            }
        </div>,
        document.getElementById('app')
    );
```

## 了解React组件

1. 组件基本结构

2. state && props

3. 事件处理

4. 组件的组合方式

5. 组件间的数据通信

详见 app.jsx


## Router原理

1. Router原理：

    * 历史

        通过入栈，出栈方式

    * 跳转

        界面跳转

    * 事件

        打开新页面、退回到上个页面


2. 常见Router

    * 页面Router

        window.location.href="http://www.baidu.com"
        history,back()

    * Hash Router

        只有页面的hash值发生变化，页面并没有重新加载。只是在当前页面的不同状态的hash值上跳转，后退的时候，也是跳到上一个hash状态。整个页面不会刷新。最早就是通过这种hash原理为实现单页应用的路由，兼容性不错。

        window.location="#hash"

    * H5 Router

        既可以操作hash,也可以操作路径。但由于是H5提出的，所以兼容性比hash Router差一些

## React-router

1. React 官方提供的路由插件，单页应用必备

2. 使用版本， react-router-dom

3. 动态路由，纯react组件

4. 常用组件

    *  <BrowserRouter> 和 <HashRouter>， 路由方式

    *  <Route>，路由规则 ，假如在 Router里写了好几个Route，则这几个Route会一一匹配，最终匹配完才结束

    *  <Switch>, 假如用 Switch 把多个 Route包起来， 则只有第一个符合规则的Route能被匹配到

    *   <Link> 和 <NavLink> ，分别对应 跳转和导航

    *   <Redirect>，自动跳转。在匹配到路径时，自动跳转。


5. 安装使用

**去react-router-dom官网上**，有专门的安装和使用教程

```js
    yarn add react-router-dom -S
```
