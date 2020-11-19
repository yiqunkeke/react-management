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

// import 'font-awesome/css/font-awesome.min.css' // 10. 配置好 font-awesome 之后 
// import './index.css'  // 4. 配置好样式 style-loader 和 css-loader之后
// import './index.scss'  // 8. 配置好样式 sass-loader 之后

// let name = 'Coco'
// let flag = true
// let list = ['coco', 'qianqian', 'yiqun']

// ReactDOM.render(
//     <div>
//         <i className="fa fa-address-book" aria-hidden="true"></i>
//         {/* jsx、style、className、变量使用 */}
//         <h1 style={{color: "yellow"}} className="jsx">Hello, world! I am {name}.</h1>
//         {/* 条件判断 */}
//         {
//             flag ? <p>You are right</p> : <p>You are wrong</p>
//         }
//         {/* 数组循环 */}
//         {
//             list.map(item => {
//                 return <p key={item}>I am {item}</p>
//             })
//         }
//     </div>,
//     document.getElementById('app')
// );

// 定义组件-方式1
function Component() {
    return (
        <h1>hello world!</h1>
    )
}

// 定义组件-方式2
class Component2 extends React.Component {
    constructor(props) {
        super(props) // props是父组件传递过来的参数，统一都放在props中了。注意：props是只读的。
        
        this.state = { // state 关键字是 react中内置的
            name: 'coco',
            age: 18
        }
    }

    render() {
        // 设置 state 数据 ---> this.setState({})
        setTimeout(() => {
            this.setState({ // setState()方法继承于 React.Component组件
                name: 'yiqun'
            })
        }, 2000)
        
        return (
            <div>
                {/* 获取 state 数据 ---> this.state.xxx */}
                <h1>I am {this.state.name}. I am {this.state.age} years old.</h1>
                {/* 获取 父组件的传值 */}
                <h1>Her name is {this.props.name}.</h1>
                {/* 事件: 事件名小驼峰命名、通过箭头函数修正作用域，目的使得函数体内能够正常访问this */}
                <button onClick={() => this.handleClick() }>加一岁</button>
                {/* 事件：通过事件获取DOM数据 */}
                <input type="text" onChange={(e) => this.handleChange(e)}/>
            </div>
        )
    }

    // 事件：通过事件修改state中数据
    handleClick() {
        this.setState({
            age: this.state.age + 1
        })
    }

    // 事件：通过事件获取DOM中的数据
    handleChange(e) {
        console.log(e.target.value)
        this.setState({
            age: Number(e.target.value)
        })
    }
}

class AppTitle extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <h2>{this.props.children}</h2>
            </div>
        )
    }
}

// 组件间的组合方式
class App extends React.Component {
    render() {
        return (
           <div>
               {/* 容器组件 */}
               <AppTitle title="App Title">
                   <span>App Span</span>
                   <a href="">App link</a>
                </AppTitle>
               {/* 单纯组件 */}
               <Component/>
           </div> 
        )
    }
}



ReactDOM.render(
    <div>
        <Component/>
        <Component2 name='ella'/>
        <hr></hr>
        <App/>
    </div>,
    document.getElementById('app')
)