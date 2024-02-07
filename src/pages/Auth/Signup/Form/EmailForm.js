import React, { useMemo, useState, useEffect, useRef } from "react";
import { Auth } from "aws-amplify";
import moment from "moment";
import { FormProvider, useForm } from "react-hook-form";
import { Redirect, useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";

import { standardObject } from "./standardObject";
import PrimaryBtn from "components/buttons/Primary";
import AgreedToTerms from "components/FormInputs/AgreedToTerms";
import AgreedToMarketing from "components/FormInputs/AgreedToMarketing";
import Username from "components/FormInputs/Username";
import { UserExistsMarkup } from "../Components/UserExistsMarkup";
import Email from "components/FormInputs/Email";
import Location from "components/FormInputs/Location";
import Password from "components/FormInputs/Password";
import ConfirmPassword from "components/FormInputs/ConfirmPassword";
import Error from "components/FormComponentsNew/Error";
import { REFERRAL_SOURCES } from "utils/referralSources";
import ReferralCodeSource from "components/FormInputs/ReferralCodeSource";
import DefaultInput from "components/FormInputs/DefaultInput";
import ReferrerCode from "components/FormInputs/ReferrerCode";

const EMAIL_TAKEN = "A user with that email address already exists.";
const USERNAME_CANNOT_BE_EMAIL =
  "Username cannot be of email format, since user pool is configured for email alias.";
const USERNAME_TAKEN = "User already exists";

const EmailForm = ({ userName, setUserName, isEnterprise }) => {
  const elementRef = useRef(null);
  const [completedForm, setCompletedForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const params = new URLSearchParams(useLocation().search);
  const validationSchema = Yup.object().shape(standardObject);
  const cookies = useMemo(() => new Cookies(), []);

  useEffect(() => {
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  const detectedReferrerCode =
    cookies.get("referralCode") || params.get("referralCode") || "";
  const detectedReferralSource =
    cookies.get("refSource") || params.get("refSource") || "";

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: params.get("firstname") || "",
      lastname: params.get("lastname") || "",
      email: params.get("email") || "",
      referrerCode: detectedReferrerCode || "",
      agreedToMarketing: true,
    },
    mode: "all",
  };
  const methods = useForm(formOptions);
  const { setError, handleSubmit, register, watch, setValue } = methods;
  const { errors } = methods.formState;

  //if the user is a customer add the customer validation object
  if (isEnterprise) {
    standardObject.company = Yup.string()
      .required("Please enter your company name")
      .min(2, "Company name must be at least 2 characters");
  }

  if (completedForm)
    return <Redirect to={`verification?username=${userName}`} />;

  async function onSubmit({
    username,
    password,
    firstname,
    lastname,
    referrerCode,
    referralSource,
    email,
    company,
    isEnterprise,
    agreedToTerms,
    agreedToMarketing,
    location,
  }) {
    username = username.trim();

    try {
      setSubmitting(true);
      const user = await Auth.signUp({
        username,
        password,
        attributes: {
          given_name: firstname.trim(),
          family_name: lastname.trim(),
          "custom:referrer_code": referrerCode,
          "custom:referrer_source": referrerCode
            ? REFERRAL_SOURCES[detectedReferralSource || referralSource]
            : undefined,
          "custom:company": company?.trim(),
          "custom:user_type": isEnterprise,
          "custom:terms_agreed": agreedToTerms.toString(),
          "custom:marketing_agreed": agreedToMarketing.toString(),
          "custom:location": JSON.stringify(location),
          email: email.toLowerCase(),
        },
        autoSignIn: {
          enabled: true,
        },
      });

      if (window.analytics)
        window.analytics.identify(user?.userSub, {
          given_name: firstname.trim(),
          family_name: lastname.trim(),
          email: email.toLowerCase(),
          username: username,
          signUpDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
        });

      // Remove the referrer code since it is now used
      cookies.remove("referralCode");
      cookies.remove("refSource");

      setUserName(username);
      setCompletedForm(true);
    } catch (error) {
      if (error.message) {
        const preSignUpError = "PreSignUp failed with error ";
        if (new RegExp(preSignUpError).test(error.message)) {
          const formattedMsg = error.message.replace(preSignUpError, "");
          if (formattedMsg === EMAIL_TAKEN) {
            setError("email", { message: formattedMsg });
            setError("apiError", { message: formattedMsg });
          } else {
            setError("apiError", { message: formattedMsg });
          }
        } else if (new RegExp(USERNAME_TAKEN).test(error.message)) {
          setError("username", { message: USERNAME_TAKEN });
          setError("apiError", { message: USERNAME_TAKEN });
        } else if (new RegExp(USERNAME_CANNOT_BE_EMAIL).test(error.message)) {
          const errorMessage =
            "Your username should not be an email address. Please choose a username that is creative and shows your personality";
          setError(
            "username",
            { message: errorMessage },
            { shouldFocus: true }
          );
        } else {
          setError("apiError", { message: error.message || error });
        }
      } else {
        console.log("Error during signup", error);
        setError("apiError", { message: error.message || error });
      }
      setCompletedForm(false);
      setSubmitting(false);
    }
  }

  return (
    <div className="form-small">
      <h2 ref={elementRef} className="mb-12">
        Sign up with Email
      </h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:gap-12 gap-8"
        >
          <DefaultInput id="firstname" label="First Name" />
          <DefaultInput id="lastname" label="Last Name" />
          <Email />
          <Username />
          <Location
            location={watch("location")}
            setLocation={(loc) =>
              setValue("location", loc, {
                shouldValidate: true,
              })
            }
          />
          {isEnterprise && <DefaultInput id="company" label="Company name" />}
          <Password />
          <ConfirmPassword />
          <ReferrerCode />
          {!detectedReferralSource && watch("referrerCode") && (
            <ReferralCodeSource />
          )}

          <div className="gap-3 flex flex-col">
            <AgreedToTerms isEnterprise={isEnterprise} />
            <AgreedToMarketing />
          </div>
          <input
            type="hidden"
            {...register("isEnterprise", { required: true })}
            id="isEnterprise"
            defaultValue={isEnterprise ? "CUSTOMER" : "FREELANCER"}
          />

          <PrimaryBtn
            id="signUpButton"
            loading={submitting}
            data-cy="signup"
            label={!submitting ? "Submit" : "Submitting..."}
            disabled={submitting}
            className="sm:ml-auto mt-8"
          />

          {errors.apiError && (
            <ErrorMessage
              errors={errors}
              name="apiError"
              render={({ message }) => (
                <Error
                  message={
                    message === EMAIL_TAKEN || message === USERNAME_TAKEN ? (
                      <UserExistsMarkup />
                    ) : (
                      { message }
                    )
                  }
                />
              )}
            />
          )}
        </form>
      </FormProvider>
    </div>
  );
};

EmailForm.propTypes = {
  userName: PropTypes.string,
  setUserName: PropTypes.func.isRequired,
  isEnterprise: PropTypes.bool.isRequired,
};

export default EmailForm;
