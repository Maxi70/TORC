import { useMemo, useState } from "react";
import styles from "../index.module.css";
import classNames from "classnames";
import { API, graphqlOperation } from "aws-amplify";
import { updateMatch } from "graphql/mutations";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import { MATCH_REJECTION_TEXT } from "./rejectionReasons";

import closeIcon from "images/close-icon-blue.svg";
import backArrow from "images/backArrow.svg";
import DropDown from "components/DropDown";
import CustomInput from "components/CustomInput";

export default function DenyApplicant({
  jobId,
  applicationId,
  application,
  onBack,
  onClose,
  onStatusChange,
  isReadOnly,
}) {
  const [denyMessage, setDenyMessage] = useState(
    application?.rejectionByCustomer ?? ""
  );
  const [updating, setUpdating] = useState(false);
  const [reasons, setReasons] = useState(application?.reasonForRejection ?? []);
  const [submitError, setSubmitError] = useState({ message: "" });
  const isRejected =
    (application?.reasonForRejection || application?.rejectionByCustomer) ??
    false;

  const reasonsArr = useMemo(() => Object.values(MATCH_REJECTION_TEXT), []);
  const mappedReasonVals = useMemo(
    () => reasons.map((ele) => MATCH_REJECTION_TEXT[ele]),
    [reasons]
  );

  const denyApplicant = async () => {
    await API.graphql(
      graphqlOperation(updateMatch, {
        input: {
          jobOpportunityId: jobId,
          applicationId: applicationId,
          status: JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER,
          rejectionByCustomer: denyMessage.trim(),
          reasonForRejection: reasons,
        },
      })
    );
  };

  const submit = async () => {
    if (reasons.length === 0) {
      return setSubmitError({ message: "Please select a rejection reason." });
    }
    setUpdating(true);
    try {
      await denyApplicant();

      application.reasonForRejection = reasons;
      application.rejectionByCustomer = denyMessage;
      application.status = JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER;
      onStatusChange(JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER);
      onClose();
    } catch (e) {
      console.error(e);
      setSubmitError({ message: "something went wrong, please try again." });
    }
  };

  const handleReasons = (reason) => {
    let val;
    let codeName;
    for (let key in MATCH_REJECTION_TEXT) {
      if (MATCH_REJECTION_TEXT[key] === reason) {
        val = MATCH_REJECTION_TEXT[key];
        codeName = key;
      }
    }
    if (reasons.includes(codeName)) {
      return setReasons((prev) => prev.filter((ele) => ele !== codeName));
    }

    if (val === reason) {
      setReasons((prev) => [...prev, codeName]);
    }
  };

  return (
    <>
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
          <div>
            <p className="font-nexa font-bold text-2xl text-electricBlue-500">
              We appreciate any rejection feedback you can share.
            </p>
            <p className="font-rubik-regular text-base mt-8 md:w-4/5">
              Your feedback will help us to provide better matches for future
              jobs and may be shared with the candidate
            </p>
          </div>
          <div
            className="mt-10"
            style={{
              maxWidth: "380px",
            }}
          >
            <DropDown
              items={reasonsArr}
              checkedItems={mappedReasonVals}
              onAdd={handleReasons}
              onRemove={handleReasons}
              defaultValue="Please select at least one reason"
              label="Reasons for rejection:*"
              isReadOnly={isRejected}
            />
          </div>
          <div className="font-nexa font-bold text-lg text-electricBlue-500 mt-10">
            Optional candidate feedback:
          </div>
          <CustomInput
            isTextarea
            notWizard
            autoResize
            isWizard
            value={denyMessage}
            onChange={setDenyMessage}
            capped={500}
            // readyOnly={isReadOnly || denied}
          />
          <div className="w-full flex justify-end mt-2 pr-4 mb-4">
            {`${denyMessage.length}`} / 500
          </div>
        </div>
        <div className="border-t border-gray-600 w-full pb-3">
          <div className="flex justify-between pt-6 font-rubik-regular font-bold w-full">
            <button
              className="sml:ml-12 ml-4 font-bold sm:text-sm text-xs border-0 rounded shadow-sm flex items-center justify-center py-2 px-3"
              onClick={onBack}
            >
              <img alt="back arrow" src={backArrow} className="w-3 h-3 mr-2" />
              BACK
            </button>
            {submitError.message.length > 0 && (
              <div className="text-red-500 self-center font-nexa font-bold sm:w-1/2 w-1/2 flex justify-center text-center">
                {submitError.message}
              </div>
            )}
            <div className="flex">
              {(!isReadOnly || !isRejected) && (
                <>
                  {!updating ? (
                    <>
                      <button
                        className={classNames(
                          "border-2 py-1 px-5 bg-electricBlue-500 border-electricBlue-500 text-white font-bold sm:text-sm text-xs ml-4 mr-4",
                          (isReadOnly || isRejected) && "cursor-not-allowed"
                        )}
                        style={{
                          borderRadius: "61px",
                        }}
                        onClick={submit}
                        disabled={isRejected}
                      >
                        SUBMIT
                      </button>
                    </>
                  ) : (
                    <button
                      className="ml-4 mr-4 py-2 px-6 bg-black text-white font-bold sm:text-sm text-xs animate-pulse"
                      style={{
                        borderRadius: "61px",
                      }}
                    >
                      SAVING...
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
