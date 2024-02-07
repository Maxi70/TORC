import classNames from "classnames";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const Textarea = ({
  id,
  type = "text",
  label,
  bgColor = "white",
  labelColor = "black",
  inputColor = "black",
  borderColor = "gray-600",
  paddingRight = "0",
  placeholder = label && `Enter ${label}`,
  defaultValue,
  className,
  subtext,
  isReadOnly,
  rows,
  ...props
}) => {
  const { register, getFieldState } = useFormContext();

  const isValid = () => getFieldState(id).isTouched && !getFieldState(id).error;

  const isInvalid = () =>
    getFieldState(id).isTouched && getFieldState(id).error;

  return (
    <div className={classNames("relative w-full", className)}>
      <label
        className={`b4-bold block text-${labelColor} pb-2 pr-2 absolute top-[-10px] bg-${bgColor} capitalize`}
      >
        {label}
      </label>
      <textarea
        {...register(id)}
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete="off"
        rows={rows || 7}
        readOnly={!!isReadOnly}
        {...props}
        className={classNames(
          `b4 border-2 placeholder-${inputColor} text-${inputColor}  focus:border-brandTerciary-300 border-${borderColor} appearance-none rounded-xs w-full px-4 py-4 focus:outline-none focus:shadow-outline bg-${bgColor} pr-${paddingRight}`,
          {
            "!border-functionalSuccess": isValid(),
            "!border-functionalDanger": isInvalid(),
            "h-[120px]": !rows,
          }
        )}
      />
      {props.children}
      {subtext && (
        <div className="ml-4 mt-[2px] b5 text-grey-300">{subtext}</div>
      )}
    </div>
  );
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  label: PropTypes.string,
  bgColor: PropTypes.string,
  labelColor: PropTypes.string,
  inputColor: PropTypes.string,
  borderColor: PropTypes.string,
  placeholder: PropTypes.string,
  defaultValue: PropTypes.string,
  className: PropTypes.string,
  subtext: PropTypes.string,
  isReadOnly: PropTypes.bool,
  rows: PropTypes.number,
};

export default Textarea;
