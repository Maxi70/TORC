import React, { useEffect, useRef, useState } from "react";

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
        background: `linear-gradient(to bottom, #DADADA, #979797)`,
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
      <span
        className="font-nexa font-bold text-sm text-white hard-center"
        style={{ textShadow: `0px 0px 3px black` }}
      >
        ?
      </span>
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
