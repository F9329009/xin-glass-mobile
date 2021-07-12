import { useState } from "react";
import { Accordion, Grid, List, Calendar, Button, WingBlank, WhiteSpace, Toast } from "antd-mobile";

import { httpGet } from "../../utils/axios/http";
import { alionErp } from "../../api";

import DateFormat from "../../utils/DateFormat";

import NavHeader from "../../components/NavHeader";

const Ordertotal = props => {
  // 统计
  const [total, setTotal] = useState([]);
  const totalList = { TotalNum: "订单数量", TotalQty: "成品数量", TotalArea: "合计面积", TotalConvertArea: "合计折5厘面积", TotalAmt: "合计金额", TotalPrePayAmt: "合计预付定金" };
  // 订单统计数据
  const [ordertotalData, setOrderTotalData] = useState([]);

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
            Toast.success(`共找到 ${res.message.data.length} 条数据`);
          }
          // 统计
          const list = [];
          Object.keys(res.message.total).forEach(key => {
            list.push({
              name: totalList[key],
              value: res.message.total[key],
            });
          });
          setTotal(list);
          // 详情
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
          // onCancel={onCancel}
          onConfirm={onConfirm}
          // onSelectHasDisableDate={onSelectHasDisableDate}
          // getDateExtra={getDateExtra}
          defaultDate={date}
        />
      </>
    );
  };
  //#endregion

  //#region 渲染统计数据
  const renderTotal = () => {
    return (
      <Accordion.Panel key="total" header="统计">
        <Grid
          data={total}
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

  return (
    <div>
      {/* 顶部导航栏 */}
      <NavHeader mode="light" children="订单统计" />
      {/* 查询条件 */}
      {renderCalendar()}
      {/* 统计 */}
      <Accordion className="my-accordion" defaultActiveKey="total" accordion openAnimation={{}} onChange={key => console.log(key)}>
        {/* 统计内容渲染 */}
        {total.length > 0 ? renderTotal() : null}
      </Accordion>
    </div>
  );
};

export default Ordertotal;
