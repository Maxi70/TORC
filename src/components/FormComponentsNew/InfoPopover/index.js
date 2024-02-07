import React, { useEffect, useRef, useState } from "react";

import { ReactComponent as Mark } from "images/new/exclamation-mark.svg";

export default function InfoPopover({ children }) {
  const isHovered = useRef(false);
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!popoverRef.current) return;
    const popover = popoverRef.current;

    if (!showPopover) {
      popover.style.transform = `translateX(-50%)`;
    }

    if (popover.getBoundingClientRect().left < 0)
      popover.style.transform = `translateX(calc(-50% + ${-popover.getBoundingClientRect()
        .left}px))`;
  }, [showPopover]);

  const enablePopover = () => {
    if (isHovered.current) setShowPopover(true);
  };

  return (
    <div
      className="inline-block rounded w-5 h-5 ml-1 align-middle relative"
      style={{
        cursor: `help`,
      }}
      onMouseEnter={() => {
        isHovered.current = true;
        setTimeout(enablePopover, 500);
      }}
      onMouseLeave={() => {
        isHovered.current = false;
        setShowPopover(false);
      }}
    >
      <Mark />
      {showPopover && (
        <div
          className="absolute top-full left-0 mt-2 transform -translate-x-1/2 bg-white shadow p-4 max-w-xs w-max z-10 font-rubik-regular"
          style={{ borderRadius: `20px`, cursor: `unset` }}
          ref={popoverRef}
        >
          <div className="font-rubik-regular">{children}</div>
        </div>
      )}
    </div>
  );
}
