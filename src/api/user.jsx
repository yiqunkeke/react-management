import Util from "util/index"; // 工具类
const _util = new Util();

class User {
  // 登录
  login(info) {
    return _util.request({
      // 本地是 localhost: 8000，请求 http://admintest.happymmall.com，会造成跨域
      // url: "http://admintest.happymmall.com/manage/user/login.do",
      // 所以在请求时，我们需要把 url 中的 http://admintest.happymmall.com 去掉，通过其他方式把请求转到这个域名下去，即劫持。使用webpack-dev-server自带的proxy配置劫持。可以将请求自动代理到后端的接口上。
      url: "/manage/user/login.do",
      type: "post",
      data: info,
    });
  }
  // 校验登录接口字段
  checkLoginInfo(info) {
    let username = $.trim(info.username),
      password = $.trim(info.password);
    // 判断用户名为空
    if (typeof username !== "string" || username.length === 0) {
      return {
        status: false,
        msg: "用户名不能为空",
      };
    }
    // 判断密码为空
    if (typeof password !== "string" || password.length === 0) {
      return {
        status: false,
        msg: "密码不能为空",
      };
    }
    return {
      status: true,
      msg: "验证通过",
    };
  }
}

export default User;
