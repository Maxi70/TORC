import { useEffect, useReducer, useState } from "react";

import "../skills.css";
import { languages } from "./languages";
import SearchField from "components/SearchField";
import YellowBox from "../../shared/YellowBox";
import { ReactComponent as Trash } from "images/new/trash.svg";
import Error from "components/FormComponentsNew/Error";
import classNames from "classnames";

const LANGUAGE_SEARCH_INITIAL_STATE = {
  languageSearchTerm: "",
  languageSearchResults: [],
};

function languageSearchReducer(state, action) {
  switch (action.type) {
    case "CLEAN_QUERY":
      return LANGUAGE_SEARCH_INITIAL_STATE;
    case "SEARCH": {
      const newSearch = languages.filter(
        (lang) =>
          lang.name.toLowerCase().includes(action.search.toLowerCase()) ||
          lang.iso.includes(action.search.toLowerCase())
      );
      return {
        ...state,
        languageSearchResults: newSearch,
        languageSearchTerm: action.search,
      };
    }
    default:
      return state;
  }
}

const recommendedLanguages = ["Spanish", "Portuguese", "Italian", "Chinese"];

function Languages({
  user,
  className,
  langRef,
  userLanguages,
  setUserLanguages,
  save,
  setDisabled,
}) {
  const [langLevelError, setLangLevelError] = useState(false);
  const [languageSearchState, languageSearchDispatch] = useReducer(
    languageSearchReducer,
    LANGUAGE_SEARCH_INITIAL_STATE
  );
  const { languageSearchResults, languageSearchTerm } = languageSearchState;

  const triggerLanguageSearch = (_event, data) => {
    languageSearchDispatch({
      type: "SEARCH",
      search: data.value,
    });
  };

  const onLanguageSelect = (event, data) => {
    const { name } = data.result;
    const languageAlreadySet = userLanguages.find(
      (lang) => lang.language === name
    );
    if (languageAlreadySet) return;
    languageSearchDispatch({
      type: "SEARCH",
      search: "",
    });
    setUserLanguages((prev) => [
      ...prev,
      {
        language: name,
        level: undefined,
      },
    ]);
  };

  const selectLanguageLevel = (language, level) => {
    const languageIdx = userLanguages.findIndex(
      (ele) => ele.language === language
    );
    userLanguages[languageIdx].level = level;
    setUserLanguages((prev) => [...prev]);
  };

  const renderLanguageSkillResults = ({ name }) => (
    <div className="title">{name}</div>
  );

  useEffect(() => {
    setLangLevelError(false);
    setDisabled(false);
    if (
      JSON.stringify(userLanguages) === JSON.stringify(user.knownLanguages) ||
      userLanguages.length === 0
    )
      return;
    if (userLanguages.find((l) => !l.level)) {
      setDisabled(true);
      return setLangLevelError(true);
    }
    save({ knownLanguages: userLanguages }, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLanguages]);

  const langExperienceComponent = (label, lang, level) => {
    return (
      <YellowBox
        handleClick={() => selectLanguageLevel(lang.language, level)}
        selected={lang.level === level}
      >
        {label}
      </YellowBox>
    );
  };

  return (
    <div className={classNames("!py-5", className)} ref={langRef}>
      <div className="b1 mb-4">Add your languages and proficiency level.</div>
      <p className="b2 mb-6 !leading-4">
        Include all languages in which you are comfortable communicating with
        customers and teams.
      </p>
      <SearchField
        value={languageSearchTerm}
        onSearchChange={triggerLanguageSearch}
        onResultSelect={onLanguageSelect}
        results={languageSearchResults}
        resultRenderer={renderLanguageSkillResults}
        className="searchBar"
      />

      <div className="sm:flex gap-[111px]">
        <div className="mt-5">
          <div className="b2 mb-4">Suggested languages</div>
          {recommendedLanguages.map((language) => {
            return (
              <div
                key={language}
                className="font-nexa-regular text-lg leading-[28px] tracking-[-0.69px] mb-6 cursor-pointer"
                onClick={(e) =>
                  onLanguageSelect(e, { result: { name: language } })
                }
              >
                {language}
              </div>
            );
          })}
        </div>

        {userLanguages?.length > 0 && (
          <div className="mt-5">
            <div className="b2 mb-4">
              What is your level of proficiency with this language
            </div>
            <div className="grid sm:grid-flow-col grid-cols-2 gap-5 w-fit sm:gap-[52px]">
              {userLanguages.map((l, index) => (
                <div key={index}>
                  <div className="relative b5 border text-center rounded-sm border-brandSecondary w-[161px] h-[72px] flex items-center justify-center mb-6">
                    {l.language}
                    {l.language !== "English" && (
                      <Trash
                        className="absolute top-[-6px] right-[-4px] cursor-pointer"
                        onClick={() =>
                          setUserLanguages((prev) =>
                            prev.filter((el) => el.language !== l.language)
                          )
                        }
                      />
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    {langExperienceComponent("Basic", l, "BASIC")}
                    {langExperienceComponent(
                      "Conversational",
                      l,
                      "CONVERSATIONAL"
                    )}
                    {langExperienceComponent("Fluent", l, "FLUENT")}
                    {langExperienceComponent("Native", l, "NATIVE")}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {langLevelError && (
        <Error
          className="mt-8"
          message="Please select a proficiency level for all your selected languages."
        />
      )}
    </div>
  );
}

export default Languages;
