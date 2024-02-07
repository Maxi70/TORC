import React, { useEffect, useRef, useState } from "react";
import closeIcon from "../../../../../images/close-icon-blue.svg";
import backArrow from "images/backArrow.svg";
import { useAuth } from "GlobalAuthContext";

const SchedulerModal = ({ onBack, onClose, applicant, jobOpp }) => {
  const [isLoading, setIsLoading] = useState(true);
  const iframeRef = useRef(null);
  const user = useAuth()?.user;

  useEffect(() => {
    const currentIframeRef = iframeRef?.current;
    currentIframeRef?.addEventListener("load", () => setIsLoading(false));
    return () => {
      currentIframeRef?.removeEventListener("load", () => setIsLoading(false));
    };
  }, [iframeRef]);

  const widgetLink = `https://schedule.nylas.com/${
    applicant?.slugScheduler
  }?&email=${encodeURIComponent(
    user.email
  )}&email_readonly=true&job=${encodeURIComponent(
    `${jobOpp.title} ${jobOpp.id}`
  )}&job_readonly=true&jobId=${jobOpp.id}`;

  return (
    <>
      <div className="h-full flex flex-col justify-center items-center bg-slate-50 pt-0 px-4">
        <div className="z-50 absolute top-2 right-3">
          <img
            src={closeIcon}
            className="cursor-pointer"
            alt="close"
            onClick={() => onClose("SchedulerModal")}
          />
        </div>
        {isLoading && (
          <div className="flex absolute inset-0 justify-center items-center">
            <span className="loader"></span>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={widgetLink}
          className="w-90 lg:w-[750px] h-[87vh]"
          title="Scheduler"
        />
      </div>
      <div className="border-t border-gray-600 w-full pt-2 pb-2">
        <div className="flex justify-between font-rubik font-bold w-full">
          <button
            className="sml:ml-12 ml-4 font-bold sm:text-sm text-xs border-0 rounded shadow-sm flex items-center justify-center py-2 px-3"
            onClick={onBack}
          >
            <img alt="back arrow" src={backArrow} className="w-3 h-3 mr-2" />
            BACK
          </button>
        </div>
      </div>
    </>
  );
};

export default SchedulerModal;
