import { useState, useMemo } from "react";
import classNames from "classnames";
import styles from "../index.module.css";
import closeIcon from "../../../../../images/close-icon-blue.svg";
import backArrow from "images/backArrow.svg";
import { API, graphqlOperation } from "aws-amplify";
import { updateMatch } from "graphql/mutations";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import DropDown from "components/DropDown";
import CustomInput from "components/CustomInput";

const MORE_INFO_REQUEST_NAMES = {
  INTERVIEWCANDIDATE: "Request additional information from candidate",
  REQUESTINFOFROMCANDIDATE: "Request additional information from Torc",
  REQUESTINFOFROMTORC: "Interview candidate",
  OTHER: "Other",
};

const MoreInfo = ({
  applicant,
  onBack,
  onClose,
  applicationId,
  jobId,
  application,
  onStatusChange,
}) => {
  const name =
    applicant.given_name[0].toUpperCase() +
    applicant.given_name.slice(1).toLowerCase();
  const [requestedInfo, setRequestedInfo] = useState([]);

  const [message, setMessage] = useState("");
  const [submitError, setSubmitError] = useState({
    message: "",
  });

  const reasonsArr = useMemo(() => Object.values(MORE_INFO_REQUEST_NAMES), []);

  const mappedReasonVals = useMemo(
    () => requestedInfo.map((ele) => MORE_INFO_REQUEST_NAMES[ele]),
    [requestedInfo]
  );

  const [updating, setUpdating] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  const user = applicant.user;

  const submit = async () => {
    if (requestedInfo.length < 1 || message.length < 1) {
      return setSubmitError({
        message: "Please provide input for both items above.",
      });
    }

    try {
      setUpdating(true);
      const updatedInput = {
        input: {
          jobOpportunityId: jobId,
          applicationId: applicationId,
          status: JOB_APPLICATION_MATCH_STATUS.MOREINFO,
          moreInfoRequest: requestedInfo,
          moreInfoRequestMessage: message.trim(),
        },
      };

      await API.graphql(graphqlOperation(updateMatch, updatedInput));
      application.moreInfoRequest = requestedInfo;
      application.moreInfoRequestMessage = message;
      application.status = JOB_APPLICATION_MATCH_STATUS.MOREINFO;
      onStatusChange(JOB_APPLICATION_MATCH_STATUS.MOREINFO);
      setUpdating(false);
      setSubmitError({ message: "" });
      setRequestSent(true);
    } catch (e) {
      console.error(e);
      setUpdating(false);
      setSubmitError({ message: "something went wrong, please try again." });
    }
  };

  const getKey = (name) => {
    for (let key in MORE_INFO_REQUEST_NAMES) {
      if (MORE_INFO_REQUEST_NAMES[key] === name) {
        return key;
      }
    }
  };

  const onAdd = (info) => {
    const key = getKey(info);
    if (key) {
      setRequestedInfo((prev) => [...prev, key]);
    }
  };

  const onRemove = (info) => {
    const key = getKey(info);
    if (key) {
      setRequestedInfo((prev) => prev.filter((ele) => ele !== key));
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
              Thank you for your interest in{" "}
              {`${name} ${applicant.family_name[0].toUpperCase()}.`}
              {/* {`${applicant.given_name} ${applicant.family_name[0]}.`} */}
            </p>
          </div>
          <div
            className="mt-10"
            style={{
              maxWidth: "380px",
            }}
          >
            <DropDown
              label="Please choose the appropriate next step:*"
              defaultValue="Please select at least one item"
              items={reasonsArr}
              checkedItems={mappedReasonVals}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          </div>
          <div className="font-nexa font-bold text-lg text-electricBlue-500 mt-10">
            Please provide any additional information necessary to fulfill this
            request.*
          </div>
          <CustomInput
            isTextarea
            notWizard
            autoResize
            isWizard
            value={message}
            onChange={setMessage}
            capped={500}
          />
          <div className="w-full flex justify-end mt-4 pr-4">
            {`${message.length}`} / 500
          </div>
        </div>
        <div className="border-t border-gray-600 w-full pb-3">
          {requestSent && (
            <div className="w-full flex justify-center">
              <div className="text-electricBlue-800 font-nexa font-bold mt-4 px-2 sm:text-base text-sm">
                {user?.given_name
                  ? `Thanks, ${user.given_name}. Your Torc Success Manager will contact you soon.`
                  : "Your torc Success Manager will contact you soon."}
              </div>
            </div>
          )}
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
              {!updating ? (
                <>
                  <button
                    className={classNames(
                      "border-2 py-1 px-5 bg-electricBlue-500 border-electricBlue-500 text-white font-bold sm:text-sm text-xs ml-4 mr-4"
                    )}
                    style={{
                      borderRadius: "61px",
                    }}
                    onClick={submit}
                    disabled={requestSent}
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MoreInfo;
