import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function MemberName({ name, type }) {
  return (
    <Link alt="Member's Dashboard" className="cursor-pointer" to={`/dashboard`}>
      {name}
    </Link>
  );
}

MemberName.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
};

export default MemberName;
