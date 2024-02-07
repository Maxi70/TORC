import React from "react";
import PropTypes from "prop-types";

import logoImg from "images/headerLogo.svg";
import logoImgWhite from "images/logo-white.svg";

export default function Logo({ type = "black" }) {
  return (
    <img
      className="sm:h-8 sm:w-32 w-24 h-6"
      src={type === "black" ? logoImg : logoImgWhite}
      alt="torc"
    />
  );
}

Logo.propTypes = {
  type: PropTypes.string,
};
