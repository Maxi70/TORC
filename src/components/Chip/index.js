import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SvgIcon from "components/SvgIcon";

const Chip = ({ value, className, isActive, onClose }) => (
  <div
    className={classNames(
      "flex items-center max-w-full text-sm border border-blue-300 text-blue-300 rounded-full whitespace-nowrap transition-all",
      {
        "bg-blue-200 !text-white": isActive,
      },
      className
    )}
  >
    <div className={classNames("px-2 overflow-hidden text-ellipsis")}>
      {value}
    </div>

    {isActive && (
      <button className="shrink-0 w-3" type="button" onClick={onClose}>
        <SvgIcon type="cross" />
      </button>
    )}
  </div>
);

Chip.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Chip;
