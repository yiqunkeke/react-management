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
  