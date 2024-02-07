import React from "react";
import classNames from "classnames";

import arrowIcon from "images/right-arrow.png";
import whiteArrowIcon from "images/white-right-arrow.png";
import styles from "./GetStarted.module.css";

const GetStartedBtn = ({
  id,
  label,
  loading,
  className,
  uppercase = true,
  hideArrow,
  variantBlack,
  textColor,
  smallButton,
  medButton,
  bgColor = "mustard",
  color,
  disabled,
  customPadding,
  customSize,
  errorMessage,
  onClick,
  ...props
}) => {
  const getBgColor = () => {
    const COLORS_LINKING = {
      mustard: "bg-mustard",
      black: "bg-black",
      indigo: "bg-indigo-700",
      gray: "bg-gray-400",
    };

    if (variantBlack) {
      return COLORS_LINKING.black;
    }

    if (disabled) {
      return COLORS_LINKING.gray;
    }

    return COLORS_LINKING[bgColor];
  };

  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <div>
      <button
        {...props}
        id={id}
        disabled={disabled}
        onClick={handleClick}
        className={classNames(
          "flex justify-center items-center",
          textColor ? textColor : "text-white",
          {
            "cursor-not-allowed": disabled,
            "pl-6 pr-4 h-12": !customPadding,
            uppercase,
            "animate-pulse cursor-not-allowed": loading,
            "pr-6": hideArrow && !customPadding,
            "h-10": smallButton,
          },
          getBgColor(),
          className,
          styles.wrapper
        )}
      >
        <span
          className={classNames(
            styles.btnLabel,
            smallButton && "text-base",
            medButton && "text-lg",
            !smallButton && !medButton && !customSize && "text-xl"
          )}
        >
          {label}
        </span>
        {!hideArrow && (
          <img
            className={classNames(styles.arrow)}
            src={
              variantBlack || bgColor === "indigo" ? whiteArrowIcon : arrowIcon
            }
            alt="arrow"
            width={18}
            height={18}
          />
        )}
      </button>

      <p className="text-red-500 font-bold mt-2 max-w-full">{errorMessage}</p>
    </div>
  );
};

export default GetStartedBtn;
