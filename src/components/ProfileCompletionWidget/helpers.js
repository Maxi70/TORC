import {
  PROFILE_COMPLETION_LEVELS,
  PROFILE_COMPLETION_LINKS,
  PROFILE_COMPLETION_TEXT,
  PROFILE_LINKS_PATH_PARAMS,
} from "lookup";

const getCompletionLevel = (profileCompletion) => {
  const completionLevel = (() => {
    switch (true) {
      case profileCompletion < PROFILE_COMPLETION_LEVELS.MEDIUM: {
        return PROFILE_COMPLETION_LEVELS.LOW;
      }

      case profileCompletion < PROFILE_COMPLETION_LEVELS.HIGH: {
        return PROFILE_COMPLETION_LEVELS.MEDIUM;
      }

      case profileCompletion < PROFILE_COMPLETION_LEVELS.FULL: {
        return PROFILE_COMPLETION_LEVELS.HIGH;
      }

      case profileCompletion < PROFILE_COMPLETION_LEVELS.LOW: {
        return PROFILE_COMPLETION_LEVELS.LOW;
      }

      default: {
        return PROFILE_COMPLETION_LEVELS.FULL;
      }
    }
  })();

  return completionLevel;
};

const getLinkDependsOnFields = (total, completed) => {
  const percent = (completed / total) * 100;
  const completionLevel = getCompletionLevel(percent);

  return PROFILE_COMPLETION_LINKS[completionLevel];
};

export const getTextContent = (profileCompletion) => {
  const completionLevel = getCompletionLevel(profileCompletion);

  return {
    ...PROFILE_COMPLETION_TEXT[completionLevel],
    completionLevel,
  };
};

export const getLinks = (user) => {
  const profileStats = JSON.parse(user?.profileStats || "[]");
  return profileStats
    .sort((a, b) => a.order - b.order)
    .map((el, index) => {
      const profileLinkParams = PROFILE_LINKS_PATH_PARAMS[el.name];
      return {
        key: index,
        ...getLinkDependsOnFields(el.total, el.completed),
        path: `/profile/wizard/${profileLinkParams.wizard}${
          profileLinkParams.subStep
            ? `?subStep=${profileLinkParams.subStep}`
            : ""
        }`,
        linkText: profileLinkParams.label,
        completionText: `(${el.completed}/${el.total})`,
      };
    });
};
