import React from "react";
import "./index.scss";
import User from "api/user"; // 用户接口
import Util from "util/index"; // 工具类
const _user = new User();
const _util = new Util();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: _util.getUrlParam("redirect") || "/",
    };
  }

  componentDidMount() {
    document.title = "登录 - MMALL ADMIN";
  }
  // 用户名、密码变化
  inputChange(e) {
    let inputValue = e.target.value;
    let inputName = e.target.name;
    this.setState({
      [inputName]: inputValue, // ES6 中支持对象名是一个变量：[name]
    });
  }

  // 回车登录
  inputKeyUp(e) {
    if (e.keyCode === 13) {
      this.submit(e);
    }
  }

  // 提交
  submit(e) {
    // _mm
    //   .request({
    //     // 本地是 localhost: 8000，请求 http://admintest.happymmall.com，会造成跨域
    //     // url: "http://admintest.happymmall.com/manage/user/login.do",
    //     // 所以在请求时，我们需要把 url 中的 http://admintest.happymmall.com 去掉，通过其他方式把请求转到这个域名下去，即劫持。使用webpack-dev-server自带的proxy配置劫持。可以将请求自动代理到后端的接口上。
    //     url: "/manage/user/login.do",
    //     type: "post",
    //     data: {
    //       username: this.state.username,
    //       password: this.state.password,
    //     },
    //   })
    //   .then(
    //     (res) => {},
    //     (err) => {}
    //   );
    //
    // 把_mm.request({...}) 部分封装到api/user中去。因为这部分与业务无关。与业务有关的只是.then(...)中的操作
    let info = {
        username: this.state.username,
        password: this.state.password,
      },
      checkResult = _user.checkLoginInfo(info); // 校验结果

    if (checkResult.status) {
      // 验证通过，去登录
      _user.login(info).then(
        (res) => {
          // 登录成功后，再跳转至登录之前的页面
          console.log(this.state.redirect);
          console.log(res);
          _util.setStorage("userInfo", res);
          this.props.history.push(this.state.redirect); // this.props.history 是 react 提供的history 对象
        },
        (errMsg) => {
          // 错误处理提示
          _util.errorTips(errMsg);
        }
      );
    } else {
      // 验证不通过
      _util.errorTips(checkResult.msg);
    }
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <div className="panel panel-default login-panel">
          <div className="panel-heading">登录</div>
          <div className="panel-body">
            <div>
              <div className="form-group">
                <label>用户名</label>
                <input
                  name="username"
                  type="text"
                  className="form-control"
                  placeholder="请输入用户名"
                  onChange={(e) => this.inputChange(e)}
                  onKeyUp={(e) => this.inputKeyUp(e)}
                />
              </div>
              <div className="form-group">
                <label>密码</label>
                <input
                  name="password"
                  type="password"
                  className="form-control"
                  placeholder="请输入密码"
                  onChange={(e) => this.inputChange(e)}
                  onKeyUp={(e) => this.inputKeyUp(e)}
                />
              </div>
              <button
                className="btn btn-primary btn-lg btn-block"
                onClick={(e) => this.submit(e)}
              >
                登录
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
