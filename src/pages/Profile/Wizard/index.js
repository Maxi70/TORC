import { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useHistory, useLocation, Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { updateUserAndQueryAllFields as updateUser } from "graphql/mutations";
import { useAuth, useAuthDispatch } from "GlobalAuthContext";

import StackAndSkills from "./StackAndSkills";
import { GLOBAL_AUTH_ACTION_TYPES } from "lookup";
import ProgressTick from "components/ProgressTickNew";
import Logo from "components/Logo/Logo";
import ProfessionalProfile from "./ProfessionalProfile";
import Experience from "./Experience";
import Footer from "./shared/Footer";

function Wizard() {
  const [user, setUser] = useState(null);
  let { stepNumber } = useParams();
  const history = useHistory();
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const [currentSubStep, setCurrentSubStep] = useState(1);
  const [savingChanges, setSavingChanges] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [autoSaved, setAutoSaved] = useState(false);
  const firstSubstep = useRef();
  const secondSubstep = useRef();
  const thirdSubstep = useRef();
  const fourthSubstep = useRef();
  const fifthSubstep = useRef();
  const refs = useMemo(
    () => [
      firstSubstep,
      secondSubstep,
      thirdSubstep,
      fourthSubstep,
      fifthSubstep,
    ],
    []
  );

  const params = new URLSearchParams(useLocation().search);

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
      history.push(`/profile/wizard/${parseInt(stepNumber, 10) + 1}`);
    }
  };

  const handleScroll = (ref) => {
    window.scrollTo({
      left: 0,
      top: ref?.offsetTop,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleScroll(refs[currentSubStep - 1].current);
    setAutoSaved(false);
  }, [currentSubStep, refs, disabled, setAutoSaved]);

  const triggerPreviousStep = () => {
    if (parseInt(stepNumber, 10) > 1) {
      history.push(`/profile/wizard/${parseInt(stepNumber, 10) - 1}`);
    }
  };

  const jumpToStep = (stepNumber) => {
    setDisabled(false);
    history.push(`/profile/wizard/${parseInt(stepNumber, 10)}`);
  };

  const handleSubStepQueryParams = () => {
    const subStep = params.get("subStep") ?? 1;
    setCurrentSubStep(parseInt(subStep));
  };

  const updateUserProfile = async (data) => {
    const res = await API.graphql(
      graphqlOperation(updateUser, { input: data })
    );

    if (res.data.updateUser) {
      // Should result in setUser() in useEffect() being invoked too
      dispatchUserUpdated(res.data.updateUser);
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

  const saveAttributes = async (attributes, auto = false) => {
    if (!auto) setSavingChanges(true);
    const attributesToUpdate = {
      id: user.id,
      ...attributes,
    };
    try {
      await updateUserProfile(attributesToUpdate);
      setAutoSaved(auto);
    } catch (error) {
      console.log("Error when updating profile info", error);
    } finally {
      setSavingChanges(false);
    }
  };

  const dispatchUserUpdated = (user) => {
    dispatch({
      type: GLOBAL_AUTH_ACTION_TYPES.USER_UPDATED,
      user,
    });
  };

  const currentStep = parseInt(stepNumber, 10);

  if (!user) return null;

  const stepNames = [`Stack and skills`, `Professional Profile`, `Experience`];

  const activeStepComponent = [
    <StackAndSkills
      user={user}
      handleSubStepQueryParams={handleSubStepQueryParams}
      currentSubStep={currentSubStep}
      setDisabled={setDisabled}
      saveAttributes={saveAttributes}
      refs={refs}
      setAutoSaved={setAutoSaved}
      dispatchUserUpdated={dispatchUserUpdated}
    />,
    <ProfessionalProfile
      user={user}
      handleSubStepQueryParams={handleSubStepQueryParams}
      currentSubStep={currentSubStep}
      refs={refs}
      saveAttributes={saveAttributes}
      nextStep={triggerNextStep}
      setDisabled={setDisabled}
    />,
    <Experience user={user} saveAttributes={saveAttributes} />,
  ];

  const getSubstepColor = (step, index) => {
    if (isCompletedStep(step)) return "bg-functionalSuccess";
    if (index <= currentSubStep && isActiveStep(step))
      return "bg-brandTerciary";
    return "bg-grey-300";
  };

  const handleClickBack = () => {
    if (stepNumber === "2" && currentSubStep > 4) {
      // If user have jumped to the picture step, go back to ratePerHour substep
      setCurrentSubStep(3);
    } else if (currentSubStep > 1) setCurrentSubStep(currentSubStep - 1);
    else {
      triggerPreviousStep();
      setCurrentSubStep(1);
    }
  };

  const handleNextStep = () => {
    setDisabled(false);
    if (currentStep === 3) {
      localStorage.setItem("profileCompletion", "skipped");
      history.push("/dashboard");
    } else if (currentSubStep < 4) {
      setCurrentSubStep(currentSubStep + 1);
    } else {
      triggerNextStep();
      setCurrentSubStep(1);
    }
  };

  const handleClick = () => {
    localStorage.setItem("profileCompletion", "skipped");
  };

  return (
    <>
      <div className="compact-text container-large mt-[4vh]">
        <div className="flex justify-between items-baseline mb-[5vh]">
          <Link
            alt="link to dashboard if logged in or home if logged out"
            to="/dashboard"
            onClick={handleClick}
          >
            <Logo />
          </Link>
          <Link
            className="b3 text-brandSecondary"
            alt="I'll complete this later"
            to="/dashboard"
            onClick={handleClick}
          >
            I'll complete this later
          </Link>
        </div>

        <div className="relative mb-[4vh] sm:px-7 sm:w-[620px] sm:mx-auto mx-4 top-[-1.66rem]">
          <div className="flex items-center relative bg-white">
            {stepNames.map((step, index) => (
              <div className="contents" key={index}>
                <ProgressTick
                  key={index}
                  number={index + 1}
                  text={step}
                  success={isCompletedStep(index + 1)}
                  current={isActiveStep(index + 1)}
                  jumpToStep={() => {
                    jumpToStep(index + 1);
                    setCurrentSubStep(1);
                  }}
                />
                {index < 2 &&
                  [...Array(4)].map((e, i) => (
                    <div
                      key={i}
                      className={`h-[2px] ${
                        i < 3 && "mr-1"
                      } w-[55px] ${getSubstepColor(index + 1, i + 1)}`}
                    />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      {activeStepComponent[currentStep - 1]}
      <Footer
        finalStep={currentStep === 3}
        savingChanges={savingChanges}
        onNext={handleNextStep}
        onSkip={handleNextStep}
        disabled={disabled}
        onBack={handleClickBack}
        showBackBtn={!(currentStep === 1 && currentSubStep === 1)}
        autoSaved={autoSaved}
      />
    </>
  );
}

export default Wizard;
