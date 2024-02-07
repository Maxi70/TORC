import { useFormContext } from "react-hook-form";

import Input from "components/FormComponentsNew/Input";
import CustomError from "pages/Auth/Signup/Components/CustomError";
import { UserExistsMarkup } from "pages/Auth/Signup/Components/UserExistsMarkup";

const USERNAME_TAKEN = "User already exists";

const Username = () => {
  const { formState } = useFormContext();
  const { errors } = formState;

  return (
    <div>
      <Input id="username" label="Username" placeholder="Enter Username" />
      <CustomError
        message={
          errors.apiError?.message === USERNAME_TAKEN ? (
            <UserExistsMarkup />
          ) : (
            errors.username?.message
          )
        }
      />
    </div>
  );
};

export default Username;
