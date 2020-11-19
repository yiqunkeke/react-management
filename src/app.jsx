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

import 'font-awesome/css/font-awesome.min.css' // 10. 配置好 font-awesome 之后 
import './index.css'  // 4. 配置好样式 style-loader 和 css-loader之后
import './index.scss'  // 8. 配置好样式 sass-loader 之后

ReactDOM.render(
    <div>
        <i class="fa fa-address-book" aria-hidden="true"></i>
        <h1>Hello, world!</h1>
    </div>,
    document.getElementById('app')
);
  