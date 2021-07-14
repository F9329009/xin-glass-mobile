import { useEffect, useState } from "react";
import { Accordion, Grid } from "antd-mobile";

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
    return (
      <Accordion className="my-accordion" accordion openAnimation={{}} onChange={key => console.log(key)}>
        {navList.map(item => {
          if (item.children.length > 0) {
            return (
              <Accordion.Panel key={item.menu_id} header={item.menu_name}>
                {item.children.length > 0 ? renderMenu2(item.children) : null}
              </Accordion.Panel>
            );
          }
          return null;
        })}
      </Accordion>
    );
  };
  //#endregion

  //#region 渲染二级目录
  const renderMenu2 = data => {
    return <Grid data={data} columnNum={3} hasLine={true} square={false} activeStyle={false} renderItem={item => <div onClick={() => props.history.push(item.url)}>{item.menu_name}</div>} />;
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
