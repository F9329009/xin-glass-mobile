import { useEffect, useState } from "react";
import { List, Calendar } from "antd-mobile";

import DateFormat from "../../utils/DateFormat";

import PropTypes from "prop-types";

const DateSelect = ({ callback, type, defaultDate, defaultShow }) => {
  // 选择类型
  if (!!!type) type = !!defaultDate[1] ? "range" : "one";
  // 日期
  const [date, setDate] = useState(!!defaultDate ? defaultDate : [new Date(), new Date()]);
  // 是否显示
  const [calendarShow, setCalendarShow] = useState(defaultShow || false);

  // 确认
  const onConfirm = (startDateTime, endDateTime) => {
    setDate([startDateTime, endDateTime]);
    setCalendarShow(false);
  };
  useEffect(() => {
    // 日期改变时调用 callback 回调函数
    if (!!callback) callback(date);
  }, [date]);

  // 取消
  const onCancel = () => {
    setCalendarShow(false);
  };

  return (
    <>
      {/* 选择列表 */}
      <List.Item
        extra={(type === "one" ? DateFormat(date[0], "yyyy-MM-dd") : DateFormat(date[0], "MM-dd") + " ~ " + DateFormat(date[1], "MM-dd")) || "选择"}
        arrow="horizontal"
        onClick={() => setCalendarShow(true)}
      >
        查询日期
      </List.Item>
      {/* 选择框 */}
      <Calendar
        visible={calendarShow}
        // "one" || "range"
        type={type}
        defaultValue={date}
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

DateSelect.propTypes = {
  callback: PropTypes.func,
  type: PropTypes.string,
  defaultDate: PropTypes.array,
  defaultShow: PropTypes.bool,
};

export default DateSelect;
