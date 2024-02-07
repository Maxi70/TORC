import { forwardRef } from "react";

const TextArea = forwardRef(({ isReadOnly, ...props }, ref) => {
  return (
    <div
      className="-m-0.5 p-0.5 flex"
      style={{
        background: `linear-gradient(to right, #83D9BB, #F4D675)`,
        borderRadius: `32px`,
      }}
    >
      <textarea
        rows={props.rows || 7}
        {...props}
        className="w-full px-4 py-2 bg-white"
        ref={ref}
        style={{ WebkitAppearance: `none`, borderRadius: `30px` }}
        readOnly={!!isReadOnly}
      />
    </div>
  );
});

export default TextArea;
