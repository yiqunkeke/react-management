import React from "react";
import { Link, NavLink } from "react-router-dom";

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: [
        {
          title: "首页",
          path: "/",
          icon: "fa-dashboard",
          id: 1,
        },
        {
          title: "商品",
          path: "/product",
          icon: "fa-sitemap",
          id: 2,
          children: [
            {
              title: "商品管理",
              path: "/product",
              id: 3,
            },
            {
              title: "品类管理",
              path: "category",
              id: 4,
            },
          ],
        },
        {
          title: "订单",
          path: "/order",
          icon: "fa-sitemap",
          id: 5,
          children: [
            {
              title: "订单管理",
              path: "/order",
              id: 6,
            },
          ],
        },
        {
          title: "用户",
          path: "/user",
          icon: "fa-sitemap",
          id: 7,
          children: [
            {
              title: "用户管理",
              path: "/user",
              id: 8,
            },
          ],
        },
      ],
    };
  }
  render() {
    return (
      <div className="navbar-default navbar-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav">
            {this.state.menu.map((item) => {
              if (item.children) {
                // 二级菜单
                return (
                  <li key={item.id} className="active">
                    <Link to={item.path}>
                      <i className={["fa", item.icon]}></i>
                      <span>{item.title}</span>
                      <span className="fa arrow"></span>
                    </Link>
                    <ul className="nav nav-second-level collapse in">
                      {item.children.map((it) => {
                        return (
                          <li key={it.id}>
                            <NavLink
                              exact
                              to={it.path}
                              activeClassName="active-menu"
                            >
                              {it.title}
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                );
              } else {
                // 一级菜单
                return (
                  <li key={item.id}>
                    <NavLink exact to={item.path} activeClassName="active-menu">
                      <i className={["fa", item.icon]}></i>
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </div>
    );
    //#region 
    // <div className="navbar-default navbar-side" role="navigation">
    //   <div className="sidebar-collapse">
    //     <ul className="nav">
    //       <li>
    //         {/* 注意：使用NavLink来实现当前菜单的选中。
    //         当to的路径与url中的路径匹配时，会使用activeClassName中的样式 */}
    //         <NavLink exact to="/" activeClassName="active-menu">
    //           <i className="fa fa-dashboard"></i>
    //           <span>首页</span>
    //         </NavLink>
    //       </li>

    //       <li className="active">
    //         <Link to="/product">
    //           <i className="fa fa-sitemap"></i>
    //           <span>商品</span>
    //           <span className="fa arrow"></span>
    //         </Link>
    //         <ul className="nav nav-second-level collapse in">
    //           <li>
    //             <NavLink exact to="/product" activeClassName="active-menu">商品管理</NavLink>
    //           </li>
    //           <li>
    //             <NavLink exact to="/product/category" activeClassName="active-menu">品类管理</NavLink>
    //           </li>
    //         </ul>
    //       </li>

    //       <li className="active">
    //         <Link to="/order">
    //           <i className="fa fa-sitemap"></i>
    //           <span>订单</span>
    //           <span className="fa arrow"></span>
    //         </Link>
    //         <ul className="nav nav-second-level collapse in">
    //           <li>
    //             <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
    //           </li>
    //         </ul>
    //       </li>

    //       <li className="active">
    //         <Link to="/user">
    //           <i className="fa fa-sitemap"></i>
    //           <span>用户</span>
    //           <span className="fa arrow"></span>
    //         </Link>
    //         <ul className="nav nav-second-level collapse in">
    //           <li>
    //             <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
    //           </li>
    //         </ul>
    //       </li>
    //     </ul>
    //   </div>
    // </div>
    //#endregion
  }
}

export default SideNav;
