import { useState } from "react";
import { ReactComponent as List } from "images/list.svg";
import { ReactComponent as RightLeft } from "images/right-left.svg";
import { ReactComponent as LeftArrowIcon } from "images/left-arrow-icon.svg";
import { ReactComponent as RightArrowIcon } from "images/right-arrow-icon.svg";
import { ReactComponent as CalendarIcon } from "images/calendar.svg";
import { ReactComponent as CrossIcon } from "images/cross.svg";
import FinalistCard from "./FinalistCard";
import classNames from "classnames";
import { FINALIST_VIEW_MODES } from "lookup";
import DESIRABLESRC from "images/reactions/DESIRABLE.png";
import NEUTRALSRC from "images/reactions/NEUTRAL.png";
import UNDESIRABLESRC from "images/reactions/UNDESIRABLE.png";
import VERYDESIRABLESRC from "images/reactions/VERYDESIRABLE.png";
import VERYUNDESIRABLESRC from "images/reactions/VERYUNDESIRABLE.png";
import Calendar from "components/Calendar";
import Modal from "components/Modal";

const RATINGS_SRC = {
  DESIRABLE: DESIRABLESRC,
  NEUTRAL: NEUTRALSRC,
  UNDESIRABLE: UNDESIRABLESRC,
  VERYDESIRABLE: VERYDESIRABLESRC,
  VERYUNDESIRABLE: VERYUNDESIRABLESRC,
};

export default function Candidates({
  candidates,
  candidateSelected,
  jobCalendarEvents,
  reFreshCalendarEvents,
  setCandidateSelected,
  mode,
  onModeChange,
  onScrollLeft,
  onScrollRight,
  isCalibration,
}) {
  const [showModal, setShowModal] = useState(false);

  const isLVMode = () => {
    return mode === FINALIST_VIEW_MODES.LISTVIEW;
  };

  const onClose = () => {
    setShowModal(false);
  };

  return (
    <div
      className={classNames("bg-white rounded-sm h-fit py-6", {
        "w-[420px] px-4": isLVMode(),
        "w-full pl-32 flex border-b": !isLVMode(),
      })}
    >
      <div
        className={classNames(
          "flex justify-between items-center font-bold text-gray-400",
          {
            "mb-7": isLVMode(),
            "px-4 w-[420px]": !isLVMode(),
          }
        )}
      >
        {isCalibration ? (
          <div>Calibration Profiles:</div>
        ) : (
          <div>Candidates:</div>
        )}
        <div className="flex items-center">
          <List
            className={classNames(
              { "opacity-25": !isLVMode() },
              "cursor-pointer",
              "hover:cursor-pointer",
              "hover:opacity-100"
            )}
            onClick={() => onModeChange(FINALIST_VIEW_MODES.LISTVIEW)}
          />
          <RightLeft
            className={classNames(
              { "opacity-25": isLVMode() },
              "cursor-pointer",
              "hover:cursor-pointer",
              "hover:opacity-100"
            )}
            onClick={() => onModeChange(FINALIST_VIEW_MODES.GRIDVIEW)}
          />
          {!isCalibration && (
            <CalendarIcon
              className="ml-1 opacity-25 cursor-pointer hover:opacity-100"
              title="View Calendar"
              onClick={() => setShowModal(true)}
            />
          )}
        </div>
      </div>
      {isLVMode() && (
        <div>
          {candidates?.map(
            (candidate, idx) =>
              candidate.application.user && (
                <div
                  className={`p-4 relative cursor-pointer ${
                    candidateSelected === candidate && "bg-orange-100"
                  }`}
                  onClick={() => setCandidateSelected(candidate)}
                  key={`candidate-${idx}`}
                >
                  {candidate.rating && (
                    <div className="absolute top-0 left-0 z-50">
                      <img
                        src={RATINGS_SRC[candidate.rating]}
                        alt=""
                        width="auto"
                        height="auto"
                      />
                    </div>
                  )}
                  <FinalistCard
                    candidate={candidate.application.user}
                    jobCalendarEvents={jobCalendarEvents}
                    renderMeetingIndicator={!isCalibration}
                    size="small"
                    rate={
                      isCalibration
                        ? candidate.calibrationRate
                        : candidate.customerRate
                    }
                  />
                </div>
              )
          )}
        </div>
      )}
      {!isLVMode() && (
        <div className="w-full max-w-5xl flex justify-end">
          <LeftArrowIcon
            className="mr-4 hover:scale-150 hover:cursor-pointer"
            onClick={onScrollLeft}
          />
          <RightArrowIcon
            className="hover:scale-150 hover:cursor-pointer"
            onClick={onScrollRight}
          />
        </div>
      )}
      {showModal && (
        <Modal onClose={onClose}>
          <div
            className={classNames(
              "w-[65vw] h-[90vh] bg-white rounded-none no-scrollbar overflow-hidden relative rounded_modal px-4 py-2"
            )}
          >
            <CrossIcon
              onClick={onClose}
              className="absolute top-2 right-3 w-[25px] h-[25px] opacity-50 cursor-pointer hover:opacity-100 z-50"
            />
            <Calendar
              calendarEvents={jobCalendarEvents}
              reFreshCalendarEvents={reFreshCalendarEvents}
              noResultsMessage={"Currently this job has no meetings booked"}
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
