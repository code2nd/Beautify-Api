import React from "react";
import PropTypes from "prop-types";

const ModuleTitle = (props) => {
  const { hash, title, style } = props;

  return (
    <p
      id={hash}
      style={{
        margin: "50px 0px 10px 0px",
        color: "rgba(0,0,0,.85)",
        fontWeight: 600,
        fontSize: "24px",
        lineHeight: 1.35,
        ...style,
      }}
    >
      {title}
    </p>
  );
};

ModuleTitle.propTypes = {
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
};

export default ModuleTitle;
