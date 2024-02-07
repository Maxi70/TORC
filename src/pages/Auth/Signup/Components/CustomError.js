import classNames from "classnames";
import PropTypes from "prop-types";

import Error from "components/FormComponentsNew/Error";

const CustomError = ({ message, className }) => {
  return (
    <Error
      className={classNames(
        "whitespace-pre-line sm:text-xs leading-[1.5]",
        className
      )}
      message={message}
    />
  );
};

CustomError.propTypes = {
  message: PropTypes.string,
  className: PropTypes.string,
};

export default CustomError;
