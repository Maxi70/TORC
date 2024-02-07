import { forwardRef } from "react";

const Radio = forwardRef(({ isReadOnly, ...props }, ref) => {
  return (
    <div
      className="-m-0.5 p-0.5 w-8 h-8 inline-flex align-middle mr-2"
      style={{
        borderRadius: `100%`,
        background: `linear-gradient(to right, #83D9BB, #F4D675)`,
      }}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
            input[type="radio"].radio:checked {
              background-color: transparent;
              border: 2px solid white;
            }
          `,
        }}
      />
      <input
        {...props}
        type="radio"
        className="bg-white w-full h-full radio"
        style={{
          appearance: `none`,
          WebkitAppearance: `none`,
          borderRadius: `100%`,
        }}
        ref={ref}
        disabled={isReadOnly}
      />
    </div>
  );
});

export default Radio;
