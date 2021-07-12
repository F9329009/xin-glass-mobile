/*
 * @Author: 九玖
 * @Date: 2021-07-12 18:13:07
 * @LastEditTime: 2021-07-12 18:18:38
 * @LastEditors: 九玖
 * @Description: 格式化日期
 * @FilePath: \xin-glass-mobile\src\utils\DateFormat.js
 */

/**
 * 默认:yyyy-MM-dd HH:mm:ss <br>
 * 支持输入时间戳(毫秒) <br>
 * y-年     length: 2/4位 <br>
 * q-季度   length: 1位 <br>
 * M-月     length: 1~2位 <br>
 * d-日     length: 1~2位 <br>
 * H-时     length: 1~2位 H：24小时制 h：12小时制 <br>
 * m-分     length: 1~2位 <br>
 * s-秒     length: 1~2位 <br>
 * S-毫秒   length: 1位
 * @param {Date类型对象} date
 * @param {String类型模板字符串} fmt
 * @return 格式化后日期时间字符串
 */
function DateFormat(date, fmt = "yyyy-MM-dd HH:mm:ss") {
  // 时间戳转Date格式
  date = !date || typeof date != "object" || date.constructor != Date ? new Date(parseInt(date)) : date;
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
    let temp = arr ? arr[0] : ""; // 匹配所得字符串 模板参数校验，正则验证方法
    let len = temp.length; // 长度
    if (len || len != 0) len == 2 ? (fmt = fmt.replace(rex, o[r].length == 1 ? "0" + o[r] : o[r])) : (fmt = fmt.replace(rex, o[r])); // 月、天、时、分、秒通用匹配替换
  }
  return fmt;
}

export default DateFormat;
