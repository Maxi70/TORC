import { useEffect, useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import { updateUser } from "graphql/mutations";
import { useAuth, useAuthDispatch } from "GlobalAuthContext";
import { GLOBAL_AUTH_ACTION_TYPES, USER_TYPES } from "lookup";

import ReferrerCode from "components/FormInputs/ReferrerCode";
import AgreedToTerms from "components/FormInputs/AgreedToTerms";
import Username from "components/FormInputs/Username";
import AgreedToMarketing from "components/FormInputs/AgreedToMarketing";
import Location from "components/FormInputs/Location";
import PrimaryBtn from "components/buttons/Primary";
import Error from "components/FormComponentsNew/Error";
import DefaultInput from "components/FormInputs/DefaultInput";
import { REFERRAL_SOURCES } from "utils/referralSources";
import ReferralCodeSource from "components/FormInputs/ReferralCodeSource";
import RadioButton from "components/FormComponentsNew/RadioButton";
import CustomError from "pages/Auth/Signup/Components/CustomError";

const cookies = new Cookies();
let refCode = cookies.get("referralCode") ?? "";
let refSource = cookies.get("refSource") ?? "";

const MoreInfoNeeded = () => {
  const [updating, setUpdating] = useState(false);
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const history = useHistory();

  const userType = auth?.user?.userType;

  const isAttributeInScope = (attribute) => {
    switch (attribute) {
      case "userType":
        return auth.user.userType === USER_TYPES.UNKNOWN;
      case "location": {
        if (auth?.user?.location) {
          return !Boolean(
            Object.values(auth.user.location).filter((el) => el).length
          );
        }

        return true;
      }
      case "username":
      case "referrerCode":
      case "referrerSource":
      case "agreedToTerms":
      case "agreedToMarketing":
        return !auth.user.username || auth.user.username.length === 0;
      default:
        return false;
    }
  };

  const validationSchema = yup.object().shape({
    userType: isAttributeInScope("userType")
      ? yup.string().required("Select your user type")
      : undefined,
    company: yup.string().when("userType", {
      is: USER_TYPES.CUSTOMER,
      then: yup
        .string()
        .trim()
        .required("Please enter your company name")
        .min(2, "Company name must be at least 2 characters"),
      otherwise: yup.string().trim(),
    }),
    username: isAttributeInScope("username")
      ? yup
          .string()
          .required("Choose your username to represent you on the site")
          .min(
            2,
            "Username must be a minimum of 2 characters, and no more than 25"
          )
          .max(
            25,
            "Username must be a minimum of 2 characters, and no more than 25"
          )
          .matches(
            /^[A-Za-z0-9_-]+$/,
            "Username cannot contain special characters (!@#$%^&*+=) or spaces"
          )
      : undefined,
    location: yup.object().required("Please enter your city, state/province"),
    agreedToTerms: isAttributeInScope("agreedToTerms")
      ? yup
          .bool()
          .oneOf(
            [true],
            "Please confirm that you agree to the Torc Talent Agreement, Terms of Service and Privacy Policy"
          )
      : undefined,
  });

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      userType:
        auth?.user?.userType !== USER_TYPES.UNKNOWN ? auth?.user?.userType : "",
      company: "",
      username: "",
      referrerCode: refCode || "",
      agreedToTerms: false,
      agreedToMarketing: true,
      location: auth.user.location || {},
      referrerSource: refSource,
    },
    mode: "all",
  };

  const methods = useForm(formOptions);
  const { handleSubmit, watch, setError, setValue, formState } = methods;
  const { errors } = formState;
  const watchUserType = watch("userType");

  useEffect(() => {
    if (isAttributeInScope("location")) {
      setValue("location", undefined, { shouldValidate: false });
    }

    const invalidateLocation = (e) => {
      if (e.key === "Backspace") {
        setValue("location", undefined, { shouldValidate: false });
      }
    };

    document
      ?.getElementById("locationSearch")
      ?.addEventListener("keyup", invalidateLocation);
    return () =>
      document
        ?.getElementById("locationSearch")
        ?.removeEventListener("keyup", invalidateLocation);
    // eslint-disable-next-line
  }, []);

  const onSubmit = async ({
    userType,
    company,
    username,
    referrerCode,
    referrerSource,
    agreedToTerms,
    agreedToMarketing,
    location,
  }) => {
    username = username.trim();

    const locationPayload = {
      locationId: location?.id,
      cityName: location?.name,
      stateId: location?.state_id,
      stateCode: location?.state_code,
      stateName: location?.state_name,
      countryId: location?.country_id,
      countryCode: location?.country_code,
      countryName: location?.country_name,
      latitude: location?.latitude,
      longitude: location?.longitude,
      wikiDataId: location?.wikiDataId,
    };

    const updatedFields = {
      userType: isAttributeInScope("userType") ? userType : undefined,
      company:
        watchUserType === USER_TYPES.CUSTOMER ? company.trim() : undefined,
      username: isAttributeInScope("username") ? username : undefined,
      referrerCode: isAttributeInScope("referrerCode")
        ? referrerCode.trim()
        : undefined,
      referrerSource: isAttributeInScope("referrerSource")
        ? referrerCode
          ? REFERRAL_SOURCES[refSource || referrerSource || "cp"]
          : undefined
        : undefined,
      agreedToTerms: isAttributeInScope("agreedToTerms")
        ? agreedToTerms
        : undefined,
      agreedToMarketing: isAttributeInScope("agreedToMarketing")
        ? agreedToMarketing
        : undefined,
      location: isAttributeInScope("location") ? locationPayload : undefined,
    };

    setUpdating(true);

    try {
      await API.graphql(
        graphqlOperation(updateUser, {
          input: {
            id: auth.user.id,
            ...updatedFields,
          },
        })
      );
      // We use the user type set action and not the user updated action here
      // since we arrived on this page through an oauth login, where the user was
      // not previously signed up. Using this action allows us to clear the oAuthState
      // in the global auth state management

      dispatch({
        type: GLOBAL_AUTH_ACTION_TYPES.SET_REQUIRED_ATTRIBUTES,
        ...updatedFields,
        username: isAttributeInScope("username")
          ? username.toLowerCase()
          : undefined,
      });

      // Remove the referrer code since it is now used
      cookies.remove("referralCode");
      cookies.remove("refSource");

      history.push("/dashboard");
    } catch (error) {
      console.log("Error from console", error);
      if (
        error.errors[0]?.message ===
        "username has been taken. Try another username"
      ) {
        setError("username", {
          message: "This username has been taken. Try another username",
        });
      } else {
        setError("apiError", { message: error.errors[0]?.message });
      }
      setUpdating(false);
      return;
    }
  };

  if (
    !isAttributeInScope("username") &&
    !isAttributeInScope("referrerCode") &&
    !isAttributeInScope("agreedToTerms") &&
    !isAttributeInScope("agreedToMarketing") &&
    !isAttributeInScope("location")
  ) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="form-small">
      <h2 className="text-center sm:mb-12 mb-6">Sign up with Google.</h2>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:gap-12 gap-6"
        >
          {/* If user type is not know */}
          {isAttributeInScope("userType") && (
            <div>
              <div className="flex justify-around">
                <RadioButton
                  handleClick={() =>
                    setValue("userType", USER_TYPES.FREELANCER, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouched: true,
                    })
                  }
                  selected={watchUserType === USER_TYPES.FREELANCER}
                  text="I'm looking for work"
                />
                <RadioButton
                  handleClick={() =>
                    setValue("userType", USER_TYPES.CUSTOMER, {
                      shouldValidate: true,
                      shouldDirty: true,
                      shouldTouched: true,
                    })
                  }
                  selected={watchUserType === USER_TYPES.CUSTOMER}
                  text="I'm looking to hire"
                />
              </div>
              {errors.userType?.message && (
                <CustomError
                  className="mt-2"
                  message={errors.userType?.message}
                />
              )}
            </div>
          )}

          {/* If user type is CUSTOMER, prompt for company name*/}
          {(watchUserType === USER_TYPES.CUSTOMER ||
            userType === USER_TYPES.CUSTOMER) && (
            <DefaultInput id="company" label="Company name" />
          )}

          <Location
            location={watch("location")}
            setLocation={(loc) =>
              setValue("location", loc, {
                shouldValidate: true,
              })
            }
          />

          {/* If username is not known */}
          {isAttributeInScope("username") && <Username />}

          {/* If referrer code is not known */}
          {isAttributeInScope("referrerCode") && <ReferrerCode />}

          {!refSource &&
            isAttributeInScope("referrerSource") &&
            watch("referrerCode") && <ReferralCodeSource />}

          {isAttributeInScope("agreedToTerms") && (
            <div className="gap-3 flex flex-col">
              <AgreedToTerms
                isEnterprise={auth?.user?.userType === USER_TYPES.CUSTOMER}
              />
              <AgreedToMarketing />
            </div>
          )}

          <PrimaryBtn
            loading={updating}
            label={!updating ? "Submit" : "Submitting..."}
            disabled={updating}
            className="sm:ml-auto mt-8"
          />

          {errors.apiError && <Error message={errors.apiError?.message} />}
        </form>
      </FormProvider>
    </div>
  );
};

export default MoreInfoNeeded;
