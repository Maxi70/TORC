import React, { useEffect, useLayoutEffect, useState } from "react";
import classNames from "classnames";

import Header from "components/Header";
import Footer from "components/Footer";
import styles from "./JobsList.module.css";

import telescope from "images/telescope.png";
import redDots from "images/red-dots.svg";

import { getUser, listJobTypes } from "graphql/queries";
import { API } from "aws-amplify";
import { useAuth } from "GlobalAuthContext";
import JobCard from "./cards";

const JobsList = () => {
  const { user } = useAuth();
  const [appliedJobs, setAppliedJobs] = useState({});
  const [jobRoles, setJobRoles] = useState([]);
  useLayoutEffect(() => {
    document.title = "Torc Job Profiles Listings";

    const id = user?.id ?? null;
    if (id) {
      (async () => {
        const fetchUserData = await API.graphql({
          query: getUser,
          variables: { id },
        });

        const applications = {};
        for (let app of fetchUserData.data.getUser.applications.items) {
          const jobId = app.jobTypeId;
          applications[jobId] = true;
        }

        setAppliedJobs(applications);
      })();
    }
  }, [user]);

  useEffect(() => {
    (async () => {
      const userId = user?.id ?? null;
      const res = await API.graphql({
        query: listJobTypes,
        variables: { filter: { isActive: { eq: true } } },
        authMode: userId ? "AMAZON_COGNITO_USER_POOLS" : "API_KEY",
      });
      setJobRoles(res?.data?.listJobTypes?.items);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header
        backgroundStyle={{
          background: "linear-gradient(135deg, #E5AB8E 0%, #F4D675 100%)",
        }}
        pageHeader={
          <div className="flex flex-col md:flex-row md:justify-between">
            <div className="flex-grow flex flex-row items-start justify-center">
              <div className="mx-4">
                <div className="font-nexa font-bold tracking-wide text-4xl md:text-5xl">
                  Available Roles
                </div>
                <div className="font-rubik-regular tracking-wide text-lg md:text-xl my-4 max-w-xl">
                  To streamline the application process and help you find your
                  next job faster, we first verify your skills and experience
                  for specific job roles. View and apply for our current job
                  roles below to complete the verification process and start
                  receiving job offers.
                </div>
              </div>
            </div>
            <div className="w-96 self-end">
              <img className="w-full" src={telescope} alt="telescope" />
            </div>
          </div>
        }
      />
      <main className={classNames(styles.jobsListGrid, "py-16")}>
        <div className="md:col-span-1 hidden md:block">
          <img src={redDots} alt="" className="w-1/4 mt-44" />
        </div>
        <div className="col-span-3 px-10 md:px-0 md:col-span-1">
          {/* jobs list header */}
          <div className="flex flex-row items-center justify-start ">
            <div>{/* TODO: pagination buttons */}</div>
          </div>
          {/* jobs list */}
          <div className="flex flex-col justify-center items-center">
            {jobRoles
              .sort((a, b) => a.sort - b.sort)
              .map((job, i) => (
                <JobCard
                  job={job}
                  user={user}
                  key={i}
                  fullWidth
                  hideRange
                  applied={appliedJobs[job.id]}
                />
              ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default JobsList;
