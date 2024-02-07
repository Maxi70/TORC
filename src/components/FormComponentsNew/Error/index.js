import classNames from "classnames";
import PropTypes from "prop-types";

const Error = ({ message, className }) => {
  return (
    <div className={classNames("b3 text-functionalDanger ml-4", className)}>
      {message}&nbsp;
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default Error;
