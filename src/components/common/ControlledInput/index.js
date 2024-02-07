import React from "react";

function ControlledInput({ value: defaultValue, ...attrs }) {
  const [value, setValue] = React.useState(defaultValue || "");

  const input = (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      {...attrs}
    />
  );

  return [value, input];
}

export default ControlledInput;
