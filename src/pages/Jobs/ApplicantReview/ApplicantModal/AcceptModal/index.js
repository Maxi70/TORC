import styles from "../index.module.css";
import classNames from "classnames";

import closeIcon from "../../../../../images/close-icon-blue.svg";
import { API, graphqlOperation } from "aws-amplify";
import { updateMatch } from "graphql/mutations";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import { useState } from "react";
import backArrow from "images/backArrow.svg";

export default function AcceptModal({
  jobId,
  applicationId,
  application,
  onBack,
  onClose,
  onStatusChange,
}) {
  const [updating, setUpdating] = useState(false);

  const acceptApplicant = async () => {
    await API.graphql(
      graphqlOperation(updateMatch, {
        input: {
          jobOpportunityId: jobId,
          applicationId: applicationId,
          status: JOB_APPLICATION_MATCH_STATUS.ACCEPTED,
        },
      })
    );
  };

  const submit = async () => {
    setUpdating(true);
    await acceptApplicant();
    if (application) {
      application.status = JOB_APPLICATION_MATCH_STATUS.ACCEPTED;
    }
    onStatusChange(JOB_APPLICATION_MATCH_STATUS.ACCEPTED);
    onClose();
  };

  return (
    <>
      <div className="z-20 absolute top-4 right-4">
        <img
          src={closeIcon}
          className="cursor-pointer"
          alt="close"
          onClick={onClose}
        />
      </div>
      <div
        className={classNames(
          "overflow-y-scroll h-full flex flex-col justify-between relative",
          styles.noScrollbar
        )}
      >
        <div
          className={classNames(
            "flex flex-col justify-between h-full overflow-scroll",
            styles.noScrollbar
          )}
        >
          <div className="mt-14 pl-8 pr-14">
            <p className="font-nexa font-bold text-2xl text-electricBlue-500">
              Congratulations on finding your next developer!
            </p>
            <p
              className="font-rubik-regular text-base mt-8"
              style={{
                width: "90%",
              }}
            >
              Click Confirm to accept this resource for your job.
            </p>
            <p
              className="font-rubik-regular text-base mt-8 pb-4"
              style={{
                width: "90%",
              }}
            >
              Your Torc Success Manager will be in touch soon to begin the
              onboarding process.
            </p>
          </div>
          <div className="border-t border-gray-600 w-full py-3 mb-2">
            <div className="flex justify-between">
              <button
                className="sml:ml-12 ml-4 font-bold sm:text-sm text-xs border-0 rounded shadow-sm flex items-center justify-center py-2 px-3"
                onClick={onBack}
              >
                <img
                  alt="back arrow"
                  src={backArrow}
                  className="w-3 h-3 mr-2"
                />
                BACK
              </button>
              <button
                className={classNames(
                  "mr-4 py-2 px-6 bg-electricBlue-500 text-white font-bold",
                  { "animate-pulse": updating }
                )}
                style={{
                  borderRadius: "61px",
                }}
                onClick={submit}
                disabled={updating}
              >
                {updating ? "SAVING..." : "CONFIRM"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
