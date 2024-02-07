import React, { useState, useEffect, useRef } from "react";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { useAuth } from "GlobalAuthContext";

import {
  JOB_APPLICATION_MATCH_STATUS,
  JOB_OPPORTUNITY_STATUSES,
  JOB_OPPORTUNITY_VISIBILITY_LEVELS,
  REFERRAL_TYPES,
} from "lookup";
import {
  getFreelancerMatches,
  listJobOpportunitiesByVisibility,
  listReferralsByUser,
} from "graphql/queries";
import { sleep } from "utils/general";
import { JobWidget } from "components/JobWidget";
import classNames from "classnames";

const matchQueryFilter = {
  or: [
    { status: { eq: JOB_APPLICATION_MATCH_STATUS.ACCEPTED } },
    { status: { eq: JOB_APPLICATION_MATCH_STATUS.MATCHED } },
    { status: { eq: JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER } },
    { status: { eq: JOB_APPLICATION_MATCH_STATUS.APPLIED } },
    { status: { eq: JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK } },
    { status: { eq: JOB_APPLICATION_MATCH_STATUS.INTERESTED } },
  ],
};

const JobWidgetsWrapper = ({ condensed }) => {
  const auth = useAuth();
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [hotJobs, setHotJobs] = useState([]);
  const [exclusiveJobs, setExclusiveJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userMatchesRef = useRef({});
  const userJobReferralsRef = useRef([]);
  const PROFESSIONAL_COMMUNITY =
    process.env.REACT_APP_COGNITO_GROUP_PROFESSIONAL_COMMUNITY;

  useEffect(() => {
    (async () => {
      try {
        const session = await Auth.currentSession();

        const cognitoGroups =
          session.getAccessToken().payload["cognito:groups"] || [];

        const response = await API.graphql({
          query: getFreelancerMatches,
          variables: { id: auth.user.id, filter: matchQueryFilter },
        });
        const reqUser = response.data.getUser;

        const userJobMatches = await getUserJobMatches(reqUser);

        const userExclusiveJobs = await getExclusiveJobs(cognitoGroups);

        const userHotJobs = await getHotJobs();

        const mappedUserMatchesSharedReferralJobs = mapSharedJobReferralJobs(
          userJobMatches,
          userJobReferralsRef.current
        );
        setMatchedJobs(mappedUserMatchesSharedReferralJobs);

        const mappedExclusiveJobs = mapExclusiveJobs(userExclusiveJobs);
        setExclusiveJobs(mappedExclusiveJobs);

        const mappedUserHotJobs = mapHotJobs(userHotJobs);
        setHotJobs(mappedUserHotJobs);
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mapExclusiveJobs = (userExclusiveJobs) => {
    const mappedExclusiveSharedMatchJobs = mapSortSharedMatchedJobs(
      userExclusiveJobs,
      userMatchesRef.current
    ).filter(
      (j) =>
        j.status !== JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK &&
        j.status !== JOB_APPLICATION_MATCH_STATUS.APPLIED
    );
    return mapSharedJobReferralJobs(
      mappedExclusiveSharedMatchJobs,
      userJobReferralsRef.current
    );
  };

  const mapHotJobs = (userHotJobs) => {
    const mappedHotSharedMatchJobs = mapSortSharedMatchedJobs(
      userHotJobs,
      userMatchesRef.current
    ).filter(
      (j) =>
        j.status !== JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK &&
        j.status !== JOB_APPLICATION_MATCH_STATUS.APPLIED
    );
    return mapSharedJobReferralJobs(
      mappedHotSharedMatchJobs,
      userJobReferralsRef.current
    );
  };

  const mapSharedJobReferralJobs = (jobs, userJobReferrals) => {
    return jobs.map((job) => {
      const jobReferral = userJobReferrals.find(
        ({ jobOpportunityId }) =>
          jobOpportunityId === job.jobOpportunityId ||
          jobOpportunityId === job.id
      );
      if (jobReferral) {
        return { ...job, jobReferral: { ...jobReferral } };
      }
      return job;
    });
  };

  const mapSortSharedMatchedJobs = (jobs, matches) => {
    const mappedJobMatches = jobs.map((job) => {
      const match = matches.find(
        ({ jobOpportunityId }) => jobOpportunityId === job.id
      );
      if (match) {
        return match;
      }
      return job;
    });

    const matchedJobs = mappedJobMatches.filter((e) => e.applicationId);
    const jobOpps = mappedJobMatches.filter((e) => !e.applicationId);

    const sortedByStartDateJobs = [...jobOpps].sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );

    return [...matchedJobs, ...sortedByStartDateJobs];
  };

  const loadUserMatches = async (userId, applicationId, nextToken = null) => {
    const response = await API.graphql({
      query: getFreelancerMatches,
      variables: {
        id: userId,
        nextToken,
        filter: matchQueryFilter,
        applicationFilter: { id: { eq: applicationId } },
      },
    });
    const applications = response.data.getUser.applications.items;

    const application = applications.find((app) => app.id === applicationId);

    if (application.matches.nextToken) {
      await sleep(250);
      const matchesNextPortions = await loadUserMatches(
        userId,
        application.id,
        application.matches.nextToken
      );

      return [...application.matches.items, ...matchesNextPortions];
    }

    return application.matches.items;
  };

  const getUserJobMatches = async (user) => {
    const userMatches = [];
    const applications = user.applications.items;

    for (const application of applications) {
      userMatches.push(...application.matches.items);
      if (application.matches.nextToken) {
        const result = await loadUserMatches(
          auth.user.id,
          application.id,
          application.matches.nextToken
        );
        userMatches.push(...result);
      }
    }
    userMatchesRef.current = userMatches;
    return userMatches.filter(
      (match) =>
        match.jobOpportunity?.status === JOB_OPPORTUNITY_STATUSES.ACTIVE
    );
  };

  const loadRecords = async (queryObj, nextToken = null) => {
    const response = await API.graphql(
      graphqlOperation(queryObj.query, {
        ...queryObj.payload,
        nextToken,
      })
    );
    const jobReferrals = response.data[queryObj.name];

    if (jobReferrals.nextToken) {
      await sleep(250);
      const jobReferralsNextPortions = await loadRecords(
        queryObj,
        jobReferrals.nextToken
      );

      return [...jobReferrals.items, ...jobReferralsNextPortions];
    }

    return jobReferrals.items;
  };

  const getHotJobs = async () => {
    const publicJobsForUser = await loadRecords({
      query: listJobOpportunitiesByVisibility,
      name: "listJobOpportunitiesByVisibility",
      payload: {
        visibilityLevel: JOB_OPPORTUNITY_VISIBILITY_LEVELS.PUBLIC,
        filter: {
          status: {
            eq: JOB_OPPORTUNITY_STATUSES.ACTIVE,
          },
        },
      },
    });
    return publicJobsForUser;
  };

  const getExclusiveJobs = async (cognitoGroups) => {
    const jobReferrals =
      (await loadRecords({
        query: listReferralsByUser,
        name: "listReferralsByUser",
        payload: {
          userId: auth.user.id,
          filter: { referralType: { eq: REFERRAL_TYPES.JOB } },
        },
      })) || [];

    userJobReferralsRef.current = jobReferrals.filter(
      (item) => item.jobOpportunity.status === JOB_OPPORTUNITY_STATUSES.ACTIVE
    );
    let jobs = jobReferrals
      .map((item) => item.jobOpportunity)
      .filter((job) => job.status === JOB_OPPORTUNITY_STATUSES.ACTIVE);
    if (cognitoGroups.includes(PROFESSIONAL_COMMUNITY)) {
      const limitedJobsForUser = await loadRecords({
        query: listJobOpportunitiesByVisibility,
        name: "listJobOpportunitiesByVisibility",
        payload: {
          visibilityLevel: JOB_OPPORTUNITY_VISIBILITY_LEVELS.LIMITED,
          filter: {
            status: {
              eq: JOB_OPPORTUNITY_STATUSES.ACTIVE,
            },
          },
        },
      });
      jobs = [...jobs, ...limitedJobsForUser];
    }
    return jobs;
  };

  if (isLoading) {
    return (
      <div className="text-center mt-8">
        <span className="loader" />
      </div>
    );
  }

  const widgetsHasData = [
    !!matchedJobs.length,
    !!hotJobs.length,
    !!exclusiveJobs.length,
  ].filter((e) => e);

  return (
    <>
      {widgetsHasData.length > 0 ? (
        <div className="mt-8">
          <h5 className="ml-2 font-bold self-start">Jobs</h5>
          <div
            className={classNames(
              "flex flex-col flex-wrap  lg:flex-row w-full",
              { "justify-center": widgetsHasData.length === 1 }
            )}
          >
            <JobWidget
              jobElements={matchedJobs.filter(
                (j) => j.status !== JOB_APPLICATION_MATCH_STATUS.INTERESTED
              )}
              title="My Jobs"
              description="Here you'll find all of your jobs. This includes those that you've been individually matched to by Torc and those you've already shown interest in."
            />
            <JobWidget
              jobElements={exclusiveJobs}
              title="Exclusive Jobs"
              description="Here are some exclusive jobs just for you."
            />
            <JobWidget
              jobElements={hotJobs}
              titleTextColor="text-red-600"
              title="Hot Jobs!"
              description="Here are the latest live job postings that might be a good
                fit for you. Please indicate your interest and we'll
                evaluate your match potential."
              condensedLimit={condensed ? 5 : null}
            />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg">No Jobs Found</p>
        </div>
      )}
    </>
  );
};

export default JobWidgetsWrapper;
