import { JOB_APPLICATION_MATCH_RATINGS } from "lookup";
import { API, graphqlOperation } from "aws-amplify";
import { updateMatch } from "graphql/mutations";

const updateMatchRecord = async (applicationId, jobOpportunityId, payload) => {
  await API.graphql(
    graphqlOperation(updateMatch, {
      input: Object.assign({ jobOpportunityId, applicationId }, payload),
    })
  );
};

const updateRating = async (
  application,
  jobOpportunityId,
  rating,
  selectedRating,
  isCalibration,
  setRatingReasonsModal
) => {
  const ratingValue = rating === selectedRating ? null : selectedRating;

  if (
    isCalibration &&
    (selectedRating === JOB_APPLICATION_MATCH_RATINGS.VERYUNDESIRABLE ||
      selectedRating === JOB_APPLICATION_MATCH_RATINGS.UNDESIRABLE)
  ) {
    setRatingReasonsModal(selectedRating);
    return;
  }

  const attrs = {
    rating: ratingValue,
  };

  if (isCalibration && application?.reasonsForRating?.length > 0) {
    // reset reasonsForRating if customer changes his mind and is still calibrating
    // reasonsForRating history is being tracked
    attrs.reasonsForRating = null;
  }

  if (ratingValue) {
    await updateMatchRecord(application.applicationId, jobOpportunityId, attrs);
    return attrs;
  }
};

const functionsToExport = {
  updateMatchRecord,
  updateRating,
};

export default functionsToExport;
