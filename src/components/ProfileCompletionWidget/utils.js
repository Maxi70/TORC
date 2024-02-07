export const COMPLETION_LEVELS = {
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  FULL: 100,
};

export const WIDGET_TEXT = {
  [COMPLETION_LEVELS.LOW]: {
    title: "Your profile is hidden to opportunities yet!",
    description: "You haven't met the minimums to apply on roles!",
  },
  [COMPLETION_LEVELS.MEDIUM]: {
    title: "Your profile is getting awesome!",
    description:
      "We still need worth information to get better matches for you!",
  },
  [COMPLETION_LEVELS.HIGH]: {
    title: "Your profile is almost totally complete!",
    description: "Finish it to be better matched to job opportunities",
  },
  [COMPLETION_LEVELS.FULL]: {
    title: "Your profile is complete!",
    description:
      "That's amazing! Congratulations, don't forget to keep all data up to date to better match results",
  },
};

export const WIDGET_LINKS = {
  [COMPLETION_LEVELS.LOW]: {
    icon: "wizardLinkLow",
    color: "#BF3A39",
  },
  [COMPLETION_LEVELS.MEDIUM]: {
    icon: "wizardLinkHigh",
    color: "#CD931C",
  },
  [COMPLETION_LEVELS.HIGH]: {
    icon: "wizardLinkHigh",
    color: "#CD931C",
  },
  [COMPLETION_LEVELS.FULL]: {
    icon: "wizardLinkFull",
    color: "#00924A",
  },
};
