import { JOB_OPPORTUNITY_STATUSES } from "lookup";
import { sortBy } from "lodash";

export function sortByStatus(jobs) {
  const jobStatusesOrder = [
    JOB_OPPORTUNITY_STATUSES.ACTIVE,
    JOB_OPPORTUNITY_STATUSES.PENDINGAPPROVAL,
    JOB_OPPORTUNITY_STATUSES.FULFILLED,
    JOB_OPPORTUNITY_STATUSES.CANCELLED,
    JOB_OPPORTUNITY_STATUSES.DRAFT,
  ];

  return sortBy(jobs, [
    function (job) {
      return jobStatusesOrder.indexOf(job.status);
    },
    "organization",
    "title",
  ]);
}
