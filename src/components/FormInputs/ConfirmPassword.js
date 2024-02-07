import { useFormContext } from "react-hook-form";

import Input from "components/FormComponentsNew/Input";
import Error from "pages/Auth/Signup/Components/CustomError";

const ConfirmPassword = () => {
  const { formState } = useFormContext();
  const { errors } = formState;
  const handleChange = (e) => e.preventDefault();

  return (
    <div onCopy={handleChange} onCut={handleChange}>
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Confirm Password"
      />
      <Error message={errors.confirmPassword?.message} />
    </div>
  );
};

export default ConfirmPassword;
