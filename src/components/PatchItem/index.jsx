import PropTypes from "prop-types";

import styles from "./index.module.css";

function PatchItem({ title, desc, tags, workcontent, RouteStr, style }) {
  return (
    <div className={styles.house} style={style}>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.desc}>{desc}</div>
        <div>
          {/* ['近地铁', '随时看房'] */}
          {!!tags
            ? tags.map((tag, index) => {
                const tagClass = "tag" + (index + 1);
                return (
                  <span className={[styles.tag, styles[tagClass]].join(" ")} key={tag}>
                    {tag}
                  </span>
                );
              })
            : null}
        </div>
        <div className={styles.price}>
          {RouteStr} <span className={styles.priceNum}>{workcontent}</span>
        </div>
      </div>
    </div>
  );
}

PatchItem.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  // tags: PropTypes.array.isRequired,
  price: PropTypes.number,
};

export default PatchItem;
