import { useAuth } from "GlobalAuthContext";
import classNames from "classnames";
import { USER_TYPES } from "lookup";
import moment from "moment";
import { useEffect, useState } from "react";

export default function FinalistGridAssessment({ assessments, minScore }) {
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const auth = useAuth();

  const assessmentFields = {
    Date: "assessmentCompleted",
    "Test Name": "testName",
    Status: "status",
    "Final Score": "finalScore",
    "Time Taken": "timeTaken",
  };

  useEffect(() => {
    let filterAssessments = assessments?.filter(
      (a) => a.status !== "Time expired"
    );
    if (auth?.user?.userType === USER_TYPES.CUSTOMER)
      filterAssessments = filterAssessments?.filter(
        (a) => a.finalScore >= minScore
      );
    setFilteredAssessments(filterAssessments);
  }, [assessments, auth, minScore]);

  const keys = Object.keys(assessmentFields);

  return (
    <section className="w-[420px] bg-white border-r h-full border-b relative p-8">
      <h5 className="font-nexa font-bold text-xl mb-4">Assessments</h5>
      <div className="flex flex-col gap-8">
        {filteredAssessments?.map((assessment, idx) => (
          <div key={`assessment-${idx}`} className="flex flex-wrap">
            {keys.map((k) => (
              <div className="flex gap-2 w-full" key={k}>
                <div className="text-coolGray-600 font-bold">{k}</div>
                <div className="lowercase first-letter:uppercase text-gray-500">
                  {k === "Date" ? (
                    assessment.assessmentCompleted ? (
                      moment(assessment.assessmentCompleted).format(
                        "YYYY-MM-DD"
                      )
                    ) : (
                      "N/A"
                    )
                  ) : k === "Test Name" ? (
                    assessment.reportLink ? (
                      <a
                        href={assessment.reportLink}
                        target="_blank"
                        rel="noreferrer"
                        title={assessment.testName}
                        className={classNames({
                          "text-blue-500": !!assessment.reportLink,
                        })}
                      >
                        {assessment.testName || "N/A"}
                      </a>
                    ) : (
                      assessment.testName || "N/A"
                    )
                  ) : k === "Final Score" ? (
                    assessment.finalScore === -1 ? (
                      "N/A"
                    ) : (
                      assessment.finalScore || "N/A"
                    )
                  ) : (
                    assessment[assessmentFields[k]] || "N/A"
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
