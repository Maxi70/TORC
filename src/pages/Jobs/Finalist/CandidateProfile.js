import { useMemo } from "react";
import classNames from "classnames";

import ProfileDetails from "pages/Profile/Public/ProfileDetails";
import FinalistCard from "./FinalistCard";
import DropDown from "components/buttons/DropDown";
import {
  JOB_APPLICATION_MATCH_STATUS,
  JOB_OPPORTUNITY_STATUSES,
  NOTE_TYPES,
} from "lookup";
import NotesWrapper from "components/Notes";
import Ratings from "./Ratings";
import UtilsLib from "utils/lib";

export default function CandidateProfile({
  application,
  jobOpp,
  updateJobOppMatchState,
  deleteJobOppMatchFromState,
  jobCalendarEvents,
  minScore,
  isCalibration,
  modals,
  setModalDisplay,
}) {
  const appStatus = application.status;
  const rating = application?.rating;
  const applicant = application;
  const user = applicant.application?.user;

  const onStatusChange = (changedStatus) => {
    if (changedStatus === JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER) {
      deleteJobOppMatchFromState({ ...application });
    } else {
      updateJobOppMatchState({ ...application, status: changedStatus });
    }
  };

  const candidateHasMeetings = useMemo(
    () => jobCalendarEvents?.some((e) => e.title.includes(user.username)),
    [jobCalendarEvents, user]
  );

  const isHired = useMemo(
    () => appStatus === JOB_APPLICATION_MATCH_STATUS.ACCEPTED,
    [appStatus]
  );

  const isReadOnly = useMemo(
    () => isHired || jobOpp.status === JOB_OPPORTUNITY_STATUSES.FULFILLED,
    [isHired, jobOpp.status]
  );

  const setRatingReasonsModal = (selectedRating) => {
    const modal = modals["ratingReasons"].renderCustomContent({
      application,
      jobId: jobOpp?.id,
      applicationId: application?.applicationId,
      updateJobOppMatchState,
      reasonsForRating: application?.reasonsForRating,
      rating,
      selectedRating,
    });

    setModalDisplay(modal);
  };

  const handleClickRating = async (selectedRating) => {
    const updatedAttrs = await UtilsLib.Match.updateRating(
      application,
      jobOpp?.id,
      rating,
      selectedRating,
      isCalibration,
      setRatingReasonsModal
    );

    if (updatedAttrs) {
      updateJobOppMatchState({ ...application, ...updatedAttrs });
    }
  };

  const setDenyModal = () => {
    setModalDisplay(
      modals["deny"].renderCustomContent({
        application,
        jobId: jobOpp?.id,
        applicationId: application?.applicationId,
        onStatusChange,
        isReadOnly,
      })
    );
  };

  const setAcceptModal = () => {
    setModalDisplay(
      modals["accept"].renderCustomContent({
        application,
        jobId: jobOpp?.id,
        applicationId: application?.applicationId,
        onStatusChange,
      })
    );
  };

  const statusUpdateCTAItems = user.slugScheduler
    ? [
        { id: 1, label: "Hire", color: "gray-700" },
        {
          id: 2,
          label: candidateHasMeetings
            ? "Request another meeting"
            : "Request a meeting",
          color: "gray-700",
        },
        { id: 3, label: "Decline", color: "red-500" },
      ]
    : [
        { id: 1, label: "Hire", color: "gray-700" },
        { id: 2, label: "Decline", color: "red-500" },
      ];

  const statusUpdateCTAHandlers = user.slugScheduler
    ? [
        () => setAcceptModal(),
        () =>
          setModalDisplay(
            modals["scheduler"].renderCustomContent({
              applicant: application.application?.user,
              jobOpp,
            })
          ),
        () => setDenyModal(),
      ]
    : [() => setAcceptModal(), () => setDenyModal()];
  return (
    <>
      <div className="w-full max-w-5xl rounded-sm">
        <div
          className={classNames(
            "px-12 pt-6 pb-4 border-b-2 border-gray-100 flex flex-col font-bold text-gray-400 justify-center",
            {
              "bg-white": !isHired,
              "bg-emerald-50": isHired,
            }
          )}
        >
          <div className="flex">
            <div>Reaction:</div>
            <Ratings
              rating={rating}
              handleClickRating={handleClickRating}
              isReadOnly={isCalibration && !jobOpp.calibrationIsEnabled}
            />
            {!isCalibration && (
              <>
                {!isReadOnly && (
                  <div className="ml-auto">
                    <DropDown
                      defaultValue={
                        user.slugScheduler ? "Request a meeting" : "Hire"
                      }
                      items={statusUpdateCTAItems}
                      handleClick={statusUpdateCTAHandlers}
                      className="min-w-[183px]"
                    />
                  </div>
                )}
                {isHired && (
                  <div className="ml-auto rounded-lg font-nexa bg-emerald-500 px-3 py-3 rounded-xs text-white w-[183px] text-center">
                    HIRED
                  </div>
                )}
              </>
            )}
          </div>

          {isCalibration && application?.calibrationNote && (
            <div className="flex mt-6 text-md">
              <div className="mr-2">
                {application.calibrationNote?.creator} says:{" "}
              </div>
              <div className="text-gray-600">
                {application.calibrationNote?.content}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white border-b-2 border-gray-100 px-12 py-8 relative">
          <FinalistCard
            candidate={application?.application?.user}
            size="large"
            rate={
              isCalibration
                ? application.calibrationRate
                : application.customerRate
            }
          />
          <NotesWrapper
            jobOpportunityId={jobOpp?.id}
            applicationId={application?.applicationId}
            className="absolute top-4 right-4"
            name={`${application?.application?.user.given_name} ${application?.application?.user.family_name}`}
            isReadOnly={isCalibration && !jobOpp.calibrationIsEnabled}
            noteType={isCalibration && NOTE_TYPES.CALIBRATION}
          />
        </div>
        <div className="bg-white px-4 pb-6">
          <ProfileDetails
            appsyncUser={application?.application?.user}
            applicationFieldHistory={application?.fieldHistory}
            showPdf={true}
            renderBadges={true}
            renderCustomLinks={true}
            showGithubStats={true}
            showAssessmentLinks={true}
            minScore={minScore}
            isCalibration={isCalibration}
          />
        </div>
      </div>
    </>
  );
}
