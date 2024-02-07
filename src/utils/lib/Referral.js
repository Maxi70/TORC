import { API, graphqlOperation } from "aws-amplify";
import { createReferral } from "graphql/mutations";
import { REFERRAL_TYPES } from "lookup";

const createRecord = async (payload) => {
  if (
    (payload.referralType === REFERRAL_TYPES.JOB &&
      !payload.jobOpportunityId &&
      !payload.jobReferrerCode) ||
    (payload.referralType !== REFERRAL_TYPES.JOB &&
      payload.referralType !== REFERRAL_TYPES.USER)
  ) {
    return;
  }

  try {
    await API.graphql(
      graphqlOperation(createReferral, {
        input: {
          ...payload,
        },
      })
    );
    if (payload.referralType === REFERRAL_TYPES.JOB) {
      localStorage.removeItem("jobReferral");
    }
    if (payload.referralType === REFERRAL_TYPES.USER) {
      localStorage.removeItem("userReferral");
    }
  } catch (err) {
    console.log("something went wrong during createReferral");
    console.log(err);
  }
};

const functionsToExport = {
  createRecord,
};

export default functionsToExport;
