import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { USER_TYPES } from "lookup";
import { useAuth, useAuthDispatch } from "GlobalAuthContext";
import { GLOBAL_AUTH_ACTION_TYPES } from "lookup";
import classNames from "classnames";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { updateUser } from "graphql/mutations";

import isSocialLoginuser from "./util/isSocialLogin";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import Header from "components/Header";
import Footer from "components/Footer";
import Input from "components/FormComponents/Input";
import InfoPopover from "components/FormComponents/InfoPopover";

import {
  validatePassword,
  checkPasssword,
  checkConfirmPassword,
} from "./util/validation";

const Settings = () => {
  const { user } = useAuth();
  const dispatch = useAuthDispatch();
  const socialLoginUser = isSocialLoginuser(user.identity_username);

  const { username, given_name, family_name, email, userType } = user;
  const [submitting, setSubmitting] = useState(false);
  const [unkownErr, setUnkownErr] = useState(false);
  const [detailsUpdated, setDetailsUpdated] = useState(false);
  // const [requiredPasswordChange, setRequiredPasswordChange] = useState(false);
  const [noInfoToSave, setNoInfoToSave] = useState(false);
  const companyUserName = user?.companyDetails?.name || user?.company || "";
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (unkownErr) {
      setTimeout(() => {
        setUnkownErr(false);
      }, 10000);
    }
  }, [unkownErr]);

  const standardObject = {
    firstname: Yup.string().required("Please enter your  first name"),
    lastname: Yup.string().required("Please enter your last name"),
    email: Yup.string().email().required("Please enter your email address"),
    username: Yup.string()
      .required("Choose your username to represent you on the site")
      .min(2, "Min is 2")
      .max(25, "Max is 25"),
    currentPassword: Yup.string().notRequired(),
    password: Yup.string().notRequired(),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref("password"), null],
        "Password confirmation does not match the new password."
      )
      .notRequired(),
  };

  if (userType === USER_TYPES.CUSTOMER) {
    standardObject.company = Yup.string().required(
      "Please provide a company name"
    );
  }

  const validationSchema = Yup.object().shape(standardObject);

  const formOptions = {
    resolver: yupResolver(validationSchema),
    defaultValues: {
      firstname: given_name || "",
      lastname: family_name || "",
      email: email || "",
      username: username || "",
      company: companyUserName || "",
      password: "",
    },
  };

  const { register, handleSubmit, formState, setError, setValue, getValues } =
    useForm(formOptions);
  const { errors } = formState;

  // function checkValidUsername(username) {
  //   if (!username.match(/^[A-Za-z0-9_-]+$/) || username.includes(" ")) {
  //     setError("username", {
  //       message:
  //         "username cannot contain special characters (!@#$%^&*+=) or spaces",
  //     });
  //     return false;
  //   }
  //   setError("username", { message: "" });
  //   return true;
  // }

  const throwErrors = (errors) => {
    let noErrors = true;

    for (let err in errors) {
      const message = errors[err];
      if (message !== "") {
        noErrors = false;
      }
      setError(err, { message });
    }

    return noErrors;
  };

  const shouldPasswordsValidate = () => {
    const vals = getValues();
    if (
      !vals.confirmPassword &&
      !vals.currentPassword &&
      !vals.password.length
    ) {
      setError("currentPassword", { message: "" });
      setError("password", { message: "" });
      setError("confirmPassword", { message: "" });
      return false;
    }

    return true;
  };

  const onSubmit = async ({
    username,
    firstname,
    lastname,
    email,
    currentPassword,
    password,
    confirmPassword,
  }) => {
    // username = username.trim();
    // if (!checkValidUsername(username)) {
    //   return;
    // }
    const updatingPassword =
      currentPassword &&
      password &&
      confirmPassword &&
      currentPassword?.length > 0 &&
      password?.length > 0;

    const updatingNames =
      firstname !== user.given_name || lastname !== family_name;

    if (!updatingNames && !updatingPassword) {
      return setNoInfoToSave(true);
    } else {
      setNoInfoToSave(false);
    }

    if (updatingPassword) {
      let validatedForm = true;
      const potentialErrors = validatePassword({
        currentPassword,
        password,
        confirmPassword,
      });

      for (let err of potentialErrors) {
        validatedForm = throwErrors(err);
      }

      if (!validatedForm) return;
    }

    setSubmitting(true);

    const resetVals = (name) => setValue(name, "", { shouldValidate: false });
    try {
      const currUser = await Auth.currentAuthenticatedUser();

      setDetailsUpdated(false);
      if (updatingPassword) {
        await Auth?.changePassword(currUser, currentPassword, password);
        await Auth.signOut({ global: true });
      }

      if (updatingNames) {
        const valuesToUpdate = {};
        if (firstname !== given_name) {
          valuesToUpdate.given_name = firstname.trim();
        }
        if (lastname !== family_name) {
          valuesToUpdate.family_name = lastname.trim();
        }
        await API.graphql(
          graphqlOperation(updateUser, {
            input: { ...valuesToUpdate, id: user.id },
          })
        );
        dispatch({
          type: GLOBAL_AUTH_ACTION_TYPES.USER_UPDATED,
          user: {
            ...user,
            ...valuesToUpdate,
          },
        });
      }

      ["currentPassword", "password", "confirmPassword"].forEach(resetVals);
      setSubmitting(false);
      setDetailsUpdated(true);
    } catch (e) {
      console.error(e);

      switch (e?.code) {
        case "NotAuthorizedException":
          setError("currentPassword", { message: "Incorrect password" });
          break;
        default:
          setUnkownErr(true);
      }
      setSubmitting(false);
      setDetailsUpdated(false);
    }
  };

  // Note, when we do globalSignOut other active sessions stay active for 1 hour.
  // Second globalSignOut is not possible in such case.
  // Therefore we catch the needed error and do a regular signOut
  const signOutGlobally = async () => {
    try {
      setIsLoading(true);
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("Sign out error", error);

      if (error.message === "Access Token has been revoked") {
        await Auth.signOut();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        backgroundStyle={{
          background: "#E8AF92",
        }}
        pageHeader={
          <nav className="flex w-full items-center justify-center pt-14 pb-20 md:px-10 px-8">
            <div className="max-w-4xl w-full h-fit">
              <h1 className="font-nexa font-bold text-5xl leading-5">
                My settings
              </h1>
            </div>
          </nav>
        }
      />
      <main className="py-14 md:px-8 px-4 flex justify-center items-center w-full ">
        <div className="max-w-4xl w-full">
          {/* {requiredPasswordChange && (
            <div
              className={classNames(
                styles["update-info"],
                "px-10 py-10 max-w-4xl"
              )}
            >
              <p className="font-nexa tracking-wider text-3xl ">
                Hey, we need an update in your password!
              </p>
              <p className="font-rubik-regular text-base mt-5">
                Mainly for security purposes, Torc needs that you update your
                password to get inside our new security policies.
              </p>
            </div>
          )} */}
          <form onSubmit={handleSubmit(onSubmit)} className="text-base mt-10">
            <label htmlFor="lastname" className="font-rubik-regular font-bold">
              Email
            </label>
            <div className="mt-4" />
            <p className="font-rubik-medium tracking-wider">{user?.email}</p>
            <div className="mb-6" />
            {/* <label htmlFor="username" className="font-rubik-regular font-bold">
              Username
            </label>
            <div className="mt-3" />
            <Input
              id="username"
              type="text"
              readOnly={submitting}
              large
              {...register("username", { required: true })}
            />
            <div
              data-cy="error-confirmpassword"
              className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
            >
              {errors?.username?.message}
            </div> */}
            <label htmlFor="firstname" className="font-rubik-regular font-bold">
              First Name*
            </label>
            <div className="mt-3" />
            <Input
              id="firstname"
              type="text"
              readOnly={submitting}
              large
              {...register("firstname", { required: true })}
            />
            <div
              data-cy="error-confirmpassword"
              className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
            >
              {errors?.firstname?.message}
            </div>

            <label htmlFor="lastname" className="font-rubik-regular font-bold">
              Last Name*
            </label>
            <div className="mt-3" />
            <Input
              id="lastname"
              type="text"
              readOnly={submitting}
              large
              {...register("lastname", { required: true })}
            />
            <div
              data-cy="error-confirmpassword"
              className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
            >
              {errors?.lastname?.message}
            </div>
            {/* <label htmlFor="email" className="font-rubik-regular font-bold flex">
              Email address* &nbsp;
              <InfoPopover>
                <div>Not sure what text goes here yet.</div>
              </InfoPopover>
            </label>
            <div className="mt-3" />
            <Input
              id="email"
              type="text"
              readOnly={submitting}
              large
              {...register("email", { required: true })}
            />
            <div
              data-cy="error-confirmpassword"
              className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
            >
              {errors?.email?.message}
            </div> */}
            {/* {userType === USER_TYPES.CUSTOMER && (
              <>
                <label htmlFor="company" className="font-rubik-regular font-bold">
                  Company
                </label>
                <div className="mt-3" />
                <Input
                  id="company"
                  type="text"
                  readOnly={submitting}
                  large
                  {...register("company", { required: true })}
                />
                <div
                  data-cy="error-confirmpassword"
                  className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
                >
                  {errors?.company?.message}
                </div>
              </>
            )} */}
            <div className="relative w-fit">
              <button
                className="mt-3 mb-6 font-semibold underline hover:text-blue-800"
                onClick={signOutGlobally}
              >
                Sign out of all devices
              </button>
              {isLoading && <span className="absolute ml-4 left-full loader" />}
            </div>
            {!socialLoginUser && (
              <>
                {" "}
                <p className="mt-4 text-xl font-nexa">Change password</p>
                <p className="font-rubik-regular text-base mt-6">
                  Choose a unique password to protect your account.
                </p>
                <br />
                <label
                  htmlFor="current"
                  className="font-rubik-regular font-bold"
                >
                  Current password
                </label>
                <div className="mt-3" />
                <Input
                  id="current"
                  type="password"
                  large
                  readOnly={submitting}
                  {...register("currentPassword", { required: true })}
                />
                <div
                  data-cy="error-confirmpassword"
                  className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
                >
                  {errors?.currentPassword?.message}
                </div>
                <label htmlFor="new" className="font-rubik-regular font-bold">
                  New password
                  <span className="font-rubik-regular text-gray-800 text-base tracking-wider leading-5 py-3 px-3">
                    <InfoPopover>
                      <div className="prose">
                        Password must contain at least 8 characters, including:{" "}
                        <ul>
                          <li>at least 1 number</li>
                          <li>at least 1 special character</li>
                          <li>at least 1 uppercase letter</li>
                          <li>at least 1 lowercase letter</li>
                        </ul>
                      </div>
                    </InfoPopover>
                  </span>
                </label>
                <div className="mt-3" />
                <div
                  onBlur={(e) => {
                    if (shouldPasswordsValidate()) {
                      const { currentPassword } = getValues();
                      throwErrors(
                        checkPasssword({
                          currentPassword,
                          password: e.target.value,
                        })
                      );
                    }
                  }}
                >
                  <Input
                    style={{
                      height: "64px",
                    }}
                    id="new"
                    type="password"
                    large
                    readOnly={submitting}
                    {...register("password", { required: true })}
                  />
                </div>
                <div
                  data-cy="error-confirmpassword"
                  className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
                >
                  {errors?.password?.message}
                </div>
                <label
                  htmlFor="confirm"
                  className="font-rubik-regular font-bold"
                >
                  Confirm new password
                </label>
                <div className="mt-3" />
                <div
                  onBlur={(e) => {
                    const { password } = getValues();
                    if (shouldPasswordsValidate()) {
                      checkConfirmPassword({
                        password,
                        confirmPassword: e.target.value,
                      });
                    }
                  }}
                >
                  <Input
                    style={{
                      height: "64px",
                    }}
                    id="confirmPassword"
                    type="password"
                    large
                    readOnly={submitting}
                    {...register("confirmPassword", { required: true })}
                  />
                </div>
                <div
                  data-cy="error-confirmpassword"
                  className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
                >
                  {errors.confirmPassword?.message}
                </div>
              </>
            )}
            <br />

            {unkownErr && (
              <div
                data-cy="error-confirmpassword"
                className="text-red-500 font-rubik-regular tracking-wider text-sm ml-2 mb-6 italic"
              >
                An error has occured, please try again.
              </div>
            )}
            {detailsUpdated && (
              <>
                <h3 className="font-nexa text-xl text-bluepurple-400 w-full margin-auto mb-10 mt-10 flex items-center justify-center">
                  You have successfully updated your settings.
                </h3>
              </>
            )}
            {noInfoToSave && (
              <h3
                className={classNames(
                  "font-nexa text-xl text-bluepurple-400 w-full margin-auto mb-10 mt-10 flex items-center justify-center"
                )}
              >
                No settings to save.
              </h3>
            )}
            <div className="flex justify-end w-full">
              <GetStartedBtn
                style={{
                  width: "270px",
                }}
                label={!submitting ? "UPDATE SETTINGS" : "UPDATING..."}
                id="updateSettings"
                data-cy="UpdateSettings"
                className="uppercase w-52"
                textColor="text-black"
              />
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Settings;
