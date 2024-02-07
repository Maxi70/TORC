import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "components/FormComponentsNew/Input";
import Error from "pages/Auth/Signup/Components/CustomError";

const DefaultInput = ({
  id,
  label,
  defaultValue,
  placeholder,
  fullWidth = false,
  className,
  subtext,
  ...props
}) => {
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <div className={className}>
      <Input
        id={id}
        label={label}
        defaultValue={defaultValue}
        placeholder={placeholder}
        fullWidth={fullWidth}
        subtext={subtext}
        {...props}
      />
      <Error message={errors[id]?.message} />
    </div>
  );
};

DefaultInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default DefaultInput;
