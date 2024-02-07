import React, { useEffect, useRef, useState } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAuth } from "GlobalAuthContext";
import { sleep } from "utils/general";
import {
  listReferralsByJobReferrerUserId,
  listReferralsByUserReferrerReferralType,
  listReferralsSharedJobMatches,
} from "graphql/queries";

import placeholderPicture from "images/placeholderProfile.png";
import ImageViewer from "components/ImageViewer";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import { JOB_APPLICATION_MATCH_STATUS, JOB_OPPORTUNITY_STATUSES } from "lookup";
import Chip from "components/Chip";
import "./index.css";

const ReferralsWidget = () => {
  const auth = useAuth();
  const COGNITO_GROUP_PROFESSIONAL_COMMUNITY =
    process.env.REACT_APP_COGNITO_GROUP_PROFESSIONAL_COMMUNITY;
  const [isLoading, setIsLoading] = useState(true);
  const [recruitedUsers, setRecruitedUsers] = useState([]);
  const [sharedJobs, setSharedJobs] = useState([]);
  const isProfessionalCommunityRef = useRef(false);

  const loadRecords = async (queryObj, nextToken = null) => {
    const response = await API.graphql(
      graphqlOperation(queryObj.query, {
        ...queryObj.payload,
        nextToken,
      })
    );
    const dataRecords = response.data[queryObj.name];

    if (dataRecords.nextToken) {
      await sleep(250);
      const jobReferralsNextPortions = await loadRecords(
        queryObj,
        dataRecords.nextToken
      );

      return [...dataRecords.items, ...jobReferralsNextPortions];
    }

    return dataRecords.items;
  };

  const getRecruitedUsers = async (userReferrerUserId) => {
    return loadRecords({
      query: listReferralsByUserReferrerReferralType,
      name: "listReferralsByUserReferrerReferralType",
      payload: {
        userReferrerUserId,
      },
    });
  };

  const getSharedJobs = async (jobReferrerUserId) => {
    return loadRecords({
      query: listReferralsByJobReferrerUserId,
      name: "listReferralsByJobReferrerUserId",
      payload: {
        jobReferrerUserId,
        matchFilter: { status: { eq: JOB_APPLICATION_MATCH_STATUS.ACCEPTED } },
      },
    });
  };

  const getSharedJobUserAcceptedMatch = async (id, jobOpportunityId) => {
    const queryObj = {
      query: listReferralsSharedJobMatches,
      payload: {
        id,
        jobOpportunityId: { eq: jobOpportunityId },
        matchFilter: { status: { eq: JOB_APPLICATION_MATCH_STATUS.ACCEPTED } },
      },
    };

    const { data } = await API.graphql(
      graphqlOperation(queryObj.query, {
        ...queryObj.payload,
      })
    );

    return data.getReferral.matches.items[0];
  };

  const sortAcceptedRecruitedUsers = (users) => {
    return [...users].sort((a, b) => {
      const aAcceptedMatch = a.matches.items[0];
      const bAcceptedMatch = b.matches.items[0];

      if (aAcceptedMatch && !bAcceptedMatch) {
        return -1;
      } else if (!aAcceptedMatch && bAcceptedMatch) {
        return 1;
      }
      return 0;
    });
  };

  const mapRecruitedUserSortAcceptedRecords = (records) => {
    const recruitedUsersMap = new Map();

    records.forEach((record) => {
      const { userId, userReferrerUserId } = record;

      const key = `${userId}-${userReferrerUserId}`;

      if (!recruitedUsersMap.has(key)) {
        recruitedUsersMap.set(key, record);
      }
    });
    const mappedRecruitedUsers = Array.from(recruitedUsersMap.values());

    return sortAcceptedRecruitedUsers(mappedRecruitedUsers);
  };

  const mapSortSharedJobsUserAcceptedMatch = async (sharedJobs) => {
    const sharedJobsCopy = [...sharedJobs];
    for (const sharedJob of sharedJobsCopy) {
      const userJobMatch = await getSharedJobUserAcceptedMatch(
        sharedJob.id,
        sharedJob.jobOpportunityId
      );
      sharedJob.match = userJobMatch;
    }

    return [...sharedJobsCopy].sort((a, b) => {
      const aAcceptedMatch = a.match;
      const bAcceptedMatch = b.match;

      if (aAcceptedMatch && !bAcceptedMatch) {
        return -1;
      } else if (!aAcceptedMatch && bAcceptedMatch) {
        return 1;
      }
      return 0;
    });
  };

  const getMatchesCountByStatuses = (matches = [], matchStatuses) => {
    let matchStatusCount = 0;
    for (const status of matchStatuses) {
      matchStatusCount += matches.filter(
        (match) => match.status === status.toUpperCase()
      ).length;
    }

    return matchStatusCount;
  };

  useEffect(() => {
    (async () => {
      const session = await Auth.currentSession();

      const groups = session.getAccessToken().payload["cognito:groups"] || [];

      isProfessionalCommunityRef.current = groups.includes(
        COGNITO_GROUP_PROFESSIONAL_COMMUNITY
      );

      setIsLoading(true);

      try {
        const recruitedUSers = await getRecruitedUsers(auth.user.id);
        const mappedRecruitedSortedAcceptedUsers =
          mapRecruitedUserSortAcceptedRecords(recruitedUSers);
        setRecruitedUsers(mappedRecruitedSortedAcceptedUsers);
      } catch (err) {
        console.log("Something went wrong when getting recruited users", err);
      }

      try {
        const sharedJobs = await getSharedJobs(auth.user.id);
        const mappedSortedSharedJobs = await mapSortSharedJobsUserAcceptedMatch(
          sharedJobs
        );
        setSharedJobs(mappedSortedSharedJobs);
      } catch (err) {
        console.log("Something went wrong when getting shared jobs", err);
      }

      setIsLoading(false);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chip = (value, className) => {
    return (
      <div className="flex justify-end items-center">
        <Chip
          value={value}
          className={classNames(
            "font-semibold !text-white border-none bg-green-600 p-1",
            className
          )}
        />
      </div>
    );
  };

  const UserCard = ({ user, matches }) => {
    const matchesCount = getMatchesCountByStatuses(matches, [
      JOB_APPLICATION_MATCH_STATUS.MATCHED,
      JOB_APPLICATION_MATCH_STATUS.APPLIED,
      JOB_APPLICATION_MATCH_STATUS.INTERESTEDFASTTRACK,
      JOB_APPLICATION_MATCH_STATUS.REJECTEDBYCUSTOMER,
      JOB_APPLICATION_MATCH_STATUS.REJECTEDBYMEMBER,
      JOB_APPLICATION_MATCH_STATUS.MOREINFO,
    ]);

    const hiredCount = getMatchesCountByStatuses(matches, [
      JOB_APPLICATION_MATCH_STATUS.ACCEPTED,
    ]);
    return (
      <div className="flex flex-col px-4 py-2 bg-white">
        <div className="flex flex-col items-start sm:flex-row sm:items-center gap-2 justify-start sm:justify-between">
          <div className="w-[64px] h-[64px]">
            <div className="overflow-hidden rounded-full h-full profile--image">
              <ImageViewer
                objectKey={user.headshotKey}
                placeholder={
                  <img
                    className="bg-grey-800"
                    src={placeholderPicture}
                    alt="Placeholder"
                  />
                }
                className="h-full"
              />
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 lg:gap-1 font-semibold text-base mr-2 font-rubik-regular tracking-wider">
            <div className="flex gap-x-2">
              {matchesCount > 0 &&
                chip(`Matches: ${matchesCount}`, "!bg-blue-500")}
              {hiredCount > 0 && chip(`Hired: ${hiredCount}`)}
            </div>
            <Link
              to={`/profile/${user.username}`}
              target="_blank"
              className="hover:underline text-blue-500 cursor-pointer"
            >
              @{user.username}
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const JobCard = ({ jobOpportunity, user, isSuccessFull }) => {
    return (
      <div className="flex flex-col p-4 gap-2 bg-white">
        <div className="flex justify-between gap-x-2 items-center mr-1">
          <p className="text-sm font-rubik-regular">
            Shared with: <span className="font-semibold">{user.username}</span>
          </p>
          {isSuccessFull && chip("Hired")}
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:items-center justify-start sm:justify-between gap-2">
          <div className="font-nexa font-bold tracking-wider text-base">
            {jobOpportunity.title}
          </div>
          <Link
            to={`/jobs/matches/${jobOpportunity.id}`}
            target="_blank"
            onClick={(e) =>
              jobOpportunity.status !== JOB_OPPORTUNITY_STATUSES.ACTIVE &&
              e.preventDefault()
            }
          >
            <GetStartedBtn
              disabled={
                jobOpportunity.status !== JOB_OPPORTUNITY_STATUSES.ACTIVE
              }
              label="View Job"
              className="text-black flex-nowrap w-44"
              uppercase
              hideArrow
              smallButton
              alt="View Job"
            />
          </Link>
        </div>
      </div>
    );
  };

  const ReferralWidget = ({ records = [], title, isJob, isUser }) => {
    if (records.length === 0 || (!isJob && !isUser)) {
      return null;
    }

    return (
      <div
        className={classNames("w-full lg:w-1/2 p-2 mt-2 lg:mt-0", {
          "!w-full": hasContent.length === 1,
        })}
      >
        <div className="shadow-xs h-full p-4 bg-white border-2">
          {title && <p className="text-xl font-semibold">{title}</p>}
          {records.map((record) => {
            const { id, jobOpportunity, matches, user } = record;
            if (!user) return null;

            return (
              <div
                key={id}
                className="mt-2 p-0.5 bg-gradient-to-r from-[#83D9BB] to-[#F4D675] shadow-xs"
              >
                {isUser && <UserCard user={user} matches={matches.items} />}
                {isJob && (
                  <JobCard
                    jobOpportunity={jobOpportunity}
                    user={user}
                    isSuccessFull={!!record.match}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const hasContent = [!!recruitedUsers.length, !!sharedJobs.length].filter(
    (e) => e
  );

  if (hasContent.length === 0 && !isProfessionalCommunityRef.current) {
    return null;
  }

  return (
    <div
      className={classNames("flex flex-col p-2 min-h-[300px] mt-8 w-full", {
        "items-center w-full lg:w-1/2": hasContent.length === 1,
      })}
    >
      <h5 className="ml-2 font-bold self-start">Referrals</h5>
      {isLoading && (
        <div className="text-center mt-8 mb-8">
          <span className="loader" />
        </div>
      )}

      {!isLoading && (
        <>
          {hasContent.length === 0 ? (
            <div className="flex flex-1 justify-center items-center py-4 bg-white shadow-xs border-2">
              <div className="w-3/4 lg:w-1/2">
                <p className="text-lg lg:text-xl font-rubik-regular tracking-wider">
                  You haven't referred anyone yet, but your network is a
                  goldmine of talent waiting to join. Be the pioneer, by sharing
                  your{" "}
                  <span className="cursor-pointer text-blue-500 tracking-wider hover:underline">
                    <Link to={`/jobs/matches`} target="_blank">
                      #JOBS
                    </Link>
                  </span>{" "}
                  with your peers, and let's code a future of success together.
                  💻🚀
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-wrap w-full justify-between">
              <ReferralWidget
                isUser
                title="Users you have referred"
                records={recruitedUsers}
              />
              <ReferralWidget
                isJob
                title="Jobs you have shared"
                records={sharedJobs}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ReferralsWidget;
