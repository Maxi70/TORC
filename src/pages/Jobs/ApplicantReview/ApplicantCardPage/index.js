import { useMemo, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { cloneDeep } from "lodash";

import MatchCard from "components/MatchCard";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import dayjs from "dayjs";
import Filters from "./molecules/Filters";
import { JOB_APPLICATION_MATCH_STATUS_LABEL } from "lookup";

const APPLICATIONS_COUNT_PER_PAGE = 6;
const MATCH_STATUS_SORTING = [
  "REJECTEDBYCUSTOMER",
  "REJECTEDBYMEMBER",
  "ACCEPTED",
  "MOREINFO",
  "APPLIED",
  "SHORTLISTED",
  "SKIPPED",
];

const sortByStatusAndDate = (applications) =>
  [...applications].sort((a, b) => {
    let firstStatusPriority = MATCH_STATUS_SORTING.indexOf(a.status);
    let secondStatusPriority = MATCH_STATUS_SORTING.indexOf(b.status);

    if (firstStatusPriority === -1) {
      firstStatusPriority = 100;
    }

    if (secondStatusPriority === -1) {
      secondStatusPriority = 100;
    }

    return (
      firstStatusPriority - secondStatusPriority ||
      (dayjs(a.createdAt).isAfter(dayjs(b.createdAt)) ? -1 : 1)
    );
  });

const createFilter = (apps, filterKey) => {
  const filter = {};
  const clonedApps = cloneDeep(apps).sort((a, b) =>
    a[filterKey] < b[filterKey] ? -1 : 1
  );

  clonedApps.forEach((app) => {
    filter[app[filterKey]] = {
      label: JOB_APPLICATION_MATCH_STATUS_LABEL[app[filterKey]],
      value: true,
    };
  });

  return filter;
};

export default function ApplicantCardPage({
  jobOpp,
  applications,
  jobSkills,
  jobStatus,
  timeCommitment,
}) {
  const [page, setPage] = useState(1);
  const jobSkillsArr = jobSkills.map((ele) => ele.name);
  const sortedApplications = useMemo(
    () => sortByStatusAndDate(applications),
    [applications]
  );
  const endPage = page * APPLICATIONS_COUNT_PER_PAGE;

  const fromToTitle = useCallback(
    (total) => {
      const fromByPage =
        page === 1 ? page : APPLICATIONS_COUNT_PER_PAGE * (page - 1) + 1;

      const toByPage = (() => {
        switch (true) {
          case APPLICATIONS_COUNT_PER_PAGE > total:
            return total;

          case page === 1:
            return APPLICATIONS_COUNT_PER_PAGE;

          case APPLICATIONS_COUNT_PER_PAGE * page > total:
            return total;

          default:
            return APPLICATIONS_COUNT_PER_PAGE * page;
        }
      })();

      const fromPart = `Showing ${fromByPage}`;
      const toPart = toByPage === fromByPage ? "" : ` - ${toByPage}`;
      const totalPart = ` of ${total}`;

      return `${fromPart}${toPart}${totalPart}`;
    },
    [page]
  );

  const [filters, setFilters] = useState({
    status: createFilter(sortedApplications, "status"),
  });

  const preparedApps = useMemo(() => {
    let output = cloneDeep(sortedApplications);

    Object.keys(filters).forEach((filtersKey) => {
      const filtersByKey = filters[filtersKey];

      Object.keys(filtersByKey).forEach((filterKey) => {
        const filterByKey = filtersByKey[filterKey];

        if (!filterByKey.value) {
          output = output.filter((app) => app[filtersKey] !== filterKey);
        }
      });
    });

    return output;
  }, [filters, sortedApplications]);

  const pages = Math.ceil(preparedApps.length / APPLICATIONS_COUNT_PER_PAGE);

  return (
    <div
      className={classNames(
        "bg-white w-full flex items-center justify-center pb-20 md:px-20 px-8 py-10"
      )}
      id="application_page"
    >
      <div className="max-w-5xl w-full">
        <div className="flex flex-col"></div>
        <div className="flex w-full justify-between">
          <div className="mt-4 flex-1">
            <Link
              to="/jobs/opportunities"
              className="font-nexa font-bold hover:text-blue-500"
            >
              &lt; Back to My Jobs
            </Link>
            <h3 className="text-2xl font-nexa tracking-wider text-electricBlue-700">
              Applicants
            </h3>
          </div>
          <div className="flex flex-col items-end flex-1 justify-end">
            <Link
              className="hover:text-current"
              to={`/jobs/${jobOpp.id}/matches`}
            >
              <GetStartedBtn
                label="View Matches"
                smallButton
                textColor={"black"}
                hideArrow
                customPadding
                className="px-4"
              />
            </Link>
            {preparedApps.length > 0 && (
              <div className="flex items-end">
                {preparedApps.length > APPLICATIONS_COUNT_PER_PAGE && (
                  <div className="flex justify-center relative top-2 font-rubik-regular rounded text-lg font-bold bg-white text-bluepurple mr-3">
                    {Math.ceil(endPage / APPLICATIONS_COUNT_PER_PAGE)} /{" "}
                    {Math.ceil(
                      preparedApps.length / APPLICATIONS_COUNT_PER_PAGE
                    )}
                  </div>
                )}
                <button
                  onClick={() => setPage((prev) => prev - 1)}
                  className={classNames(
                    page > 1 ? "visible" : "invisible",
                    "flex items-center justify-center w-6 h-6 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white hover:bg-bluepurple hover:text-white border-2 border-bluepurple text-bluepurple mr-1"
                  )}
                  style={{
                    marginBottom: "1.5px",
                  }}
                >
                  &lt;
                </button>
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className={classNames(
                    page < pages ? "visible" : "invisible",
                    "flex items-center justify-center w-6 h-6 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white hover:bg-bluepurple hover:text-white border-2 border-bluepurple text-bluepurple ml-1"
                  )}
                  style={{
                    marginBottom: "1.5px",
                  }}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </div>

        {applications.length === 0 && (
          <p className="font-nexa text-red-400 leading-8 text-2xl tracking-wider mt-4">
            This job has no applicants
          </p>
        )}
        {preparedApps.length > 0 && (
          <div className="flex items-end flex-1 justify-center">
            <p className="font-nexa tracking-wider text-electricBlue-700">
              {fromToTitle(preparedApps.length)}
            </p>
          </div>
        )}

        <div className="mt-4">
          <Filters
            filters={filters}
            onChange={setFilters}
            setFirstPage={() => setPage(1)}
          />
        </div>

        <div>
          {preparedApps
            ?.slice(endPage - 6, endPage)
            ?.map(
              (props) =>
                props.application.user && (
                  <MatchCard
                    key={props.application.id}
                    match={props}
                    user={props.application.user}
                    jobSkills={jobSkillsArr}
                    jobOpp={jobOpp}
                    jobStatus={jobStatus}
                    isApplicantsList
                  />
                )
            )}
        </div>
        {preparedApps.length > 0 && (
          <div className="flex flex-1 justify-center mt-10">
            <p className="font-nexa tracking-wider text-electricBlue-700">
              {fromToTitle(preparedApps.length)}
            </p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div className="flex-1" />
          <div className="flex items-center flex-1 justify-end">
            {preparedApps.length > APPLICATIONS_COUNT_PER_PAGE && (
              <div className="flex justify-center relative top-2 font-rubik-regular rounded text-lg font-bold bg-white text-bluepurple mb-3 mr-2">
                {Math.ceil(endPage / APPLICATIONS_COUNT_PER_PAGE)} /{" "}
                {Math.ceil(preparedApps.length / APPLICATIONS_COUNT_PER_PAGE)}
              </div>
            )}
            <button
              onClick={() => setPage((prev) => prev - 1)}
              className={classNames(
                page > 1 ? "visible" : "invisible",
                "flex items-center justify-center w-6 h-6 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white hover:bg-bluepurple hover:text-white border-2 border-bluepurple text-bluepurple mb-3 mr-1"
              )}
            >
              &lt;
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className={classNames(
                page < pages ? "visible" : "invisible",
                "flex items-center justify-center w-6 h-6 relative top-2 font-rubik-regular rounded text-lg font-bold bg-white hover:bg-bluepurple hover:text-white border-2 border-bluepurple text-bluepurple mb-3 ml-1"
              )}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
