import { useEffect, useRef, useState } from "react";
import { cloneDeep } from "lodash";
import classNames from "classnames";
import { API } from "aws-amplify";
import {
  listSharedAssessmentsByUser,
  listSkillsAssessmentsConfig,
} from "graphql/queries";
import GetStartedBtn from "components/buttons/GetStarted/GetStarted";

const SkillsAssessmentsWidget = ({ appsyncUser }) => {
  const [showMore, setShowMore] = useState({});
  const [userSkillsAssessments, setUserSkillsAssessments] = useState([]);
  const showMoreLimit = useRef(3);

  const getUserSharedAssessments = async (userId) => {
    try {
      const { data } = await API.graphql({
        query: listSharedAssessmentsByUser,
        variables: {
          userId,
        },
      });

      return data.listSharedAssessmentsByUser.items || [];
    } catch (err) {
      console.log("Something went wrong listSharedAssessmentsByUser", err);
      return [];
    }
  };

  const fetchSkillsAssessmentsConfig = async (skills) => {
    try {
      const { data } = await API.graphql({
        query: listSkillsAssessmentsConfig,
        variables: {
          skills,
        },
      });

      return data.listSkillsAssessmentsConfig || [];
    } catch (err) {
      console.log("something went wrong listSkillsAssessmentsConfig", err);
      return [];
    }
  };

  const getUserSkillAssessments = (
    userAssessments,
    skillsAssessmentsConfig
  ) => {
    return skillsAssessmentsConfig
      .map((config) => {
        for (const assessment of userAssessments || []) {
          if (config.assessment.testId === assessment.testId) {
            return {
              ...assessment,
              ...config.assessment,
            };
          }
        }
        return config.assessment;
      })
      .filter(({ isPrimary, finalScore }) => isPrimary || finalScore);
  };

  const filterOtherAssessments = (assessments = [], source) => {
    if (!assessments?.length > 0) {
      return [];
    }
    return assessments.filter(
      ({ testId }) =>
        !source.some(({ assessments }) =>
          assessments.some((assessment) => assessment.testId === testId)
        )
    );
  };

  const mapSkillWithSharedAssessments = (skillArray, sharedAssessments) => {
    return skillArray.map((sk) => {
      for (const sharedA of sharedAssessments) {
        const index = sk.assessments.findIndex(
          (assessment) => assessment.testId === sharedA.testId
        );
        if (index !== -1) {
          sk.assessments[index] = { ...sk.assessments[index], ...sharedA };
          break;
        }
      }
      sk.assessments.sort(({ finalScore }) => (finalScore ? 1 : -1));
      return sk;
    });
  };

  useEffect(() => {
    (async () => {
      let result = [];

      const sharedAssessments = (
        await getUserSharedAssessments(appsyncUser.id)
      ).map((a) => ({ ...a, isShared: true }));

      const filteredSharedAssessments = filterOtherAssessments(
        sharedAssessments,
        result
      );

      const assessmentsWithNoConfigSkill = filterOtherAssessments(
        appsyncUser.assessments,
        result
      );

      if (
        !!filteredSharedAssessments.length ||
        !!assessmentsWithNoConfigSkill.length
      ) {
        result.push({
          name: "My Assessments",
          assessments: [
            ...filteredSharedAssessments,
            ...assessmentsWithNoConfigSkill,
          ],
        });
      }

      const userSkills = cloneDeep(appsyncUser.skills);
      const skillsNames = userSkills.map((sk) => sk.name);
      const skillsAssessmentsConfig = await fetchSkillsAssessmentsConfig(
        skillsNames
      );

      for (const skill of userSkills) {
        const skillAssessmentsConfig =
          skillsAssessmentsConfig?.filter(
            (skillConfig) => skillConfig.skillName === skill.name
          ) || [];
        skill.assessments = getUserSkillAssessments(
          appsyncUser.assessments,
          skillAssessmentsConfig
        );
        if (!!skill.assessments.length) {
          result.push(skill);
        }
      }

      result = mapSkillWithSharedAssessments(result, sharedAssessments);

      if (!!result.length) {
        setUserSkillsAssessments(result);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatLink = (link) => {
    if (!link.includes("coderbyte")) {
      return link;
    }
    const url = new URL(link);
    const params = `name=${`${encodeURIComponent(
      appsyncUser.given_name
    )} ${encodeURIComponent(
      appsyncUser.family_name
    )}`}&email=${encodeURIComponent(appsyncUser.email)}`;
    if (url.searchParams.size > 0) {
      return `${link}&${params}`;
    }
    return `${link}?${params}`;
  };

  const handleToggleShowMore = (type) => {
    setShowMore((prevShowMore) => ({
      ...prevShowMore,
      [type]: !prevShowMore[type],
    }));
  };

  const SkillAssessmentCard = ({ assessment }) => {
    return (
      <div
        className={classNames(
          "flex justify-between items-center bg-white px-4 py-5 text-base",
          { "!py-2": !assessment.finalScore }
        )}
      >
        <p className="font-bold">{assessment.testName}</p>
        {assessment.finalScore ? (
          <p>
            Final Score:{" "}
            <span className="font-medium">{assessment.finalScore}%</span>
          </p>
        ) : (
          (assessment.isPrimary || assessment.isShared) && (
            <a
              href={formatLink(assessment.link)}
              target="_blank"
              rel="noreferrer"
              title={assessment.testName}
              className="mt-1"
            >
              <GetStartedBtn
                label="Take"
                className="text-black flex-nowrap w-32 !pr-6"
                uppercase
                hideArrow
                smallButton
                alt="Take"
              />
            </a>
          )
        )}
      </div>
    );
  };

  const SkillAssessmentsWidget = ({
    title,
    assessments,
    limit,
    showMore,
    className,
  }) => {
    return (
      <div
        className={classNames("w-full lg:w-1/2 p-2 mt-2 lg:mt-0", className)}
      >
        <div className="shadow-xs h-full p-4 bg-white border-2">
          {title && <p className="text-xl font-semibold">{title}</p>}
          {assessments.slice(0, limit).map((assessment) => {
            return (
              <div
                key={assessment.testId}
                className="mt-2 p-0.5 bg-gradient-to-r from-[#83D9BB] to-[#F4D675] shadow-xs"
              >
                <SkillAssessmentCard assessment={assessment} />
              </div>
            );
          })}
          {(assessments.length > limit || showMore) && (
            <button
              className="cursor-pointer font-semibold mt-2 undeline"
              onClick={() => handleToggleShowMore(title)}
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      </div>
    );
  };

  if (userSkillsAssessments.length === 0) {
    return null;
  }

  return (
    <div
      className={classNames("w-full flex flex-col p-2 min-h-[300px]", {
        "items-center w-full lg:w-1/2": userSkillsAssessments.length === 1,
      })}
    >
      <h5 className="ml-2 font-bold self-start">Assessments</h5>
      <div className="flex flex-wrap w-full">
        {userSkillsAssessments.map((skill) => (
          <SkillAssessmentsWidget
            key={skill.name}
            title={skill.name}
            assessments={skill.assessments}
            limit={showMore[skill.name] ? undefined : showMoreLimit.current}
            showMore={showMore[skill.name]}
            className={userSkillsAssessments.length === 1 && "!w-full"}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsAssessmentsWidget;
