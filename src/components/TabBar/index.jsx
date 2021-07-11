import { useState, useEffect } from "react";
import { TabBar } from "antd-mobile";

import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

import styles from "./index.module.css";

function TabBarCom({ history, route, tabBarList, unselectedTintColor, tintColor, barTintColor }) {
  // TabBar 是否显示
  const [isTabBar, serIsTabBar] = useState(false);
  // 当前选中的 TabBar
  const [selectedTab, setSelectedTab] = useState(history.location.pathname);

  useEffect(() => {
    const curRoute = route.routes.filter(item => item.path === history.location.pathname)[0];
    // 设置 TabBar 是否隐藏
    curRoute && curRoute.meta && curRoute.meta.tabBar ? serIsTabBar(curRoute.meta.tabBar) : serIsTabBar(false);
    // 设置当前选中的 TabBar
    setSelectedTab(history.location.pathname);
  }, [history.location.pathname]);

  return (
    <div className={styles.tabbar}>
      <TabBar unselectedTintColor={unselectedTintColor} tintColor={tintColor} barTintColor={barTintColor} hidden={!isTabBar}>
        {tabBarList.map(item => (
          <TabBar.Item
            title={item.title}
            key={item.path}
            selected={selectedTab === item.path}
            icon={<i className={[styles.iconfont, item.icon].join(" ")} />}
            selectedIcon={<i className={[styles.iconfont, item.icon].join(" ")}></i>}
            onPress={() => {
              history.push(item.path);
            }}
          />
        ))}
      </TabBar>
    </div>
  );
}

// props 校验
TabBarCom.propTypes = {
  route: PropTypes.object.isRequired,
  tabBarList: PropTypes.array,
  unselectedTintColor: PropTypes.string,
  tintColor: PropTypes.string,
  barTintColor: PropTypes.string,
};

export default withRouter(TabBarCom);
