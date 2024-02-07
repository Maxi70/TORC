import { useFormContext } from "react-hook-form";

import Input from "components/FormComponentsNew/Input";
import CustomError from "pages/Auth/Signup/Components/CustomError";

const UsernameEmail = () => {
  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <Input
        id="username"
        label="Username/Email"
        placeholder="Enter Username or Email"
      />
      <CustomError message={errors.username?.message} />
    </div>
  );
};

export default UsernameEmail;
