import { useEffect, useState } from "react";
import { Accordion, Grid, Toast, Tabs, Badge, List } from "antd-mobile";
import { AutoSizer } from "react-virtualized";

import { httpGet } from "../../utils/axios/http";
import { alionErp } from "../../api";

import DateFormat from "../../utils/DateFormat";
import DateSelect from "../../components/DateSelect";

import NavHeader from "../../components/NavHeader";
import Sticky from "../../components/Sticky";

import "./index.css";

const ProductionReport = () => {
  // 日期
  const [date, setDate] = useState([new Date(), new Date()]);
  // 标签页项目标题
  const tabs = [{ title: <Badge>工序统计</Badge> }, { title: <Badge>小组统计</Badge> }];

  //#region 获取生产报表数据
  // 生产报表数据
  const [productionReportData, setProductionReportData] = useState([]);
  // 发送请求
  const getProductionReport = () => {
    httpGet(alionErp.ProductionReport, {
      startdate: DateFormat(date[0], "yyyy-MM-dd"),
      enddate: DateFormat(date[1], "yyyy-MM-dd"),
    })
      .then(res => {
        console.log(res);
        // 弹出提示
        if (res.message.data.length <= 0) {
          Toast.offline("没有找到数据！", 3);
        } else {
          Toast.success(`数据查询成功`, 3, null, false);
        }

        setProductionReportData(res.message.data);
        // 合计
        let list = [];
        Object.keys(res.message.total.all).forEach(key => {
          list.push({
            name: totalList[key],
            value: res.message.total.all[key],
          });
        });
        setProductionReportTotalAll(list);
        // 工序统计侧边栏
        list = [];
        Object.keys(res.message.total.subTotal).forEach(key => {
          list.push({ title: <Badge>{res.message.total.subTotal[key].WIPName}</Badge>, data: res.message.total.subTotal[key] });
        });
        setProductionReportSubTotleTabs(list);
        list = [];
        // 小组统计二级侧边栏
        res.message.data.forEach(item => {
          if (item.WIPCode === res.message.data[0].WIPCode) {
            list.push({ title: <Badge>{item.WTName}</Badge>, data: item });
          }
        });
        setProductionReportDataTabs(list);
      })
      .catch(err => {
        console.log(err);
      });
  };
  useEffect(() => {
    getProductionReport();
  }, [date]);
  //#endregion

  //#region 渲染总统计数据
  // 统计数据
  const [productionReportTotalAll, setProductionReportTotalAll] = useState([]);
  const totalList = { ProductRate: "成品率", ConvertProductRate: "成品率(5)", DamageArea: "破损量", ConvertDamageArea: "破损量(5)" };
  // 当前激活的面板
  const [accordionActiveKey, setAccordionActiveKey] = useState("total");
  // 切换面板
  const changeAccordionKey = key => {
    setAccordionActiveKey(key);
  };
  // 渲染
  const renderTotal = () => {
    return (
      <Accordion.Panel key="total" header="总计">
        <Grid
          data={productionReportTotalAll}
          columnNum={2}
          hasLine={true}
          square={false}
          activeStyle={false}
          renderItem={item => (
            <div>
              {item.name}：{item.value}
            </div>
          )}
        />
      </Accordion.Panel>
    );
  };
  //#endregion

  //#region 渲染工序统计
  // 侧边栏数据
  const [productionReportSubTotleTabs, setProductionReportSubTotleTabs] = useState([]);
  // 二级侧边栏数据
  const [productionReportDataTabs, setProductionReportDataTabs] = useState([]);
  //#endregion

  return (
    <div className="productionreport-box">
      {/* 顶部导航栏 */}
      <NavHeader
        mode="light"
        children="生产报表"
        rightContent={
          <span style={{ color: "#fff" }} onClick={getProductionReport}>
            刷新
          </span>
        }
      />
      {/* 吸顶组件 */}
      <Sticky>
        {/* 查询条件 */}
        <DateSelect type="range" callback={setDate} defaultDate={[new Date(), new Date()]} />
        <Accordion
          activeKey={accordionActiveKey}
          accordion
          openAnimation={{}}
          onChange={key => {
            changeAccordionKey(key);
            console.log(accordionActiveKey);
          }}
        >
          {/* 统计内容渲染 */}
          {productionReportTotalAll.length <= 0 || renderTotal()}
        </Accordion>
      </Sticky>
      {/* 标签页 */}
      <AutoSizer>
        {({ width, height }) => {
          return (
            <div style={{ width, height: height - (accordionActiveKey === "total" ? 227 : 133) }}>
              <Tabs tabs={tabs} initialPage={0} swipeable={false} usePaged={false}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", backgroundColor: "#fff" }}>
                  {/* 工序统计侧边栏 */}
                  <Tabs tabs={productionReportSubTotleTabs} initialPage={0} tabBarPosition="right" tabDirection="vertical" renderTabBar={props => <Tabs.DefaultTabBar {...props} page={10} />}>
                    {productionReportSubTotleTabs.map(item => (
                      <div style={{ height: "100%", width: "100%", backgroundColor: "#fff" }} key={item.data.WTCode}>
                        <List renderHeader={() => "产量"}>
                          <List.Item extra={item.data.ProductArea}>包料</List.Item>
                          <List.Item extra={item.data.ConvertProductArea}>包料(5)</List.Item>
                          <List.Item extra={item.data.ProductArea_LB}>来料</List.Item>
                          <List.Item extra={item.data.ConvertProductArea_LB}>来料(5)</List.Item>
                          <List.Item extra={item.data.SumProductArea}>合计</List.Item>
                          <List.Item extra={item.data.SumConvertProductArea}>合计(5)</List.Item>
                        </List>
                        <List renderHeader={() => "破损量"}>
                          <List.Item extra={item.data.DamageArea}>面积</List.Item>
                          <List.Item extra={item.data.ConvertDamageArea}>面积(5)</List.Item>
                        </List>
                        <List renderHeader={() => "成品率"}>
                          <List.Item extra={item.data.ProductRate}>百分比</List.Item>
                          <List.Item extra={item.data.ConvertProductRate}>百分比(5)</List.Item>
                        </List>
                      </div>
                    ))}
                  </Tabs>
                </div>
                <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#fff" }}>
                  {/* 小组统计侧边栏 */}
                  <Tabs
                    tabs={productionReportSubTotleTabs}
                    initialPage={0}
                    tabBarPosition="right"
                    tabDirection="vertical"
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={10} />}
                    onChange={(tab, index) => {
                      console.log("onChange", index, tab, productionReportData);
                      const list = [];
                      productionReportData.forEach(item => {
                        if (item.WIPCode === tab.data.WIPCode) {
                          list.push({ title: <Badge>{item.WTName}</Badge>, data: item });
                        }
                      });
                      setProductionReportDataTabs(list);
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "#fff" }}>
                      {/* 小组统计二级侧边栏 */}
                      <Tabs tabs={productionReportDataTabs} initialPage={0} tabBarPosition="right" tabDirection="vertical" renderTabBar={props => <Tabs.DefaultTabBar {...props} page={10} />}>
                        {productionReportDataTabs.map(item => (
                          <div style={{ width: "100%", height: "100%", backgroundColor: "#fff" }}>
                            <List renderHeader={() => "产量"}>
                              <List.Item extra={item.data.ProductArea}>包料</List.Item>
                              <List.Item extra={item.data.ConvertProductArea}>包料(5)</List.Item>
                              <List.Item extra={item.data.ProductArea_LB}>来料</List.Item>
                              <List.Item extra={item.data.ConvertProductArea_LB}>来料(5)</List.Item>
                              <List.Item extra={item.data.SumProductArea}>合计</List.Item>
                              <List.Item extra={item.data.SumConvertProductArea}>合计(5)</List.Item>
                            </List>
                            <List renderHeader={() => "破损量"}>
                              <List.Item extra={item.data.DamageArea}>面积</List.Item>
                              <List.Item extra={item.data.ConvertDamageArea}>面积(5)</List.Item>
                            </List>
                            <List renderHeader={() => "成品率"}>
                              <List.Item extra={item.data.ProductRate}>百分比</List.Item>
                              <List.Item extra={item.data.ConvertProductRate}>百分比(5)</List.Item>
                            </List>
                          </div>
                        ))}
                      </Tabs>
                    </div>
                  </Tabs>
                </div>
              </Tabs>
            </div>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default ProductionReport;
