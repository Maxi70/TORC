import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import "./SelfProfile.css";
import Header from "components/Header";
import { FreelanceProfile } from "./FreelanceProfile";

import Footer from "components/Footer";
import { useAuth } from "GlobalAuthContext";

import { ARTICLES } from "./articlesData";
import { USER_TYPES } from "lookup";

function Profile() {
  const auth = useAuth();
  const history = useHistory();
  const [appsyncUser, setAppsyncUser] = useState(null);

  useEffect(() => {
    document.title = `${auth.user.username} Torc Member Dashboard`;
    setAppsyncUser(auth.user);

    const retUrl = sessionStorage.getItem("retUrl") ?? null;

    if (retUrl) {
      sessionStorage.clear("retUrl");
      history.push(JSON.parse(retUrl));
      return;
    }

    if (
      auth.user?.userType === USER_TYPES.FREELANCER &&
      auth.user.profileCompletion < 100 &&
      localStorage.getItem("profileCompletion") !== "skipped"
    )
      history.push("profile/wizard/1");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return (
    <>
      <Header />
      <Container className="self-profile">
        {appsyncUser && (
          <FreelanceProfile appsyncUser={appsyncUser} articles={ARTICLES} />
        )}
      </Container>
      <Footer />
    </>
  );
}

export default Profile;
