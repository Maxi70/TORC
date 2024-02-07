import { useState, useEffect } from "react";
import { API, graphqlOperation } from "aws-amplify";

import Role from "./Role";
import Skills from "./Skills";
import { createApplication } from "graphql/mutations";
import { getUser, listJobTypes } from "graphql/queries";
import Languages from "./Languages";
import getCurrentClass from "../shared/utils";
import GithubConnect from "./GithubConnect";

const StackAndSkills = ({
  user,
  handleSubStepQueryParams,
  currentSubStep,
  setDisabled,
  saveAttributes,
  refs,
  setAutoSaved,
  dispatchUserUpdated,
}) => {
  const [userSkills, setUserSkills] = useState([]);
  const [userLanguages, setUserLanguages] = useState([]);
  const [jobRolesToApplyTo, setJobRolesToApplyTo] = useState([]);
  const [jobRoles, setJobRoles] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await API.graphql(
        graphqlOperation(listJobTypes, { filter: { isActive: { eq: true } } })
      );
      await setJobRoles(res?.data?.listJobTypes?.items);
      setTimeout(() => {
        handleSubStepQueryParams();
      }, 750);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get user data for this section
  useEffect(() => {
    setUserSkills(user.skills || []);
    setUserLanguages(
      user.knownLanguages?.length > 0
        ? JSON.parse(JSON.stringify(user.knownLanguages))
        : [{ language: "English", level: "BASIC" }]
    );
    const id = user?.id ?? null;
    if (jobRoles.length === 0) return;
    if (id) {
      (async () => {
        const fetchUserData = await API.graphql({
          query: getUser,
          variables: { id },
        });

        const jobOppIds = new Set();
        const jobRoleIds = jobRoles.map((ele) => ele.id);
        const applications = [];
        for (let app of fetchUserData?.data?.getUser?.applications?.items) {
          const jobId = app.jobTypeId;
          if (jobRoleIds.includes(jobId)) {
            applications.push([
              app?.jobType?.title,
              jobId,
              app?.id,
              app?.isNotActive,
              jobRoles.filter((job) => job.id === jobId)[0]?.skills,
            ]);
            jobOppIds.add(jobId);
          }
        }
        setJobRolesToApplyTo(applications);
      })();
    }
    /* eslint-disable */ //disablisetJobRolesng to avoid potential infinite loops
  }, [user, jobRoles]);

  async function applyToJobs(jobIds) {
    if (!jobIds.length) {
      return;
    }
    const jobid = jobIds.pop();
    try {
      const res = await API.graphql(
        graphqlOperation(createApplication, { input: { jobTypeId: jobid } })
      );
      const job = jobRoles.filter((job) => job.id === jobid)[0];
      setJobRolesToApplyTo((prev) => [
        ...prev,
        [
          job?.title,
          jobid,
          res?.data?.createApplication?.id,
          null,
          job?.skills,
        ],
      ]);
    } catch (err) {
      console.log("Error when submitting application to db");
      console.log(err);
    }
    applyToJobs(jobIds);
  }

  const getSuggestedSkills = () => {
    return jobRolesToApplyTo
      .filter((el) => !el[3])
      .map((j) => j[4])
      .flat()
      .filter(
        (value, index, self) =>
          index === self.findIndex((j) => j.name === value.name)
      )
      .splice(0, 10);
  };

  return (
    <div className="compact-text container-large">
      <h1 className="mb-[1vh]">Stacks and skills</h1>
      <Role
        jobRolesToApplyTo={jobRolesToApplyTo}
        setJobRolesToApplyTo={setJobRolesToApplyTo}
        className="pb-52 xl:pb-0"
        roleRef={refs[0]}
        applyToJobs={applyToJobs}
        userId={user.id}
        setDisabled={setDisabled}
        setAutoSaved={setAutoSaved}
        isCurrent={currentSubStep === 1}
        jobRoles={jobRoles}
      />
      {currentSubStep > 1 && (
        <Skills
          skills={userSkills}
          setSkills={setUserSkills}
          className={getCurrentClass(2, currentSubStep)}
          skillsRef={refs[1]}
          save={saveAttributes}
          setDisabled={setDisabled}
          isCurrent={currentSubStep === 2}
          setAutoSaved={setAutoSaved}
          suggestedSkills={getSuggestedSkills()}
          showTitle={true}
          user={user}
        />
      )}
      {currentSubStep > 2 && (
        <Languages
          user={user}
          userLanguages={userLanguages}
          setUserLanguages={setUserLanguages}
          className={getCurrentClass(3, currentSubStep)}
          langRef={refs[2]}
          save={saveAttributes}
          setDisabled={setDisabled}
          isCurrent={currentSubStep === 3}
        />
      )}
      {currentSubStep > 3 && (
        <GithubConnect
          user={user}
          githubRef={refs[3]}
          className={getCurrentClass(4, currentSubStep)}
          dispatchUserUpdated={dispatchUserUpdated}
        />
      )}
    </div>
  );
};

export default StackAndSkills;
