import { useMemo } from "react";

const { default: classNames } = require("classnames");

const FONT_SIZE_LINKING = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
};

const SIZE_LINKING = {
  xs: "px-2",
  sm: "px-4",
  base: "px-6",
  lg: "px-8",
};

const Button = ({
  type,
  children,
  outlined = false,
  white = false,
  isReadOnly,
  bgColor,
  text = "text-black",
  fontSize = "sm",
  size = "base",
  className = "",
  noUpperCase,
  customPadding,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computedFontSize = useMemo(() => FONT_SIZE_LINKING[fontSize], []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const computedSize = useMemo(() => SIZE_LINKING[size], []);

  return (
    <button
      {...props}
      type={type || `button`}
      className={classNames(
        computedFontSize,
        !customPadding && computedSize,
        !customPadding && "py-2",
        `font-bold font-nexa min-w-max`,
        noUpperCase ? "" : "uppercase",
        outlined
          ? `border-2 border-black`
          : `${
              white ? `bg-white` : bgColor ? bgColor : `bg-yellow-300`
            } shadow-sm`,
        className,
        text,
        isReadOnly && "opacity-50 cursor-auto"
      )}
      style={{ borderRadius: `50px` }}
      disabled={isReadOnly}
    >
      {children}
    </button>
  );
};

export default Button;
