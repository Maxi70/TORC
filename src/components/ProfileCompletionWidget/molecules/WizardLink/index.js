import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import SvgIcon from "components/SvgIcon";

const WizardLink = ({ icon, path, color, linkText, completionText }) => {
  return (
    <div
      className="flex items-center justify-between text-xs md:text-sm lg:text-base font-medium"
      style={{ fontFamily: "Rubik" }}
    >
      <div className="flex items-center">
        <SvgIcon type={icon} className="mr-2 w-6 md:w-7 lg:w-8" />

        <Link to={path} className="underline">
          {linkText}
        </Link>
      </div>

      <span style={{ color }}>{completionText}</span>
    </div>
  );
};

WizardLink.propTypes = {
  icon: PropTypes.string.isRequired,
  path: PropTypes.string,
  color: PropTypes.string,
  linkText: PropTypes.string,
  completionText: PropTypes.string,
};

WizardLink.defaultProps = {
  path: "",
  color: "#000000",
  linkText: "",
  completionText: "",
};

export default WizardLink;
