import classNames from "classnames";

import JobCard from "pages/Jobs/List/cards";
import { getJobDuration } from "helpers/utils";

import Button from "components/FormComponents/Button";
import { Link } from "react-router-dom";
import "./index.css";

export const JobWidget = ({
  title,
  jobElements,
  description,
  className,
  titleTextColor,
  condensedLimit,
}) => {
  if (jobElements.length === 0) {
    return null;
  }

  const elements =
    condensedLimit && jobElements.length > condensedLimit
      ? jobElements.slice(0, condensedLimit)
      : jobElements;

  return (
    <div className={classNames("p-2 w-full lg:w-1/2 jobwidget", className)}>
      <div className="border-2 bg-white h-full shadow-xs p-4">
        <h5 className={classNames("font-bold", titleTextColor)}>{title}</h5>
        <p className="xl:w-[68%] md:w-[90%] header">{description}</p>
        {elements.map((result, index) => {
          const { jobOpportunity } = result;
          const {
            id,
            title,
            skills,
            jobLength,
            jobLengthInWeeks,
            timeCommitment,
          } = result.applicationId ? jobOpportunity : result;
          return (
            <section key={`${id}_${index}`} className="mt-6">
              <JobCard
                path="/jobs/matches"
                job={{
                  displayName: title,
                  skills,
                  commitment: timeCommitment,
                  length: getJobDuration(jobLength, jobLengthInWeeks),
                  id,
                }}
                status={result.applicationId && result.status}
                jobReferral={result.jobReferral}
                fullJob={jobOpportunity}
                match={result.applicationId ? result : null}
                isJobWidget
                fullWidth
                hideRange
              />
            </section>
          );
        })}
        {condensedLimit && jobElements.length > condensedLimit && (
          <div className="mt-14 text-center">
            <Link to="/jobs/matches">
              <Button className="font-rubik-regular" bgColor="bg-yellow-200">
                More
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
