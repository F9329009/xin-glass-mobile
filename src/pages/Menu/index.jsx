import { useEffect, useState } from "react";
import { Accordion, List, Grid } from "antd-mobile";

import { httpGet } from "../../utils/axios/http";
import { publicApi } from "../../api";

function Menu(props) {
  // 导航列表
  const [navList, setNavList] = useState([]);

  //#region 获取导航列表
  const getNavList = () => {
    httpGet(publicApi.NavList)
      .then(res => {
        console.log("getNavList", res);
        if (res.meta.status === 200) {
          setNavList(res.message.list);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getNavList();
  }, []);
  //#endregion

  //#region 渲染一级目录
  const renderMenu1 = () => {
    return navList.map(
      item =>
        item.children.length <= 0 || (
          <List className="my-list" key={item.menu_id} renderHeader={() => item.menu_name}>
            {renderMenu2(item.children)}
          </List>
        )
    );
  };
  //#endregion

  //#region 渲染二级目录
  const renderMenu2 = data => {
    return data.map(item => (
      <List.Item extra={"进入"} arrow="horizontal" onClick={() => props.history.push(item.url)}>
        {item.menu_name}
      </List.Item>
    ));
  };
  //#endregion

  return (
    <div>
      {/* 渲染功能列表 */}
      {renderMenu1()}
    </div>
  );
}

export default Menu;
