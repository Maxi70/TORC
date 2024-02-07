import { useState, useEffect, useMemo } from "react";
import classNames from "classnames";

import styles from "./index.module.css";
import closeIcon from "images/close-icon-blue.svg";
import DropDown from "components/DropDown";
import backArrow from "images/backArrow.svg";
import { API, graphqlOperation } from "aws-amplify";
import { updateMatch } from "graphql/mutations";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import CustomInput from "components/CustomInput";

const REJECTION_REASONS = {
  LACKEXPERIENCE: "Do not have required technology skill level",
  STACKNOTDESIRED: "Prefer to work in other technology stacks",
  LOCATIONNOTFEASIBLE: "Unable to work required time zone",
  NOTAVAILABLE: "Not available for new jobs",
  RATELOW: "Rate is too low",
  OTHER: "Other",
};

const NotInterestedInJob = ({ onClose, match }) => {
  const [text, setText] = useState("");
  const [reasons, setReasons] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState({ message: "" });

  const mappedReasons = useMemo(() => Object.values(REJECTION_REASONS), []);
  const mappedSelectedReasons = useMemo(
    () => reasons.map((val) => REJECTION_REASONS[val]),
    [reasons]
  );
  const onSubmit = async () => {
    if (!reasons.length) {
      return setSubmitError({ message: "Please select a reason." });
    }

    setSubmitting(true);
    try {
      await API.graphql(
        graphqlOperation(updateMatch, {
          input: {
            jobOpportunityId: match.jobOpportunityId,
            applicationId: match.applicationId,
            status: JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER,
            reasonForRejection: reasons,
            rejectionByCustomer: text.trim(),
          },
        })
      );
      match.status = JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER;
      match.rejectionByCustomer = text;
      match.reasonForRejection = reasons;

      onClose();
    } catch (e) {
      console.log(e);
      setSubmitError({ message: "Somethng went wrong, please try again." });
      setSubmitting(false);
    }
  };

  const onAdd = (res) => {
    for (let key in REJECTION_REASONS) {
      if (REJECTION_REASONS[key] === res) {
        setReasons((prev) => [...prev, key]);
      }
    }
  };

  const onRemove = (res) => {
    for (let key in REJECTION_REASONS) {
      if (REJECTION_REASONS[key] === res) {
        setReasons((prev) => prev.filter((ele) => ele !== key));
      }
    }
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";

    return () => (document.body.style.overflowY = "auto");
  });

  return (
    <div
      className={classNames(
        "h-full w-full md:h-5/6 lg:max-w-4xl bg-white rounded-none no-scrollbar overflow-hidden relative md:w-5/6 rounded_modal"
      )}
    >
      <div className="z-50 absolute top-2 right-3">
        <img
          src={closeIcon}
          className="cursor-pointer"
          alt="close"
          onClick={onClose}
        />
      </div>
      <div
        className={classNames(
          "overflow-y-scroll h-full relative flex flex-col justify-between gap-0",
          styles.noScrollbar
        )}
      >
        <div
          className={classNames(
            "pt-10 md:px-20 px-8 overflow-scroll h-full",
            styles.noScrollbar
          )}
        >
          <p className="font-nexa font-bold text-2xl text-electricBlue-500">
            We appreciate any feedback you can share.
          </p>
          <p className="font-rubik-regular text-base mt-6 md:w-4/5">
            Your feedback will help us in matching you to future job
            opportunities.
          </p>
          <div
            className="mt-10"
            style={{
              maxWidth: "380px",
            }}
          >
            <DropDown
              items={mappedReasons}
              checkedItems={mappedSelectedReasons}
              onAdd={onAdd}
              onRemove={onRemove}
              label="Reasons for rejection:*"
              defaultValue="Please select at least one reason"
            />
          </div>
          <div className="font-nexa font-bold text-lg text-electricBlue-500 mt-10">
            Optional job feedback:
          </div>
          <CustomInput
            isTextarea
            notWizard
            autoResize
            value={text}
            onChange={setText}
            capped={500}
          />
          <div className="w-full flex justify-end mt-4 pr-4">
            {`${text.length}`} / 500
          </div>
        </div>
        <div className="border-t border-gray-600 w-full pb-3">
          <div className="flex justify-between pt-6 font-rubik-regular font-bold w-full">
            <button
              className="sml:ml-12 ml-4 font-bold sm:text-sm text-xs border-0 rounded shadow-sm flex items-center justify-center py-2 px-3"
              onClick={onClose}
            >
              <img alt="back arrow" src={backArrow} className="w-3 h-3 mr-2" />
              BACK
            </button>
            {submitError?.message?.length > 0 && (
              <div className="text-red-500 self-center font-nexa font-bold sm:w-1/2 w-1/2 flex justify-center text-center">
                {submitError.message}
              </div>
            )}
            <div className="flex">
              <button
                className={classNames(
                  "border-2 py-1 px-5 bg-electricBlue-500 border-electricBlue-500 text-white font-bold sm:text-sm text-xs ml-4 mr-4",
                  submitting && "animate-pulse"
                  //   (isReadOnly || isRejected) && "cursor-not-allowed"
                )}
                style={{
                  borderRadius: "61px",
                }}
                onClick={onSubmit}
                // disabled={isRejected}
              >
                {submitting ? "SAVING..." : "SUBMIT"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotInterestedInJob;
