import classNames from "classnames";
import PropTypes from "prop-types";

import styles from "./radiobutton.module.css";

const RadioButton = ({ selected, handleClick, text, className }) => {
  return (
    <div className={classNames("flex items-center gap-3", className)}>
      <div
        className={classNames(
          "w-10 h-10 rounded-full border-2 border-gray-400 hover:border-brandTerciary-300 cursor-pointer bg-transparent",
          selected && styles["radioButton"]
        )}
        onClick={handleClick}
      />
      <div className="text-lg tracking-[-0.031rem]">{text}</div>
    </div>
  );
};

RadioButton.propTypes = {
  selected: PropTypes.bool,
  handleClick: PropTypes.func,
  text: PropTypes.string,
};

export default RadioButton;
