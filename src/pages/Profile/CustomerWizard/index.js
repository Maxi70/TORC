import { API, graphqlOperation } from "aws-amplify";
import { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { GLOBAL_AUTH_ACTION_TYPES } from "lookup";
import { updateUserAndQueryAllFields as updateUser } from "graphql/mutations";
import { useAuth, useAuthDispatch } from "GlobalAuthContext";

import AboutMe from "./Steps/AboutMe";
import ProfilePictureStepWrapper from "../Wizard/ProfessionalProfile/Profile/ProfileCoverPicture/ProfilePictureStepWrapper";

import Footer from "components/Footer";
import AboutCompany from "pages/Profile/CustomerWizard/Steps/AboutCompany";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import Header from "components/Header";
import { useMediaQuery } from "react-responsive";
import ProgressTick from "components/ProgressTick";

/**
 * The signup and profile wizard for the customer side. Based off of /Profile/Wizard,
 * but duplicated due to significant changes to the content of the page.
 */
const CustomerWizard = () => {
  const [user, setUser] = useState(null);
  let { stepNumber } = useParams();
  const history = useHistory();
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  let activeStepComponent;
  // Fetch the user details on page load
  useEffect(() => {
    setUser(auth.user);

    document.title = `${
      auth.user.username || auth.user.identity_username
    } - Torc Profile`;
  }, [auth]);

  // Determine the currently active step
  const isActiveStep = (step) => {
    return parseInt(stepNumber, 10) === step;
  };

  // Determine if the provided step is already completed
  const isCompletedStep = (step) => {
    return step < parseInt(stepNumber, 10);
  };

  // Move to the next step
  const triggerNextStep = () => {
    if (parseInt(stepNumber, 10) <= 4) {
      history.push(`/profile/customer/wizard/${parseInt(stepNumber, 10) + 1}`);
    }
  };

  const triggerPreviousStep = () => {
    if (parseInt(stepNumber, 10) > 1) {
      history.push(`/profile/customer/wizard/${parseInt(stepNumber, 10) - 1}`);
    }
  };

  const jumpToStep = (stepNumber) => {
    history.push(`/profile/customer/wizard/${parseInt(stepNumber, 10)}`);
  };

  const updateUserProfile = async (data) => {
    const res = await API.graphql(
      graphqlOperation(updateUser, { input: data })
    );

    if (res.data.updateUser) {
      // Should result in setUser() in useEffect() being invoked too
      dispatch({
        type: GLOBAL_AUTH_ACTION_TYPES.USER_UPDATED,
        user: res.data.updateUser,
      });
    } else {
      throw new Error(
        `Update operation on user failed - no data returned. Update data: ${JSON.stringify(
          data,
          null,
          2
        )}`
      );
    }
  };

  const [loading, setLoading] = useState(false);

  const currentStep = parseInt(stepNumber, 10);

  const isBigScreen = useMediaQuery({ query: `(min-width: 640px)` });

  if (!user) {
    return null;
  }

  if (currentStep === 1) {
    activeStepComponent = (
      <ProfilePictureStepWrapper
        user={user}
        nextStep={triggerNextStep}
        updateProfile={updateUserProfile}
      />
    );
  } else if (currentStep === 2) {
    activeStepComponent = (
      <AboutMe
        user={user}
        nextStep={triggerNextStep}
        updateProfile={updateUserProfile}
        prevStep={triggerPreviousStep}
      />
    );
  } else if (currentStep === 3) {
    activeStepComponent = (
      <AboutCompany
        user={user}
        nextStep={triggerNextStep}
        updateProfile={updateUserProfile}
        prevStep={triggerPreviousStep}
      />
    );
  } else if (currentStep === 4) {
    activeStepComponent = (
      <div className="justify-center max-w-3xl mx-auto py-12 flex flex-col gap-12">
        <h3 className="font-nexa font-bold tracking-wide text-3xl">
          Nice work. Your customer profile is set up and you’re ready to start
          building your developer team
        </h3>
        <Link to={`/profile/${user.username}`}>
          <GetStartedBtn
            loading={loading}
            disabled={loading}
            onClick={() => setLoading(true)}
            label={"GO TO PROFILE"}
            variantBlack
          />
        </Link>
      </div>
    );
  }

  const stepNames = [
    `Profile images`,
    `About me`,
    `About my company`,
    `Success!`,
  ];

  return (
    <>
      <Header />
      <div
        style={{
          background:
            currentStep === 4
              ? `linear-gradient(135deg, #84CAF0, #83D9BB)`
              : ``,
        }}
      >
        <div className="relative pb-24 overflow-x-hidden bg-white">
          {/* Rounded thing */}
          {/* <div
            className="shadow-sm absolute left-1/2 bottom-8 transform -translate-x-1/2 bg-white"
            style={{ width: `500vw`, height: `500vw`, borderRadius: `250vw` }}
          /> */}
          <div className="mx-auto max-w-3xl px-4 flex flex-col gap-8 relative">
            <h1 className="text-4xl font-bold font-nexa">
              Let's set up your profile.
            </h1>
            <div className="font-rubik-regular text-xl text-black-600">
              No one likes an empty profile! The more developers know about you
              and your company, the more likely they are to apply for your jobs.
            </div>
            <div className="relative mb-8">
              {/* The horizontal line */}
              <div className="w-full h-1 bg-bluepurple absolute top-1/2 left-0 transform -translate-y-1/2" />
              {/* The dots */}
              <div
                className="mx-4 flex justify-between relative"
                style={{ zIndex: 2 }}
              >
                {isBigScreen ? (
                  <>
                    <ProgressTick
                      number={1}
                      text={stepNames[0]}
                      filled={isCompletedStep(1) || isActiveStep(1)}
                      jumpToStep={() => jumpToStep(1)}
                    />
                    <ProgressTick
                      number={2}
                      text={stepNames[1]}
                      filled={isCompletedStep(2) || isActiveStep(2)}
                      jumpToStep={() => jumpToStep(2)}
                    />
                    <ProgressTick
                      number={3}
                      text={stepNames[2]}
                      filled={isCompletedStep(3) || isActiveStep(3)}
                      jumpToStep={() => jumpToStep(3)}
                    />
                    <ProgressTick
                      number={4}
                      text={stepNames[3]}
                      filled={isCompletedStep(4) || isActiveStep(4)}
                      jumpToStep={() => jumpToStep(4)}
                    />
                  </>
                ) : (
                  <>
                    <button
                      className="grid place-items-center w-8 h-8 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white border-2 border-bluepurple text-bluepurple"
                      onClick={triggerPreviousStep}
                    >
                      &lt;
                    </button>
                    <ProgressTick
                      number={currentStep}
                      filled
                      text={stepNames[currentStep - 1]}
                    />
                    <div
                      className="grid place-items-center w-8 h-8 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white border-2 border-bluepurple text-bluepurple"
                      onClick={triggerNextStep}
                    >
                      &gt;
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="relative mb-24">
          <div className="curve" />
        </div>
        <div className="mx-auto max-w-3xl">{activeStepComponent}</div>
      </div>
      <Footer />
    </>
  );
};

export default CustomerWizard;
