import { Flex } from "antd-mobile";

import PropTypes from "prop-types";

import styles from "./index.module.css";

function OrdertotalItem({ name, qty, SumProductArea, SumConvertProductArea, style }) {
  return (
    <div className={styles.box} style={style}>
      <div className={styles.content}>
        <h4 className={styles.title}>
          <span className={styles.qty}>{qty} 片/套</span>
          {name}
        </h4>
        <Flex className={styles.flex}>
          <Flex.Item>
            <div className={styles.SumProductArea}>面积：{SumProductArea}</div>
          </Flex.Item>
          <Flex.Item>
            <div className={styles.SumConvertProductArea}>面积(5)：{SumConvertProductArea}</div>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  );
}

OrdertotalItem.propTypes = {
  name: PropTypes.string.isRequired,
  qty: PropTypes.number,
  SumProductArea: PropTypes.number,
};

export default OrdertotalItem;
