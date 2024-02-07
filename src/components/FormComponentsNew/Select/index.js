import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

import styles from "./select.module.css";

const Select = ({
  id,
  type = "text",
  label,
  bgColor = "white",
  labelColor = "black",
  inputColor = "black",
  borderColor = "gray-600",
  placeholder = "Please select",
  wrapperClasses = "",
  defaultValue,
  subtext,
  ...props
}) => {
  const { register, getFieldState } = useFormContext();

  const isValid = () => getFieldState(id).isTouched && !getFieldState(id).error;

  const isInvalid = () =>
    getFieldState(id).isTouched && getFieldState(id).error;

  return (
    <div className={`relative w-full ${wrapperClasses}`}>
      <label
        className={`b4-bold block text-${labelColor} pb-2 pr-2 absolute top-[-10px] bg-${bgColor} capitalize z-10`}
      >
        {label}
      </label>
      <select
        {...register(id)}
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete="off"
        {...props}
        className={classNames(
          `b4 h-14 border-2 placeholder-${inputColor} text-${inputColor}  focus:border-brandTerciary-300 border-${borderColor} appearance-none rounded-xs w-full px-4 py-4 focus:outline-none focus:shadow-outline bg-${bgColor}`,
          {
            "!border-functionalSuccess": isValid(),
            "!border-functionalDanger": isInvalid(),
          },
          styles["customSelect"]
        )}
      />
      {subtext && (
        <div className="ml-4 mt-[2px] b5 text-grey-300">{subtext}</div>
      )}
    </div>
  );
};

Select.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  bgColor: PropTypes.string,
  labelColor: PropTypes.string,
  inputColor: PropTypes.string,
  borderColor: PropTypes.string,
  placeholder: PropTypes.string,
  wrapperClasses: PropTypes.string,
};

export default Select;
