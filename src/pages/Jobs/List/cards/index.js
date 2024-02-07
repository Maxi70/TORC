import classNames from "classnames";
import styles from "../JobsList.module.css";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import RenderAppStatus from "components/RenderAppStatus";
import { Link } from "react-router-dom";

const JobCard = ({
  job,
  path = "/jobs/roles",
  fullWidth,
  fullJob,
  match,
  hideRange,
  applied,
  status,
  jobReferral,
  isJobWidget,
}) => {
  function displayPayRangeRates() {
    const range = [job?.AverageRateLow ?? "N/A", job?.AverageRateHigh ?? "N/A"];
    if (job.AverageRateHigh === job.AverageRateLow) {
      return job.AverageRateHigh;
    }

    return `${Math.min(...range)}-${Math.max(...range)}`;
  }

  const skillNames = job.skills?.map((skill) => skill.name).join(", ");

  return (
    <div
      className={classNames(
        styles.gradientWrapper,
        "shadow-xs hover:shadow-sm transition-shadow my-4 max-w-5xl w-full bg-white"
      )}
    >
      <div
        className={classNames(
          "bg-white py-6 px-6",
          {
            "md:py-9 md:px-2 lg:px-6": fullWidth,
          },
          { "!px-3 !py-2": isJobWidget }
        )}
      >
        {isJobWidget && (
          <div className={classNames("flex flex-row justify-between mb-2")}>
            <RenderAppStatus status={status} type="freelancer" />
            {jobReferral && (
              <div>
                <p className="text-sm font-rubik-regular">
                  Referred by:{" "}
                  <span className="font-semibold">
                    {jobReferral.jobReferrerUsername}
                  </span>
                </p>
              </div>
            )}
          </div>
        )}

        <div
          className={classNames(
            styles.jobListItem,
            "flex flex-col justify-between",
            { "md:flex-row": fullWidth },
            { [styles.jobListItemFixedHeight]: !fullWidth }
          )}
        >
          <div
            className={classNames("w-full", {
              "md:w-1/3": fullWidth,
              "!w-full": isJobWidget,
            })}
          >
            <div
              className={classNames(
                "font-nexa font-bold tracking-wider text-xl",
                { "!text-xl lg:!text-base ": isJobWidget }
              )}
            >
              {job.displayName}
            </div>
            <h4
              className={classNames(
                "font-rubik-regular text-sm italic text-electricBlue font-light mb-8 mt-3 block md:hidden pr-16",
                { "md:pr-4": fullWidth }
              )}
            >
              {skillNames}
            </h4>
          </div>

          <div
            className={classNames(
              "font-rubik-regular text-electricBlue-800 font-medium italic text-sm mt-7",
              { "md:ml-2 md:mr-2 md:mt-0 md:pr-4": fullWidth }
            )}
          >
            <div>{job.commitment}</div>
            <div>{job.length}</div>
            {!hideRange && <div>Rate: {displayPayRangeRates()}</div>}
          </div>
          {/* <div className="md:w-full w-full"> */}
          <div>
            <Link
              to={{
                pathname: `${path}/${job.id}`,
                state: { job: fullJob, match, applied, jobRole: job },
              }}
            >
              <GetStartedBtn
                label={isJobWidget ? "View Job" : "View Details"}
                className={classNames("text-black flex-nowrap mt-6 w-44", {
                  "md:mt-0": fullWidth,
                })}
                uppercase
                hideArrow
                smallButton
                alt="View Job Details"
              />
            </Link>
            {applied && !status && (
              <div className="font-rubik-regular mt-6 flex items-center  ml-3">
                <div className="w-2 h-2 rounded bg-green-900 mr-2" />
                application accepted
              </div>
            )}
          </div>
          {/* </div> */}
        </div>
        <h4
          className={classNames(
            "font-rubik-regular text-sm italic text-electricBlue font-light mb-8 mt-4 hidden md:block",
            { "mt-0.5": isJobWidget }
          )}
        >
          {skillNames}
        </h4>
      </div>
    </div>
  );
};

export default JobCard;
