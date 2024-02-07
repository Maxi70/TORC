import React, { forwardRef, useMemo } from "react";
import classNames from "classnames";
import {
  FinalistGridAssessment,
  FinalistGridBadges,
  FinalistGridBasic,
  FinalistGridCareers,
  FinalistGridCTA,
  FinalistGridCustomLinks,
  FinalistGridLanguages,
  FinalistGridProjects,
  FinalistGridSkills,
  FinalistGridSummary,
} from "./components";
import styles from "./FinalistGridView.module.css";
import GithubStats from "components/GithubStats";
import { useAuth } from "GlobalAuthContext";

const CandidatedGridView = forwardRef(function CandidatesGridView(
  {
    matches,
    jobCalendarEvents,
    jobOpp,
    updateJobOppMatchState,
    deleteJobOppMatchFromState,
    isAdmin,
    isCalibration,
    setModalDisplay,
    modals,
  },
  ref
) {
  // 12 sections of data displayed in each column => 12 rows of data
  const sections = useMemo(() => new Array(12).fill(0), []);
  const auth = useAuth();

  return (
    <div
      className={classNames("flex overflow-x-auto", styles.noScrollbar)}
      ref={ref}
    >
      <table className="border-spacing-0 h-px" cellPadding={0} cellSpacing={0}>
        <tbody className="h-full">
          {sections.map((s, sectionIdx) => (
            <tr key={sectionIdx} className="h-full">
              {matches.map((match, matchIdx) => {
                const { user } = match.application;

                const {
                  assessments,
                  availability,
                  badges,
                  bio,
                  careers,
                  knownLanguages,
                  location,
                  otherLinks,
                  projectsCaseStudies,
                  skills,
                  tagline,
                  stats,
                } = user;

                const candidateHasMeetings = jobCalendarEvents?.some((e) =>
                  e.title.includes(user.username)
                );

                // For each row, depending on the row number the respective
                // component is displayed
                switch (sectionIdx) {
                  case 0:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridBasic
                          user={user}
                          rate={
                            isCalibration
                              ? match.calibrationRate
                              : match.customerRate
                          }
                          jobCalendarEvents={jobCalendarEvents}
                          jobOpportunityId={match.jobOpportunityId}
                          applicationId={match.applicationId}
                          isCalibration={isCalibration}
                          jobCalibrationIsEnabled={jobOpp.calibrationIsEnabled}
                        />
                      </td>
                    );
                  case 1:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridCTA
                          candidateHasMeetings={candidateHasMeetings}
                          match={match}
                          jobOpp={jobOpp}
                          updateJobOppMatchState={updateJobOppMatchState}
                          deleteJobOppMatchFromState={
                            deleteJobOppMatchFromState
                          }
                          isCalibration={isCalibration}
                          setModalDisplay={setModalDisplay}
                          modals={modals}
                        />
                      </td>
                    );
                  case 2:
                    return (
                      <td key={matchIdx} className="h-full">
                        <section className="w-[420px] bg-white border-r h-full border-b p-8">
                          <h5 className="font-nexa font-bold text-xl mb-4">
                            Bio
                          </h5>
                          <h6 className="font-nexa-light font-semibold text-lg mb-2">
                            {tagline}
                          </h6>
                          <p className="whitespace-pre-wrap text-gray-700">
                            {bio}
                          </p>
                        </section>
                      </td>
                    );
                  case 3:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridSummary
                          matchFieldHistory={match.fieldHistory}
                          location={location}
                          careers={careers}
                          availability={availability}
                        />
                      </td>
                    );
                  case 4:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridBadges badges={badges} />
                      </td>
                    );
                  case 5:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridSkills skills={skills} />
                      </td>
                    );
                  case 6:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridLanguages
                          knownLanguages={knownLanguages}
                        />
                      </td>
                    );
                  case 7:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridCustomLinks links={otherLinks} />
                      </td>
                    );
                  case 8:
                    return (
                      <td key={matchIdx} className="h-full">
                        <GithubStats stats={stats} isVertical={true} />
                      </td>
                    );
                  case 9:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridCareers careers={careers} />
                      </td>
                    );
                  case 10:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridProjects
                          projectsCaseStudies={projectsCaseStudies}
                        />
                      </td>
                    );
                  case 11:
                    return (
                      <td key={matchIdx} className="h-full">
                        <FinalistGridAssessment
                          assessments={assessments}
                          minScore={
                            isAdmin || auth?.user?.id === user?.id ? 0 : 70
                          }
                        />
                      </td>
                    );
                  default:
                    throw new Error("Unknown section");
                }
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
});

export default CandidatedGridView;
