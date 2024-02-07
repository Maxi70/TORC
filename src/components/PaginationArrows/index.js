import classNames from "classnames";
import React from "react";

export default function PaginationArrows({
  onClickLeft,
  onClickRight,
  leftDisabled = false,
  rightDisabled = false,
  className = "",
}) {
  if (leftDisabled && rightDisabled) return <div />;

  return (
    <div className={classNames("flex gap-2", className)}>
      <NavButton
        direction="left"
        onClick={onClickLeft}
        disabled={leftDisabled}
      />
      <NavButton
        direction="right"
        onClick={onClickRight}
        disabled={rightDisabled}
      />
    </div>
  );
}

// `direction` may be either "left" or "right"
function NavButton({ direction, disabled, onClick = () => {} }) {
  const handleClick = (e) => {
    if (disabled) {
      return;
    }

    onClick(e);
  };

  return (
    <button
      className={classNames(
        "rounded w-8 h-8 grid place-items-center border border-current disabled:opacity-50",
        { "cursor-not-allowed opacity-50": disabled }
      )}
      disabled={disabled}
      onClick={handleClick}
    >
      <svg
        viewBox="0 0 0.5 1"
        height="1rem"
        style={{
          transform: direction === "left" && "scaleX(-1)",
          paddingLeft: "0.12rem",
        }}
      >
        <polyline
          points="0.04,0.15 0.4,0.5 0.04,0.85"
          fill="none"
          stroke="currentColor"
          strokeWidth="20%"
          strokeLinejoin="miter"
        />
      </svg>
    </button>
  );
}
