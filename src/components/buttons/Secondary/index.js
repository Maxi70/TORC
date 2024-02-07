import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

import { btn, btnLabel } from "./Secondary.module.css";

const SecondaryButton = ({ buttonLabel, url, clickEvent, disabled }) => (
  <button
    className={classNames(
      "flex items-center justify-center border-bluepurple border-2 border-opacity-100 rounded-full  border-solid",
      btn
    )}
    onClick={clickEvent}
    disabled={disabled}
  >
    <p className={classNames("text-bluepurple", btnLabel)}>{buttonLabel}</p>
  </button>
);

export default SecondaryButton;

SecondaryButton.propTypes = {
  url: PropTypes.string,
  clickEvent: PropTypes.func,
  buttonLabel: PropTypes.string,
  disabled: PropTypes.bool,
};
