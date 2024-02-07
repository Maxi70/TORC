import React, { useState } from "react";
import classNames from "classnames";
import toolTipStyles from "./hoverTooltip.module.css";
import { usePopper } from "react-popper";

export default function HoverTooltip({
  className,
  hoverText,
  children,
  placement = "bottom",
  tracking,
}) {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);

  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: placement,
  });

  const trackMouseEnter = () => {
    if (window.analytics) {
      window.analytics.track("Tooltip Hover", {
        ...tracking,
      });
    }
  };

  return (
    <div
      ref={setReferenceElement}
      className={classNames(
        "relative font-bold cursor-pointer text-blue-700",
        toolTipStyles["profile--accessDescription"],
        className && className
      )}
      onMouseEnter={trackMouseEnter}
    >
      {children}
      <div
        ref={setPopperElement}
        className={classNames(
          "absolute block top-11 -mt-3 z-10 bg-white shadow-sm font-light text-black cursor-default pointer-events-none opacity-0 !w-80 rounded-[16px]",
          toolTipStyles["profile--tooltip"]
        )}
        {...attributes.popper}
        style={styles.popper}
      >
        {hoverText}
      </div>
    </div>
  );
}
