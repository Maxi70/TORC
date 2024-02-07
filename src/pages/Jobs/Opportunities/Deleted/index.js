import { API, graphqlOperation } from "aws-amplify";
import Footer from "components/Footer";
import Header from "components/Header";
import Button from "components/FormComponents/Button";
import { getJobOpportunity } from "graphql/queries";
import JobPageWrapper from "pages/Jobs/Opportunities/JobPageWrapper";
import { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

import rightArrow from "images/right-arrow.png";

export default function JobsDeleted() {
  const history = useHistory();
  const params = useParams();

  const [loadingJobOpp, setLoadingJobOpp] = useState(true);
  const [jobOpp, setJobOpp] = useState({});

  useEffect(() => {
    let isMounted = true;

    (async () => {
      let res;
      if (params.id) {
        res = await API.graphql(
          graphqlOperation(getJobOpportunity, { id: params.id })
        );
      }

      if (isMounted) {
        setJobOpp(res?.data.getJobOpportunity || {});
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

  if (params.id && !jobOpp?.id) history.replace(`/jobs/opportunities`);

  return (
    <div className="h-screen flex flex-col">
      <div>
        <Header />
      </div>
      <JobPageWrapper>
        <div className="max-w-4xl mx-auto py-24 flex flex-col gap-4 px-3">
          <p className="text-5xl font-nexa">
            Your job {jobOpp.title && `for ${jobOpp.title} `}has been deleted.
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
