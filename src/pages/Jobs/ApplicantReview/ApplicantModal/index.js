import { useState } from "react";
import classNames from "classnames";

import { JOB_APPLICATION_MATCH_STATUS, JOB_OPPORTUNITY_STATUSES } from "lookup";
import Modal from "components/Modal";
import MoreInfo from "./MoreInfoModal";
import AcceptModal from "./AcceptModal";
import DenyModal from "./denyModal";
import SchedulerModal from "./SchedulerModal";
import "./profileimg.css";

const ApplicantActions = ({
  jobOpp,
  applicationId,
  application,
  jobStatus,
  status,
}) => {
  const [modalDisplayed, setModalDisplay] = useState(null);
  const [appStatus, setAppStatus] = useState(status);

  const applicant = application;
  const user = applicant.application.user;

  const onStatusChange = (changedStatus) => {
    setAppStatus(changedStatus);
  };

  const isReadOnly =
    appStatus === JOB_APPLICATION_MATCH_STATUS.ACCEPTED ||
    appStatus === JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER ||
    jobStatus === JOB_OPPORTUNITY_STATUSES.FULFILLED;

  const isRejected =
    appStatus === JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER;

  const onClose = () => {
    setModalDisplay(null);
  };

  const modals = {
    deny: (
      <DenyModal
        application={application}
        applicant={user}
        onBack={onClose}
        onClose={onClose}
        jobId={jobOpp.id}
        applicationId={applicationId}
        onStatusChange={onStatusChange}
        isReadOnly={isReadOnly}
      />
    ),
    accept: (
      <AcceptModal
        application={application}
        applicant={user}
        onBack={onClose}
        onClose={onClose}
        jobId={jobOpp.id}
        applicationId={applicationId}
        onStatusChange={onStatusChange}
      />
    ),
    moreInfo: (
      <MoreInfo
        application={application}
        applicant={user}
        onBack={onClose}
        onClose={onClose}
        applicationId={applicationId}
        jobId={jobOpp.id}
        onStatusChange={onStatusChange}
      />
    ),
    scheduler: (
      <SchedulerModal
        applicant={user}
        jobOpp={jobOpp}
        onBack={onClose}
        onClose={onClose}
      />
    ),
  };

  return !modalDisplayed ? (
    <>
      {!isReadOnly && (
        <div className="border-t border-gray-600 w-full py-3 mt-auto self-end justify-self-end">
          <div className="flex w-full justify-between">
            <button
              className="sm:ml-5 ml-2 mr-3 border-2 border-electricBlue-600 text-electricBlue-600 font-rubik-regular font-bold py-2 sm:px-6 px-4 sm:text-sm text-xs flex items-center justify-center"
              style={{
                borderRadius: "61px",
              }}
              onClick={() => setModalDisplay("deny")}
            >
              REJECT <span className="lg:flex hidden"> &nbsp;CANDIDATE</span>
            </button>
            {user?.slugScheduler ? (
              <button
                className="sm:ml-5 ml-2 mr-3 border-2 border-electricBlue-600 text-electricBlue-600 font-rubik-regular font-bold py-2 sm:px-6 px-4 sm:text-sm text-xs flex items-center justify-center"
                style={{
                  borderRadius: "61px",
                }}
                onClick={() => setModalDisplay("scheduler")}
              >
                INTERVIEW{" "}
                <span className="lg:flex hidden">&nbsp;CANDIDATE</span>
              </button>
            ) : null}
            <div className="flex">
              <button
                className="sm:ml-5 ml-2 border-2 border-electricBlue-600 text-electricBlue-600 font-rubik-regular font-bold py-2 sm:px-6 px-4 sm:text-sm text-xs flex items-center justify-center"
                style={{
                  borderRadius: "61px",
                }}
                onClick={() => setModalDisplay("moreInfo")}
              >
                REQUEST&nbsp;<span className="lg:flex hidden">MORE</span>
                &nbsp;INFO
              </button>
              <button
                className="sm:ml-5 sm:mr-5 ml-3 mr-2 bg-electricBlue-600 text-white font-rubik-regular font-bold py-2 sm:px-6 px-4 sm:text-sm text-xs flex items-center justify-center"
                style={{
                  borderRadius: "61px",
                }}
                onClick={() => setModalDisplay("accept")}
              >
                HIRE&nbsp;<span className="lg:flex hidden"> CANDIDATE</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {isReadOnly && isRejected && (
        <div className="border-t border-gray-600 w-full py-3 mt-auto self-end justify-self-end">
          <div className="flex w-full">
            <button
              className="sm:ml-5 ml-2 mr-3 border-2 border-electricBlue-600 text-electricBlue-600 font-rubik-regular font-bold py-2 sm:px-6 px-4 sm:text-sm text-xs flex items-center justify-center"
              style={{
                borderRadius: "61px",
              }}
              onClick={() => setModalDisplay("deny")}
            >
              VIEW REJECTION INFO
            </button>
          </div>
        </div>
      )}
    </>
  ) : (
    <Modal onClose={onClose}>
      <div
        className={classNames(
          "h-full w-full md:h-5/6 lg:max-w-4xl bg-white rounded-none no-scrollbar overflow-hidden relative rounded_modal"
        )}
      >
        {modals[modalDisplayed]}
      </div>
    </Modal>
  );
};

export default ApplicantActions;
