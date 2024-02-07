import classNames from "classnames";
import React from "react";
import arrowIcon from "images/white-right-arrow.png";

export default function BlueArrowBtn({
  title,
  onClick,
  loading,
  responsive,
  ...props
}) {
  return (
    <button
      {...props}
      className={classNames(
        "flex justify-center items-center py-2 px-5 uppercase text-white font-rubik-regular font-bold bg-electricBlue-500 w-fit rounded shadow-sm",
        loading && "animate-pulse cursor-not-allowed",
        responsive ? "md:text-lg text-base" : "text-lg"
      )}
      onClick={onClick}
    >
      {title}{" "}
      <span className="flex items-center ml-2">
        <img src={arrowIcon} alt="arrow" width={16} height={16} />
      </span>
    </button>
  );
}
