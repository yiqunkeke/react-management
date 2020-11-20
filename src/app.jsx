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

// 组件间的组合方式
class AppTitle extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                {/* this.props.children是react中关键字 */}
                <h2>{this.props.children}</h2>
            </div>
        )
    }
}

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

// 子组件改变父组件中的值
// 场景：子组件要改变父组件中的背景颜色 
class Child extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>父组件的背景颜色：{this.props.bgColor}</h1>
                <button onClick={() => this.handleClick() }>改变父组件颜色bgColor</button>
            </div>
        )
    }

    handleClick() {
        // this.props.bgColor = 'red' // 报错，不可以更改父组件中传递过来的props。
        this.props.changeColor('red')
    }
}

class Father extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bgColor: '#999'
        }
    }
    render() {
        return (
            <div style={{background: this.state.bgColor}}>
                {/* 解决办法： 在父组件中定义好改颜色的方法，传递给子组件，供子组件来调用此方法，从而修改父组件的颜色 */}
                <Child bgColor={this.state.bgColor} changeColor={(color) => this.onBgColorChange(color)}/>
            </div>
        )
    }

    onBgColorChange(color) {
        this.setState({
            bgColor: color
        })
    }
}

// 兄弟组件之间的传值
// 方式1-->状态提升到父组件中
class Child1 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>child1</h1>
                <button onClick={() => this.handleClick() }>改变child2的颜色</button>
            </div>
        )
    }

    handleClick() {
        this.props.changeChild2Color('red')
    }
}

class Child2 extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div style={{background: this.props.bgColor}}>
                <h1>child2：{this.props.bgColor}</h1>
            </div>
        )
    }

}

class FatherCom extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            child2BgColor: '#999'
        }
    }
    render() {
        return (
            <div>
                <Child1 changeChild2Color={(color) => this.changeChild2Color(color)}/>
                <Child2 bgColor={this.state.child2BgColor}/>
            </div>
        )
    }

    changeChild2Color(color) {
        this.setState({
            child2BgColor: color
        })
    }
}

//  生命周期
/**
 *  Mouting：挂载阶段
 *  Updating： 运行时阶段
 *  Unmounting： 卸载阶段
 *  Error Handling： 加载阶段的错误处理
 */

class LifeCircle extends React.Component {
    constructor(props) {
        super(props)
        console.log(1, 'constructor')
        this.state = {
            data: 'old state'
        }
    }

    componentWillMount() { // 异步可以写在这
        console.log(2, 'willMount')
    }

    componentDidMount() {
        console.log(4, 'didMount')
    }

    componentWillReceiveProps() {
        console.log('willReceiveProps')
    }

    shouldComponentUpdate() {
        console.log(5, 'shouldComponentUpdate')
        return true
    }

    componentDidUpdate() {
        console.log(6, 'didUpdate')
    }
    
    handleClick() {
        console.log('更新事件')
        this.setState({
            date: 'new state'
        })
    }

    render() {
        console.log(3, 'render')
        return (<div>
            生命周期
            <button onClick={() => this.handleClick()}>更新组件</button>
        </div>)
    }
}


//  路由
import {HashRouter as Router, Route, Link, Switch} from 'react-router-dom'

class A extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(this.props.match.path)
        return (
            <div>
                Component A
            </div>
        )
    }
}

class B extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>Component B</div>
        )
    }
}

class Wrapper extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Link to="/a">组件A</Link>
                <br/>
                <Link to="/b">组件B</Link>
                {this.props.children} {/* this.props.children 表示用Wrapper组件包含的内容 */}
                
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
        <hr></hr>
        <Father/>
        <hr></hr>
        <FatherCom/>
        <hr></hr>
        <LifeCircle/>
        <hr></hr>
        <Router>
            <Wrapper>
                {/* 定义路由规则---> 使用Route，且规则是在组件内定义的 */}
                <Route path="/a" component={A}></Route>
                <Route path="/b" component={B}></Route>
            </Wrapper>
        </Router>
    </div>,
    document.getElementById('app')
)