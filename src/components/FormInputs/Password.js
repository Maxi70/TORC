import { useFormContext } from "react-hook-form";

import Input from "components/FormComponentsNew/Input";
import Error from "pages/Auth/Signup/Components/CustomError";

const Password = () => {
  const { formState } = useFormContext();
  const { errors } = formState;
  const handleChange = (e) => {
    e.preventDefault();
  };
  return (
    <div onCopy={handleChange} onCut={handleChange}>
      <Input id="password" label="Password" type="password" />
      <Error message={errors.password?.message} className="!leading-4" />
    </div>
  );
};

export default Password;
