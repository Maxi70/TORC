import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Auth } from "aws-amplify";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Username from "components/FormInputs/Username";

import PrimaryBtn from "components/buttons/Primary";
import Password from "components/FormInputs/Password";
import ConfirmPassword from "components/FormInputs/ConfirmPassword";
import Success from "./Success";
import Error from "components/FormComponentsNew/Error";
import DefaultInput from "components/FormInputs/DefaultInput";

function Otp(props) {
  const getForgotPasswordBlock = (
    <>
      Please select a new password by entering your verification code and new
      password.
    </>
  );

  const getVerificationBlock = (
    <>
      We just sent a code to your email address.
      <br />
      To complete the sign-up process, please enter the below.
    </>
  );

  const [formSuccess, setFormSuccess] = useState(null);
  const [passwordReset, setPasswordReset] = useState(false);

  function resendVerificationCode(username) {
    Auth.resendSignUp(username)
      .then((data) => {
        setFormSuccess(
          <p className="b2">Your verification code has been mailed to you.</p>
        );
      })
      .catch((err) => {
        console.log(
          `Tried to resend verification for  ${username}` + err.message
        );
        console.log(err);
      });
  }

  const validateForm = () => {
    if (props.isForgotPasswordPage) {
      return Yup.object().shape({
        username: Yup.string().required("You must enter a username"),
        code: Yup.string()
          .required("Please enter your verification code")
          .length(6, "Code length is 6 characters")
          .matches(/^[0-9]+$/, "Must be only digits"),
        password: Yup.string()
          .required("Please enter your password")
          .min(8, "Minimum length of a password is 8 characters")
          .max(256, "Maximum length of a password is 256 characters.")
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "Please ensure your password contains at least one, upper and lowercase characters, one number, and one special characters, and is of minimum length 8"
          ),
        confirmPassword: Yup.string()
          .required("Please confirm your password")
          .oneOf([Yup.ref("password"), null], "Passwords must match"),
      });
    }
    return Yup.object().shape({
      username: Yup.string().required("You must enter a username"),
      code: Yup.string()
        .required("Please enter your verification code")
        .length(6, "Code length is 6 characters")
        .matches(/^[0-9]+$/, "Must be only digits"),
    });
  };

  let validationSchema = validateForm();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      username: props.username || "",
    },
    mode: "all",
  };
  const methods = useForm(formOptions);
  const { handleSubmit, setError, formState } = methods;
  const { errors, isSubmitting } = formState;
  const [isLoading, setIsLoading] = useState(false);
  const [accountVerified, setAccountVerified] = useState(false);

  // Called when the verification code form is submitted
  async function onSubmit({ username, code, password }) {
    setIsLoading(true);
    try {
      if (props.isForgotPasswordPage) {
        await Auth.forgotPasswordSubmit(username, code, password);
        setPasswordReset(true);
        setAccountVerified(true);
      } else {
        await Auth.confirmSignUp(username, code);
        setTimeout(() => {
          setAccountVerified(true);
        }, 2500);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.code === "UserNotFoundException") {
        setError("apiError", { message: error.message || error });
      }
      if (error.code === "CodeMismatchException") {
        setError("code", { message: "Verification code is invalid." });
        setFormSuccess(<></>);
      } else {
        console.log(
          `Error during ${
            props.isLoginPage ? "code verification" : "password reset"
          }`,
          error
        );
        setError("apiError", {
          message:
            error.message ||
            "An unknown error occurred. Try again after sometime",
        });
      }
    }
  }

  if (accountVerified)
    return <Success isForgotPasswordPage={props.isForgotPasswordPage} />;

  return (
    <div className="large-section container-left">
      <h1 className="mb-8">
        {props.isForgotPasswordPage ? "Reset Password" : "Account Verification"}
      </h1>
      <div className="b1">
        {props.isForgotPasswordPage
          ? getForgotPasswordBlock
          : getVerificationBlock}
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="sm:w-2/3 ml-auto grid gap-12 sm:mt-16"
        >
          {props.isForgotPasswordPage && <Username />}
          <DefaultInput id="code" label="Verification Code" />

          {props.isForgotPasswordPage && (
            <>
              <Password />
              <ConfirmPassword />
            </>
          )}
          {passwordReset && (
            <div className="b3 flex flex-col items-center justify-center py-4 w-full mt-12">
              <p className=" text-bluepurple">Password sucessfully reset! </p>
              <p className="mt-3 animate-pulse">redirecting to login...</p>
            </div>
          )}
          {formSuccess}

          {!accountVerified && (
            <div className="flex flex-row items-center justify-end gap-8 py-4 w-full">
              <div
                role="button"
                onClick={(e) => {
                  e.preventDefault();
                  resendVerificationCode(props.username);
                }}
                className="cursor-pointer b4"
              >
                Resend Code
              </div>
              <PrimaryBtn
                loading={isSubmitting}
                data-cy="signup"
                label={!isLoading ? "Submit" : "Submitting..."}
                disabled={isSubmitting}
              />
            </div>
          )}
          {accountVerified}

          {errors.apiError && <Error message={errors.apiError?.message} />}
        </form>
      </FormProvider>
    </div>
  );
}

Otp.propTypes = {
  isForgotPasswordPage: PropTypes.bool.isRequired,
  username: PropTypes.string,
};

export default Otp;
