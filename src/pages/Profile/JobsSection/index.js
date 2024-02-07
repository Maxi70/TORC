import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import classNames from "classnames";

import {
  listJobOpportunities,
  getJobOpportunityMatchesForCount,
} from "graphql/queries";
import styles from "./index.module.css";
import JobListingCard from "../../Jobs/Opportunities/Listing/JobListingCard";
import Button from "components/FormComponents/Button";
import { JOB_OPPORTUNITY_STATUSES } from "lookup";
import { loadJobOpportunityMatches } from "utils/loadJobOpportunityMatches";

const JobsSection = ({ userId }) => {
  const [jobOpportunities, setJobOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const { data } = await API.graphql(
          graphqlOperation(listJobOpportunities, {
            filter: {
              status: {
                in: [
                  JOB_OPPORTUNITY_STATUSES.ACTIVE,
                  JOB_OPPORTUNITY_STATUSES.DRAFT,
                  JOB_OPPORTUNITY_STATUSES.FULFILLED,
                  JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL,
                ],
              },
            },
            limit: 10,
          })
        );

        for (const jobOpp of data.listJobOpportunitys.items) {
          if (jobOpp.matches?.nextToken) {
            jobOpp.matches.items = [
              ...jobOpp.matches.items,
              ...(await loadJobOpportunityMatches(
                jobOpp.id,
                getJobOpportunityMatchesForCount,
                jobOpp.matches.nextToken
              )),
            ];
          }
        }

        setJobOpportunities(data.listJobOpportunitys.items);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <section
      className={classNames(
        "relative overflow-hidden flex justify-center items-center flex-col md:flex-row px-6 py-24 pt-32 md:py-32",
        "full-width",
        styles.customerGradient,
        styles.jobs
      )}
    >
      <div className={classNames("w-full pt-0", styles["jobs--wrapper"])}>
        <div className="flex md:block justify-center w-full relative">
          <div className="md:px-0 w-full">
            <h2 className="lg:text-3xl text-xl font-nexa mb-7">Your Jobs</h2>
            {isLoading ? (
              <div className="text-center">
                <span className="loader" />
              </div>
            ) : jobOpportunities.length ? (
              jobOpportunities.map((jobOpportunity) => (
                <div className="xl:w-5/6" key={jobOpportunity.id}>
                  <section className="mt-6">
                    <JobListingCard job={jobOpportunity} />
                  </section>
                </div>
              ))
            ) : (
              <p className="text-lg">No Jobs</p>
            )}
            <div className="mt-14 text-center">
              <Link to="/jobs/opportunities">
                <Button
                  className="font-rubik-regular"
                  bgColor="bg-yellow-400"
                  isReadOnly={!jobOpportunities.length}
                >
                  See All
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobsSection;
