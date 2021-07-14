import { useState } from "react";
import { Accordion, Grid, List, Calendar, Button, WingBlank, WhiteSpace, Toast } from "antd-mobile";
import { List as VList, AutoSizer } from "react-virtualized";

import { httpGet } from "../../utils/axios/http";
import { alionErp } from "../../api";

import DateFormat from "../../utils/DateFormat";

import Sticky from "../../components/Sticky";
import NavHeader from "../../components/NavHeader";
import OrdertotalItem from "../../components/OrdertotalItem";

import "./index.css";

const Ordertotal = props => {
  // 订单统计数据
  const [ordertotalData, setOrderTotalData] = useState([]);
  // 合计
  const [ordertotalTotal, setOrdertotalTotal] = useState([]);
  const totalList = { TotalNum: "订单数量", TotalQty: "成品数量", TotalArea: "面积", TotalConvertArea: "面积(5)", TotalAmt: "金额", TotalPrePayAmt: "预付定金" };

  //#region 获取订单统计数据
  const getOrdertotal = () => {
    httpGet(alionErp.OrderTotal, {
      date: DateFormat(date, "yyyy-MM-dd"),
    })
      .then(res => {
        console.log("getOrdertotal", res);
        if (res.meta.status === 200) {
          // 弹出提示
          if (res.message.data.length <= 0) {
            Toast.offline("没有找到数据！", 3);
          } else {
            Toast.success(`共找到 ${res.message.data.length} 条数据`, 3, null, false);
          }
          // 统计
          const list = [];
          Object.keys(res.message.total).forEach(key => {
            list.push({
              name: totalList[key],
              value: res.message.total[key],
            });
          });
          setOrdertotalTotal(list);
          // 详情
          setOrderTotalData(res.message.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };
  //#endregion

  //#region 日期选择
  // 日期
  const [date, setDate] = useState(new Date());
  // 是否显示
  const [calendarShow, setCalendarShow] = useState(false);

  // 确认
  const onConfirm = newDate => {
    console.log("newDate", newDate);
    setDate(newDate);
    setCalendarShow(false);
  };

  // 取消
  const onCancel = () => {
    setCalendarShow(false);
  };

  // 渲染
  const renderCalendar = () => {
    return (
      <>
        {/* 选择列表 */}
        <List.Item
          extra={DateFormat(date, "yyyy-MM-dd") || "选择"}
          arrow="horizontal"
          onClick={() => {
            setCalendarShow(true);
          }}
        >
          查询日期
        </List.Item>
        {/* 确定按钮 */}
        <WhiteSpace />
        <WingBlank>
          <Button type="primary" onClick={getOrdertotal}>
            查询
          </Button>
        </WingBlank>
        <WhiteSpace />
        {/* 选择框 */}
        <Calendar
          visible={calendarShow}
          type="one"
          defaultValue={[date || new Date(), date || new Date()]}
          onCancel={onCancel}
          onConfirm={onConfirm}
          showShortcut={true}
          renderShortcut={select => (
            <div className="calendar-shortcut">
              <span
                onClick={() => {
                  select(new Date(new Date() - 86400000), new Date(new Date() - 86400000));
                }}
              >
                昨天
              </span>
              <span
                onClick={() => {
                  select(new Date(), new Date());
                }}
              >
                今天
              </span>
            </div>
          )}
        />
      </>
    );
  };
  //#endregion

  //#region 渲染统计数据
  // 当前激活的模面板
  const [accordionActiveKey, setAccordionActiveKey] = useState("total");
  // 切换面板
  const changeAccordionKey = key => {
    setAccordionActiveKey(key);
  };
  // 渲染
  const renderTotal = () => {
    return (
      <Accordion.Panel key="total" header="合计">
        <Grid
          data={ordertotalTotal}
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

  //#region 渲染详情信息
  // ordertotalData.map(item => <OrdertotalItem key={item.ChsName} name={item.ChsName} qty={item.Qty} SumProductArea={item.SumProductArea} SumConvertProductArea={item.SumConvertProductArea} />

  // 渲染列表项
  const renderInfoItem = ({ key, index, style }) => {
    const item = ordertotalData[index];

    return <OrdertotalItem key={index} style={style} name={item.ChsName} qty={item.Qty} SumProductArea={item.SumProductArea} SumConvertProductArea={item.SumConvertProductArea} />;
  };

  // 渲染列表
  const renderInfoList = () => {
    return (
      ordertotalData.length <= 0 || (
        <AutoSizer>
          {({ width, height }) => {
            console.log(width, height, height - 160 - accordionActiveKey === "total" ? 185 : 44, accordionActiveKey === "total" ? 185 : 44, ordertotalData.length, accordionActiveKey);
            return (
              <VList
                // ref={registerChild}
                // 视口的宽度
                width={width}
                // 视口的高度
                height={accordionActiveKey === "total" ? height - 160 - 185 : height - 160 - 44}
                // 列表项的行数
                rowCount={ordertotalData.length}
                // rowCount={9}
                // 每一行的高度
                rowHeight={120}
                // 渲染列表项中的每一行
                rowRenderer={renderInfoItem}
                // 滚动对齐方式
                scrollToAlignment="start"
              />
            );
          }}
        </AutoSizer>
      )
    );
  };
  //#endregion

  return (
    <div className="ordertotal-box">
      {/* 吸顶组件 */}
      <Sticky>
        <div className="ordertotal-sticky">
          {/* 顶部导航栏 */}
          <NavHeader mode="light" children="订单统计" />
          {/* 查询条件 */}
          {renderCalendar()}
          <Accordion
            activeKey={accordionActiveKey}
            accordion
            openAnimation={{}}
            onChange={key => {
              changeAccordionKey(key);
            }}
          >
            {/* 统计内容渲染 */}
            {ordertotalTotal.length <= 0 || renderTotal()}
          </Accordion>
        </div>
      </Sticky>
      {/* 详情 */}
      {renderInfoList()}
    </div>
  );
};

export default Ordertotal;
