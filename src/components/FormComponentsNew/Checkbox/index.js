import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

const Checkbox = ({ id }) => {
  const { register } = useFormContext();
  return (
    <div className="flex">
      <input type="checkbox" id={id} name={id} {...register(id)} />
      <label className="sm:w-12 sm:h-12 w-7 h-7" htmlFor={id}></label>
    </div>
  );
};

Checkbox.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Checkbox;
