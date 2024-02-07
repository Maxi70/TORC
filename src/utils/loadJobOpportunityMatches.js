import { API, graphqlOperation } from "aws-amplify";
import { sleep } from "./general";

export const loadJobOpportunityMatches = async (
  jobId,
  jobQuery,
  nextToken = null
) => {
  const response = await API.graphql(
    graphqlOperation(jobQuery, {
      id: jobId,
      nextToken,
    })
  );
  const matches = response.data.getJobOpportunity.matches;

  if (matches.nextToken) {
    await sleep(250);
    const matchesNextPortions = await loadJobOpportunityMatches(
      jobId,
      jobQuery,
      matches.nextToken
    );

    return [...matches.items, ...matchesNextPortions];
  }

  return matches.items;
};
