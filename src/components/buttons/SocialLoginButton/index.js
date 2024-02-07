import React, { useState } from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import classNames from "classnames";

import googleIcon from "images/google_icon.png";
import githubIcon from "images/github_icon.png";
import { OAUTH_CUSTOM_STATE_TYPES, USER_TYPES } from "lookup";

function SocialLoginButton({ type, isSignup, userType, className = "" }) {
  const [isLoading, setIsLoading] = useState(false);
  const btnId = "btn-" + type;
  const btnAlt = type + " sign in button";
  let customOauthState;
  if (userType) {
    customOauthState = {
      type: OAUTH_CUSTOM_STATE_TYPES.SET_USER_TYPE,
      payload: {
        userType,
      },
    };
  }
  return (
    <button
      type="button"
      id={btnId}
      alt={btnAlt}
      className={classNames(
        "flex items-center w-full z-10 sm:h-16 h-12 flex-row gap-6 pl-16 py-4 rounded-xs group bg-white",
        className
      )}
      style={{ boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.1)" }}
      onClick={() => {
        setIsLoading(true);
        if (type === "google") {
          Auth.federatedSignIn({
            provider: "Google",
            customState: customOauthState
              ? JSON.stringify(customOauthState)
              : undefined,
          });
        } else if (type === "github") {
          Auth.federatedSignIn({
            provider: process.env.REACT_APP_GITHUB_PROVIDER_NAME,
            customState: customOauthState
              ? JSON.stringify(customOauthState)
              : undefined,
          });
        }
      }}
    >
      <>
        <img
          className="mr-2 sm:w-9 sm:h-9 w-7 h-7"
          alt={type}
          src={type === "google" ? googleIcon : githubIcon}
        />
        <div className={classNames("b2", isLoading && "animate-pulse")}>
          {isLoading
            ? "Signing in..."
            : `${isSignup ? "Sign up" : "Login"} with ${
                type === "google" ? "Google" : "Github"
              }`}
        </div>
      </>
    </button>
  );
}

SocialLoginButton.propTypes = {
  type: PropTypes.string.isRequired,
  userType: PropTypes.oneOf([USER_TYPES.CUSTOMER, USER_TYPES.FREELANCER]),
};

export default SocialLoginButton;
