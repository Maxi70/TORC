import React, { useCallback, useState, useEffect, useMemo } from "react";
import { useAuth } from "GlobalAuthContext";
import Header from "components/Header";
import Footer from "components/Footer";
import ScheduleEditButton from "components/Scheduler/ScheduleEditButton";
import ScheduleLinkButton from "components/Scheduler/ScheduleLinkButton";
import { Auth } from "aws-amplify";
import { useLocation } from "react-router-dom";
import JobWidgetsWrapper from "components/JobWidgetsWrapper";

const Matches = () => {
  const location = useLocation();
  const auth = useAuth();
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const SCHEDULER_ENABLED = process.env.REACT_APP_NYLAS_INTEGRATION
    ? JSON.parse(process.env.REACT_APP_NYLAS_INTEGRATION).isEnabled
    : false;
  const NYLAS_GOOGLE_ONLY =
    process.env.REACT_APP_COGNITO_GROUP_NYLAS_GOOGLE_ONLY;

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  useEffect(() => {
    // Fetch groups the logged in user belongs to
    (async () => {
      try {
        const session = await Auth.currentSession();

        const groups = session.getAccessToken().payload["cognito:groups"] || [];

        setCognitoGroups(groups);
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();

    document.title = `Torc Opportunity Matching - ${auth.user.username}`;
  }, [auth]);

  const isUserNylasGoogleOnly = useCallback(() => {
    return cognitoGroups.includes(NYLAS_GOOGLE_ONLY);
  }, [cognitoGroups, NYLAS_GOOGLE_ONLY]);

  return (
    <>
      <Header
        backgroundStyle={{
          background: "linear-gradient(135deg, #83D9BB 0%, #F4D675 100%)",
        }}
        pageHeader={
          <div className="max-w-5xl mx-auto px-5 md:px-14 pb-9 lg:pb-16">
            <h1 className="font-nexa font-bold text-3xl lg:text-5xl">
              My Jobs
            </h1>
            <p className="mt-5 font-rubik-regular text-sm lg:text-lg">
              Below you'll find jobs that might interest you. Click into each
              one for more details.
            </p>
          </div>
        }
      />

      <main className="flex flex-col px-5 md:px-14 py-14 font-rubik tracking-wider">
        <div className="self-start">
          {SCHEDULER_ENABLED &&
            (!auth.user.nylasAccountId && !auth.user.slugScheduler ? (
              <ScheduleLinkButton
                googleOnly={isUserNylasGoogleOnly()}
                errorMessage={
                  params.get("error") &&
                  "Something went wrong, please try again later."
                }
                className={`${params.get("error") ? "!mb-2" : ""}`}
              />
            ) : auth.user.slugScheduler ? (
              <ScheduleEditButton googleOnly={isUserNylasGoogleOnly()} />
            ) : (
              <p className="font-nexa font-bold mb-2">
                Your scheduling page will available shortly.
              </p>
            ))}
        </div>

        <JobWidgetsWrapper />
      </main>
      <Footer />
    </>
  );
};

export default Matches;
