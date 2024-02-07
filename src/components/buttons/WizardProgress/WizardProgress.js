import React from "react";
import classNames from "classnames";

const WizardProgressButton = ({ children, ...props }) => {
  return (
    <button
      className={classNames(
        "text-electricBlue-500 font-rubik-regular font-bold text-lg",
        "hover:font-black focus:font-black hover:opacity-75 focus:opacity-75",
        props.className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default WizardProgressButton;
