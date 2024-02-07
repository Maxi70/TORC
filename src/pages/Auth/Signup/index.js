import React, { useState, useEffect, useMemo } from "react";
import Footer from "../../../components/Footer";
import { useHistory, useLocation } from "react-router-dom";
import Navigation from "components/Navigation";
import Logo from "components/Logo/Logo";
import Banner from "components/Banner";
import Newsletter from "components/Newsletter";
import SelectType from "./Components/SelectType";
import SignUpOptions from "./Components/SignUpOptions";
import URLS from "utils/urls";
import { setReferralCookies } from "helpers/utils";

export default function SignUp() {
  const history = useHistory();
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  // Determine the initial value of isEnterprise based on the "type" parameter from the URL
  const [isEnterprise, setIsEnterprise] = useState(() => {
    const type = params.get("type");
    return type === "customer"
      ? true
      : type === "freelancer"
      ? false
      : undefined;
  });

  // store the new username to pass along
  const [userName, setUserName] = useState();

  useEffect(() => {
    setReferralCookies(params);
    document.title = "Torc Registration";
  }, [params]);

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
          <h1 className="mb-8">
            {isEnterprise === undefined
              ? "Sign up."
              : "Join the Torc Community."}
          </h1>
          {isEnterprise === undefined ? (
            <SelectType setIsEnterprise={setIsEnterprise} />
          ) : (
            <SignUpOptions
              isEnterprise={isEnterprise}
              userName={userName}
              setUserName={setUserName}
            />
          )}
        </div>
      </div>
      <Banner
        buttonId="login-btn"
        label="Login"
        text="I have an account"
        handleClick={() => history.push("/login")}
      />
      <Newsletter />
      <Footer />
    </>
  );
}
