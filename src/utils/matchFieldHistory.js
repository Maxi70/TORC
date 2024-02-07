import dayjs from "dayjs";
import { API } from "aws-amplify";
import { getFieldHistory } from "graphql/queries";

const prepareDate = (date) => {
  if (!date) {
    return "-";
  }

  return dayjs(date).format("MM/DD/YYYY");
};

export const getMatchHistoryByStatus = (fieldHistory, status) => {
  const matchedHistory = fieldHistory
    ?.filter((item) => item.newValue === status)
    .sort(
      (a, b) => dayjs(b?.createdAt).valueOf() - dayjs(a?.createdAt).valueOf()
    );
  return (
    matchedHistory?.[0] && {
      ...matchedHistory?.[0],
      formattedCreatedAt: prepareDate(matchedHistory[0]?.createdAt),
    }
  );
};

export const addMatchFieldHistoryToMatch = async (matches) => {
  const mappedMatches = [];
  for (const match of matches) {
    let fieldHistory;
    const matchId = `${match.applicationId}_${match.jobOpportunityId}`;
    try {
      const { data } = await API.graphql({
        query: getFieldHistory,
        variables: {
          entity: "Match",
          key: {
            eq: matchId,
          },
        },
      });
      fieldHistory = data.getFieldHistory.items;
    } catch (err) {
      fieldHistory = [];
      console.log(err);
    }

    mappedMatches.push({
      ...match,
      fieldHistory,
    });
  }
  return mappedMatches;
};
