import { useCallback, useEffect, useReducer, useState } from "react";
import { API } from "aws-amplify";

import { searchSkills } from "graphql/autoQueries";
import "../skills.css";
import { ReactComponent as Pencil } from "images/new/pencil.svg";
import { ReactComponent as Trash } from "images/new/trash.svg";
import SearchField from "components/SearchField";
import Error from "components/FormComponentsNew/Error";
import { SKILL_EXPERIENCE } from "utils/skills";
import { SkillsModal } from "./SkillsModal";
import classNames from "classnames";

const SKILL_SEARCH_INITIAL_STATE = {
  loadingSkills: false,
  skillSearchTerm: "",
  skillSearchResults: [],
};

// Reducer for the skill search functionality
function skillSearchReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
    case "UPDATE_SELECTION":
      return SKILL_SEARCH_INITIAL_STATE;
    case "START_SEARCH":
      return { ...state, loadingSkills: true, skillSearchTerm: action.query };
    case "FINISH_SEARCH":
      return {
        ...state,
        loadingSkills: false,
        skillSearchResults: action.results,
      };
    default:
      throw new Error(`Unknown action type ${action.type}`);
  }
}

function Skills({
  className,
  skillsRef,
  user,
  skills,
  setSkills,
  save,
  setDisabled,
  isCurrent,
  suggestedSkills,
  showTitle,
}) {
  const [skillSelected, setSkillSelected] = useState(false);
  const [skillSearchState, skillSearchDispatch] = useReducer(
    skillSearchReducer,
    SKILL_SEARCH_INITIAL_STATE
  );
  const { loadingSkills, skillSearchTerm, skillSearchResults } =
    skillSearchState;

  const triggerSkillSearch = useCallback(async (event, data) => {
    skillSearchDispatch({ type: "START_SEARCH", query: data.value });

    if (data.value.length === 0) {
      skillSearchDispatch({ type: "CLEAN_QUERY" });
      return;
    }

    try {
      const res = await API.graphql({
        query: searchSkills,
        variables: { term: data.value },
      });

      skillSearchDispatch({
        type: "FINISH_SEARCH",
        results: res.data.searchSkills.map((r) => ({
          title: r.name,
          "data-original": JSON.stringify(r),
        })),
      });
    } catch (error) {
      console.log("Error when searching for skills");
      console.log(error);

      skillSearchDispatch({
        type: "FINISH_SEARCH",
        results: [],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSkillSelect = (_event, data) => {
    skillSearchDispatch({ type: "UPDATE_SELECTION" });
    const skillSelected = JSON.parse(data.result["data-original"]);
    // Check if the selected skill does not already exist on the user
    const index = skills.findIndex((s) => s.name === skillSelected.name);

    const existingSkill = skills[index] || null;

    if (existingSkill) return;

    setSkillSelected(skillSelected);
  };

  const renderSearchSkillsResults = ({ title }) => (
    <div className="title">{title}</div>
  );

  const deleteSkill = (skillName) => {
    const index = user?.skills.findIndex((s) => s.name === skillName);

    const appsyncUserSkills = [...user?.skills];

    appsyncUserSkills.splice(index, 1);

    setSkills(appsyncUserSkills);
    save({ skills: appsyncUserSkills }, true);
  };

  const selectUserSkillExperience = (exp) =>
    setSkillSelected({ ...skillSelected, experience: exp });

  const handleOnSubmit = () => {
    const skillsUpdated = user?.skills ? [...user?.skills] : [];

    const index = skillsUpdated.findIndex((s) => s.name === skillSelected.name);
    if (index === -1) skillsUpdated.push(skillSelected);
    else skillsUpdated[index] = skillSelected;

    setSkills(skillsUpdated);
    setSkillSelected(undefined);
    save({ skills: skillsUpdated }, true);
  };

  useEffect(() => {
    if (!isCurrent) return;
    setDisabled(skills.length < 3);
  }, [skills, setDisabled, isCurrent]);

  const handleOnCancel = () => {
    setSkillSelected(undefined);
  };

  return (
    <div className={className} ref={skillsRef}>
      <div>
        {showTitle && (
          <div className="flex items-baseline mb-8 gap-6">
            <div className="b1">Add your skills.</div>
            <div className="b4 text-grey-500">Choose at least 3</div>
          </div>
        )}

        <SearchField
          loading={loadingSkills}
          value={skillSearchTerm}
          onSearchChange={triggerSkillSearch}
          onResultSelect={onSkillSelect}
          results={skillSearchResults}
          resultRenderer={renderSearchSkillsResults}
          className="searchBar"
        />
        <div className="sm:flex gap-[111px]">
          {suggestedSkills && (
            <div className="mt-10">
              <div className="b2 mb-4">Suggested skills</div>
              {suggestedSkills.map((skill) => (
                <div
                  key={skill.id}
                  className="font-nexa-regular text-lg leading-[28px] tracking-[-0.69px] mb-6 cursor-pointer"
                  onClick={() => setSkillSelected(skill)}
                >
                  {skill.name}
                </div>
              ))}
            </div>
          )}
          {skills?.length > 0 && (
            <div className="mt-10">
              {showTitle && <div className="b2 mb-4">Your skills</div>}
              <div className="grid sm:grid-cols-4 grid-cols-2 gap-[52px]">
                {skills.map((skill, index) => (
                  <div
                    key={index}
                    style={{ boxShadow: "0 12px 32px 0 rgba(0, 0, 0, 0.1)" }}
                    className="relative b5 leading-3 border flex items-center justify-between p-4 text-center gap-2 flex-col rounded-sm border-brandSecondary w-[100px] h-[120px]"
                  >
                    <div className="max-h-[60px] overflow-hidden">
                      {skill.name}
                    </div>
                    <div
                      className={classNames(
                        "flex gap-[2px] items-center bg-brandPrimary h-[22px] text-[10px] p-2 rounded-xs leading-[18px] tracking-[-0.4px] font-rubik-regular",
                        {
                          "border-2 border-red-500": !skill.experience,
                        }
                      )}
                    >
                      {SKILL_EXPERIENCE[skill.experience]?.briefLabel || "TBD"}
                      <Pencil
                        className="cursor-pointer"
                        onClick={() => setSkillSelected(skill)}
                      />
                    </div>
                    <Trash
                      className="absolute top-[-6px] right-[-4px] cursor-pointer"
                      onClick={() => deleteSkill(skill.name)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {skillSelected && (
        <SkillsModal
          skill={skillSelected}
          handleSetExperience={selectUserSkillExperience}
          handleOnCancel={handleOnCancel}
          handleOnSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
}

export default Skills;
