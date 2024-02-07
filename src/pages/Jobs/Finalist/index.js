import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API, Auth, graphqlOperation } from "aws-amplify";
import { useAuth } from "GlobalAuthContext";
import classNames from "classnames";
import Modal from "components/Modal";
import { isEqual, cloneDeep } from "lodash";
import {
  getJobOpportunityAndItsMatchCalibrations,
  getJobOpportunityAndItsMatchFinalists,
  getJobOpportunityEvents,
  getJobOpportunityMatchesFinalists,
  listMatchNotes,
} from "graphql/queries";

import Footer from "components/Footer";
import Header from "components/Header";
import Candidates from "./Candidates";
import CandidateProfile from "./CandidateProfile";
import { FINALIST_VIEW_MODES, NOTE_TYPES } from "lookup";
import CandidateGridView from "./GridView";
import { addMatchFieldHistoryToMatch } from "utils/matchFieldHistory";
import { sleep } from "utils/general";
import DenyApplicant from "../ApplicantReview/ApplicantModal/denyModal";
import AcceptModal from "../ApplicantReview/ApplicantModal/AcceptModal";
import SchedulerModal from "../ApplicantReview/ApplicantModal/SchedulerModal";
import RatingReasonsModal from "components/RatingReasonsModal";

export default function Finalists({ isCalibration }) {
  const { jobId } = useParams();

  const [modalDisplayed, setModalDisplay] = useState(null);
  const [loadingJobOpp, setLoadingJobOpp] = useState(true);
  const [jobOpp, setJobOpp] = useState({});
  const [jobOppEvents, setJobOppEvents] = useState(null);

  const [candidateSelected, setCandidateSelected] = useState();
  const [cognitoGroups, setCognitoGroups] = useState([]);

  const [mode, setMode] = useState(FINALIST_VIEW_MODES.LISTVIEW);
  const [interValObj, setIntervalObj] = useState({ timer: null });

  const gridViewRef = useRef(null);
  const auth = useAuth();

  const loadJobOpportunityMatches = async (nextToken = null) => {
    const response = await API.graphql(
      graphqlOperation(getJobOpportunityMatchesFinalists, {
        id: jobId,
        nextToken,
      })
    );
    const matches = response.data.getJobOpportunity.matches;

    if (matches.nextToken) {
      await sleep(250);
      const matchesNextPortions = await loadJobOpportunityMatches(
        matches.nextToken
      );

      return [...matches.items, ...matchesNextPortions];
    }

    return matches.items;
  };

  const loadJobOpportunity = async () => {
    const query = !isCalibration
      ? getJobOpportunityAndItsMatchFinalists
      : getJobOpportunityAndItsMatchCalibrations;
    const response = await API.graphql(graphqlOperation(query, { id: jobId }));
    const matches = response.data.getJobOpportunity.matches;

    if (matches.nextToken) {
      await sleep(250);
      const matchesNextPortions = await loadJobOpportunityMatches(
        matches.nextToken
      );

      matches.items.push(...matchesNextPortions);
    }
    return response;
  };

  const fetchJobCalendarEvents = async () => {
    const { data } = await API.graphql(
      graphqlOperation(getJobOpportunityEvents, { id: jobId })
    );

    return data.getJobOpportunityEvents;
  };

  const reFreshCalendarEvents = async () => {
    const events = await fetchJobCalendarEvents();
    setJobOppEvents(events);
    return events;
  };

  useEffect(() => {
    let isMounted = true;
    document.title = `Applications Review - ${jobId}`;

    (async () => {
      const response = await loadJobOpportunity();

      const events = await fetchJobCalendarEvents();

      if (isMounted) {
        setJobOppEvents(events);

        const tempJobOpp = response.data.getJobOpportunity;
        tempJobOpp.matches.items = await addMatchFieldHistoryToMatch(
          tempJobOpp.matches.items
        );

        for (const match of tempJobOpp.matches.items) {
          const noteResp = await API.graphql(
            graphqlOperation(listMatchNotes, {
              applicationId: match.applicationId,
              jobOpportunityId: { eq: jobId },
            })
          );

          const { compare } = Intl.Collator("en-US");

          const sortedNotes = (noteResp.data.listMatchNotes.items || [])
            .filter(
              ({ noteType, creator }) =>
                noteType === NOTE_TYPES.CALIBRATION &&
                creator !== auth?.user.username
            )
            .sort((a, b) => compare(b.createdAt, a.createdAt));
          match.calibrationNote = sortedNotes[0];
        }

        setJobOpp(tempJobOpp);
        setCandidateSelected(tempJobOpp.matches.items[0]);

        setLoadingJobOpp(false);
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  // Fetch groups the logged in user belongs to
  useEffect(() => {
    (async () => {
      try {
        const auth = await Auth.currentSession();

        const groups = auth.getAccessToken().payload["cognito:groups"] || [];

        setCognitoGroups(groups);
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();
  }, []);

  const handleTimeoutInterval = async () => {
    const pastEvents = cloneDeep(jobOppEvents);
    const events = await reFreshCalendarEvents();
    if (!isEqual(pastEvents, events)) {
      setIntervalObj((prev) => ({ ...prev, period: 0 }));
    }
  };

  useEffect(() => {
    let timer;
    let newPeriod;
    let counter = 0;
    // up to ~1.5 min of tries
    if (interValObj.period !== 0 && interValObj.counter < 10) {
      if (interValObj.counter >= 5) {
        counter = interValObj.counter + 1;
        newPeriod = 10000;
      } else {
        counter = interValObj.counter + 1;
        newPeriod = 5000;
      }
      timer = setInterval(() => {
        (async () => {
          await handleTimeoutInterval();
          setIntervalObj((prev) => ({ ...prev, period: newPeriod, counter }));
        })();
      }, newPeriod);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interValObj]);

  const isAdmin = useCallback(() => {
    return (
      cognitoGroups.includes(process.env.REACT_APP_COGNITO_ADMIN_GROUP) ||
      cognitoGroups.includes(
        process.env.REACT_APP_COGNITO_GROUP_USER_MANAGERS
      ) ||
      cognitoGroups.includes(process.env.REACT_APP_COGNITO_GROUP_JOB_MANAGERS)
    );
  }, [cognitoGroups]);

  if (loadingJobOpp) {
    return (
      <>
        <Header
          backgroundStyle={{
            background: "#BA89CD",
          }}
          pageHeader={
            <div className="w-full flex items-center justify-center pb-20 md:px-20 px-8">
              <span className="loader"></span>
            </div>
          }
        />
        <Footer />
      </>
    );
  }

  const isLVMode = () => {
    return mode === FINALIST_VIEW_MODES.LISTVIEW;
  };

  const onGridScrollLeft = () => {
    gridViewRef.current.scrollBy({
      left: -250,
      behaviour: "smooth",
    });
  };

  const onGridScrollRight = () => {
    gridViewRef.current.scrollBy({
      left: 250,
      behaviour: "smooth",
    });
  };

  const getIndexOfJobOppMatch = (matchCandidate) => {
    return jobOpp.matches.items.findIndex((m) => {
      return (
        m.applicationId === matchCandidate.applicationId &&
        m.jobOpportunityId === matchCandidate.jobOpportunityId
      );
    });
  };

  const updateJobOppMatchState = (matchCandidate) => {
    const index = getIndexOfJobOppMatch(matchCandidate);
    if (index !== -1) {
      jobOpp.matches.items[index] = matchCandidate;
      setJobOpp((prev) => ({
        ...prev,
        matches: { items: jobOpp.matches.items },
      }));
      setCandidateSelected(matchCandidate);
    }
  };

  const deleteJobOppMatchFromState = (matchCandidate) => {
    const index = getIndexOfJobOppMatch(matchCandidate);
    if (index !== -1) {
      jobOpp.matches.items.splice(index, 1);
      setJobOpp((prev) => ({
        ...prev,
        matches: { items: jobOpp.matches.items },
      }));
      setCandidateSelected(
        jobOpp.matches.items[jobOpp.matches.items.length - 1]
      );
    }
  };

  const onClose = (activeModalType) => {
    if (
      activeModalType === "SchedulerModal" ||
      modalDisplayed?.type?.name === "SchedulerModal"
    ) {
      setIntervalObj((prev) => ({
        ...prev,
        period: 5000,
        counter: 0,
      }));
    }
    setModalDisplay(null);
  };

  const modals = {
    deny: {
      renderCustomContent: (props) => (
        <DenyApplicant onBack={onClose} onClose={onClose} {...props} />
      ),
    },
    accept: {
      renderCustomContent: (props) => (
        <AcceptModal onBack={onClose} onClose={onClose} {...props} />
      ),
    },
    scheduler: {
      renderCustomContent: (props) => (
        <SchedulerModal onBack={onClose} onClose={onClose} {...props} />
      ),
    },
    ratingReasons: {
      renderCustomContent: (props) => (
        <RatingReasonsModal onBack={onClose} onClose={onClose} {...props} />
      ),
    },
  };

  return (
    <>
      <div className="bg-background">
        <Header
          pageHeader={
            <>
              <div className="flex items-center justify-center mx-32 mt-8 pb-4">
                <div className="w-full tracking-wider">
                  <div className="pb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="33"
                      height="6"
                      viewBox="0 0 33 6"
                      fill="none"
                      class="inline-block"
                    >
                      <path
                        d="M0.75 2.90625L5.75 5.793V0.0194986L0.75 2.90625ZM32.75 2.40625L5.25 2.40625V3.40625L32.75 3.40625V2.40625Z"
                        fill="#202021"
                      />
                    </svg>
                    <Link
                      to="/jobs/opportunities"
                      class="w-156.316 h-20.25 flex-shrink-0 text-#202021 font-rubik text-20 font-semibold pl-[16px]"
                    >
                      Back to My Jobs
                    </Link>
                  </div>
                  <div class="w-full h-auto flex-shrink-0 rounded-[8px] bg-white py-[24px] px-[24px] drop-shadow-lg">
                    <div class="flex justify-center items-center display-inline-block">
                      {isCalibration && (
                        <h1 class="w-auto h-auto flex-shrink-0 text-[#5A19AD] font-rubik text-[32px] font-bold leading-normal display-inline-block pr-2">
                          Calibration -{" "}
                        </h1>
                      )}
                      <h1 class="w-auto h-auto flex-shrink-0 text-[#202021] text-opacity-80 text-[28px] font-normal leading-normal display-inline-block">
                        {jobOpp.title}
                      </h1>
                    </div>
                    <svg
                      class="w-full h-auto transform p-4"
                      viewBox="0 0 1161 2"
                      fill="none"
                    >
                      <path
                        d="M1.25 0.944336H1160.04"
                        stroke="#202021"
                        stroke-linecap="round"
                      />
                    </svg>
                    {isCalibration &&
                      (jobOpp.calibrationIsEnabled ? (
                        <div class="flex justify-center items-center mx-12 pl-4 pb-4 pr-4 w-75 h-83.09 flex-shrink-0 text-justify text-[#202021] font-[Rubik] text-[12px] font-[300]">
                          <p>
                            The goal here is a quick, initial round of feedback.
                            So we're curious for your gut reactions on what's
                            good, what's bad or what's missing. Availability &
                            interest are not yet confirmed (that's the next step
                            after calibration). Rates are based on the last time
                            we spoke with the developer, so while they should be
                            close, the final rate may vary should we match any
                            of the devs below.
                          </p>
                        </div>
                      ) : (
                        jobOpp.matches.items.length > 0 && (
                          <div className="flex justify-center items-center">
                            <p class="w-609.391 h-21.139 flex-shrink-0 text-[#202021] font-[Rubik] text-[16px] font-semibold leading-[1.667] pr-2">
                              The Calibration period has ended. As we match
                              candidates to your job you will see them&nbsp;
                            </p>
                            <div class="w-12 flex-shrink-0">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="33"
                                height="7"
                                viewBox="0 0 33 7"
                                fill="none"
                              >
                                <path
                                  d="M32.3438 3.49414L27.3438 0.607389V6.38089L32.3438 3.49414ZM0.34375 3.99414H27.8438V2.99414H0.34375V3.99414Z"
                                  fill="#202021"
                                />
                              </svg>
                            </div>
                            <Link
                              className="inline-flex items-center justify-center px-4 py-2 text-[#202021] text-[18px] leading-[28px] font-semibold bg-transparent border border-[#202021] rounded-[8px] text-center font-rubik"
                              to={`/jobs/applications/${jobOpp.id}`}
                            >
                              Here
                            </Link>
                          </div>
                        )
                      ))}
                  </div>
                </div>
              </div>
            </>
          }
        />
        {jobOpp.matches.items.length > 0 && (
          <>
            <div
              className={classNames("flex mt-11", {
                "drop-shadow-lg gap-6 mb-8 mx-32": isLVMode(),
              })}
            >
              <Candidates
                candidates={jobOpp.matches.items}
                jobCalendarEvents={jobOppEvents}
                reFreshCalendarEvents={reFreshCalendarEvents}
                candidateSelected={candidateSelected}
                isCalibration={isCalibration}
                setCandidateSelected={setCandidateSelected}
                mode={mode}
                onModeChange={setMode}
                onScrollLeft={onGridScrollLeft}
                onScrollRight={onGridScrollRight}
              />
              {isLVMode() && (
                <CandidateProfile
                  jobCalendarEvents={jobOppEvents}
                  application={candidateSelected}
                  updateJobOppMatchState={updateJobOppMatchState}
                  deleteJobOppMatchFromState={deleteJobOppMatchFromState}
                  setModalDisplay={setModalDisplay}
                  modals={modals}
                  isCalibration={isCalibration}
                  jobOpp={jobOpp}
                  minScore={
                    isAdmin() ||
                    auth?.user?.id === candidateSelected?.application?.user?.id
                      ? 0
                      : 70
                  }
                />
              )}
            </div>
            {!isLVMode() && (
              <CandidateGridView
                matches={jobOpp.matches.items}
                jobCalendarEvents={jobOppEvents}
                ref={gridViewRef}
                jobOpp={jobOpp}
                updateJobOppMatchState={updateJobOppMatchState}
                deleteJobOppMatchFromState={deleteJobOppMatchFromState}
                isAdmin={isAdmin()}
                setModalDisplay={setModalDisplay}
                modals={modals}
                isCalibration={isCalibration}
              />
            )}
          </>
        )}
        {jobOpp.matches.items.length === 0 && (
          <div className="flex justify-center items-center mt-[10vh] mb-[22vh]">
            <p className="font-nexa text-red-400 leading-8 text-2xl tracking-wider">
              {`This job has no ${
                isCalibration ? "calibrations" : "finalists"
              }`}
            </p>
          </div>
        )}

        <Footer />
      </div>
      {modalDisplayed && (
        <Modal onClose={onClose}>
          <div
            className={classNames(
              "h-full w-full md:h-5/6 lg:max-w-4xl bg-white rounded-none no-scrollbar overflow-hidden relative rounded_modal",
              { "!max-w-[80vw]": isCalibration }
            )}
          >
            {modalDisplayed}
          </div>
        </Modal>
      )}
    </>
  );
}
