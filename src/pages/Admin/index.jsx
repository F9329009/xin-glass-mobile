import { renderRoutes } from "react-router-config";

import TabBarCom from "../../components/TabBar";

const Admin = props => {
  return (
    <>
      {/* 内容 */}
      {renderRoutes(props.route.routes)}
      {/* TabBar */}
      <TabBarCom route={props.route} tabBarList={props.route.meta.tabBarList} />
    </>
  );
};

export default Admin;
