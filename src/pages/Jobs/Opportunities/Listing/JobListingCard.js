import { useState, useEffect } from "react";
import classNames from "classnames";
import {
  JOB_APPLICATION_MATCH_STATUS,
  JOB_APPLICATION_MATCH_SUB_STATUS,
  JOB_OPPORTUNITY_STATUSES,
} from "lookup";
import { Link, useHistory } from "react-router-dom";

import InfoPopover from "components/FormComponents/InfoPopover";
import Button from "components/FormComponents/Button";
import { roundToSpecificNumber } from "helpers/utils";
import editIcon from "images/edit.png";
import previewIcon from "images/preview.png";

export default function JobListingCard({ job, isAdmin, hasMultipleOwners }) {
  const history = useHistory();
  const [potentialMatches, setPotentialMatches] = useState(100);
  const matches = job.matches.items.filter(
    (match) =>
      match.status !== JOB_APPLICATION_MATCH_STATUS.SHORTLISTED &&
      match.status !== JOB_APPLICATION_MATCH_STATUS.SKIPPED &&
      match.status !== JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER
  ); //an array of all matches
  const applicants = job.matches.items.filter(
    (ele) =>
      ele.status === JOB_APPLICATION_MATCH_STATUS.APPLIED ||
      ele.status === JOB_APPLICATION_MATCH_STATUS.ACCEPTED ||
      ele.status === JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER ||
      ele.status === JOB_APPLICATION_MATCH_STATUS.MOREINFO
  );

  const finalists = job.matches.items.filter(
    (m) =>
      m.subStatus === JOB_APPLICATION_MATCH_SUB_STATUS.FINALIST &&
      (m.status === JOB_APPLICATION_MATCH_STATUS.ACCEPTED ||
        m.status === JOB_APPLICATION_MATCH_STATUS.APPLIED ||
        m.status === JOB_APPLICATION_MATCH_STATUS.MATCHED ||
        m.status === JOB_APPLICATION_MATCH_STATUS.MOREINFO)
  );

  const calibrations = job.matches.items.filter(
    (m) =>
      m.isCalibration &&
      m.status !== JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER &&
      m.status !== JOB_APPLICATION_MATCH_STATUS.SKIPPED &&
      m.status !== JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER
  );

  useEffect(() => {
    const applicationCount = job?.jobType?.applicationCount;

    const shouldPotentialMatchesChange = applicationCount >= potentialMatches;

    const potentialMatchesValue = shouldPotentialMatchesChange
      ? roundToSpecificNumber(applicationCount, 100)
      : potentialMatches;

    if (shouldPotentialMatchesChange) {
      setPotentialMatches(potentialMatchesValue);
    }
    //ignoring depency array to avoid adding potentialMatches, which could cause an infinite loop.
    // eslint-disable-next-line
  }, [job]);

  const statusColor = (() => {
    switch (job.status) {
      case JOB_OPPORTUNITY_STATUSES.ACTIVE:
        return `#5523a2`;
      case JOB_OPPORTUNITY_STATUSES.DRAFT:
        return `#701fd8`;
      case JOB_OPPORTUNITY_STATUSES.CANCELLED:
        return `#424b5a`;
      case JOB_OPPORTUNITY_STATUSES.FULFILLED:
        return `#007a94`;
      case JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL:
        return `#e7b73c`;
      default:
        return `black`;
    }
  })();
  const textColor =
    job.status === JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL
      ? "text-black"
      : "text-white";
  const editJobOpp = (id) => {
    history.push(`/jobs/opportunities/${id}/edit`);
  };

  const previewJobOpp = (id) => {
    history.push(`/jobs/opportunities/${id}/preview`);
  };

  const formatJobStatus = (status) => {
    let txt = status;

    switch (status) {
      case JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL:
        txt = "Pending";
        break;
      case JOB_OPPORTUNITY_STATUSES.CANCELLED:
        txt = "Canceled";
        break;
      default:
        txt = status;
    }

    return txt;
  };

  const allowEdit = () => {
    return (
      job.status === JOB_OPPORTUNITY_STATUSES.ACTIVE ||
      job.status === JOB_OPPORTUNITY_STATUSES.DRAFT
    );
  };

  const allowPreview = () => {
    return job.status !== JOB_OPPORTUNITY_STATUSES.DRAFT;
  };

  const renderMatchStatusCount = (num, title, linkTo) => {
    if (num === 0) {
      return (
        <div className="flex font-rubik-regular text-sm">{`${0} ${title}`}</div>
      );
    }

    return (
      <Link
        className="flex text-electricBlue-500 text-sm"
        to={linkTo}
      >{`${num} ${title}`}</Link>
    );
  };

  return (
    <div
      className="-m-0.5 p-0.5 flex shadow-xs relative"
      style={{
        background: `linear-gradient(to right, #83D9BB, #F4D675)`,
      }}
    >
      <div className="bg-white w-full">
        <div className="sm:flex sm:max-h-10 sm:h-full">
          <div
            className="w-28 flex items-center justify-center max-h-10  h-10"
            style={{ background: statusColor }}
          >
            <span className={classNames("uppercase font-bold", textColor)}>
              {formatJobStatus(job.status)}
            </span>
          </div>
          <div className="ml-6 sm:ml-3 sm:mt-1 mt-8 sm:self-center">
            <div>
              <p
                className="font-bold leading-4"
                style={{
                  color: "#202021",
                }}
              >
                {isAdmin && job.organization && (
                  <strong>{job.organization}: </strong>
                )}
                {job.title}
              </p>
            </div>
            {(isAdmin || hasMultipleOwners) && (
              <div className="text-gray-500 text-xs">
                {job.customerOwner?.username}
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-around w-12 m-4 absolute top-0 right-0">
          {allowPreview() && (
            <button onClick={() => previewJobOpp(job.id)}>
              <img
                src={previewIcon}
                alt="preview"
                title="preview"
                className="w-5 h-3"
              />
            </button>
          )}
          {allowEdit() && (
            <button onClick={() => editJobOpp(job.id)}>
              <img src={editIcon} alt="edit" title="edit" className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="flex justify-between flex-col sm:flex-row">
          <div className="m-4 sm:mt-2 ml-6 italic font-bold sm:py-4 pb-4 w-2/3 justify-between flex sm:flex-row flex-col sm:items-end">
            <div>
              <div className="flex sm:mt-0 mt-2">
                Candidate pool{" "}
                <InfoPopover>
                  <ul className="list-disc list-outside pl-5 font-rubik-regular font-normal">
                    <li>
                      <strong>Potential:</strong> The number of potential
                      candidates matching this job role.
                    </li>
                    <br />
                    <li>
                      <strong>Matched:</strong> The number of candidates Torc
                      has matched as a fit for this job opportunity.
                    </li>
                    <br />
                    <li>
                      <strong>Applied:</strong> The number of candidates who
                      have applied and want to work on this job opportunity.
                    </li>
                  </ul>
                </InfoPopover>
              </div>
              <div className="sm:mt-0 mt-2">{`${potentialMatches}+ Potential`}</div>
            </div>
            <div className="sm:mt-0 mt-2 flex items-center">
              {calibrations.length > 0 &&
                renderMatchStatusCount(
                  calibrations.length,
                  "Calibrations",
                  `/jobs/calibrations/${job.id}`
                )}
            </div>
            <div className="sm:mt-0 mt-2 flex items-center">
              {renderMatchStatusCount(
                matches.length,
                "Matched",
                `/jobs/${job.id}/matches`
              )}
            </div>
            <div className="sm:mt-0 mt-2 flex items-center">
              {renderMatchStatusCount(
                applicants.length,
                "Applied",
                `/jobs/applications/${job.id}`
              )}
            </div>
            {finalists.length > 0 && (
              <div className="sm:mt-0 mt-2 flex items-center">
                {renderMatchStatusCount(
                  finalists.length,
                  "Finalists",
                  `/jobs/finalists/${job.id}`
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col items-start sm:items-end gap-y-2 pb-4 pl-6 pr-10">
            <Button
              className="font-rubik-regular"
              bgColor="bg-yellow-400"
              onClick={() => history.push(`/jobs/applications/${job.id}`)}
              isReadOnly={!applicants.length}
            >
              See Applicants
            </Button>
            <Button
              className="font-rubik-regular"
              bgColor="bg-yellow-400"
              onClick={() => history.push(`/jobs/${job.id}/matches`)}
              isReadOnly={!matches.length}
            >
              See Matches
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
