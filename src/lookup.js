export const EVENT_TYPES = new Map([
  ["CreateEvent", "creating new repositories "],
  ["CommitCommentEvent", "commenting on your commits"],
  ["FollowEvent", "following other users"],
  ["ForkEvent", "forking other people's code"],
  ["IssueEvent", "creating issues"],
  ["IssueCommentEvent", "commenting on issues"],
  ["PublicEvent", "open sourcing new projects"],
  ["PushEvent", "pushing lines of code"],
  ["PullRequestEvent", "submitting pull requests"],
  ["PullRequestReviewEvent", "approving pull requests"],
]);

export const SOCIAL_LINK_TYPES = {
  BADGR: "BADGR",
  CALENDAR: "CALENDAR",
  DEV: "DEV",
  FACEBOOK: "FACEBOOK",
  GITHUB: "GITHUB",
  HASHNODE: "HASHNODE",
  INSTAGRAM: "INSTAGRAM",
  LINKEDIN: "LINKEDIN",
  PORTFOLIO: "PORTFOLIO",
  STACKOVERFLOW: "STACKOVERFLOW",
  TWITTER: "TWITTER",
};

export const SOCIALLINKS = {
  TWITTER: {
    key: SOCIAL_LINK_TYPES.TWITTER,
    label: "Twitter",
  },
  STACKOVERFLOW: {
    key: SOCIAL_LINK_TYPES.STACKOVERFLOW,
    label: "Stack Overflow",
  },
  HASHNODE: {
    key: SOCIAL_LINK_TYPES.HASHNODE,
    label: "Hashnode",
  },
  PORTFOLIO: {
    key: SOCIAL_LINK_TYPES.PORTFOLIO,
    label: "Portfolio Website",
  },
  LINKEDIN: {
    key: SOCIAL_LINK_TYPES.LINKEDIN,
    label: "LinkedIn",
  },
};

export const GLOBAL_AUTH_ACTION_TYPES = {
  APP_INITIALIZED: "APP_INITIALIZED",
  USER_UPDATED: "USER_UPDATED",
  USER_SIGNEDIN: "USER_SIGNEDIN",
  USER_SIGNEDOUT: "USER_SIGNEDOUT",
  OAUTH_CUSTOM_STATE: "OAUTH_CUSTOM_STATE",
  SET_REQUIRED_ATTRIBUTES: "SET_REQUIRED_ATTRIBUTES",
};

export const USER_TYPES = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  FREELANCER: "FREELANCER",
  UNKNOWN: "UNKNOWN",
};

export const OAUTH_CUSTOM_STATE_TYPES = {
  SET_USER_TYPE: "SET_USER_TYPE",
};

export const DRAFT_JOB_KEY = "create-job-draft";

export const JOB_OPPORTUNITY_STATUSES = {
  ACTIVE: "ACTIVE",
  CANCELLED: "CANCELLED",
  DELETED: "DELETED",
  DRAFT: "DRAFT",
  FULFILLED: "FULFILLED",
  PENDINGAPPROVAL: "PENDINGAPPROVAL",
};

export const JOB_OPPORTUNITY_VISIBILITY_LEVELS = {
  LIMITED: "LIMITED",
  PRIVATE: "PRIVATE",
  PUBLIC: "PUBLIC",
};

export const JOB_OPPORTUNITY_TIME_COMMITMENT = {
  FULLTIME: "FULLTIME",
  PARTTIME: "PARTTIME",
};

export const JOB_APPLICATION_MATCH_STATUS = {
  ACCEPTED: "ACCEPTED",
  APPLIED: "APPLIED",
  INTERESTED: "INTERESTED",
  INTERESTEDFASTTRACK: "INTERESTEDFASTTRACK",
  MATCHED: "MATCHED",
  PASSEDON: "PASSEDON",
  MOREINFO: "MOREINFO",
  REJECTEDBYCUSTOMER: "REJECTEDBYCUSTOMER",
  REJECTEDBYMEMBER: "REJECTEDBYMEMBER",
  SHORTLISTED: "SHORTLISTED",
  SKIPPED: "SKIPPED",
};

export const JOB_APPLICATION_MATCH_STATUS_LABEL = {
  ACCEPTED: "Accepted",
  APPLIED: "Applied",
  MATCHED: "Matched",
  PASSEDON: "Passed On",
  MOREINFO: "More Info",
  REJECTEDBYCUSTOMER: "Rejected",
  REJECTEDBYMEMBER: "Rejected",
  SHORTLISTED: "Shortlisted",
  SKIPPED: "Skipped",
};

export const JOB_APPLICATION_MATCH_SUB_STATUS = {
  FINALIST: "FINALIST",
};

export const MATCH_REJECTION_REASON = {
  ENGLISHLANGDEFICIT: "ENGLISHLANGDEFICIT", // Poor verbal or written English language skills
  INADEQUATESKILLLVL: "INADEQUATESKILLLVL", // Inadequate skill level
  LACKEXPERIENCE: "LACKEXPERIENCE", // Lack of relevant experience
  LACKKNOWLEDGE: "LACKKNOWLEDGE", // Unable to clearly explain concepts or approaches
  LOCATIONNOTFEASIBLE: "LOCATIONNOTFEASIBLE", // Location or time zone overlap is not a fit
  MISSINGSKILL: "MISSINGSKILL", // Missing one or more required skills
  OTHER: "OTHER", // Other
  RATEHIGH: "RATEHIGH", // Rate is too high
};

export const MATCH_RATING_REASONS_FORMATTED = {
  RATE: "Rate",
  LOCATION: "Location",
  TIMEZONE: "Timezone",
  INSUFFICIENTSKILLS: "Insufficient Skills",
  INSUFFICIENTEXPERIENCE: "Insufficient Experience",
  EXPERIENCENOTRELEVANT: "Experience Not Relevant",
};

export const SOCIAL_LOGIN_ACCOUNTS = {
  GOOGLE: "google_",
  GITHUB: "github_",
  ETHEREUM: "SIWE_",
};

export const PROFILE_COMPLETION_LEVELS = {
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  FULL: 100,
};

export const PROFILE_COMPLETION_TEXT = {
  [PROFILE_COMPLETION_LEVELS.LOW]: {
    title: "Your profile is hidden to hiring managers!",
    description:
      "Your profile does not meet the minimum requirements to apply to job opportunities. Complete your profile today so you don't miss out on jobs!",
  },
  [PROFILE_COMPLETION_LEVELS.MEDIUM]: {
    title: "Your profile is getting awesome!",
    description:
      "We still need worth information to get better matches for you!",
  },
  [PROFILE_COMPLETION_LEVELS.HIGH]: {
    title: "Your profile is almost totally complete!",
    description: "Finish it to be better matched to job opportunities",
  },
  [PROFILE_COMPLETION_LEVELS.FULL]: {
    title: "Your profile is complete!",
    description:
      "That's amazing! Congratulations, don't forget to keep all data up to date to better match results",
  },
};

export const PROFILE_COMPLETION_LINKS = {
  [PROFILE_COMPLETION_LEVELS.LOW]: {
    icon: "wizardLinkLow",
    color: "#BF3A39",
  },
  [PROFILE_COMPLETION_LEVELS.MEDIUM]: {
    icon: "wizardLinkHigh",
    color: "#CD931C",
  },
  [PROFILE_COMPLETION_LEVELS.HIGH]: {
    icon: "wizardLinkHigh",
    color: "#CD931C",
  },
  [PROFILE_COMPLETION_LEVELS.FULL]: {
    icon: "wizardLinkFull",
    color: "#00924A",
  },
};

export const SIGNUP_TYPES = {
  EMAIL: 0,
  GOOGLE: 1,
  GITHUB: 2,
};

export const PROFILE_LINKS_PATH_PARAMS = {
  images: {
    wizard: 2,
    subStep: 5,
    label: "Profile Images",
  },
  skills: {
    wizard: 1,
    label: "Stacks and Skills",
  },
  connectAccounts: {
    wizard: 1,
    subStep: 4,
    label: "Connect Github",
  },
  generalInfo: {
    wizard: 2,
    label: "General Info",
  },
};

export const FINALIST_VIEW_MODES = {
  GRIDVIEW: "GRIDVIEW",
  LISTVIEW: "LISTVIEW",
};

export const JOB_APPLICATION_MATCH_RATINGS = {
  VERYUNDESIRABLE: "VERYUNDESIRABLE",
  UNDESIRABLE: "UNDESIRABLE",
  NEUTRAL: "NEUTRAL",
  DESIRABLE: "DESIRABLE",
  VERYDESIRABLE: "VERYDESIRABLE",
};

export const JOB_APPLICATION_MATCH_RATINGS_FORMATTED = {
  VERYUNDESIRABLE: "Very Undesirable",
  UNDESIRABLE: "Undesirable",
  NEUTRAL: "Neutral",
  DESIRABLE: "Desirable",
  VERYDESIRABLE: "Very Desirable",
};

export const REFERRAL_TYPES = {
  JOB: "JOB",
  USER: "USER",
};

export const NOTE_TYPES = {
  CALIBRATION: "CALIBRATION",
  GENERAL: "GENERAL",
  JOBFEEDBACK: "JOBFEEDBACK",
};
