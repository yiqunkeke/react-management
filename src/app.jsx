// 1. 直接打包.js文件
// console.log('hello webpack');


// 2. 配置好babel之后
// let a = 123;
// let test = (val) => {
//     return val * 2
// };
// console.log(test(a));

// 3.配置好@babel/preset-react 和安装好 react、react-dom之后 
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'  // 4. 配置好样式 style-loader 和 css-loader之后
import './index.scss'  // 8. 配置好样式 sass-loader 之后

ReactDOM.render(
    <h1>Hello, world!</h1>,
    document.getElementById('app')
);
  