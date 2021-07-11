import { useEffect } from "react";
import { Toast } from "antd-mobile";

import { renderRoutes } from "react-router-config";

import TabBarCom from "./components/TabBar";

const App = props => {
  useEffect(() => {
    console.log("App", props);
    // document.title = props.route.meta.title;
    const token = window.localStorage.getItem("token");
    // 如果没有 Token 并且不在登录页面则跳转到登录页面
    if (!!!token && props.location.pathname !== "/login") {
      Toast.info("您还未登录,正在跳转到登录页面……", 3, null, true);
      props.history.push("/login");
    }
    // 动态设置 Title
    const setTitle = routes => {
      if (!!routes.routes) {
        // 找到子路由
        routes.routes.forEach(item => setTitle(item));
      } else {
        // 找不到子路由
        if (routes.path === props.location.pathname) {
          if (routes.meta && routes.meta.tabBar) {
            document.title = routes.meta.title + " - 管理系统";
          } else {
            document.title = "管理系统";
          }
        }
      }
    };
    setTitle(props.route);
  }, [props.location.pathname]);

  return (
    <div className="App">
      {console.log(props)}
      {/* 内容 */}
      {renderRoutes(props.route.routes)}
      {/* TabBar */}
      <TabBarCom route={props.route} tabBarList={props.route.meta.tabBarList} />
    </div>
  );
};

export default App;
