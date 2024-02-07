import { useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";

import ImageWithCheck from "../../shared/ImageWithCheck";
import { updateApplication } from "graphql/mutations";

const Role = ({
  jobRolesToApplyTo,
  setJobRolesToApplyTo,
  roleRef,
  applyToJobs,
  setDisabled,
  isCurrent,
  setAutoSaved,
  className,
  jobRoles,
}) => {
  const handleClickJob = async (job) => {
    if (isRoleActive(job.id)) {
      //Case 1: the role has been deselected
      await updateJobRole(job.id, true);
      return;
    }

    if (isRoleApplied(job.id)) {
      //Case 2: The role has been selected and the application already exists
      await updateJobRole(job.id, false);
      return;
    }

    //Case 3: the application doesn't exist
    await applyToJobs([job.id]);
  };

  const updateJobRole = async (id, isNotActive) => {
    const appId = jobRolesToApplyTo.filter((app) => app[1] === id)[0][2];
    try {
      let newState = [...jobRolesToApplyTo];
      newState[jobRolesToApplyTo.findIndex((applied) => applied[1] === id)][3] =
        isNotActive;
      setJobRolesToApplyTo(newState);
      await API.graphql(
        graphqlOperation(updateApplication, {
          input: { id: appId, isNotActive: isNotActive },
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isCurrent) return;
    setDisabled(jobRolesToApplyTo.filter((app) => !app[3]).length === 0);
  }, [jobRolesToApplyTo, setDisabled, isCurrent]);

  const isRoleApplied = (jobId) =>
    jobRolesToApplyTo.find((applied) => applied[1] === jobId);

  const isRoleActive = (jobId) =>
    jobRolesToApplyTo.find((applied) => applied[1] === jobId && !applied[3]);

  return (
    <div ref={roleRef} className={className}>
      <div className="flex items-baseline mb-[2vh] gap-6">
        <div className="b1">Select the roles that best describe you.</div>
      </div>
      <div className="grid justify-items-center gap-12 md:gap-y-4 md:gap-x-8 lg:gap-x-8 grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-8">
        {jobRoles
          .sort((a, b) => a.sort - b.sort)
          .filter((j) => j.logo)
          .map((job, index) => (
            <ImageWithCheck
              key={index}
              selected={isRoleActive(job.id)}
              logo={
                <img src={require(`images/imagery/${job.logo}`)} alt="logo" />
              }
              handleClick={async () => {
                await handleClickJob(job);
                setAutoSaved(true);
              }}
              text={job.displayName}
              className="w-[18vh] max-w-[144px]"
            />
          ))}
      </div>
    </div>
  );
};

export default Role;
