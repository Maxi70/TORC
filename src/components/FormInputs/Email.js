import { useFormContext } from "react-hook-form";

import Input from "components/FormComponentsNew/Input";
import Error from "pages/Auth/Signup/Components/CustomError";
import { UserExistsMarkup } from "pages/Auth/Signup/Components/UserExistsMarkup";

const EMAIL_TAKEN = "A user with that email address already exists.";

const Email = ({ disabled = false }) => {
  const { formState } = useFormContext();
  const { errors } = formState;
  return (
    <div>
      <Input id="email" label="Email address" disabled={disabled} />
      <Error
        message={
          errors.apiError?.message === EMAIL_TAKEN ? (
            <UserExistsMarkup />
          ) : (
            errors.email?.message
          )
        }
      />
    </div>
  );
};

export default Email;
