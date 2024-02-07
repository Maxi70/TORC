import { useRef, useState } from "react";
import { Icon } from "semantic-ui-react";
import classNames from "classnames";

import { useOffClick } from "hooks";
import styles from "./dropDown.module.css";
import arrow from "images/right-arrow.png";

/**
 * @param label string -  the label you want to give this item
 * @param defaultValue string - the default value you want for the drop down
 * @param items string[] - a list of items of the names to render
 * @param checkedItems string[] - a list of items which names have been checked
 * @param onRemove function - a function that gets called when you remove an item
 * @param onAdd function - a function that gets called when an item in the drop down is clicked
 * @param isReadOnly boolean - if drop down is in a read only state and should be unchanged
 */

const DropDown = ({
  label,
  defaultValue,
  items,
  checkedItems,
  onRemove,
  onAdd,
  isReadOnly,
  className,
  bgColor,
  textColor = "white",
}) => {
  const [showItems, setShowItems] = useState(false);
  const buttonRef = useRef();
  const itemsRef = useRef();
  useOffClick([itemsRef, buttonRef], () => setShowItems(false));

  const DropDownItem = ({ name, className }) => {
    if (checkedItems.includes(name)) {
      return null;
    }
    return (
      <span
        className={classNames(
          "text-grey-800 hover:text-black py-2 border-b-2",
          isReadOnly ? "cursor-not-allowed" : "cursor-pointer",
          className
        )}
        onClick={() => {
          if (isReadOnly) return;
          onAdd(name);
          setShowItems(false);
        }}
      >
        {name}
      </span>
    );
  };

  return (
    <div className="relative">
      <div className="mb-2">
        <label className="font-nexa font-bold text-lg text-electricBlue-500">
          {label}
        </label>
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
          {items.map((name) => (
            <DropDownItem name={name} key={`drop-down-${name}`} />
          ))}
        </div>
      </div>
      {checkedItems.map((ele) => (
        <div
          className={classNames(
            "inline-block mr-2 mb-2 px-3 py-2 text-center rounded-full text-sm font-medium text-cyan-800 bg-cyan-50",
            "shadow-xs hover:shadow-xs hover:bg-cyan-100 transition-shadow duration-200"
          )}
        >
          {ele}
          <Icon
            name="delete"
            onClick={() => onRemove(ele)}
            className="cursor-pointer"
          />{" "}
        </div>
      ))}
    </div>
  );
};

export default DropDown;
