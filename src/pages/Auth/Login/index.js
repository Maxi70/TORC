import React, { useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";

import Footer from "../../../components/Footer";
import SocialLoginButton from "components/buttons/SocialLoginButton";
import Navigation from "components/Navigation";
import Logo from "components/Logo/Logo";
import PrimaryBtn from "components/buttons/Primary";
import Banner from "components/Banner";
import Newsletter from "components/Newsletter";
import Error from "components/FormComponentsNew/Error";
import URLS from "utils/urls";
import Password from "components/FormInputs/Password";
import UsernameEmail from "components/FormInputs/UsernameEmail";
import { setReferralCookies } from "helpers/utils";

function LogIn() {
  const location = useLocation();

  useEffect(() => {
    document.title = "Torc Login";
    localStorage.removeItem("profileCompletion");

    const retUrl = location?.state?.retUrl?.pathname ?? null;

    if (retUrl) {
      sessionStorage.setItem("retUrl", JSON.stringify(retUrl));
    }
  }, [location]);

  const params = new URLSearchParams(useLocation().search);
  setReferralCookies(params);

  const history = useHistory();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username or Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema), mode: "all" };
  const methods = useForm(formOptions);
  const { handleSubmit, setError, formState } = methods;
  const { errors } = formState;

  // loading states for login button
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  async function onSubmit({ username, password }) {
    username = username.trim();
    return await Auth.signIn(username, password)
      .then((user) => {
        if (window.analytics)
          window.analytics.identify(user?.attributes?.sub, {
            username: user?.username,
            logInDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
          });
      })
      .catch((error) => {
        const preAuthTriggerError = "PreAuthentication failed with error ";
        if (error.code === "UserNotConfirmedException") {
          let encodeUsername = encodeURIComponent(username);
          history.push(`/verification?username=${encodeUsername}`);
        } else if (error.message?.includes(preAuthTriggerError)) {
          const message = error.message.split(preAuthTriggerError)[1];
          setIsLoginLoading(false);
          setError("apiError", { message });
        } else {
          setIsLoginLoading(false);
          setError("apiError", { message: error.message || error });
        }
      });
  }

  return (
    <>
      <div className="object-small-hidden">
        <Navigation />
      </div>
      <div className="container-large">
        <a href={URLS.HOME}>
          <Logo />
        </a>
        <div className="large-section">
          <h1 className="mb-8">Login.</h1>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit, () => setIsLoginLoading(false))}
            >
              <div className="flex items-center sm:flex-row flex-col gap-4">
                <div className="w-full sm:mr-20">
                  <SocialLoginButton
                    type="github"
                    className="sm:my-8 my-6 !pl-[25%]"
                  />
                  <SocialLoginButton
                    type="google"
                    className="sm:my-8 my-6 !pl-[25%]"
                  />
                </div>
                <div className="items-center ml-6 flex">
                  <div className="w-0.5	h-44 bg-gray-300 rotate-90 sm:rotate-0 z-[-1] absolute sm:relative" />
                  <div className="ml-[-24px] rounded-xs bg-gray-200">
                    <div className="b4-bold w-12 flex items-center justify-center h-12">
                      OR
                    </div>
                  </div>
                </div>

                <div className="bg-white w-full sm:ml-20 sm:my-8 my-6">
                  <div className="mb-8 relative">
                    <UsernameEmail />
                  </div>
                  <div className="mt-8 relative">
                    <Password />
                  </div>

                  {errors.apiError && (
                    <Error message={errors.apiError?.message} />
                  )}
                </div>
              </div>
              <div className="flex sm:flex-row items-center justify-end py-4 gap-9">
                <Link
                  to="/forgot-password"
                  data-cy="ForgotPassword"
                  className="b4"
                >
                  Forgot Password?
                </Link>
                <PrimaryBtn
                  id="login-btn"
                  label={!isLoginLoading ? "Login" : "Loading..."}
                  disabled={formState.isSubmitting}
                  loading={isLoginLoading}
                  onClick={() => setIsLoginLoading(true)}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
      <Banner
        buttonId="signup-btn"
        label="Sign up"
        text="Don’t have an account yet?"
        handleClick={() => history.push("/signup")}
      />
      <Newsletter />
      <Footer />
    </>
  );
}

export default LogIn;
