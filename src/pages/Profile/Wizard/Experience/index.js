import { useEffect, useState } from "react";
import Career from "./Career";
import Projects from "./Projects";

function Experience({ saveAttributes, user }) {
  const [workExperiences, setWorkExperiences] = useState(user.careers ?? []);
  const [projects, setProjects] = useState(user.projectsCaseStudies ?? []);

  useEffect(() => {
    setWorkExperiences(user.careers ?? []);
    setProjects(user.projectsCaseStudies ?? []);
  }, [user]);

  return (
    <>
      <div className="compact-text container-large">
        <h2 className="mb-4">Lastly, share with us your work experience!</h2>
        <div className="sm:w-3/5">
          <div className="b1 mb-4">
            Your work experience helps build credibility and opens new
            opportunities
          </div>
          <div className="b2 mb-16">
            Keep this information up to date anytime something changes
          </div>
        </div>
      </div>

      <div className="w-full bg-brandSecondary-100 pb-40">
        <div className="max-w-7xl mx-auto py-[104px]">
          <Career save={saveAttributes} workExperiences={workExperiences} />
          <Projects save={saveAttributes} projects={projects} />
        </div>
      </div>
    </>
  );
}

export default Experience;
