import React from "react";
import PropTypes from "prop-types";

// base icons
import { ReactComponent as LocationPin } from "images/location.svg";
import { ReactComponent as User } from "images/user.svg";
import { ReactComponent as Refresh } from "images/refresh.svg";
import { ReactComponent as Cross } from "images/cross.svg";

// wizard widget link icons
import { ReactComponent as LinkFull } from "images/wizard-link-full.svg";
import { ReactComponent as LinkHigh } from "images/wizard-link-high.svg";
import { ReactComponent as LinkLow } from "images/wizard-link-low.svg";

const BASE_ICONS = {
  locationPin: LocationPin,
  user: User,
  refresh: Refresh,
  cross: Cross,
};

const WIZARD_LINKS = {
  wizardLinkFull: LinkFull,
  wizardLinkHigh: LinkHigh,
  wizardLinkLow: LinkLow,
};

const SVG_BY_TYPE = {
  ...BASE_ICONS,
  ...WIZARD_LINKS,
};

function SvgIcon({ type, className, ...rest }) {
  const CustomSvg = SVG_BY_TYPE[type];

  return <CustomSvg className={className} {...rest} />;
}

SvgIcon.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
};

SvgIcon.defaultProps = {
  type: "",
  className: "",
};

export default SvgIcon;
