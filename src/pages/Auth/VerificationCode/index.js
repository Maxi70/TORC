import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import Otp from "components/auth/otp";
import Footer from "components/Footer";
import Navigation from "components/Navigation";
import Logo from "components/Logo/Logo";

function VerificationCode() {
  useEffect(() => {
    document.title = "Torc - Verify Code";
  }, []);

  const params = new URLSearchParams(useLocation().search);

  let username = params.has("username")
    ? decodeURIComponent(params.get("username"))
    : "";

  return (
    <>
      <div className="object-small-hidden">
        <Navigation showButtons={false} />
      </div>
      <div className="container-large">
        <Logo />
        <Otp isForgotPasswordPage={false} username={username} />
      </div>
      <Footer />
    </>
  );
}

export default VerificationCode;
