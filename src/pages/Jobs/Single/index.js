import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import classNames from "classnames";

import Footer from "components/Footer";
import Header from "components/Header";
import { useAuth } from "GlobalAuthContext";
import { getUser } from "graphql/queries";
import styles from "./JobsSingle.module.css";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";

import gradientDots from "images/gradient-dots.png";
import { API, graphqlOperation } from "aws-amplify";
import { createApplication } from "graphql/mutations";

import { useHistory } from "react-router-dom";
import ProfileCompletionWidget from "components/ProfileCompletionWidget";
import { getJobType } from "graphql/queries";

const JobsSingle = () => {
  const history = useHistory();
  const location = useLocation();
  const [justApplied, setJustApplied] = useState(false);
  const [applied, setApplied] = useState(location?.state?.applied ?? false);
  const [btnStatus, setBtnStatus] = useState(false);
  const [lblApply, setLblApply] = useState("Apply to Job role");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    applyBtn: "",
  });
  const [jobRole, setJobRole] = useState({});
  const { jobId } = useParams();
  const { user } = useAuth();
  const urlParams = useQuery();
  const skillNamesRef = useRef([]);
  const profileCompletion = user?.profileCompletion || 0;
  const {
    minimumScoreToApply = 50,
    disableJobRole = false,
    displayWhenLessthanMinimumScore = true,
  } = JSON.parse(process.env.REACT_APP_COMPLETION_WIDGET_CONFIG ?? "{}");

  const shouldDisplayCompletionWidget = useMemo(() => {
    if (!user) {
      return false;
    }

    if (displayWhenLessthanMinimumScore) {
      return profileCompletion < minimumScoreToApply && !applied;
    }

    return !applied;
  }, [
    displayWhenLessthanMinimumScore,
    profileCompletion,
    minimumScoreToApply,
    applied,
    user,
  ]);

  const isApplyButtonDisabled = useMemo(() => {
    if (
      btnStatus ||
      applied ||
      loading ||
      (disableJobRole && profileCompletion < minimumScoreToApply)
    ) {
      return true;
    }

    return false;
  }, [
    btnStatus,
    applied,
    loading,
    disableJobRole,
    profileCompletion,
    minimumScoreToApply,
  ]);

  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

  useLayoutEffect(() => {
    const id = user?.id ?? null;
    if (!location?.state && id) {
      (async () => {
        const fetchUserData = await API.graphql({
          query: getUser,
          variables: { id },
        });

        for (let app of fetchUserData.data.getUser.applications.items) {
          const appId = app.jobTypeId;

          if (appId === jobId) {
            setBtnStatus(true);
            setApplied(true);
          }
        }
      })();
    }
  }, [jobRole, jobId, location, user]);

  useEffect(() => {
    (async () => {
      let jobRole;
      if (location?.state?.jobRole) {
        jobRole = location?.state?.jobRole;
      } else {
        try {
          const userId = user?.id ?? null;
          const res = await API.graphql({
            query: getJobType,
            variables: { id: jobId },
            authMode: userId ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
          });
          jobRole = res?.data?.getJobType;
          if (!jobRole.id) {
            history.push("/jobs/roles");
            return;
          }
        } catch (err) {
          console.log(err);
          history.push("/jobs/roles");
          return;
        }
      }
      skillNamesRef.current = jobRole.skills?.map((skill) => skill.name);
      document.title = `Torc Job Profile ${jobRole?.title || ""}`;
      setJobRole(jobRole);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function applyToJob(user, title, jobid) {
    const { agreedToTerms, username } = user;

    if (!agreedToTerms || !username) {
      setErrors((prev) => ({
        ...prev,
        applyBtn: (
          <>
            Please provide a username and accept our terms before applying.{" "}
            <Link to="/more-info-needed" className="text-blue-500">
              Follow the link
            </Link>
          </>
        ),
      }));
    } else {
      setLoading(true);
      try {
        await API.graphql(
          graphqlOperation(createApplication, { input: { jobTypeId: jobid } })
        );
        setJustApplied(true);
      } catch (err) {
        console.log("Error when submitting application to db");
        console.log(err);
      }
      const header = {
        "Access-Control-Allow-Origin": "https://hooks.zapier.com",
      };
      try {
        const url = process.env.REACT_APP_APPLY_JOB_ZAPIER_HOOK;
        await fetch(url, {
          method: "post",
          headers: {
            header,
          },
          mode: "no-cors",
          body: JSON.stringify({
            username: user.username,
            firstName: user.given_name,
            lastName: user.family_name,
            email: user.email,
            title: title,
            jobid: jobid,
          }),
        });
        setLblApply("Thank you for applying!");
        setBtnStatus(true);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  }

  function renderApplicationStatus() {
    if (!user) {
      return (
        <div className="prose font-rubik-regular text-gray-800">
          <br />
          <h3>New to Torc?</h3>
          <GetStartedBtn
            label="Sign up for Torc to apply"
            className="text-black"
            uppercase
            hideArrow
            smallButton
            alt="apply"
            onClick={() => history.push(`/signup?type=freelancer&${urlParams}`)}
          />
          <h3>Returning member?</h3>
          <GetStartedBtn
            label="Login in to apply"
            className="text-black"
            uppercase
            hideArrow
            smallButton
            alt="apply"
            onClick={() => history.push(`/login?${urlParams}`)}
          />
        </div>
      );
    } else if (!btnStatus && !applied) {
      return (
        <GetStartedBtn
          label={loading ? "Applying..." : lblApply}
          className={classNames("mt-12 text-black", {
            "animate-pulse": loading,
          })}
          uppercase
          hideArrow
          disabled={isApplyButtonDisabled}
          errorMessage={errors.applyBtn}
          onClick={() => {
            applyToJob(user, jobRole.title, jobRole.id);
          }}
        />
      );
    } else if (justApplied) {
      return (
        <div
          className="flex bg-blue-100 rounded-lg p-4 mb-4 text-blue-700 mt-5 mr-2 max-w-2xl prose"
          role="alert"
        >
          <svg
            className="w-7 h-7 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="font-rubik-regular text-base">
            Thank you for your interest, we'll be in touch
          </div>
        </div>
      );
    } else if (applied) {
      return (
        <div
          className="flex bg-blue-100 rounded-lg p-4 mb-4 text-blue-700 mt-10 mr-2 max-w-2xl prose"
          role="alert"
        >
          <svg
            className="w-7 h-7 inline mr-3"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div className="font-rubik-regular text-base">{`Thank you for already applying to the ${jobRole.title} role. We are actively working to match you to a job!
    Please ensure your profile is up to date to maximize your
    opportunities.`}</div>
        </div>
      );
    }
  }

  return (
    <>
      <Header />
      <div className={classNames(styles.containerWithSidebar, "w-full")}>
        <div className="hidden col-span-1 row-start-2 md:row-start-auto md:flex flex-col items-start justify-start md:mt-36">
          {/* company bio */}
          <div className="prose mx-auto px-12 my-8 w-full">
            <h2>Jobs at Torc</h2>
            <p>
              Torc is here to make finding and applying for jobs simpler,
              faster, and easier. One way we do this is by grouping similar
              types of jobs into a single Job Role (for example, Frontend
              Engineer, Full Stack Engineer, DevOps engineer). By qualifying
              developers for a Job Role, you can then apply to multiple jobs at
              once.
            </p>
            <p>
              To qualify, you’ll have a short phone screening, followed by one
              or more online technical assessments, and you will need a fully
              complete Torc profile. Once you’re qualified for a Job Role, our
              team will begin matching you with specific job opportunities.
              Plus, you’ll have access to all open jobs for that role and can
              apply with a single click.
            </p>
          </div>
          <div
            className={classNames(styles.dividerGradientHorizontal, "w-full")}
          ></div>
          <div className="px-12 mx-auto my-8 w-full prose">
            <div className="text-electricBlue font-nexa text-xl mb-4">
              Job Details
            </div>
            <div className="text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
              <div>{jobRole?.commitment}</div>
              <div>
                {jobRole?.lowEndLength}&ndash;{jobRole?.highEndLength}
              </div>
            </div>
          </div>
          <div
            className={classNames(styles.dividerGradientHorizontal, "w-full")}
          ></div>
          <div className="px-12 mx-auto my-8 w-full prose">
            <div className="text-electricBlue font-nexa text-xl mb-4">
              Validated Skills
            </div>
            <div className="font-nexa  mb-4">
              Torc will validate your skills in the technologies below before
              matching you with the best job for your skill set.
            </div>
            {/* <div className="flex flex-col"> */}
            {skillNamesRef.current?.map((s, i) => (
              <div
                key={i}
                className="w-max my-4 rounded border-black border-2 font-rubik-regular font-bold uppercase text-sm hover:bg-black hover:text-white transition-all py-1.5 px-4"
              >
                {s}
              </div>
            ))}
            {/* </div> */}
          </div>
          <div className="md:block hidden">
            <img src={gradientDots} className="max-w-xs mt-6 mb-12" alt="" />
          </div>
        </div>
        <div
          className={classNames(styles.dividerGradientVertical, "col-span-1")}
        ></div>
        <div className="col-span-1 pt-4 pb-12 ml-8 ">
          <Link
            to="/jobs/roles"
            className="font-rubik-regular font-bold text-base text-black tracking-wide hover:opacity-80 hover:text-black transition ease-in-out py-2 my-8 block"
          >
            &lt; Back to Results
          </Link>
          <h1 className="text-3xl font-bold text-black tracking-wide font-nexa mb-3 md:mt-0 mt-10">
            {jobRole?.displayName}
          </h1>
          <h4 className="font-rubik-regular text-base italic text-electricBlue font-light mb-8">
            {skillNamesRef.current?.join(", ")}
          </h4>
          <div className="prose font-rubik-regular text-gray-800">
            <p>{jobRole?.overview}</p>
            <h3>Responsibilities</h3>
            <ul>
              {jobRole?.responsibilities?.split("\n")?.map((r, i) => (
                <li key={`rs-${i}`}>{r}</li>
              ))}
            </ul>
            <h3>Requirements</h3>
            <ul>
              {jobRole?.requirements?.split("\n")?.map((r, i) => (
                <li key={`rq-${i}`}>{r}</li>
              ))}
            </ul>
          </div>
          <div className="md:hidden col-span-1 row-start-2 flex flex-col-reverse items-start justify-start md:mt-36">
            {/* company bio */}
            <div className="prose my-8 w-full">
              <h2>Jobs at Torc</h2>
              <p>
                Torc is here to make finding and applying for jobs simpler,
                faster, and easier. One way we do this is by grouping similar
                types of jobs into a single Job Role (for example, Frontend
                Engineer, Full Stack Engineer, DevOps engineer). By qualifying
                developers for a Job Role, you can then apply to multiple jobs
                at once.
              </p>
              <p>
                To qualify, you’ll have a short phone screening, followed by one
                or more online technical assessments, and you will need a fully
                complete Torc profile. Once you’re qualified for a Job Role, our
                team will begin matching you with specific job opportunities.
                Plus, you’ll have access to all open jobs for that role and can
                apply with a single click.
              </p>
            </div>
            <div
              className={classNames(styles.dividerGradientHorizontal, "w-full")}
            ></div>
            <div className="my-8 w-full prose">
              <div className="text-electricBlue font-nexa text-xl mb-4">
                Job Details
              </div>
              <div className="text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
                <div>{jobRole?.commitment}</div>
                <div>
                  {jobRole?.lowEndLength}&ndash;{jobRole?.highEndLength}
                </div>
              </div>
            </div>
            <div
              className={classNames(styles.dividerGradientHorizontal, "w-full")}
            ></div>
            <div className="my-8 w-full prose">
              <div className="text-electricBlue font-nexa text-xl mb-4">
                Validated Skills
              </div>
              <div className="font-nexa mb-4">
                Torc will validate your skills in the technologies below before
                matching you with the best job for your skill set.
              </div>
              {/* <div className="flex flex-col"> */}
              {skillNamesRef.current?.map((s, i) => (
                <div
                  key={i}
                  className="w-max my-4 rounded border-black border-2 font-rubik-regular font-bold uppercase text-sm hover:bg-black hover:text-white transition-all py-1.5 px-4"
                >
                  {s}
                </div>
              ))}
              {/* </div> */}
            </div>
            <div className="md:block hidden">
              <img src={gradientDots} className="max-w-xs mt-6 mb-12" alt="" />
            </div>
          </div>

          {shouldDisplayCompletionWidget && (
            <div className="mt-6 mr-2 max-w-2xl">
              <ProfileCompletionWidget />
            </div>
          )}

          <div>{renderApplicationStatus()}</div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default JobsSingle;
