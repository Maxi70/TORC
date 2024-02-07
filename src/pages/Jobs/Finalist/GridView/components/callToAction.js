import { useMemo } from "react";
import classNames from "classnames";
import DropDown from "components/buttons/DropDown";
import {
  JOB_APPLICATION_MATCH_RATINGS,
  JOB_APPLICATION_MATCH_STATUS,
  JOB_OPPORTUNITY_STATUSES,
} from "lookup";
import DESIRABLE from "images/reactions/DESIRABLE.png";
import NEUTRAL from "images/reactions/NEUTRAL.png";
import UNDESIRABLE from "images/reactions/UNDESIRABLE.png";
import VERYDESIRABLE from "images/reactions/VERYDESIRABLE.png";
import VERYUNDESIRABLE from "images/reactions/VERYUNDESIRABLE.png";
import UtilsLib from "utils/lib";

const REACTION_IMAGE = {
  [JOB_APPLICATION_MATCH_RATINGS.VERYUNDESIRABLE]: VERYUNDESIRABLE,
  [JOB_APPLICATION_MATCH_RATINGS.UNDESIRABLE]: UNDESIRABLE,
  [JOB_APPLICATION_MATCH_RATINGS.NEUTRAL]: NEUTRAL,
  [JOB_APPLICATION_MATCH_RATINGS.DESIRABLE]: DESIRABLE,
  [JOB_APPLICATION_MATCH_RATINGS.VERYDESIRABLE]: VERYDESIRABLE,
};

function ReactionCTA({ isReadOnly, rating, setRating }) {
  return (
    <DropDown
      defaultValue={
        rating ? (
          <img
            src={REACTION_IMAGE[rating]}
            alt={rating}
            width="auto"
            height="auto"
          />
        ) : (
          "Reaction"
        )
      }
      items={Object.values(REACTION_IMAGE).map((v, idx) => ({
        id: idx + 1,
        label: <img src={v} alt={v} width="auto" height="auto" />,
      }))}
      handleClick={[
        () => setRating(JOB_APPLICATION_MATCH_RATINGS.VERYUNDESIRABLE),
        () => setRating(JOB_APPLICATION_MATCH_RATINGS.UNDESIRABLE),
        () => setRating(JOB_APPLICATION_MATCH_RATINGS.NEUTRAL),
        () => setRating(JOB_APPLICATION_MATCH_RATINGS.DESIRABLE),
        () => setRating(JOB_APPLICATION_MATCH_RATINGS.VERYDESIRABLE),
      ]}
      isReadOnly={isReadOnly}
      bgColor="transparent"
      textColor="gray-400"
    />
  );
}

export default function FinalistGridCTA({
  match,
  jobOpp,
  updateJobOppMatchState,
  deleteJobOppMatchFromState,
  isCalibration,
  setModalDisplay,
  modals,

  candidateHasMeetings,
}) {
  const isHired = useMemo(
    () => match.status === JOB_APPLICATION_MATCH_STATUS.ACCEPTED,
    [match.status]
  );

  const isReadOnly = useMemo(
    () => isHired || jobOpp.status === JOB_OPPORTUNITY_STATUSES.FULFILLED,
    [isHired, jobOpp.status]
  );

  const onStatusChange = (changedStatus) => {
    if (changedStatus === JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER) {
      deleteJobOppMatchFromState({ ...match });
    } else {
      updateJobOppMatchState({ ...match, status: changedStatus });
    }
  };

  const setRatingReasonsModal = (selectedRating) => {
    const modal = modals["ratingReasons"].renderCustomContent({
      application: match,
      jobId: jobOpp?.id,
      applicationId: match?.applicationId,
      updateJobOppMatchState,
      reasonsForRating: match?.reasonsForRating,
      rating: match.rating,
      selectedRating,
    });

    setModalDisplay(modal);
  };

  const handleSetRating = async (selectedRating) => {
    const updatedAttrs = await UtilsLib.Match.updateRating(
      match,
      jobOpp?.id,
      match.rating,
      selectedRating,
      isCalibration,
      setRatingReasonsModal
    );

    if (updatedAttrs) {
      updateJobOppMatchState({ ...match, ...updatedAttrs });
    }
  };

  const setDenyModal = () => {
    setModalDisplay(
      modals["deny"].renderCustomContent({
        application: match,
        jobId: jobOpp?.id,
        applicationId: match.applicationId,
        onStatusChange,
        isReadOnly,
      })
    );
  };

  const setAcceptModal = () => {
    setModalDisplay(
      modals["accept"].renderCustomContent({
        application: match,
        jobId: jobOpp?.id,
        applicationId: match?.applicationId,
        onStatusChange,
      })
    );
  };

  const statusUpdateCTAItems = match.application.user.slugScheduler
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

  const statusUpdateCTAHandlers = match.application.user.slugScheduler
    ? [
        () => setAcceptModal(),
        () =>
          setModalDisplay(
            modals["scheduler"].renderCustomContent({
              applicant: match.application?.user,
              jobOpp,
            })
          ),
        () => setDenyModal(),
      ]
    : [() => setAcceptModal(), () => setDenyModal()];

  return (
    <section
      className={classNames("w-[420px] border-r h-full border-b p-6", {
        "bg-white": !isHired,
        "bg-emerald-50": isHired,
      })}
    >
      <div className="flex font-bold text-gray-400 justify-around items-center">
        <ReactionCTA
          isReadOnly={
            isReadOnly || (isCalibration && !jobOpp.calibrationIsEnabled)
          }
          rating={match.rating}
          setModalDisplay={setModalDisplay}
          setRating={handleSetRating}
        />
        {!isReadOnly && !isCalibration && (
          <DropDown
            defaultValue={
              match.application.user.slugScheduler
                ? "Request a meeting"
                : "Hire"
            }
            items={statusUpdateCTAItems}
            handleClick={statusUpdateCTAHandlers}
            className="min-w-[183px]"
            itemsClassName="whitespace-nowrap"
          />
        )}
        {isHired && (
          <div className="rounded-lg font-nexa bg-emerald-500 px-3 py-3 rounded-xs text-white w-[183px] text-center">
            HIRED
          </div>
        )}
      </div>
    </section>
  );
}
