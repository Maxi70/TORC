import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { useLocation, Link, useParams, Redirect } from "react-router-dom";
import { API, graphqlOperation, Auth } from "aws-amplify";
import MarkdownIt from "markdown-it";
import underline from "markdown-it-plugin-underline";
import dayjs from "dayjs";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { ReactComponent as ShareIcon } from "images/socialShare/Share_icon.svg";
import { ReactComponent as ShareIconHover } from "images/socialShare/Share_icon_hover.svg";
import { ReactComponent as ShareIconCopied } from "images/socialShare/Share_icon_copied.svg";
import { ReactComponent as Pencil } from "images/new/pencil.svg";
import { ReactComponent as Plus } from "images/new/plus.svg";
import { ReactComponent as FeedBackIcon } from "images/Feedback_icon.svg";
import { ReactComponent as FeedbackHoverIcon } from "images/Feedback_icon_after.svg";
import { ReactComponent as JobsBackground } from "images/Jobs_background.svg";
import classNames from "classnames";
import { sortBy } from "lodash";

import {
  JOB_OPPORTUNITY_STATUSES,
  JOB_APPLICATION_MATCH_STATUS,
  GLOBAL_AUTH_ACTION_TYPES,
  SOCIAL_LINK_TYPES,
  SOCIALLINKS,
  NOTE_TYPES,
} from "lookup";

import { getMatchesAndApplications } from "../util/api";
import { getJobDuration } from "helpers/utils";
import { createMatch, updateMatch } from "graphql/mutations";
import { updateUser } from "graphql/mutations";
import { useAuth, useAuthDispatch } from "GlobalAuthContext";

import Header from "components/Header";
import Button from "components/FormComponents/Button";
import Footer from "components/Footer";
import Input from "components/FormComponentsNew/Input";
import Modal from "components/Modal";
import NotInterestedInJob from "./NotInterested";

import RateSlider from "components/FormInputs/RateSlider";
import Skills from "pages/Profile/Wizard/StackAndSkills/Skills";
import Phone from "components/FormInputs/Phone";
import DefaultInput from "components/FormInputs/DefaultInput";
import { yupResolver } from "@hookform/resolvers/yup";
import Textarea from "components/FormComponentsNew/Textarea";
import Checkbox from "components/FormComponentsNew/Checkbox";
import PrimaryBtn from "components/buttons/Primary";
import { SKILL_EXPERIENCE } from "utils/skills";
import { SkillsModal } from "pages/Profile/Wizard/StackAndSkills/Skills/SkillsModal";
import Error from "components/FormComponentsNew/Error";
import ScheduleLinkButton from "components/Scheduler/ScheduleLinkButton";
import ScheduleEditButton from "components/Scheduler/ScheduleEditButton";
import {
  getFreelancerJobOpportunity,
  getJobType,
  listJobReferralsByJobOpportunity,
} from "graphql/queries";
import NotesWrapper from "components/Notes";
import { InformationCard } from "./InformationCard";

const mdParser = new MarkdownIt().use(underline);

const isRejected = (status) => {
  return (
    status === JOB_APPLICATION_MATCH_STATUS.PASSEDON ||
    status === JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER
  );
};

const MatchedJob = () => {
  const SCHEDULER_ENABLED = process.env.REACT_APP_NYLAS_INTEGRATION
    ? JSON.parse(process.env.REACT_APP_NYLAS_INTEGRATION).isEnabled
    : false;
  const NYLAS_GOOGLE_ONLY =
    process.env.REACT_APP_COGNITO_GROUP_NYLAS_GOOGLE_ONLY;

  const COGNITO_GROUP_PROFESSIONAL_COMMUNITY =
    process.env.REACT_APP_COGNITO_GROUP_PROFESSIONAL_COMMUNITY;
  const location = useLocation();
  const { id } = useParams();
  const auth = useAuth();
  const dispatch = useAuthDispatch();
  const applicationRef = useRef();
  const linkCalendarRef = useRef();
  const [userSkills, setUserSkills] = useState([]);
  const [skillSelected, setSkillSelected] = useState(false);
  const [jobOppSkills, setJobOppSkills] = useState([]);

  const [jobOpp, setJobOpp] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [match, setMatch] = useState(null);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const [notInterested, setNotInterested] = useState(false);
  const [shouldLinkCalendar, setShouldLinkCalendar] = useState(true);

  const [userStartDate, setUserStartDate] = useState(match?.availableStartDate);
  const [userRange, setUserRange] = useState();
  const [freelancerPitch, setFreelancerPitch] = useState("");
  const [updateUsersRange, setUpdateUsersRange] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [cognitoGroups, setCognitoGroups] = useState([]);
  const [isReferral, setIsReferral] = useState(false);
  const [jobTypeActive, setJobTypeActive] = useState(true);
  const [jobTypeName, setJobTypeName] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [applicationId, setApplicationId] = useState();

  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const handleScroll = (ref) => {
    window.scrollTo({
      left: 0,
      top: ref?.offsetTop,
      behavior: "smooth",
    });
  };

  const isUserNylasGoogleOnly = useCallback(() => {
    return cognitoGroups.includes(NYLAS_GOOGLE_ONLY);
  }, [cognitoGroups, NYLAS_GOOGLE_ONLY]);

  const isProfessionalCommunity = useMemo(() => {
    return cognitoGroups.includes(COGNITO_GROUP_PROFESSIONAL_COMMUNITY);
  }, [cognitoGroups, COGNITO_GROUP_PROFESSIONAL_COMMUNITY]);

  const methods = useForm({
    resolver: yupResolver({
      rate: Yup.string().required("Select range"),
    }),
    defaultValues: {
      rate: userRange,
      startDate: userStartDate,
      freelancerPitch,
      whatsAppAllowed: auth?.user.phone?.whatsAppAllowed,
    },
  });

  const { setValue, getFieldState, control, getValues } = methods;

  useEffect(() => {
    if (!jobOpp?.id) return;
    (async () => {
      try {
        const { data } = await API.graphql(
          graphqlOperation(listJobReferralsByJobOpportunity, {
            jobOpportunityId: jobOpp?.id,
            userId: {
              eq: auth.user.id,
            },
          })
        );
        if (data?.listJobReferralsByJobOpportunity?.items?.length > 0)
          setIsReferral(true);
      } catch (error) {
        console.error("Error fetching users by company:", error);
      }
    })();
  }, [auth, jobOpp]);

  useEffect(() => {
    const isEditable = !(
      match?.status !== JOB_APPLICATION_MATCH_STATUS.MATCHED
    );

    setIsReadOnly(!isEditable);
  }, [match]);

  useEffect(() => {
    (async () => {
      try {
        const session = await Auth.currentSession();

        const groups = session.getAccessToken().payload["cognito:groups"] || [];

        setCognitoGroups(groups);
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();

    if (jobOpp) {
      document.title = `Match for ${jobOpp.id} - ${auth.user.username} `;
      setUserSkills(
        auth.user.skills
          ?.filter((skill) =>
            jobOpp.skills.every((jobSkill) => jobSkill.name !== skill.name)
          )
          .sort((a, b) =>
            a.experience && b.experience
              ? (b.experience || 0) - (a.experience || 0)
              : !b.experience - !a.experience
          ) || []
      );

      const mappedJobSkills = jobOpp.skills.map((skill) => {
        const jobSkill = auth?.user?.skills?.find((s) => s.name === skill.name);
        return {
          ...skill,
          hasJobSkill: !!jobSkill,
          experience: jobSkill?.experience,
        };
      });

      const sortedJobSkills = sortBy(mappedJobSkills, [
        ({ hasJobSkill, experience }) => {
          return hasJobSkill && !experience ? -1 : 1;
        },
        ({ experience }) => {
          return experience ? -1 : 1;
        },
      ]);
      setJobOppSkills(sortedJobSkills);

      if (params.get("success") === "true" && !hasScrolled) {
        setHasScrolled(true);
        handleScroll(applicationRef.current);
      }

      if (params.get("error")) {
        handleScroll(linkCalendarRef.current);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobOpp, auth]);

  const getCombinedPrefillPitch = (str1, str2) => {
    return `${str1 || ""}${
      str2 && str1 ? `\n\n${str2 || ""}` : `${str2 || ""}`
    }`;
  };

  const getMatchAndApplications = async () => {
    const { matches, applications } = await getMatchesAndApplications(
      auth.user.id,
      setError
    );

    return {
      match: filterJob(matches, id) || null,
      applications: applications,
    };
  };

  const getFreelancerJobOpp = async () => {
    const res = await API.graphql(
      graphqlOperation(getFreelancerJobOpportunity, { id: id })
    );
    return res.data.getJobOpportunity;
  };

  const getJobData = async (jobTypeId) => {
    const { data } = await API.graphql({
      query: getJobType,
      variables: { id: jobTypeId },
    });
    return data?.getJobType;
  };

  useEffect(() => {
    (async () => {
      const job = location?.state?.job ?? null;
      const match = location?.state?.match ?? null;

      let preferredRate =
        match?.rate?.value ||
        auth.user.ratePerHour?.value ||
        job?.minRate?.value ||
        0;

      let availableStartDate =
        getValues("startDate") ??
        (match?.availableStartDate
          ? dayjs(match.availableStartDate).format("YYYY-MM-DD")
          : job?.startDate);

      let pitch =
        match?.freelancerPitch ||
        getCombinedPrefillPitch(
          job?.freelancerPitchPrefill,
          match?.freelancerPitchPrefill
        );
      if (job) {
        document.title = `Match for ${job?.id} - ${auth.user.username} `;

        setMatch(match);
        setJobOpp(job);
      } else if (auth.user.id) {
        //Fetch a match record for the current user and the job opp
        const { match, applications } = await getMatchAndApplications();
        let job;
        if (!match) {
          //If it is not found, fetch the application for the job type associated with the job opp
          job = await getFreelancerJobOpp();
          if (!job) setNotFound(true);
          else {
            const applicationJobTypeActive = applications?.find(
              (item) => item.jobTypeId === job.jobTypeId && !item.isNotActive
            );
            if (!applicationJobTypeActive) {
              //If that is also not found, finally fetch the details of the job type associated with the job opp.
              const jobType = await getJobData(job.jobTypeId);
              setJobTypeActive(false);
              setJobTypeName(jobType?.title);
            } else setApplicationId(applicationJobTypeActive?.id);
          }
        } else {
          job = match.jobOpportunity;
        }

        preferredRate =
          match?.rate?.value ||
          auth.user.ratePerHour?.value ||
          job?.minRate?.value ||
          0;

        availableStartDate =
          getValues("startDate") ??
          (match?.availableStartDate
            ? dayjs(match.availableStartDate).format("YYYY-MM-DD")
            : job?.startDate);

        pitch =
          match?.freelancerPitch ||
          getCombinedPrefillPitch(
            job?.freelancerPitchPrefill,
            match?.freelancerPitchPrefill
          );

        setMatch(match);
        setJobOpp(job);
      }

      setUserRange({ ratePerHour: { value: preferredRate, currency: "USD" } });
      setUserStartDate(availableStartDate);

      setValue("rate", preferredRate);
      setValue("startDate", availableStartDate);

      if (!freelancerPitch) {
        setFreelancerPitch(pitch);
        setValue("freelancerPitch", pitch);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location, id, auth]);

  const updateSocialLinks = (key, value) => {
    const newValue = (auth.user?.socialLinks || []).filter(
      (el) => el.type !== key
    );
    if (value.length > 0) newValue.push({ type: key, value });
    saveAttributes({ socialLinks: newValue }, true);
  };

  const isPhoneValid = (phone) => phone?.match(/\d/g)?.length >= 7;

  const updatePhone = (key, value) => {
    if (!isPhoneValid(value)) return;
    saveAttributes({ phone: { ...auth.user.phone, [key]: value } }, true);
  };

  const handleBlur = ({ target }) => {
    const key = target.id;
    const value = target.value !== "" ? target.value.trim() : target.value;
    if (
      getFieldState(key).error ||
      key === "" ||
      key === "freelancerPitch" ||
      key === "startDate"
    )
      return;
    if (key === SOCIALLINKS.LINKEDIN.key)
      return updateSocialLinks(key, value.trim());
    if (key === "usersRange") return setUpdateUsersRange((value) => !value);
    if (key === "phone") return updatePhone("number", value);
    if (key === "whatsAppAllowed") return updatePhone(key, target.checked);
    saveAttributes({ [key]: value }, true);
  };

  const applyToMatchedJob = async (status) => {
    if (!match) return;

    setLoading(true);

    const basePrefillPitch = getCombinedPrefillPitch(
      jobOpp?.freelancerPitchPrefill,
      match?.freelancerPitchPrefill
    );

    if (
      (jobOpp?.freelancerPitchPrefill || match?.freelancerPitchPrefill) &&
      freelancerPitch === basePrefillPitch
    ) {
      setErrors((prev) => ({
        ...prev,
        freelancerPitch: { message: "Please answer the requested questions" },
      }));
      setLoading(false);
      return;
    }

    try {
      if (updateUsersRange) saveAttributes({ ...userRange });

      const params = {
        input: {
          applicationId: match.applicationId,
          jobOpportunityId: match.jobOpportunityId,
          status: status,
          availableStartDate: dayjs(userStartDate),
          freelancerPitch,
          rate: userRange?.ratePerHour,
        },
      };

      await API.graphql(graphqlOperation(updateMatch, params)).then((_data) => {
        setApplied(true);
        setLoading(false);
        setMatch((prev) => {
          return { ...prev, status: "APPLIED" };
        });
      });
    } catch (error) {
      console.error("applyToMatchedJob error: ", error);
    } finally {
      setErrors({});
      setLoading(false);
    }
  };

  const callCreateMatch = async (params) => {
    setLoading(true);

    try {
      await API.graphql(graphqlOperation(createMatch, params)).then((_data) => {
        setApplied(true);
        setMatch(_data?.data?.createMatch);
      });
    } catch (error) {
      console.error("create match error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInterested = async () => {
    const params = {
      input: {
        applicationId: applicationId,
        jobOpportunityId: jobOpp.id,
        status: JOB_APPLICATION_MATCH_STATUS.INTERESTED,
      },
    };
    callCreateMatch(params);
  };

  const handleInterestedFasttrack = async () => {
    if (updateUsersRange) saveAttributes({ ...userRange });
    const params = {
      input: {
        applicationId: applicationId,
        jobOpportunityId: jobOpp.id,
        status: JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK,
        availableStartDate: dayjs(userStartDate),
        rate: userRange?.ratePerHour,
      },
    };
    callCreateMatch(params);
  };

  const dispatchUserUpdated = (user) => {
    dispatch({
      type: GLOBAL_AUTH_ACTION_TYPES.USER_UPDATED,
      user,
    });
  };

  const updateUserProfile = async (data) => {
    const res = await API.graphql(
      graphqlOperation(updateUser, { input: data })
    );

    if (res.data.updateUser) {
      // Should result in setUser() in useEffect() being invoked too
      const data = { ...auth.user, ...res.data.updateUser };
      dispatchUserUpdated(data);
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

  const saveAttributes = async (attributes) => {
    setLoading(true);
    const attributesToUpdate = {
      id: auth.user.id,
      ...attributes,
    };
    try {
      await updateUserProfile(attributesToUpdate);
    } catch (error) {
      console.log("Error when updating profile info", error);
    }
    setLoading(false);
  };

  if (notFound) {
    return <Redirect to="/NotFound" />;
  }

  const renderDate = (date) => {
    if (!date) {
      return;
    }
    const startDate = Number(date.split("-").join(""));
    const nowDate = Number(
      dayjs(Date.now()).format("YYYY MM DD").split(" ").join("")
    );

    if (startDate - nowDate > 0) {
      return dayjs(date).format("MM DD YYYY").split(" ").join("/");
    } else {
      return "Immediately";
    }
  };

  const selectUserSkillExperience = (exp) =>
    setSkillSelected({ ...skillSelected, experience: exp });

  const handleOnCancel = () => {
    setSkillSelected(undefined);
  };

  const handleOnSubmit = () => {
    const userSkillsUpdated = auth.user.skills ? [...auth.user.skills] : [];

    const index = userSkillsUpdated.findIndex(
      (s) => s.name === skillSelected.name
    );
    if (index === -1) userSkillsUpdated.push(skillSelected);
    else userSkillsUpdated[index] = skillSelected;

    setUserSkills(userSkillsUpdated);
    setSkillSelected(undefined);
    const skillsToUpdate = userSkillsUpdated.map((skill) => {
      delete skill.hasJobSkill;
      return skill;
    });
    saveAttributes({ skills: skillsToUpdate }, true);
  };

  const calculateRows = () => {
    const rows = freelancerPitch?.split("\n").length;
    return rows > 1 ? rows + 1 : 4;
  };

  const handleOnClickCopyLink = () => {
    if (isCopied) return;
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
    navigator.clipboard.writeText(
      `${window.location.origin}/#/j/${encodeURIComponent(
        id
      )}/${encodeURIComponent(auth.user.referralCode)}/cp`
    );
  };

  const isJobPrivileged = () => {
    return isProfessionalCommunity || isReferral;
  };

  const hasShownInterest = () => {
    return (
      match?.status === JOB_APPLICATION_MATCH_STATUS.INTERESTED ||
      match?.status === JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK
    );
  };

  const isMatched = () => {
    return match?.status === JOB_APPLICATION_MATCH_STATUS.MATCHED;
  };

  return (
    <div>
      <Header />
      {error && <div>something went wrong, please try again</div>}
      {notInterested && (
        <Modal onClose={() => setNotInterested(false)}>
          <NotInterestedInJob
            onClose={() => setNotInterested(false)}
            match={match}
            job={jobOpp}
          />
        </Modal>
      )}
      {jobOpp ? (
        <>
          <div className="relative w-full">
            <div class="flex items-center max-w-5xl mx-auto">
              <svg
                class="h-auto pt-8"
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="6"
                viewBox="0 0 33 6"
                fill="none"
              >
                <path
                  d="M0.75 2.90625L5.75 5.793V0.0194986L0.75 2.90625ZM32.75 2.40625L5.25 2.40625V3.40625L32.75 3.40625V2.40625Z"
                  fill="#202021"
                />
              </svg>
              <Link
                className="font-rubik font-semibold pl-[16px] pt-8"
                to="/jobs/matches"
              >
                Go Back
              </Link>
            </div>
            <div className="flex justify-between items-center md:gap-6 max-w-5xl mx-auto py-12 pr-4">
              <h1 className="text-4xl font-nexa font-bold mb-2">
                {jobOpp.title}
              </h1>
            </div>
            {isJobPrivileged() && !isReferral && (
              <div class="absolute justify-center p-10 flex md:flex-col md:justify-center inset-y-0 right-0">
                <div
                  className="flex items-center relative h-80"
                  onClick={() => handleOnClickCopyLink()}
                >
                  {isCopied ? (
                    <div className="flex relative w-auto h-10">
                      <ShareIconCopied
                        title="Link Copied!"
                        className="absolute mb-2 ml-4 h-10 w-10 z-10"
                      ></ShareIconCopied>
                    </div>
                  ) : (
                    <div className="flex relative w-auto h-10">
                      <ShareIcon
                        className="absolute mb-2 ml-4 h-10 w-10 cursor-pointer hover:opacity-0 z-10"
                        title="Click to Copy Link"
                      />
                      <ShareIconHover
                        className="absolute mb-2 ml-4 h-10 w-10 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out z-20"
                        title="Click to Copy Link"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <NotesWrapper
                    jobOpportunityId={id}
                    noteType={NOTE_TYPES.JOBFEEDBACK}
                    className={"!text-gray-900 w-[100px]"}
                    title={"We Value Your Voice!"}
                    subTitle={"Share Your Feedback About This Job"}
                    Icon={() => {
                      return (
                        <div className="flex relative w-auto h-10">
                          <FeedBackIcon
                            className="absolute inset-0 w-14 h-12 cursor-pointer object-cover hover:opacity-0 z-10"
                            src="images/Feedback_icon.svg"
                            title="Give Us Feedback"
                          />
                          <FeedbackHoverIcon
                            className="absolute inset-0 w-14 h-12 cursor-pointer object-cover opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out z-20"
                            src="images/Feedback_icon_after.svg"
                            title="Give Us Feedback"
                          />
                        </div>
                      );
                    }}
                  />
                </div>
                <div></div>
              </div>
            )}
          </div>
          <hr className="border border-black" />
          <div className="max-w-5xl mx-auto grid grid-cols-2 flex-col md:flex-row">
            {isJobPrivileged() || isMatched() ? (
              <>
                <div className="border-r-2 border-black">
                  <div className="px-8 py-12 w-full">
                    <div className="text-electricBlue font-nexa text-xl mb-4">
                      Job Details
                    </div>
                    <div className="text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
                      <p>
                        {getJobDuration(
                          jobOpp.jobLength,
                          jobOpp.jobLengthInWeeks
                        )}
                      </p>
                      <p>
                        Start Date:{" "}
                        {jobOpp?.startDate && renderDate(jobOpp.startDate)}
                      </p>
                      <p>Timezone: {jobOpp.timezone?.label}</p>
                      <p>
                        Timezone overlap:{" "}
                        {jobOpp.timeOverlap > 1 && jobOpp.timeOverlap < 8
                          ? `${jobOpp.timeOverlap} hours`
                          : jobOpp.timeOverlap >= 8
                          ? "All hours"
                          : "No Restriction"}
                      </p>
                    </div>
                  </div>
                  {isJobPrivileged() && !isReferral && (
                    <div className="relative justify-center items-center">
                      <JobsBackground className="flex absolute w-full h-auto justify-center items-center z-10" />
                      <div className="flex relative items-center text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
                        <p className="pr-16 py-12 w-3/4 text-left text-lg">
                          Don't forget - share this job and potentially get a
                          $500 dollar referral bonus for yourself and a $250
                          bonus for your friend (if hired)!
                        </p>
                        <div
                          onClick={() => handleOnClickCopyLink()}
                          className="flex flex-col justify-center items-center relative"
                        >
                          {isCopied ? (
                            <div className="flex relative w-auto h-10">
                              <ShareIconCopied
                                title="Link Copied!"
                                className="absolute mb-2 ml-4 h-10 w-10 z-10"
                              ></ShareIconCopied>
                            </div>
                          ) : (
                            <div className="flex relative w-auto h-10">
                              <ShareIcon
                                className="absolute mb-2 ml-4 h-10 w-10 cursor-pointer hover:opacity-0 z-10"
                                title="Click to Copy Link"
                              />
                              <ShareIconHover
                                className="absolute mb-2 ml-4 h-10 w-10 cursor-pointer opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out z-20"
                                title="Click to Copy Link"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex  relative z-20 items-center text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
                        <p className="pr-16 w-3/4 text-left text-lg">
                          We want your feedback on this job posting! See some
                          confusing text? Are we missing anything? Did we get
                          something wrong? Let us know!
                        </p>
                        <NotesWrapper
                          jobOpportunityId={id}
                          noteType={NOTE_TYPES.JOBFEEDBACK}
                          className={"!text-gray-900 w-[100px]"}
                          title={"We Value Your Voice!"}
                          subTitle={"Share Your Feedback About This Job"}
                          Icon={() => {
                            return (
                              <div className="flex relative w-auto h-10">
                                <FeedBackIcon
                                  className="absolute inset-0 w-14 h-12 cursor-pointer object-cover hover:opacity-0 z-10"
                                  src="images/Feedback_icon.svg"
                                  title="Give Us Feedback"
                                />
                                <FeedbackHoverIcon
                                  className="absolute inset-0 w-14 h-12 cursor-pointer object-cover opacity-0 hover:opacity-100 transition-opacity duration-500 ease-in-out z-20"
                                  src="images/Feedback_icon_after.svg"
                                  title="Give Us Feedback"
                                />
                              </div>
                            );
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-12 flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <h4 className="font-rubik-regular text-base italic text-electricBlue font-light">
                      {jobOpp.skills?.map((s) => s.name).join(", ")}
                    </h4>
                  </div>
                  <p
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: mdParser.render(jobOpp.overview),
                    }}
                  />
                  <h3 className="-mb-6 text-lg">Responsibilities</h3>
                  <p
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: mdParser.render(jobOpp.responsibilities),
                    }}
                  />
                  <h3 className="-mb-6 text-lg">Requirements</h3>
                  <p
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: mdParser.render(jobOpp.requirements),
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="px-8 py-12 w-full">
                <div className="text-electricBlue font-nexa text-xl mb-4">
                  Job Details
                </div>
                <div className="text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
                  <p>{jobOpp.shortDescription ?? jobOpp.overview}</p>
                </div>
              </div>
            )}
            {shouldLinkCalendar &&
            SCHEDULER_ENABLED &&
            !isRejected(match?.status) &&
            (isJobPrivileged() || isMatched()) &&
            !auth.user.nylasAccountId &&
            !auth.user.slugScheduler &&
            (match?.status === JOB_APPLICATION_MATCH_STATUS.MATCHED ||
              (!hasShownInterest() &&
                match?.status !== JOB_APPLICATION_MATCH_STATUS.APPLIED)) &&
            !applied ? (
              <div className="col-span-2" ref={linkCalendarRef}>
                <hr className="border-black border w-[100vw] absolute left-0" />
                <div className="flex flex-col items-center mt-8 mb-2">
                  <div>
                    <h3 className="text-lg self-start pt-5">
                      Before you complete your application please link your
                      personal calendar to make interview scheduling a breeze!
                    </h3>
                  </div>
                  <div className="mt-4 pt-5">
                    <ScheduleLinkButton
                      googleOnly={isUserNylasGoogleOnly()}
                      redirectURL={window.location.href}
                      errorMessage={
                        params.get("error") &&
                        "Something went wrong, please try again later."
                      }
                      className={`${params.get("error") ? "!mb-2" : ""}`}
                    />
                  </div>
                  <div className="mb-2">
                    <div className="flex gap-x-2 items-center">
                      <button
                        className="w-[17px] h-[17px] border-2 rounded-xs border-brandSecondary"
                        onClick={(e) =>
                          setShouldLinkCalendar(!shouldLinkCalendar)
                        }
                      />
                      <div className="">not now</div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div ref={applicationRef} className="col-span-2">
                <hr className="border-black border w-[100vw] absolute left-0" />
                {(match?.status === JOB_APPLICATION_MATCH_STATUS.MATCHED ||
                  (isJobPrivileged() &&
                    match?.status !==
                      JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK)) &&
                  !applied &&
                  !isRejected(match?.status) && (
                    <div className="mt-8 mb-8">
                      {SCHEDULER_ENABLED && auth.user.slugScheduler ? (
                        <div className="flex flex-col items-center mt-8 mb-2">
                          <ScheduleEditButton
                            googleOnly={isUserNylasGoogleOnly()}
                          />
                        </div>
                      ) : (
                        shouldLinkCalendar && (
                          <p className="font-nexa font-bold mb-2">
                            Your scheduling page will available shortly.
                          </p>
                        )
                      )}
                      <h3 className="text-lg font-rubik-regular mb-2">
                        Application
                      </h3>

                      <FormProvider {...methods}>
                        <form onBlur={handleBlur}>
                          <div className="text-base font-rubik-bold mt-8 mb-2">
                            Available start date
                          </div>
                          <p className="text-base font-rubik-regular mb-9">
                            If you are hired for this job, what is the earliest
                            date you can begin working?
                          </p>

                          <Input
                            type="date"
                            label="Start date"
                            id="startDate"
                            onChange={(e) => {
                              setUserStartDate(e.target.value);
                            }}
                            isReadOnly={isReadOnly}
                            focusDatePicker
                            classOverrides="w-3/4"
                          />

                          <div className="text-base font-rubik-bold mt-8 mb-2">
                            Hourly rate
                          </div>
                          <p className="text-base font-rubik-regular">
                            Use the slider to indicate your hourly rate in US
                            Dollars (USD) for this job. Your rate for this job
                            can be different than your default rate on your
                            profile.
                          </p>

                          {userRange && (
                            <RateSlider
                              defaultValue={userRange?.ratePerHour?.value}
                              save={setUserRange}
                              control={control}
                            />
                          )}

                          <div className="text-base font-rubik-bold mt-24 mb-4">
                            Skills required for this job
                          </div>
                          <div className="text-base font-rubik mb-8">
                            You must indicate years of experience for each
                            required skill that you have
                          </div>
                          <div className="grid sm:grid-cols-8 grid-cols-4 gap-[52px]">
                            {jobOppSkills.map((skill, index) => (
                              <div
                                key={index}
                                style={{
                                  boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.1)",
                                }}
                                className={classNames(
                                  "relative b5 leading-3 border flex items-center justify-between p-4 text-center gap-2 flex-col rounded-sm border-brandSecondary w-[100px] h-[120px]",
                                  {
                                    "border-red-500":
                                      !skill.experience && skill.hasJobSkill,
                                  }
                                )}
                              >
                                <div className="max-h-[60px] overflow-hidden">
                                  {skill.name}
                                </div>
                                {skill.experience || skill.hasJobSkill ? (
                                  <div
                                    className={classNames(
                                      "flex gap-[2px] items-center cursor-pointer bg-brandPrimary h-[22px] text-[10px] p-2 rounded-xs leading-[18px] tracking-[-0.4px] font-rubik-regular",
                                      {
                                        "border-red-500 border-2":
                                          !skill.experience,
                                      }
                                    )}
                                    onClick={() => setSkillSelected(skill)}
                                  >
                                    {SKILL_EXPERIENCE[skill.experience]
                                      ?.briefLabel || "TBD"}
                                    <Pencil />
                                  </div>
                                ) : (
                                  <div
                                    className="flex gap-[2px] items-center cursor-pointer bg-brandSecondary-300 h-[22px] text-[10px] p-2 rounded-xs leading-[18px] tracking-[-0.4px] font-rubik-regular"
                                    onClick={() => setSkillSelected(skill)}
                                  >
                                    <Plus />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                          {!loading &&
                            jobOppSkills
                              .filter((jobSkill) =>
                                userSkills.some(
                                  (userSkill) =>
                                    userSkill.name === jobSkill.name
                                )
                              )
                              .some(
                                (skill) => skill.experience === undefined
                              ) && (
                              <Error
                                className="mt-4"
                                message="Please select your experience on every skill"
                              />
                            )}
                          <div className="text-base font-rubik-bold mt-16 mb-4">
                            Your other skills
                          </div>
                          <div className="text-base font-rubik mb-8">
                            These are additional skills that may improve your
                            application (optional)
                          </div>
                          <Skills
                            skills={userSkills.filter((skill) =>
                              jobOpp.skills.every(
                                (jobSkill) => jobSkill.name !== skill.name
                              )
                            )}
                            setSkills={setUserSkills}
                            user={auth?.user}
                            showTitle={false}
                            save={saveAttributes}
                          />

                          <div className="w-3/4 mt-24">
                            <Phone user={auth.user} handleChange={handleBlur} />
                          </div>
                          {!isPhoneValid(auth.user.phone?.number) && (
                            <Error
                              className="mt-4"
                              message="Please enter your phone number"
                            />
                          )}

                          <div className="w-3/4 mt-16">
                            <DefaultInput
                              id={SOCIAL_LINK_TYPES.LINKEDIN}
                              label={SOCIALLINKS.LINKEDIN.label}
                              defaultValue={
                                auth.user.socialLinks?.find(
                                  (l) => l.type === SOCIAL_LINK_TYPES.LINKEDIN
                                )?.value
                              }
                              subtext="Username"
                            />
                          </div>
                          {!auth.user.socialLinks?.find(
                            (el) => el.type === "LINKEDIN" && el.value
                          ) && (
                            <Error message="Please enter your linkedin profile" />
                          )}
                          <div className="w-3/4 mt-8 mb-8">
                            {jobOpp?.freelancerPitchPrefill ||
                            match?.freelancerPitchPrefill ? (
                              <div className="text-base font-rubik-bold mt-8 mb-4">
                                Just a few more questions
                              </div>
                            ) : (
                              <>
                                <div className="text-base font-rubik-bold mt-8 mb-2">
                                  Message to customer
                                </div>
                                <p className="text-base font-rubik-regular mb-4">
                                  Is there anything you would like to tell the
                                  customer?
                                </p>
                              </>
                            )}

                            <Textarea
                              id="freelancerPitch"
                              value={freelancerPitch}
                              rows={calculateRows()}
                              onChange={(e) => {
                                if (
                                  freelancerPitch !== e.target.value &&
                                  errors.freelancerPitch?.message
                                ) {
                                  setErrors((prev) => ({
                                    ...prev,
                                    freelancerPitch: { message: "" },
                                  }));
                                }
                                setFreelancerPitch(e.target.value);
                              }}
                              isReadOnly={isReadOnly}
                            />
                            <p className="text-red-500">
                              {errors.freelancerPitch?.message}
                            </p>
                          </div>
                          {isMatched() && (
                            <div
                              className="flex relative items-center"
                              onChange={handleBlur}
                            >
                              <Checkbox
                                id="usersRange"
                                label="Contact Me via WhatsApp. The team will reach out to you on WhatsApp for new job postings and status updateson existing job applications"
                              />
                              <div className="ml-4">
                                <div className="b3">
                                  Check the box to update your default rate on
                                  your profile to match this job rate. Torc uses
                                  your default rate to match you with future
                                  opportunities.
                                </div>
                              </div>
                            </div>
                          )}
                        </form>
                      </FormProvider>
                    </div>
                  )}
                {(match?.status === JOB_APPLICATION_MATCH_STATUS.APPLIED ||
                  match?.status === JOB_APPLICATION_MATCH_STATUS.MOREINFO) &&
                  !applied && (
                    <InformationCard>
                      {`Thank you for applying to the ${jobOpp.title} job. Your profile is in the process of being reviewed and we will be in touch soon.`}
                    </InformationCard>
                  )}
                {match?.status === JOB_APPLICATION_MATCH_STATUS.ACCEPTED && (
                  <InformationCard>
                    {`Congratulations, ${auth.user.given_name}! Your hard work has paid off and you have been selected for this position. If they have not already, one of our Success Managers will be in contact with you for onboarding and next steps.`}
                  </InformationCard>
                )}
                {isRejected(match?.status) && (
                  <InformationCard>
                    Thank you for your interest in the job. Unfortunately, the
                    customer did not select you for this position.
                  </InformationCard>
                )}
                {(applied || hasShownInterest()) && (
                  <InformationCard>
                    Thank you for your interest, we'll be in touch
                    <br />
                    In the meantime, click{" "}
                    <Link className="transition" to="/profile/wizard/1">
                      here
                    </Link>{" "}
                    to make your profile even better!
                  </InformationCard>
                )}
                <div className="flex w-full justify-between mb-8 mt-8">
                  <Link className="transition" to="/jobs/matches">
                    <PrimaryBtn label="Go back" />
                  </Link>

                  {jobOpp.status === JOB_OPPORTUNITY_STATUSES.DRAFT && (
                    <Button bgColor="bg-mustard">Activating...</Button>
                  )}
                  {(isMatched() ||
                    (isJobPrivileged() &&
                      match?.status !==
                        JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK)) &&
                  !isRejected(match?.status) &&
                  match?.status !== JOB_APPLICATION_MATCH_STATUS.APPLIED ? (
                    <PrimaryBtn
                      label="APPLY NOW"
                      loading={loading}
                      disabled={
                        loading ||
                        (isJobPrivileged() &&
                          (!userRange ||
                            !userStartDate ||
                            !isPhoneValid(auth.user.phone?.number) ||
                            !auth.user.socialLinks?.find(
                              (el) => el.type === "LINKEDIN" && el.value
                            ) ||
                            !jobOppSkills
                              ?.filter((jobSkill) => jobSkill.hasJobSkill)
                              .every((jobSkill) => jobSkill.experience))) ||
                        !jobTypeActive
                      }
                      onClick={() => {
                        isJobPrivileged()
                          ? handleInterestedFasttrack()
                          : applyToMatchedJob("APPLIED");
                      }}
                    />
                  ) : (
                    !isJobPrivileged() &&
                    !isRejected(match?.status) &&
                    match?.status !== JOB_APPLICATION_MATCH_STATUS.APPLIED &&
                    match?.status !==
                      JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK &&
                    match?.status !==
                      JOB_APPLICATION_MATCH_STATUS.INTERESTED && (
                      <PrimaryBtn
                        label="I'M INTERESTED"
                        loading={loading}
                        disabled={!jobTypeActive}
                        onClick={() => handleInterested()}
                      />
                    )
                  )}
                </div>
                <div>
                  {!jobTypeActive && (
                    <div className="flex justify-end mb-4">
                      In order to qualify for this job your profile must contain
                      the <b>&nbsp;{jobTypeName}&nbsp;</b> role.
                    </div>
                  )}
                  {match?.status === JOB_APPLICATION_MATCH_STATUS.MATCHED && (
                    <div className="flex justify-end mb-4">
                      <p
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setNotInterested(true)}
                      >
                        Not interested?
                      </p>
                    </div>
                  )}
                </div>
                {match?.status ===
                  JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER && (
                  <InformationCard>
                    Thank you for your feedback. We will use this information to
                    improve future matches.
                  </InformationCard>
                )}
              </div>
            )}
          </div>
        </>
      ) : (
        <div
          className="w-full flex items-center justify-center"
          style={{
            height: "65vh",
          }}
        >
          <span className="loader" />
        </div>
      )}
      <Footer />
      {skillSelected && (
        <SkillsModal
          skill={skillSelected}
          handleSetExperience={selectUserSkillExperience}
          handleOnCancel={handleOnCancel}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
};

export default MatchedJob;

function filterJob(data, id) {
  for (let app of data) {
    if (app?.jobOpportunity?.id === id) {
      return app;
    }
  }
  return null;
}
