import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const PrimaryBtn = ({
  id,
  onClick,
  color = "brandPrimary",
  label,
  disabled,
  loading,
  textColor = "black",
  fullWidth = false,
  selected = false,
  className,
  ...props
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      {...props}
      id={id}
      disabled={disabled}
      onClick={handleClick}
      color={color}
      className={classNames(
        `flex justify-center items-center rounded-xs min-w-[134px] py-4 px-6 sm:h-16 h-12 bg-${color} text-${textColor}`,
        {
          "cursor-not-allowed bg-grey-300 !text-white": disabled,
          "hover:bg-brandSecondary hover:text-white": !disabled,
          "w-full": fullWidth,
          "animate-pulse cursor-not-allowed": loading,
          "!text-white !bg-brandSecondary-1000": selected,
        },
        className
      )}
      style={{ boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.1)" }}
    >
      <span className="b2">{label}</span>
    </button>
  );
};

PrimaryBtn.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func,
  label: PropTypes.string,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  textColor: PropTypes.string,
  fullWidth: PropTypes.bool,
  selected: PropTypes.bool,
  classNames: PropTypes.string,
};

export default PrimaryBtn;
