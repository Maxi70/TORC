import { API, graphqlOperation } from "aws-amplify";
import Footer from "components/Footer";
import Header from "components/Header";
import Button from "components/FormComponents/Button";
import { getJobOpportunity } from "graphql/queries";
import { JOB_OPPORTUNITY_STATUSES } from "lookup";
import JobPageWrapper from "pages/Jobs/Opportunities/JobPageWrapper";
import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import rightArrow from "images/right-arrow.png";

export default function JobsPending() {
  const history = useHistory();
  const params = useParams();

  const [loadingJobOpp, setLoadingJobOpp] = useState(true);
  const [jobOpp, setJobOpp] = useState({});

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const res = await API.graphql(
        graphqlOperation(getJobOpportunity, { id: params.id })
      );

      if (isMounted) {
        setJobOpp(res.data.getJobOpportunity);
        setLoadingJobOpp(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, [params]);

  if (loadingJobOpp) {
    return (
      <div className="flex flex-col h-screen">
        <div>
          <Header />
        </div>
        <JobPageWrapper>
          <div className="flex justify-center h-96">
            <span className="loader"></span>
          </div>
        </JobPageWrapper>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }

  if (
    jobOpp.status !== JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL &&
    jobOpp.status !== JOB_OPPORTUNITY_STATUSES.CANCELLED
  ) {
    history.push("/jobs/opportunities");
  }

  if (jobOpp.status === JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL) {
    return (
      <div className="h-screen flex flex-col">
        <div>
          <Header />
        </div>
        <JobPageWrapper>
          <div className="max-w-4xl mx-auto py-24 px-3 flex flex-col gap-4">
            <p className="text-5xl font-nexa">
              You’re almost there! Your job for {jobOpp.title} is pending
              approval!
            </p>
            <p className="font-nexa text-lg">
              A member of Team Torc reviews all jobs to ensure they’re a good
              fit for the Torc Community. You’ll be contacted soon to confirm it
              is active or to suggest adjustments to improve attractiveness to
              top developers
            </p>
            <p className="font-nexa text-lg">
              If you need to edit this job posting, please visit your jobs page
              using the button below or via the menu on the right side of your
              screen.
            </p>
          </div>
          <div className="flex w-full justify-center mb-24">
            <Link to="/jobs/opportunities">
              <Button className="flex items-center">
                View my jobs <img src={rightArrow} alt="" className="ml-1" />
              </Button>
            </Link>
          </div>
        </JobPageWrapper>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex flex-col">
        <div>
          <Header />
        </div>
        <JobPageWrapper>
          <div className="max-w-4xl mx-auto py-24 px-3 flex flex-col gap-4">
            <p className="text-5xl font-nexa">
              Your job for {jobOpp.title} has been canceled.
            </p>
            <p className="font-nexa text-lg">
              It is no longer visible to developers.
            </p>
          </div>
          <div className="flex w-full justify-center mb-24">
            <Link to="/jobs/opportunities">
              <Button className="flex items-center">
                View my jobs <img src={rightArrow} alt="" className="ml-1" />
              </Button>
            </Link>
          </div>
        </JobPageWrapper>
        <div className="mt-auto">
          <Footer />
        </div>
      </div>
    );
  }
}
