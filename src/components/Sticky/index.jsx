import { useRef, useEffect } from "react";

import PropTypes from "prop-types";

import styles from "./index.module.css";

function Sticky(props) {
  // 创建ref对象
  const placeholder = useRef();
  const content = useRef();

  // scroll 事件的事件处理程序
  const handleScroll = () => {
    // 获取DOM对象
    const placeholderEl = placeholder.current;
    const contentEl = content.current;
    const { top } = placeholderEl.getBoundingClientRect();
    if (top < 0) {
      // 吸顶
      contentEl.classList.add(styles.fixed);
      placeholderEl.style.height = `${props.height}px`;
    } else {
      // 取消吸顶
      contentEl.classList.remove(styles.fixed);
      placeholderEl.style.height = "0px";
    }
  };

  useEffect(() => {
    // 订阅
    window.addEventListener("scroll", handleScroll);
    // 取消订阅
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      {/* 占位元素 */}
      <div ref={placeholder} />
      {/* 内容元素 */}
      <div ref={content}>{props.children}</div>
    </div>
  );
}

Sticky.propTypes = {
  height: PropTypes.number.isRequired,
};

export default Sticky;
