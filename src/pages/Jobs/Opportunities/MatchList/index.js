import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { getJobOpportunityMatches } from "graphql/queries";
import Header from "components/Header";
import Footer from "components/Footer";
import MatchCard from "components/MatchCard";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";
import { addMatchFieldHistoryToMatch } from "utils/matchFieldHistory";
import { sleep } from "utils/general";

const MatchList = () => {
  const [jobOpportunity, setJobOpportunity] = useState({});
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { jobId } = useParams();

  const loadJobOpportunityMatches = async (nextToken = null) => {
    const response = await API.graphql(
      graphqlOperation(getJobOpportunityMatches, {
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

  useEffect(() => {
    (async () => {
      let displayedMatches = [];
      try {
        setIsLoading(true);

        const { data } = await API.graphql(
          graphqlOperation(getJobOpportunityMatches, { id: jobId })
        );

        setJobOpportunity({
          ...data.getJobOpportunity,
          matches: undefined,
        });

        if (data.getJobOpportunity.matches?.nextToken) {
          displayedMatches = [
            ...data.getJobOpportunity.matches.items,
            ...(await loadJobOpportunityMatches(
              data.getJobOpportunity.matches.nextToken
            )),
          ];
        } else {
          displayedMatches = data.getJobOpportunity.matches.items;
        }

        const mergedMatches = await addMatchFieldHistoryToMatch(
          displayedMatches
        );
        setMatches(mergedMatches);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobId]);

  return (
    <>
      <Header
        backgroundStyle={{
          background: `linear-gradient(135deg, #E5AB8E, #BA89CD)`,
        }}
        pageHeader={
          <div className="w-full flex items-center justify-center md:px-20 px-8">
            <div className="max-w-5xl w-full tracking-wider">
              <div className="font-rubik-regular tracking-wide text-lg md:text-xl my-4 mb-12 max-w-5xl">
                <p>Matches for</p>
                {isLoading ? (
                  <span>...</span>
                ) : (
                  <h1 className="font-nexa font-bold mt-3 md:text-5xl text-3xl">
                    {jobOpportunity.title}
                  </h1>
                )}
              </div>
            </div>
          </div>
        }
      />
      <main className="max-w-5xl mx-auto my-12 px-4">
        {isLoading ? (
          <div className="text-center">
            <span className="loader" />
          </div>
        ) : (
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
                  Matches
                </h3>
              </div>
              <div className="flex flex-col items-end flex-1 justify-end">
                <Link
                  className="hover:text-current"
                  to={`/jobs/applications/${jobId}`}
                >
                  <GetStartedBtn
                    label="View Applicants"
                    smallButton
                    textColor={"black"}
                    hideArrow
                    customPadding
                    className="px-4"
                  />
                </Link>
              </div>
            </div>

            {matches.length === 0 && (
              <p className="font-nexa text-red-400 leading-8 text-2xl tracking-wider mt-4">
                This job has no matches
              </p>
            )}

            {matches.length > 0 && (
              <p className="font-rubik-regular font-medium text-lg mt-4">
                Talent identified by our job match system
              </p>
            )}
            {matches.map(
              (match) =>
                match.application?.user && (
                  <MatchCard
                    key={match.application.id}
                    match={match}
                    user={match.application.user}
                    jobSkills={jobOpportunity.skills.map(({ name }) => name)}
                  />
                )
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};

export default MatchList;
