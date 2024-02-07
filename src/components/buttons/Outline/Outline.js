import React from "react";

const OutlineButton = ({ label, href, onClick, className, ...rest }) => {
  let styles =
    "w-max my-4 rounded tracking-wide border-black border-2 font-rubik-regular font-bold uppercase text-base hover:bg-black hover:text-white transition-all py-1.5 px-4";

  if (className) styles += className;

  return href ? (
    <a href={href} className={styles} {...rest}>
      {label}
    </a>
  ) : (
    <button onClick={onClick} className={styles} {...rest}>
      {label}
    </button>
  );
};

export default OutlineButton;
