import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

import { forgotPassword } from "graphql/mutations";
import Otp from "components/auth/otp";
import Footer from "components/Footer";
import Navigation from "components/Navigation";
import Logo from "components/Logo/Logo";
import { yupResolver } from "@hookform/resolvers/yup";
import PrimaryBtn from "components/buttons/Primary";
import Error from "components/FormComponentsNew/Error";
import UsernameEmail from "components/FormInputs/UsernameEmail";

const FORGOT_PASSWORD_FAILED_REASON_FORMATTED = {
  SOCIAL_ACCOUNT: `Password reset isn't possible for users who signed up through Google
      or GitHub. We don't have your password, they do.  Use your Google or GitHub account to sign in.`,
};

function ForgotPassword() {
  const [confirmUser, setConfirmUser] = useState(false);

  useEffect(() => {
    document.title = "Torc - Forgot Password";
  }, []);

  const [username, setUsername] = useState();

  const [formError, setFormError] = useState(null);
  const [generatingCode, setGeneratingCode] = useState(false);

  // Allow form submission only if username has been entered
  const validateForm = () => {
    return Yup.object().shape({
      username: Yup.string().required("You must enter a username or email"),
    });
  };

  let validationSchema = validateForm();
  const formOptions = {
    resolver: yupResolver(validationSchema),
    mode: "all",
  };
  const methods = useForm(formOptions);
  const { handleSubmit } = methods;

  // Called when the password reset form is submitted
  const submitForm = async ({ username }) => {
    setFormError(null);
    setGeneratingCode(true);

    try {
      const { data } = await API.graphql({
        query: forgotPassword,
        variables: { input: { username } },
        authMode: "API_KEY",
      });

      if (data.forgotPassword.reason) {
        setFormError(FORGOT_PASSWORD_FAILED_REASON_FORMATTED["SOCIAL_ACCOUNT"]);
        setGeneratingCode(false);
        return;
      }
      setUsername(username);
      setConfirmUser(true);
    } catch (error) {
      console.log("Error during forgot password", error);
      setFormError("An unknown error occurred. Please try again later.");
      setGeneratingCode(false);
    }
  };

  return (
    <>
      <div className="object-small-hidden">
        <Navigation showButtons={false} />
      </div>

      <div className="container-large">
        <Logo />
        {confirmUser ? (
          <Otp
            username={username}
            onLogin={() => setConfirmUser(false)}
            isForgotPasswordPage={true}
          />
        ) : (
          <div className="large-section container-left">
            <h1 className="mb-8">Forgot Password</h1>
            <div className="b1 mb-8">
              Enter your username - a confirmation code will be sent to the
              email address associated with your username, which you will have
              to enter in the next step.
            </div>
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(submitForm)}
                className="sm:w-2/3 ml-auto grid gap-8 sm:mt-16"
              >
                <UsernameEmail />
                {formError && <Error message={formError} />}

                <div className="flex flex-row items-center justify-end gap-8 py-4 w-full">
                  <Link to="/" className="cursor-pointer b4">
                    {"Back to login"}
                  </Link>
                  <PrimaryBtn
                    loading={generatingCode}
                    label="Send confirmation code"
                    disabled={!validateForm() || generatingCode}
                  />
                </div>
              </form>
            </FormProvider>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
