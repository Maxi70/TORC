import classNames from "classnames";
import { forwardRef } from "react";

const Input = forwardRef(
  ({ isReadOnly, large, focusDatePicker, className, value, ...props }, ref) => {
    const handleClick = (e) => {
      if (focusDatePicker && !isReadOnly) {
        e.target.showPicker();
      }
    };
    return (
      <div
        className={classNames(
          "-m-0.5 p-0.5 rounded flex",
          large && "h-16",
          className
        )}
        style={{ background: `linear-gradient(to right, #83D9BB, #F4D675)` }}
      >
        <input
          value={value}
          onClick={handleClick}
          {...props}
          className="rounded h-full w-full px-4 py-2 bg-white"
          ref={ref}
          style={{ WebkitAppearance: `none` }}
          readOnly={isReadOnly}
        />
      </div>
    );
  }
);

export default Input;
