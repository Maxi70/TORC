import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";

import {
  getJobOpportunityAndItsApplicants,
  getJobOpportunityApplicants,
} from "graphql/queries";

import Footer from "components/Footer";
import Header from "components/Header";
import ApplicantCardPage from "./ApplicantCardPage";
import { addMatchFieldHistoryToMatch } from "utils/matchFieldHistory";
import { sleep } from "utils/general";

export default function ApplicationsReview() {
  const { jobId } = useParams();

  const [loadingJobOpp, setLoadingJobOpp] = useState(true);
  const [jobOpp, setJobOpp] = useState({});

  const { requiredPositions, openPositions, fulfilledPositions } =
    useMemo(() => {
      if (loadingJobOpp) {
        return {};
      }

      const requiredPositions = jobOpp.requiredPositions || 1;
      const openPositions = jobOpp.openPositions || 0;
      const fulfilledPositions = requiredPositions - openPositions || 0;

      return {
        requiredPositions,
        openPositions,
        fulfilledPositions,
      };
    }, [loadingJobOpp, jobOpp]);

  const loadJobOpportunityMatches = async (nextToken = null) => {
    const response = await API.graphql(
      graphqlOperation(getJobOpportunityApplicants, {
        id: jobId,
        nextToken,
      })
    );
    const matches = response.data.getJobOpportunity.matches;

    if (matches.nextToken) {
      await sleep(250);
      const matchesNextPortions = await loadJobOpportunityMatches(
        matches.nextToken
      );

      return [...matches.items, ...matchesNextPortions];
    }

    return matches.items;
  };

  const loadJobOpportunity = async () => {
    const response = await API.graphql(
      graphqlOperation(getJobOpportunityAndItsApplicants, { id: jobId })
    );
    const matches = response.data.getJobOpportunity.matches;

    if (matches.nextToken) {
      await sleep(250);
      const matchesNextPortions = await loadJobOpportunityMatches(
        matches.nextToken
      );

      matches.items.push(...matchesNextPortions);
    }

    return response;
  };

  useEffect(() => {
    let isMounted = true;
    document.title = `Applications Review - ${jobId}`;

    (async () => {
      const response = await loadJobOpportunity();

      if (isMounted) {
        const tempJobOpp = response.data.getJobOpportunity;
        tempJobOpp.matches.items = await addMatchFieldHistoryToMatch(
          tempJobOpp.matches.items
        );
        setJobOpp(tempJobOpp);
        setLoadingJobOpp(false);
      }
    })();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  if (loadingJobOpp) {
    return (
      <>
        <Header
          backgroundStyle={{
            background: "#BA89CD",
          }}
          pageHeader={
            <div className="w-full flex items-center justify-center pb-20 md:px-20 px-8">
              <span className="loader"></span>
            </div>
          }
        />
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header
        backgroundStyle={{
          background: "#BA89CD",
        }}
        pageHeader={
          <div className="w-full flex items-center justify-center md:px-20 px-8">
            <div className="max-w-5xl w-full tracking-wider">
              <h1 className="font-nexa font-bold mt-3 md:text-5xl text-3xl">
                {jobOpp.title}
              </h1>
              <div className="font-rubik-regular tracking-wide text-lg md:text-xl my-4 mb-12 max-w-5xl">
                <p>Please review your applicants below</p>

                <div className="mt-4 text-sm flex flex-wrap">
                  <span className="mr-10">{`Required positions: ${requiredPositions}`}</span>
                  <span className="mr-10">{`Fulfilled positions: ${fulfilledPositions}`}</span>
                  <span>{`Open positions: ${openPositions}`}</span>
                </div>
              </div>
            </div>
          </div>
        }
      />
      <ApplicantCardPage
        applications={jobOpp.matches.items}
        jobSkills={jobOpp.skills}
        jobOpp={jobOpp}
        jobStatus={jobOpp.status}
        timeCommitment={jobOpp.timeCommitment}
      />

      <Footer />
    </>
  );
}
