// 公共部分
export const publicApi = {
  NavList: "/api/navlist", // 获取导航列表
};

// 用户模块
export const user = {
  Register: "/user/register", // 注册账号
  Login: "/user/login", // 登录
  UserList: "/user/userlist", // 获取用户列表
};

// 玻璃架模块
export const frameSmall = {
  FrameSmallList: "/framesmall", // 获取玻璃架列表
  AddFrameSmall: "/framesmall/add", // 新增玻璃架
  SetName: "/framesmall/setname", // 修改玻璃架名称
};

// AlionERP
export const alionErp = {
  ProductionReport: "/alionerp/productionreport", // 获取生产报表
  Patch: "/alionerp/patch", // 获取补片列表
  OrderTotal: "/alionerp/ordertotal", // 获取订单统计列表
};
