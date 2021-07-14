/*
 * @Author: 九玖
 * @Date: 2021-07-12 18:13:07
 * @LastEditTime: 2021-07-14 08:18:28
 * @LastEditors: 九玖
 * @Description: 格式化日期
 * @FilePath: \xin-glass-mobile\src\utils\DateFormat.js
 */

/**
 * 支持输入时间戳
 * y-年   length: 2/4位
 * q-季度 length: 1位
 * M-月   length: 1~2位
 * d-日   length: 1~2位
 * H-时   length: 1~2位 H：24小时制 h：12小时制
 * m-分   length: 1~2位
 * s-秒   length: 1~2位
 * S-毫秒 length: 1位
 * @param {string || Date} date 时间戳或Date类型数据
 * @param {String} fmt 格式化模板字符串
 * @return 格式化后日期时间字符串 默认:yyyy-MM-dd HH:mm:ss
 */
function DateFormat(date, fmt = "yyyy-MM-dd HH:mm:ss") {
  // 时间戳转Date格式
  date = !date || typeof date != "object" || date.constructor !== Date ? new Date(parseInt(date.toString().length < 13 ? date * 1000 : date)) : date;
  // 数据存储对象
  let o = {
    "y+": date.getFullYear() + "", // 年
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "M+": date.getMonth() + 1 + "", // 月
    "d+": date.getDate() + "", // 日
    "H+": date.getHours() + "", // 24时
    "h+": date.getHours() + "", // 12时
    "m+": date.getMinutes() + "", // 分
    "s+": date.getSeconds() + "", // 秒
    "S+": date.getMilliseconds(), // 毫秒
  };
  for (let r in o) {
    let rex = new RegExp(r);
    let arr = new RegExp(rex).exec(fmt);
    // 匹配所得字符串 模板参数校验，正则验证方法
    let temp = arr ? arr[0] : "";
    // 月、天、时、分、秒通用匹配替换
    if (temp.length || temp.length !== 0) temp.length === 2 ? (fmt = fmt.replace(rex, o[r].length === 1 ? "0" + o[r] : o[r])) : (fmt = fmt.replace(rex, o[r]));
  }
  return fmt;
}

export default DateFormat;
