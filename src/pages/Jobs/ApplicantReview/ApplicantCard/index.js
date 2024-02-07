import { useState, useMemo, useEffect } from "react";
import classNames from "classnames";
import styles from "./index.module.css";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import ApplicantModal from "../ApplicantModal";
import { JOB_APPLICATION_MATCH_STATUS } from "lookup";
import ImageViewer from "components/ImageViewer";
import dayjs from "dayjs";
import placeholderPicture from "images/placeholderProfile.png";

export default function ApplicantCard({
  jobId,
  applicationId,
  applicant,
  jobSkills,
  status,
  keyId,
  jobStatus,
  customerRate,
  timeCommitment,
}) {
  const [open, setOpen] = useState(false);
  const [appStatus, setAppStatus] = useState(status);
  const application = applicant.application;

  const matchedSkills =
    jobSkills?.filter((ele) =>
      application?.user?.skills?.find((skill) => skill.name === ele)
    ) ?? [];

  const user = application.user;
  const startDate = applicant.availableStartDate;
  const matchedDate = applicant.createdAt;

  const weeklyTimeCommitment =
    timeCommitment === "FULLTIME" ? "Weekly rate" : "Half-time weekly rate";

  useEffect(() => {});
  const onStatusChange = (changedStatus) => {
    setAppStatus(changedStatus);
  };

  const closeModal = () => {
    setOpen(false);
    //for disabling scrolling on mobile
    document.getElementById("application_page").style = "auto";
    document.body.style.overflow = "auto";
  };

  const openModal = () => {
    setOpen(true);
    //for adding scrolling back on mobile
    document.getElementById("application_page").overflow = "hidden";
    document.body.style.overflow = "hidden";
  };

  const validatedSkills = useMemo(() => {
    const skills = user?.skills ?? [];
    const validSkills = skills
      .filter(({ name }) => jobSkills.includes(name))
      .sort((a, b) => a.name.length - b.name.length);

    const html = validSkills.slice(0, 3).map((ele, i) => (
      <div
        className="border rounded px-3 py-1 flex-shrink-0 font-rubik-medium border-blue-800 m-1 sm:text-sm text-xs break-normal"
        style={{ maxWidth: "90%" }}
        key={ele.id}
      >
        {ele.name}&nbsp;
      </div>
    ));
    if (validSkills.length > html.length) {
      html.push(
        <div
          className="border rounded px-3 py-1 flex-shrink-0 font-rubik-medium border-blue-800 m-1 sm:text-sm text-xs"
          key={`${user.id}`}
        >
          +&nbsp;{`${validSkills.length - html.length} Skills matched`}
        </div>
      );
    }

    return html;
  }, [jobSkills, user.skills, user.id]);

  const renderStatus = (status) => {
    switch (status) {
      case JOB_APPLICATION_MATCH_STATUS.ACCEPTED:
        return (
          <div className="flex text-sm font-rubik-medium items-center">
            <div className="w-2 h-2 rounded bg-blue-800 mr-2" />
            HIRED
          </div>
        );
      case JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER:
        return (
          <div className="flex text-sm font-rubik-medium items-center">
            <div className="w-2 h-2 rounded bg-red-600 mr-2" />
            REJECTED
          </div>
        );
      case JOB_APPLICATION_MATCH_STATUS.MOREINFO:
        return (
          <div className="flex text-sm font-rubik-medium items-center">
            <div className="w-2 h-2 rounded bg-electricBlue mr-2" />
            INFO REQUESTED
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <div key={keyId}>
      {open && (
        <ApplicantModal
          application={applicant}
          open={open}
          onClose={closeModal}
          jobId={jobId}
          applicationId={applicationId}
          appStatus={appStatus}
          jobStatus={jobStatus}
          onStatusChange={onStatusChange}
          matchedSkills={matchedSkills}
          customerRate={customerRate}
        />
      )}
      <div
        key={keyId}
        className={classNames(
          styles.applicationCard,
          "py-8 sm:px-4 px-3 mt-10 w-full overflow-hidden"
        )}
      >
        <div className="flex w-full">
          <div
            className={classNames(
              "rounded overflow-hidden sm:h-32 sm:w-32 h-20 w-20 flex-shrink-0"
            )}
          >
            {user.headshotKey ? (
              <ImageViewer objectKey={user.headshotKey} radius={70} />
            ) : (
              <div className="sm:h-32 sm:w-32 h-20 w-220 flex-shrink-0 bg-grey-800">
                <img
                  className="h-full w-full"
                  alt="placeholder"
                  src={placeholderPicture}
                />
              </div>
            )}
          </div>
          <div className="flex md:flex-row flex-col w-full">
            <div className="sm:ml-6 ml-3 w-full">
              <div>
                <div className="sm:flex">
                  <p className="font-nexa font-bold text-xl leading-5 tracking-wider mr-2">
                    {`${user.given_name} ${user.family_name[0]}`}.
                  </p>
                  <div
                    style={{
                      marginTop: "2px",
                    }}
                  >
                    {renderStatus(appStatus)}
                  </div>
                </div>
                {user?.countryName && (
                  <div className="text-gray-700 leading-snug font-rubik-regular tracking-wider mt-2">
                    {user?.countryName}
                  </div>
                )}
                <div className="tracking-wider leading-snug md:hidden block">
                  {startDate && (
                    <div className="text-electricBlue-500 font-rubik-bold italic mt-3">
                      Ready to start:&nbsp;
                      <span className="font-rubik-regular italic">
                        {`${dayjs(startDate)
                          .format("MM DD YYYY")
                          .split(" ")
                          .join("/")}`}
                      </span>
                    </div>
                  )}
                  {matchedDate && (
                    <div className="text-electricBlue-500 font-rubik-bold italic mt-3">
                      Matched date:&nbsp;
                      <span className="font-rubik-regular italic">
                        {`${dayjs(matchedDate)
                          .format("MM DD YYYY")
                          .split(" ")
                          .join("/")}`}
                      </span>
                    </div>
                  )}
                  {customerRate && customerRate?.value > 0 && (
                    <div className="text-electricBlue-500 font-rubik-bold italic mt-2">
                      Rate:&nbsp;
                      <span className="font-rubik-regular">
                        ${`${customerRate.value}/h`}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-sm font-rubik-regular leading-5 tracking-wider mt-2 flex flex-wrap items-start justify-start">
                {validatedSkills}
              </p>
            </div>
            <div className="md:mt-0 mt-4 overflow-visible flex-shrink-0 ml-3 relative">
              <GetStartedBtn
                label="view candidate"
                smallButton
                textColor={"black"}
                className="flex-nowrap flex-shrink-0 py-5 sm:px-5 px-3"
                onClick={openModal}
                hideArrow
                customPadding
              />
              <div className="text-center tracking-wider leading-snug md:block hidden">
                {startDate && (
                  <div className="text-electricBlue-500 font-rubik-bold italic mt-3">
                    Ready to start:&nbsp;
                    <span className="font-rubik-regular italic">
                      {`${dayjs(startDate)
                        .format("MM DD YYYY")
                        .split(" ")
                        .join("/")}`}
                    </span>
                  </div>
                )}
                {matchedDate && (
                  <div className="text-electricBlue-500 font-rubik-bold italic mt-3">
                    Matched date:&nbsp;
                    <span className="font-rubik-regular italic">
                      {`${dayjs(matchedDate)
                        .format("MM DD YYYY")
                        .split(" ")
                        .join("/")}`}
                    </span>
                  </div>
                )}
                {customerRate?.value > 0 && (
                  <>
                    <div className="text-electricBlue-500 font-rubik-bold italic mt-2">
                      Hourly Rate:&nbsp;
                      <span className="font-rubik-regular">
                        ${`${customerRate.value}`}
                      </span>
                    </div>
                    <div className="text-electricBlue-500 font-rubik-bold italic mt-2">
                      {weeklyTimeCommitment}:&nbsp;
                      <span className="font-rubik-regular">
                        $
                        {timeCommitment === "FULLTIME"
                          ? `${(customerRate.value * 40).toLocaleString()}`
                          : `${(customerRate.value * 20).toLocaleString()}`}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
