import React from 'react'
import './theme.css'
import TopNav from 'component/layout/topNav'
import SideNav from 'component/layout/sideNav'

class Layout extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div id="wrapper">
                <TopNav/>
                <SideNav/>
                {this.props.children}
            </div>
        )
    }
}

export default Layout