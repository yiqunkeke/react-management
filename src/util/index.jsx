class Util {
  // 在request中 return 一个promise对象出去，这样在调用request()时，.then()就可以链式调用了。
  request(param) {
    return new Promise((resolove, reject) => {
      $.ajax({
        type: param.type || "get",
        url: param.url || "",
        dataType: param.dataType || "json",
        data: param.data || null,
        success(res) {
          if (res.status === 0) {
            //   与操作符：&& 前面的条件成立时，会执行 && 后面的语句。否则不会执行后面的语句。
            typeof resolove === "function" && resolove(res.data, res.msg);
            // 请求成功
          } else if (res.status === 10) {
            // 未登录
            this.login();
          } else {
            // 数据错误
            typeof reject === "function" && reject(res.msg || res.data);
          }
        },
        error(err) {
          // HTTP 请求错误，err.statusText 是Http请求err对象中自带的
          typeof reject === "function" && reject(err.statusText || res.data);
        },
      });
    });
  }

  // 跳转登录
  login() {
    window.location.href =
      "/login?redirect=" + encodeURIComponent(window.location.pathname); // window.location.pathname中可能有特殊字符，此处用encodeURIComponent()处理
  }

  // 获取url参数
  getUrlParam(name) {
    // xxx.com?param=123&param1=456
    let queryString = window.location.search.split("?")[1] || "",
      // window.location.search -->  ?param=123&param1=456
      // window.location.search.split('?')[1]    -->  param=123&param1=456

      reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
      result = queryString.match(reg);
    // result: ['param=123', '','123','&']
    return result ? decodeURIComponent(result[2]) : null;
  }

  // 错误提示
  errorTips(errMsg) {
    alert(errMsg || "好像哪里不对了");
  }
}

export default Util;
