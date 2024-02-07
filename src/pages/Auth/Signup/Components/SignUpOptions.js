import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import SocialLoginButton from "components/buttons/SocialLoginButton";
import { SIGNUP_TYPES, USER_TYPES } from "lookup";
import PrimaryBtn from "components/buttons/Primary";
import EmailForm from "pages/Auth/Signup/Form/EmailForm";

const SignUpOptions = ({ isEnterprise, userName, setUserName }) => {
  const [signUpType, setSignUpType] = useState();
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === "/more-info-needed") setSignUpType(SIGNUP_TYPES.GOOGLE);
  }, [pathname]);

  return (
    <>
      <div className="b1 mb-14">
        {isEnterprise
          ? "Simplify and accelerate your hiring journey with us."
          : "Find your dream job and build your freelance career."}
      </div>
      <div className="w-full">
        <div className="flex gap-7 sm:flex-row flex-col">
          <SocialLoginButton
            type="github"
            userType={
              isEnterprise ? USER_TYPES.CUSTOMER : USER_TYPES.FREELANCER
            }
            isSignup
          />
          <SocialLoginButton
            type="google"
            userType={
              isEnterprise ? USER_TYPES.CUSTOMER : USER_TYPES.FREELANCER
            }
            isSignup
          />
          <PrimaryBtn
            label="Sign up with Email"
            onClick={() => setSignUpType(SIGNUP_TYPES.EMAIL)}
            fullWidth
            selected={signUpType === SIGNUP_TYPES.EMAIL}
          />
        </div>

        {signUpType === SIGNUP_TYPES.EMAIL && (
          <EmailForm
            userName={userName}
            setUserName={setUserName}
            isEnterprise={isEnterprise}
          />
        )}
      </div>
    </>
  );
};

SignUpOptions.propTypes = {
  isEnterprise: PropTypes.bool,
  userName: PropTypes.string,
  setUserName: PropTypes.func,
};

export default SignUpOptions;
