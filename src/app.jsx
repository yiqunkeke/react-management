import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

// layout组件
import Layout from "component/layout";

// 页面组件
import Home from "page/home/index";
import Login from "page/login/index";

// <App> 组件用来做其他组件的集成
class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login}></Route>
          <Route
            path="/"
            render={(props) => (
              <Layout>
                <Switch>
                  <Route exact path="/" component={Home}></Route>
                  {/* 使用Redirect目的：正在做首页，为了方便调试，暂时把所有的路由都指向首页 */}
                  {/* <Redirect from="*" to="/"></Redirect> */}
                  <Route path="/product" component={Home}></Route>
                  <Route path="/product/category" component={Home}></Route>
                </Switch>
              </Layout>
            )}
          ></Route>
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
