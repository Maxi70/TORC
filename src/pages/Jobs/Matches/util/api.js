import { API } from "aws-amplify";
import { getFreelancerMatches } from "graphql/queries";

export async function getMatchesAndApplications(id, errorSetter) {
  if (!id) {
    return;
  }

  const fetchData = await API.graphql({
    query: getFreelancerMatches,
    variables: { id },
  });
  if (fetchData?.data) {
    return grabMatchesAndApplications(fetchData.data);
  } else if (errorSetter) {
    return errorSetter(true);
  }
}

export function grabMatchesAndApplications({ getUser: data }) {
  const applications = data?.applications?.items ?? [];
  const matches = [];
  for (let app of applications) {
    if (app?.matches?.items && app?.jobType?.isActive) {
      matches.push(...app.matches.items);
    }
  }
  return { matches, applications };
}
