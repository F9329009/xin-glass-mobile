import { useEffect, useState } from "react";
import { Toast } from "antd-mobile";
import { List as VList, AutoSizer } from "react-virtualized";

import { httpGet } from "../../utils/axios/http";
import { alionErp } from "../../api";

import DateFormat from "../../utils/DateFormat";
import DateSelect from "../../components/DateSelect";

import NavHeader from "../../components/NavHeader";
import Sticky from "../../components/Sticky";
import PatchItem from "../../components/PatchItem";

import "./index.css";

const Patch = () => {
  // 日期
  const [date, setDate] = useState([new Date(), new Date()]);
  //#region 获取补片数据
  // 补片数据
  const [patchData, setPatchData] = useState([]);
  // 发送请求
  const getPatch = () => {
    httpGet(alionErp.Patch, {
      startdate: DateFormat(date[0], "yyyy-MM-dd"),
      enddate: DateFormat(date[1], "yyyy-MM-dd"),
    }).then(res => {
      console.log(res);
      // 弹出提示
      if (res.message.data.length <= 0) {
        Toast.offline("没有找到数据！", 3);
      } else {
        Toast.success(`查询到 ${res.message.data.length} 条数据`, 3, null, false);
      }
      setPatchData(res.message.data);
    });
  };
  useEffect(() => {
    getPatch();
  }, [date]);
  //#endregion

  //#region 渲染详情信息
  // 渲染列表项
  const renderPatchItem = ({ key, index, style }) => {
    const item = patchData[index];

    return (
      <PatchItem
        key={index}
        style={style}
        title={item.itemname}
        desc={item.custbrief}
        tags={[item.typename, "-" + item.id, item.SOSeqNo, item.SONO, item.PCNO]}
        RouteStr={item.RouteStr}
        workcontent={item.workcontent}
      />
    );
  };

  // 渲染列表
  const renderPatchList = () => {
    return (
      patchData.length <= 0 || (
        <AutoSizer>
          {({ width, height }) => {
            return (
              <VList
                // 视口的宽度
                width={width}
                // 视口的高度
                height={height - 90}
                // 列表项的行数
                rowCount={patchData.length}
                // 每一行的高度
                rowHeight={120}
                // 渲染列表项中的每一行
                rowRenderer={renderPatchItem}
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
    <div className="patch-box">
      {/* 顶部导航栏 */}
      <NavHeader
        mode="light"
        children="补片明细"
        rightContent={
          <span style={{ color: "#fff" }} onClick={getPatch}>
            刷新
          </span>
        }
      />
      {/* 吸顶组件 */}
      <Sticky>
        {/* 查询条件 */}
        <DateSelect type="range" callback={setDate} defaultDate={[new Date(), new Date()]} />
      </Sticky>

      {/* <PatchItem></PatchItem> */}
      {/* 详情 */}
      {renderPatchList()}
    </div>
  );
};

export default Patch;
