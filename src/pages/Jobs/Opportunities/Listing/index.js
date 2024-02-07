import { useCallback, useEffect, useMemo, useReducer } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import { API, Auth, graphqlOperation } from "aws-amplify";
import qs from "query-string";

import {
  getUsersByCompany,
  listJobOpportunities,
  getJobOpportunityMatchesForCount,
} from "graphql/queries";
import JobListingReducer, { ACTION_TYPES } from "./reducer";
import { JOB_OPPORTUNITY_STATUSES } from "lookup";

import Footer from "components/Footer";
import Select from "components/FormComponents/Select";
import Header from "components/Header";
import JobListing from "./JobListingCard";
import Button from "components/FormComponents/Button";
import PaginationArrows from "components/PaginationArrows";

import arrow from "images/arrow-whitebg.png";
import { sortByStatus } from "./helpers";
import { useAuth } from "GlobalAuthContext";
import { loadJobOpportunityMatches } from "utils/loadJobOpportunityMatches";
import MultiSelect from "components/MultiSelect";
import { isEqual } from "lodash";

const INITIAL_STATE = {
  loadingOpps: true,
  jobOpps: [],
  statusFilters: [
    {
      label: "Active",
      value: JOB_OPPORTUNITY_STATUSES.ACTIVE,
      isActive: true,
    },
    {
      label: "Pending Approval",
      value: JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL,
      isActive: true,
    },
    {
      label: "Fulfilled",
      value: JOB_OPPORTUNITY_STATUSES.FULFILLED,
    },
    {
      label: "Canceled",
      value: JOB_OPPORTUNITY_STATUSES.CANCELLED,
    },
    {
      label: "Draft",
      value: JOB_OPPORTUNITY_STATUSES.DRAFT,
      isActive: true,
    },
  ],
  companyFilters: "All",
  companyNames: [],
  jobTypeFilter: "All",
  jobTypes: [],
  paginationTokens: [null],
  pageNumber: 1,
  pageLimit: 5,
  loadingGroups: true,
  cognitoGroups: [],
  customerOwnerFilter: "All",
  customerOwnerNames: [],
};

const ITEM_LIMIT = 500;

export default function JobOppsListing() {
  const [state, dispatch] = useReducer(JobListingReducer, INITIAL_STATE);
  const {
    location: { pathname, search },
  } = useHistory();
  const { user } = useAuth();
  const jobsByStatus = useMemo(() => {
    let output = [];

    if (state.jobOpps.length) {
      output = sortByStatus(state.jobOpps);
    }

    return output;
  }, [state.jobOpps]);

  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const canUserAccessJobOpps = useCallback(() => {
    return state.cognitoGroups.includes(
      process.env.REACT_APP_COGNITO_CUSTOMER_JOB_APPROVED_GROUP
    );
  }, [state.cognitoGroups]);

  const isAdmin = useCallback(() => {
    return (
      state.cognitoGroups.includes(process.env.REACT_APP_COGNITO_ADMIN_GROUP) ||
      state.cognitoGroups.includes(
        process.env.REACT_APP_COGNITO_GROUP_JOB_MANAGERS
      )
    );
  }, [state.cognitoGroups]);

  const prepareSelectedFilters = useCallback(() => {
    const parsed = qs.parse(search);

    Object.keys(parsed).forEach((key) => {
      switch (key) {
        case "filter": {
          const statusFiltersLabels = parsed[key].split(",");
          const validValues = statusFiltersLabels.filter(
            (label) =>
              !!state.statusFilters.find(
                (statusFilter) => statusFilter.label === label
              )
          );
          if (!!validValues.length) {
            const activeStatusFiltersLabels = state.statusFilters
              .filter((e) => e.isActive)
              .map((e) => e.label);
            if (!isEqual(statusFiltersLabels, activeStatusFiltersLabels)) {
              dispatch({
                type: ACTION_TYPES.STATUS_FILTERS_QS_CHANGED,
                statusFilters: statusFiltersLabels,
              });
            }
          }

          break;
        }

        case "companyFilters":
          const chosenCompany = state?.companyNames.find(
            (company) => company === parsed[key]
          );

          if (chosenCompany) {
            dispatch({
              type: ACTION_TYPES.COMPANY_FILTER_CHANGED,
              companyFilters: parsed[key],
            });
          }

          break;

        case "jobTypeFilter": {
          const chosenJobType = state?.jobTypes.find(
            (type) => type === parsed[key]
          );

          if (chosenJobType) {
            dispatch({
              type: ACTION_TYPES.JOB_TYPES_CHANGED,
              jobTypeFilter: parsed[key],
            });
          }

          break;
        }

        case "customerOwnerFilter": {
          const chosenOwner = state?.customerOwnerNames.find(
            (owner) => owner === parsed[key]
          );
          if (chosenOwner) {
            dispatch({
              type: ACTION_TYPES.CUSTOMER_OWNER_FILTER_CHANGED,
              customerOwnerFilter: parsed[key],
            });
          }

          break;
        }

        default: {
          break;
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.loadingOpps]);

  // Fetch groups the logged in user belongs to
  useEffect(() => {
    let isMounted = true;
    document.title = `Job Postings`;

    (async () => {
      try {
        const auth = await Auth.currentSession();

        const groups = auth.getAccessToken().payload["cognito:groups"] || [];

        if (isMounted) {
          dispatch({
            type: ACTION_TYPES.COGNITO_GROUPS_LOADED,
            groups,
          });
        }
      } catch (err) {
        console.log("Error getting current session", err);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Load list of opportunities
  useEffect(() => {
    let isMounted = true;

    (async () => {
      let items;

      const activeOptions = state.statusFilters.filter(
        (option) => option.isActive
      );
      const filterStatusExp = activeOptions.map((option) => ({
        status: { eq: option.value },
      }));

      const qsExp = activeOptions.map((e) => e.label);

      updateQs("filter", qsExp);

      const filter = {
        and: { status: { ne: JOB_OPPORTUNITY_STATUSES.DELETED } },
      };

      if (!!filterStatusExp.length) {
        filter.or = filterStatusExp;
      }

      let nextToken = state.paginationTokens.length
        ? state.paginationTokens[state.paginationTokens.length - 1]
        : null;

      const res = await API.graphql(
        graphqlOperation(listJobOpportunities, {
          filter,
          limit: ITEM_LIMIT,
          nextToken,
        })
      );

      items = res.data.listJobOpportunitys.items;
      nextToken = res.data.listJobOpportunitys.nextToken;

      if (isMounted) {
        const companyNames = {};
        const jobTypes = {};

        for (let job of items) {
          if (job.matches?.nextToken) {
            job.matches.items = [
              ...job.matches.items,
              ...(await loadJobOpportunityMatches(
                job.id,
                getJobOpportunityMatchesForCount,
                job.matches.nextToken
              )),
            ];
          }
          const company = job.organization;
          const jobType = job?.jobType?.title;

          if (company && !companyNames[company]) {
            companyNames[company] = company;
          }

          if (jobType && !jobTypes[jobType]) {
            jobTypes[jobType] = true;
          }
        }

        dispatch({
          type: ACTION_TYPES.JOB_TYPES,
          jobTypes: Object.keys(jobTypes).sort(),
        });

        dispatch({
          type: ACTION_TYPES.COMPANY_NAMES,
          companyNames: Object.keys(companyNames).sort(),
        });

        dispatch({
          type: ACTION_TYPES.LOADING_OPPORTUNITIES_COMPLETED,
          jobOpps: items,
          nextToken: nextToken,
        });
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.pageNumber, state.statusFilters]);

  // Fetch users in company when company field changes
  useEffect(() => {
    if (state.companyFilters === "All") {
      // Filter by customer is `All`.
      // We cannot fetch all users across all companies.
      // In other words, we cannot show this filter to the user
      // Thus, we clear any values set in the customer owner filter
      dispatch({
        type: ACTION_TYPES.CUSTOMER_OWNER_NAMES,
        customerOwnerNames: [],
      });

      onCustomerOwnerChange("All");

      return;
    }

    (async () => {
      try {
        const { data } = await API.graphql(
          graphqlOperation(getUsersByCompany, { company: state.companyFilters })
        );
        dispatch({
          type: ACTION_TYPES.CUSTOMER_OWNER_NAMES,
          customerOwnerNames: data?.getUsersByCompany?.items
            ?.map(({ username }) => username)
            .sort(),
        });
      } catch (error) {
        console.error("Error fetching users by company:", error);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.companyFilters]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(prepareSelectedFilters, [state.loadingOpps]);

  // Set the default customer filter based on the type of user
  useEffect(() => {
    if (!isAdmin()) {
      onCustomerChange(user.company);
    } else {
      onCustomerChange("All");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAdmin]);

  const updateQs = useCallback(
    (key, value) => {
      searchParams.set(key, value);
      const url = `#${pathname}?${searchParams.toString()}`;
      window.history.pushState({}, "", url);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  const handleStatusFilterChange = (label) => {
    dispatch({
      type: ACTION_TYPES.STATUS_FILTER_CHANGED,
      label,
    });
  };

  const handleOnResetStatusFilters = () => {
    dispatch({
      type: ACTION_TYPES.STATUS_FILTERS_RESET_SELECTED,
      filter: INITIAL_STATE.statusFilters,
    });
  };

  const handleOnClearAllStatusFilters = () => {
    dispatch({
      type: ACTION_TYPES.STATUS_FILTERS_CLEARED,
    });
  };

  const onCustomerChange = useCallback((companyFilters) => {
    dispatch({
      type: ACTION_TYPES.COMPANY_FILTER_CHANGED,
      companyFilters,
    });
  }, []);

  useEffect(() => {
    updateQs("companyFilters", state.companyFilters);
  }, [updateQs, state.companyFilters]);

  const onCustomerOwnerChange = useCallback((customerOwnerFilter) => {
    dispatch({
      type: ACTION_TYPES.CUSTOMER_OWNER_FILTER_CHANGED,
      customerOwnerFilter,
    });
  }, []);

  useEffect(() => {
    updateQs("customerOwnerFilter", state.customerOwnerFilter);
  }, [updateQs, state.customerOwnerFilter]);

  const onJobTypeChange = useCallback((jobTypeFilter) => {
    dispatch({
      type: ACTION_TYPES.JOB_TYPES_CHANGED,
      jobTypeFilter,
    });
  }, []);

  useEffect(() => {
    updateQs("jobTypeFilter", state.jobTypeFilter);
  }, [updateQs, state.jobTypeFilter]);

  const onClickNext = () => {
    dispatch({
      type: ACTION_TYPES.LOADING_NEXT_PAGE,
    });
  };

  const onClickPrevious = () => {
    dispatch({
      type: ACTION_TYPES.LOADING_PREVIOUS_PAGE,
    });
  };

  if (state.loadingGroups) {
    return null;
  } else if (!canUserAccessJobOpps()) {
    return <Redirect to="/NotFound" />;
  }

  return (
    <>
      <Header
        backgroundStyle={{
          background: `linear-gradient(135deg, #E5AB8E, #BA89CD)`,
        }}
        pageHeader={
          <div className="max-w-3xl mx-auto pb-8 flex flex-col gap-4 px-4">
            <h1 className="font-nexa font-bold tracking-wide text-4xl">
              My jobs
            </h1>
          </div>
        }
      />
      <div>
        <div className="w-full relative pb-12">
          <div
            className="absolute top-0 left-0 w-full bg-white"
            style={{ height: `calc(100% - 20rem)` }}
          />
          <div className="relative" style={{ zIndex: 2 }}>
            <div className="max-w-3xl mx-auto my-12 flex flex-col gap-8 px-4">
              <div className="flex flex-col justify-between items-start">
                <p className="text-2xl tracking-wider font-nexa text-electricBlue-500">
                  Your next developer is right around the corner.
                </p>
                <p className="font-rubik-regular font-medium text-lg mt-8 md:w-2/3 w-3/4">
                  Post a new job, manage existing jobs, and review your
                  candidates below.
                </p>
                <div className="mt-8 ml-3">
                  <Link to="/jobs/opportunities/create">
                    <Button
                      bgColor="bg-black"
                      className="flex items-center"
                      text="text-white"
                    >
                      Post a new job
                      <img src={arrow} alt="" className="ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="sm:flex sm:justify-between">
                <div className="sm:w-[51%] w-full">
                  <h2 className="text-xl font-nexa mb-4">
                    Filter jobs by status
                  </h2>
                  <MultiSelect
                    options={state.statusFilters}
                    onClearAll={handleOnClearAllStatusFilters}
                    onOptionChange={handleStatusFilterChange}
                    onResetToDefault={handleOnResetStatusFilters}
                    initialDefaultValues={INITIAL_STATE.statusFilters.filter(
                      (e) => e.isActive
                    )}
                  />
                </div>
                {isAdmin() && (
                  <div className="sm:w-2/5 w-full sm:mt-0 mt-8">
                    <h2 className="text-xl font-nexa mb-4">
                      Filter by job type
                    </h2>
                    <Select
                      value={state.jobTypeFilter}
                      onChange={(evt) => void onJobTypeChange(evt.target.value)}
                    >
                      <option>All</option>
                      {state?.jobTypes?.map((type) => (
                        <option value={type} key={`type-${type}`}>
                          {type}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
              </div>
              <div className="sm:flex sm:justify-between">
                {isAdmin() && (
                  <div className="sm:w-[51%] w-full">
                    <h2 className="text-xl font-nexa mb-4">
                      Filter by customer
                    </h2>
                    <Select
                      value={state.companyFilters}
                      onChange={(evt) =>
                        void onCustomerChange(evt.target.value)
                      }
                    >
                      <option>All</option>
                      {state?.companyNames?.map((company) => (
                        <option value={company} key={`company-${company}`}>
                          {company}
                        </option>
                      ))}
                    </Select>
                  </div>
                )}
                {(state?.customerOwnerNames?.length > 1 || isAdmin()) &&
                  state.companyFilters !== "All" && (
                    <div className="sm:w-2/5 w-full">
                      <h2 className="text-xl font-nexa mb-4">
                        Filter by owner
                      </h2>
                      <Select
                        value={state.customerOwnerFilter}
                        onChange={(evt) =>
                          void onCustomerOwnerChange(evt.target.value)
                        }
                      >
                        <option>All</option>
                        {state?.customerOwnerNames?.map((owner) => (
                          <option value={owner} key={`owner-${owner}`}>
                            {owner}
                          </option>
                        ))}
                      </Select>
                    </div>
                  )}
              </div>

              <div className="flex justify-between gap-4">
                <PaginationArrows
                  onClickLeft={onClickPrevious}
                  onClickRight={onClickNext}
                  leftDisabled={state.pageNumber === 1}
                  rightDisabled={
                    state.paginationTokens[
                      state.paginationTokens.length - 1
                    ] === null
                  }
                />
              </div>

              {state.loadingOpps && (
                <div className="flex justify-center">
                  <span className="loader"></span>
                </div>
              )}

              {!state.loadingOpps &&
                jobsByStatus.length > 0 &&
                jobsByStatus.map((job, i) => {
                  if (
                    state.jobTypeFilter !== "All" &&
                    job?.jobType?.title !== state.jobTypeFilter
                  )
                    return null;

                  const companyName = job.organization;

                  if (
                    state.companyFilters !== "All" &&
                    companyName !== state.companyFilters
                  )
                    return null;

                  const ownerName = job?.customerOwner?.username;
                  if (
                    state.customerOwnerFilter !== "All" &&
                    ownerName !== state.customerOwnerFilter
                  )
                    return null;

                  return (
                    <JobListing
                      key={i}
                      job={job}
                      isAdmin={isAdmin()}
                      hasMultipleOwners={state?.customerOwnerNames?.length > 1}
                    />
                  );
                })}
              {!state.loadingOpps && jobsByStatus.length === 0 && (
                <h2 className="text-xl  font-nexa text-gray-300">
                  Oops. There are no jobs to show. Please change the status
                  filter or add a new job.
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
