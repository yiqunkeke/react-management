import React from 'react'
import ReactDOM from 'react-dom'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

import Home from 'pages/home/index'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/" component={Home}></Route>
                    <Redirect from="*" to="/"></Redirect>
                </Switch>
            </Router>
        )
    }
}



ReactDOM.render(
    <App/>,
    document.getElementById('app')
)