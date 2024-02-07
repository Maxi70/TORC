import { useRef, useState } from "react";
import classNames from "classnames";

import { useOffClick } from "hooks";
import styles from "./dropDown.module.css";
import arrow from "images/arrow-down.svg";

/**
 * @param defaultValue string - the default value you want for the drop down
 * @param items Object[] - a list of items to render
 * @param isReadOnly boolean - if drop down is in a read only state and should be unchanged
 */

const DropDown = ({
  defaultValue,
  items,
  isReadOnly,
  bgColor,
  textColor = "white",
  handleClick,
  className,
  itemsClassName,
}) => {
  const [showItems, setShowItems] = useState(false);
  const buttonRef = useRef();
  const itemsRef = useRef();
  useOffClick([itemsRef, buttonRef], () => setShowItems(false));

  const DropDownItem = ({ name, color = "grey-800", id }) => {
    return (
      <span
        className={classNames(
          `text-${color} hover:text-black`,
          isReadOnly ? "cursor-not-allowed" : "cursor-pointer"
        )}
        onClick={() => {
          if (isReadOnly) return;
          handleClick[id - 1]();
          setShowItems(false);
        }}
      >
        {name}
      </span>
    );
  };

  return (
    <div className="relative">
      <div>
        <button
          ref={buttonRef}
          onClick={() => setShowItems((prev) => !prev)}
          className={classNames(
            "font-nexa px-3 py-2 w-full grid grid-cols-12 z-50 rounded-xs place-items-center",
            {
              [`bg-${bgColor}`]: bgColor,
              "bg-cyan-600": !bgColor,
              [`text-${textColor}`]: textColor,
              "border border-gray-400": bgColor === "transparent",
            },
            className
          )}
        >
          <div className="col-span-11">{defaultValue}</div>
          <div
            alt="arrow"
            src={arrow}
            className={classNames(
              "text-xl flex",
              showItems ? "transform -rotate-90" : "transform rotate-90"
            )}
          >
            {">"}
          </div>
        </button>
        <div
          ref={itemsRef}
          className={classNames(
            showItems && items.length ? "absolute" : "hidden",
            "right-0 z-50 flex flex-col font-nexa px-2 py-2 text-gray-500 overflow-scroll bg-white rounded-sm border-2 min-w-[90%]",
            styles.noScrollbar
          )}
        >
          {items.map(({ label, color, id }) => (
            <div
              className={classNames(
                "py-2",
                id < items.length && "border-b-2",
                itemsClassName
              )}
              key={`dropdownitem-${id}`}
            >
              <DropDownItem
                name={label}
                id={id}
                key={`drop-down-${id}`}
                color={color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
