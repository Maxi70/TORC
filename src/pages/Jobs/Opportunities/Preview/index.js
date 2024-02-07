import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import MarkdownIt from "markdown-it";
import underline from "markdown-it-plugin-underline";
import dayjs from "dayjs";

import Footer from "components/Footer";
import Header from "components/Header";

import Button from "components/FormComponents/Button";
import JobPageWrapper from "pages/Jobs/Opportunities/JobPageWrapper";
import { API, graphqlOperation } from "aws-amplify";
import { getJobOpportunity } from "graphql/queries";
import { updateJobOpportunity } from "graphql/mutations";
import {
  JOB_OPPORTUNITY_STATUSES,
  JOB_OPPORTUNITY_TIME_COMMITMENT,
} from "lookup";

const mdParser = new MarkdownIt().use(underline);
// Open links in new tab
const defaultRender =
  mdParser.renderer.rules.link_open ||
  ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });

mdParser.renderer.rules.link_open = (tokens, idx, options, env, self) => {
  // If you are sure other plugins can't add `target` - drop check below
  const aIndex = tokens[idx].attrIndex("target");

  if (aIndex < 0) {
    tokens[idx].attrPush(["target", "_blank"]); // add new attribute
  } else {
    tokens[idx].attrs[aIndex][1] = "_blank"; // replace value of existing attr
  }

  // pass token to default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const JobsPreview = () => {
  const history = useHistory();
  const params = useParams();
  const query = useQuery();

  const [loadingJobOpp, setLoadingJobOpp] = useState(true);
  const [jobOpp, setJobOpp] = useState({});
  const [confirmingAction, setConfirmingAction] = useState(false);

  const getTimeCommitmentLabel = () => {
    if (jobOpp.timeCommitment === JOB_OPPORTUNITY_TIME_COMMITMENT.FULLTIME) {
      return "Full-time";
    }

    return "Half-time";
  };

  const getStartDate = () => {
    const startDate = new Date(jobOpp.startDate);
    if (startDate <= new Date()) {
      return "Immediate";
    }

    return dayjs(jobOpp.startDate).format("MM/DD/YYYY");
  };

  const submitForApproval = async () => {
    setConfirmingAction(true);
    await API.graphql(
      graphqlOperation(updateJobOpportunity, {
        input: {
          id: jobOpp.id,
          status: JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL,
        },
      })
    );
    setConfirmingAction(false);
    // Navigate to confirmation page
    history.push(`/jobs/opportunities/${jobOpp.id}/confirmation`);
  };

  const goBack = () => {
    if (query.get("origin") === "create") {
      // We can't go "back" here because the job has been created and has an id now
      history.push(`/jobs/opportunities/${jobOpp.id}/edit`);
    } else {
      history.goBack();
    }
  };

  useEffect(() => {
    let isMounted = true;
    document.title = `Preview Job`;

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

  const renderRange = () => {
    if (jobOpp.minRate?.value === jobOpp.maxRate?.value) {
      return `$${jobOpp.minRate.value}`;
    }

    return `$${jobOpp.minRate?.value}-$${jobOpp.maxRate?.value}`;
  };

  const jobDuration = () => {
    let title = "";

    if (jobOpp?.jobLengthInWeeks) {
      title = jobOpp.jobLengthInWeeks > 1 ? " weeks" : " week";

      return `${jobOpp.jobLengthInWeeks}${title}`;
    }

    title = jobOpp?.jobLength > 1 ? " months" : " month";

    return `${jobOpp?.jobLength}${title}`;
  };

  if (loadingJobOpp) {
    return (
      <div>
        <Header />
        <JobPageWrapper>
          <div className="flex justify-center h-96">
            <span className="loader"></span>
          </div>
        </JobPageWrapper>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <JobPageWrapper>
        <div className="max-w-4xl mx-auto py-12 px-4">
          <h1 className="text-4xl font-nexa font-bold mb-2">
            {jobOpp.title} Preview
          </h1>
          <p className="font-bold text-lg">
            This is how your job posting will look to developers. If you want to
            make any changes, let’s do it now. You won’t be able to change the
            posting once it’s activated.
          </p>
        </div>
        <hr className="border-zestygreen border" />
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row">
          <div style={{ flex: `1 1 0px` }}>
            <div className="px-8 py-12 w-full">
              <div className="text-electricBlue font-nexa text-xl mb-4">
                Job Details
              </div>
              <div className="text-electricBlue-800 font-rubik-regular font-bold italic leading-snug">
                <p>
                  {getTimeCommitmentLabel()} | {jobDuration()}
                </p>
                <p>Start Date: {getStartDate()}</p>
                <p>Hourly rate: {renderRange()}</p>
                <p>Positions: {jobOpp.requiredPositions || 1}</p>
                <p>Timezone: {jobOpp.timezone?.label}</p>
                <p>
                  Timezone overlap:{" "}
                  {jobOpp.timeOverlap > 1 && jobOpp.timeOverlap < 8
                    ? `${jobOpp.timeOverlap} hours`
                    : jobOpp.timeOverlap >= 8
                    ? "All hours"
                    : "No Restriction"}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-zestygreen"
            style={{ flexBasis: `2px`, alignSelf: `stretch` }}
          />

          <div className="p-12 flex flex-col gap-8" style={{ flex: `2 1 0px` }}>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold text-black tracking-wide font-nexa">
                {jobOpp.title}
              </h1>
              <h4 className="font-rubik-regular text-base italic text-electricBlue font-light">
                {jobOpp.skills.map((s) => s.name).join(", ")}
              </h4>
            </div>
            <p
              className="prose"
              dangerouslySetInnerHTML={{
                __html: mdParser.render(jobOpp.overview),
              }}
            />
            <h3 className="-mb-6 text-lg">Responsibilities</h3>
            <p
              className="prose"
              dangerouslySetInnerHTML={{
                __html: mdParser.render(jobOpp.responsibilities),
              }}
            />
            <h3 className="-mb-6 text-lg">Requirements</h3>
            <p
              className="prose"
              dangerouslySetInnerHTML={{
                __html: mdParser.render(jobOpp.requirements),
              }}
            />
            <div className="flex gap-4 justify-between">
              <Button onClick={goBack}>Go back</Button>
              {jobOpp.status === JOB_OPPORTUNITY_STATUSES.DRAFT && (
                <Button onClick={() => void submitForApproval()}>
                  {confirmingAction ? "Activating..." : "Activate Job"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </JobPageWrapper>
      <Footer />
    </div>
  );
};

export default JobsPreview;
