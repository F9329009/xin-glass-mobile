import { Redirect } from "react-router-dom";

import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Admin from "../pages/Admin";
import Menu from "../pages/Menu";
import User from "../pages/User";

import Ordertotal from "../pages/Ordertotal";

const routes = [
  {
    path: "/",
    component: App,
    meta: {
      title: "首页",
      // TabBar 列表
      tabBarList: [
        {
          title: "首页",
          icon: "icon-ind",
          path: "/home",
        },
        {
          title: "登录",
          icon: "icon-findHouse",
          path: "/login",
        },
      ],
    },
    routes: [
      {
        path: "/",
        exact: true,
        render: () => <Redirect to={"/home"} />,
      },
      {
        path: "/home",
        component: Home,
        meta: {
          // 标题
          title: "首页",
          // 是否显示 TabBar
          tabBar: true,
        },
      },
      {
        path: "/login",
        component: Login,
        meta: {
          title: "登录",
          tabBar: true,
        },
      },
      {
        path: "/admin",
        component: Admin,
        meta: {
          title: "后台",
          tabBar: true,
          tabBarList: [
            {
              title: "功能",
              icon: "icon-ind",
              path: "/admin/menu",
            },
            {
              title: "我的",
              icon: "icon-findHouse",
              path: "/admin/user",
            },
          ],
        },
        routes: [
          {
            path: "/admin",
            exact: true,
            render: () => <Redirect to={"/admin/menu"} />,
          },
          {
            path: "/admin/menu",
            component: Menu,
            meta: {
              title: "导航",
              tabBar: true,
            },
          },
          {
            path: "/admin/user",
            component: User,
            meta: {
              title: "我的",
              tabBar: true,
            },
          },
          {
            path: "/admin/alionerp/ordertotal",
            component: Ordertotal,
            meta: {
              title: "订单统计",
              tabBar: false,
            },
          },
        ],
      },
    ],
  },
];

export default routes;
