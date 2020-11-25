import React from "react";
import { Link } from "react-router-dom";
import Util from "util/index";
import User from "api/user";
const _util = new Util();
const _user = new User();

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _util.getStorage("userInfo").username || "",
    };
  }

  // 退出登录
  logout() {
    _user.logout().then(
      (res) => {
        _util.removeStorage("userInfo");
        // window.location.href = "/login";
      },
      (errMsg) => {
        _util.errorTips(errMsg);
      }
    );
  }

  render() {
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle"
            data-toggle="collapse"
            data-target=".sidebar-collapse"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <Link className="navbar-brand" to="/">
            <b>HAPPY</b>MMall
          </Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              aria-expanded="false"
            >
              <i className="fa fa-user fa-fw"></i>
              {this.state.username ? (
                <span>欢迎，{this.state.username}</span>
              ) : (
                <span>欢迎您</span>
              )}
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={() => this.logout()}>
                  <i className="fa fa-sign-out fa-fw"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

export default TopNav;
