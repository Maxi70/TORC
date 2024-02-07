import { forwardRef } from "react";

const Select = forwardRef(({ isReadOnly, ...props }, ref) => {
  return (
    <div
      className="-m-0.5 p-0.5 rounded flex"
      style={{
        background: `linear-gradient(to right, #83D9BB, #F4D675)`,
      }}
    >
      <div className="bg-white rounded w-full relative">
        <select
          {...props}
          className="rounded w-full px-4 py-2 bg-white"
          style={{ appearance: `none`, WebkitAppearance: `none` }}
          ref={ref}
          disabled={isReadOnly}
        />
        <svg
          viewBox="0 0 0.5 1"
          height="1rem"
          style={{
            transform: `translateY(-50%) rotate(90deg)`,
            pointerEvents: `none`,
          }}
          className="absolute top-1/2 right-4"
        >
          <polyline
            points="0.04,0.15 0.4,0.5 0.04,0.85"
            fill="none"
            stroke="currentColor"
            strokeWidth="20%"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </div>
  );
});

export default Select;
