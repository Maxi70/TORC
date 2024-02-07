import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const Input = ({
  id,
  type = "text",
  label,
  bgColor = "white",
  labelColor = "black",
  inputColor = "black",
  borderColor = "gray-600",
  classOverrides = "",
  placeholder = `Enter ${label}`,
  defaultValue,
  isReadOnly,
  disabled = false,
  subtext,
  focusDatePicker,
  ...props
}) => {
  const { register, getFieldState } = useFormContext();

  const isValid = () => getFieldState(id).isTouched && !getFieldState(id).error;

  const isInvalid = () =>
    getFieldState(id).isTouched && getFieldState(id).error;

  const handleClick = (e) => {
    if (focusDatePicker && !isReadOnly) {
      e.target.showPicker();
    }
  };
  return (
    <div className="relative w-full">
      <label
        className={`b4-bold block text-${labelColor} pr-2 absolute top-[-10px] bg-${bgColor} capitalize`}
      >
        {label}
      </label>
      <input
        {...register(id)}
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        disabled={disabled}
        readOnly={isReadOnly}
        onClick={handleClick}
        autoComplete="off"
        {...props}
        className={classNames(
          `b4 h-14 border-2 placeholder-${inputColor} text-${inputColor} focus:border-brandTerciary-300 border-${borderColor} appearance-none rounded-xs w-full px-4 py-4 focus:outline-none focus:shadow-outline bg-${bgColor} ${classOverrides}`,
          {
            "!border-functionalSuccess": isValid(),
            "!border-functionalDanger": isInvalid(),
            "!border-grey-300": disabled,
          }
        )}
      />
      {subtext && (
        <div className="ml-4 mt-[2px] b5 text-grey-300">{subtext}</div>
      )}
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  bgColor: PropTypes.string,
  labelColor: PropTypes.string,
  inputColor: PropTypes.string,
  borderColor: PropTypes.string,
  classOverrides: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
