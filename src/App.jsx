import { useEffect } from "react";
import { Toast } from "antd-mobile";

import { renderRoutes } from "react-router-config";

import TabBarCom from "./components/TabBar";

const App = props => {
  // 倒计时时间
  let countdown = 3;

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    // 如果没有 Token 并且不在登录页面则跳转到登录页面
    if (!!!token && props.location.pathname !== "/login") {
      Toast.info("您还未登录,正在跳转到登录页面……", 3, null, true);
      props.history.push("/login");
    }
    // 动态设置 Title
    let title = "管理系统";
    const setTitle = routes => {
      // 找到子路由继续递归查询
      if (!!routes.routes) routes.routes.forEach(item => setTitle(item));
      if (routes.path === props.location.pathname && routes.meta && routes.meta.title) title = routes.meta.title + " - 管理系统";
    };
    setTitle(props.route);
    console.log("title", title, props.location.pathname);
    if (title !== "管理系统") {
      document.title = title;
    } else {
      // 自动跳转倒计时
      let interval = setInterval(() => {
        // 如果 title 还是默认值，证明没有此路由,则弹出提示并返回上一个页面
        Toast.info(`找不到此页面 ${countdown} 秒后自动返回`, 3, null, true);
        if (countdown <= 1) {
          props.history.go(-1);
          clearTimeout(interval);
        }
        countdown--;
      }, 1000);
    }
  }, [props.location.pathname]);

  return (
    <div className="App">
      {/* 内容 */}
      {renderRoutes(props.route.routes)}
      {/* TabBar */}
      <TabBarCom route={props.route} tabBarList={props.route.meta.tabBarList} />
    </div>
  );
};

export default App;
